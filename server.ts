import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

import { findBiodecodingMatch } from './src/data/biodecodingDatabase.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;
const ai = new GoogleGenAI({});

// Available protocol IDs in LUMINA
const ALLOWED_PROTOCOLS = [
  'pnl-reencuadre',
  'pnl-anclaje',
  'relajacion-478',
  'mindfulness-somatico',
  'visualizacion-santuario',
  'pnl-posiciones',
  'reflexion-dialogo'
];

/**
 * POST /api/biodecoding/search
 * Generates custom, grounded biodecoding interpretations for any query
 * based on biological decodification literature (Christian Flèche, Jacques Martel,
 * Enric Corbera, Lisa Bourbeau, Salomon Sellam, Dr. Hamer).
 */
app.post('/api/biodecoding/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const cleanQuery = query.trim();

    const systemPrompt = `Actuá como la biblioteca conceptual y diccionario de biodecodificación biológica y programación neurolingüística (fundamentado en la literatura de Christian Flèche, Jacques Martel, Enric Corbera, Lisa Bourbeau, Salomon Sellam y las 5 leyes biológicas).
El usuario consulta por el siguiente síntoma, enfermedad, molestia o parte del cuerpo: "${cleanQuery}".

REGLAS ESTRICTAS DE REDACCIÓN, TONO Y PROFUNDIDAD:
1. El contenido debe ser ESPECÍFICO para ese síntoma y órgano exacto. Si preguntan por "acné", explicá la dermis, las glándulas sebáceas, el miedo al rechazo de la propia imagen, el pudor o sentirse "no deseable". Si preguntan por "asma", explicá los bronquios y la amenaza en el territorio. Si preguntan por "manchas en la cara", explicá el escudo ante una agresión a la dignidad. NUNCA des respuestas genéricas que sirvan para cualquier cosa.
2. Hablá en español cálido, directo, empático y simple, comprensible para cualquier persona (incluso un adulto mayor de 70 años sin conocimientos previos).
3. PROHIBIDO usar lenguaje burocrático, académico o clichés vacíos como: "Desde el enfoque de biodecodificación utilizado por esta biblioteca...", "las manifestaciones físicas se abordan como señales...", "dinámicas afectivas o estresores". Andá directo al grano.
4. PROHIBIDO mencionar Inteligencia Artificial, NotebookLM, Gemini, modelos de lenguaje o herramientas de software. Hablá con total naturalidad como la biblioteca de conocimiento somático del sistema.
5. Estructurá la interpretación en 3 párrafos separados por doble salto de línea (\\n\\n):
   - Párrafo 1: El sentido biológico y la emoción inconsciente de ese órgano o síntoma específico.
   - Párrafo 2: Un ejemplo concreto de la vida cotidiana (empezá con: "Por ejemplo en la vida diaria: ..."), describiendo situaciones cotidianas familiares, de pareja o laborales.
   - Párrafo 3: La pista de alivio y acción concreta para destrabar la emoción hoy.
6. Elegí 2 o 3 protocolos adecuados de esta lista: ${JSON.stringify(ALLOWED_PROTOCOLS)}.
7. Devolvé ÚNICAMENTE un objeto JSON válido con este formato:
{
  "title": "Nombre claro y cálido del síntoma o afección",
  "summary": "Resumen en 1 o 2 oraciones sencillas sobre lo que el cuerpo expresa.",
  "interpretation": "Texto completo en 3 párrafos separados por \\n\\n.",
  "emotionalThemes": ["Tema 1", "Tema 2", "Tema 3", "Tema 4"],
  "reflectionQuestions": [
    "Pregunta reflexiva 1 profunda y cercana",
    "Pregunta reflexiva 2",
    "Pregunta reflexiva 3"
  ],
  "recommendedProtocolIds": ["protocolo-1", "protocolo-2"],
  "isMedicalAlert": false,
  "alertMessage": ""
}`;

    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
    let text = '';
    let lastError: Error | null = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: systemPrompt,
          config: {
            responseMimeType: 'application/json',
          }
        });
        if (response.text) {
          text = response.text;
          break;
        }
      } catch (err) {
        lastError = err as Error;
        console.warn(`Model ${model} failed, trying next candidate...`);
      }
    }

    if (!text) {
      throw lastError || new Error('No content returned from any Gemini model');
    }

    const data = JSON.parse(text);

    // Validate recommendedProtocolIds
    if (Array.isArray(data.recommendedProtocolIds)) {
      data.recommendedProtocolIds = data.recommendedProtocolIds.filter((id: string) =>
        ALLOWED_PROTOCOLS.includes(id)
      );
    }
    if (!data.recommendedProtocolIds || data.recommendedProtocolIds.length === 0) {
      data.recommendedProtocolIds = ['pnl-reencuadre', 'mindfulness-somatico'];
    }

    return res.json(data);
  } catch (error: any) {
    console.warn('Gemini temporary error (503/network), falling back to local biodecoding database:', error?.message);

    const cleanQuery = (req.body?.query || '').trim();
    const localMatch = findBiodecodingMatch(cleanQuery);

    if (localMatch) {
      return res.json({
        title: localMatch.title,
        summary: localMatch.summary,
        interpretation: localMatch.interpretation,
        emotionalThemes: localMatch.emotionalThemes,
        reflectionQuestions: localMatch.reflectionQuestions,
        recommendedProtocolIds: localMatch.recommendedProtocolIds,
        isMedicalAlert: false,
        alertMessage: ''
      });
    }

    // Dynamic semantic synthesis for conditions outside curated list
    return res.json({
      title: cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1),
      summary: `Tu cuerpo te está enviando una señal biológica para que revises qué situación reciente te generó tensión, cansancio o angustia.`,
      interpretation: `El cuerpo humano no se equivoca: cuando aparece una molestia o síntoma en "${cleanQuery}", suele ser la forma en que el organismo manifiesta una emoción o una sobrecarga que todavía no pudimos resolver con palabras.\n\nPreguntate qué pasó en los días o semanas previas a que empezara esta molestia: ¿hubo alguna discusión que te dejó un mal sabor de boca?, ¿sentiste que te exigían más de lo que podías dar?, ¿o estás sosteniendo una situación que en el fondo ya no tolerás?\n\nEl primer paso para sentirte mejor no es pelear contra el cuerpo, sino escuchar el mensaje: poner los límites que hagan falta con tranquilidad, darte permiso para descansar y no cargarte con problemas ajenos que hoy no podés cambiar.`,
      emotionalThemes: [
        'Escucha y respeto del cuerpo',
        'Límites con el entorno',
        'Desahogo de tensiones',
        'Paz interior y autocuidado'
      ],
      reflectionQuestions: [
        `¿Qué situación incómoda o conversación difícil estabas viviendo cuando empezó esta molestia?`,
        `¿Hay algo en tu rutina diaria a lo que le estás diciendo que sí por compromiso, cuando por dentro querés decir que no?`,
        `¿Qué pequeño momento de tranquilidad podrías regalarte hoy para aflojar esa tensión?`
      ],
      recommendedProtocolIds: ['pnl-reencuadre', 'mindfulness-somatico'],
      isMedicalAlert: false,
      alertMessage: ''
    });
  }
});

// Setup Vite development server or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LUMINA Full-Stack Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
