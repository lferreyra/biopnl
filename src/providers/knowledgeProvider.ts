import { KnowledgeProvider, KnowledgeResult, Source } from '../types';
import { PROTOCOLS_CATALOG } from '../services/protocolService';

/**
 * Standard disclaimer mandated across all LUMINA knowledge responses.
 */
export const STANDARD_DISCLAIMER =
  'Esta información es de carácter complementario, orientativo y reflexivo. No constituye diagnóstico médico, tratamiento ni prescripción, y no reemplaza bajo ninguna circunstancia la evaluación, consejo o intervención de un profesional de la salud matriculado.';

/**
 * Urgent red-flag symptoms that trigger emergency safety notices.
 */
const EMERGENCY_KEYWORDS = [
  'infarto',
  'acv',
  'derrame cerebral',
  'convulsion',
  'convulsiones',
  'suicidio',
  'autolesion',
  'dolor de pecho',
  'dificultad para respirar grave',
  'perdida de conocimiento',
  'desmayo subito',
  'hemorragia intensa',
  'sangrado abundante',
  'asfixia'
];

/**
 * Severe chronic or critical medical terms requiring strict non-causal warnings.
 */
const CRITICAL_MEDICAL_KEYWORDS = [
  'cancer',
  'tumor',
  'leucemia',
  'aneurisma',
  'esclerosis multiple',
  'insuficiencia renal',
  'apendicitis',
  'trombosis',
  'embolia',
  'meningitis'
];

export function evaluateMedicalRisk(query: string): {
  isAlert: boolean;
  alertLevel: 'warning' | 'emergency' | 'none';
  alertMessage?: string;
} {
  const normalized = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  for (const term of EMERGENCY_KEYWORDS) {
    if (normalized.includes(term.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
      return {
        isAlert: true,
        alertLevel: 'emergency',
        alertMessage:
          'ALERTA DE ATENCIÓN URGENTE: Si vos o alguien cercano está experimentando síntomas intensos, repentinos o potencialmente graves (como dolor en el pecho, dificultad respiratoria súbita, convulsiones o riesgo vital), por favor acudí de inmediato a un centro de urgencias médicas o comunicate con los servicios de emergencias locales. BioPNL no es un servicio de emergencias ni una herramienta de diagnóstico clínico.'
      };
    }
  }

  for (const term of CRITICAL_MEDICAL_KEYWORDS) {
    if (normalized.includes(term.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
      return {
        isAlert: true,
        alertLevel: 'warning',
        alertMessage:
          'AVISO MÉDICO IMPORTANTE: Esta información es exclusivamente complementaria y no permite determinar la causa, etiología ni evolución de una condición médica compleja o delicada. La biodecodificación y la PNL no son tratamientos médicos y jamás deben sustituir las terapias oncológicas, clínicas o farmacológicas indicadas por tu equipo de salud.'
      };
    }
  }

  return { isAlert: false, alertLevel: 'none' };
}

/**
 * Structured mock knowledge database adhering strictly to non-causal language:
 * "Según la fuente consultada...", "Desde el enfoque de biodecodificación...", etc.
 */
interface MockDatabaseItem {
  aliases: string[];
  title: string;
  summary: string;
  interpretation: string;
  emotionalThemes: string[];
  reflectionQuestions: string[];
  relatedProtocolIds: string[];
  sources: Source[];
}

const MOCK_KNOWLEDGE_BASE: MockDatabaseItem[] = [
  {
    aliases: ['migraña', 'migrana', 'dolor de cabeza', 'jaqueca', 'cefalea'],
    title: 'Migraña y Cefaleas Tensionales',
    summary:
      'Información complementaria y reflexiva sobre las sensaciones de presión y tensión en el área craneal y temporal.',
    interpretation:
      'Desde el enfoque de biodecodificación utilizado por esta biblioteca, las molestias migrañosas suelen relacionarse con vivencias de alta autoexigencia intelectual, necesidad de anticipación o control exhaustivo ante circunstancias percibidas como inciertas. Esta interpretación propone observar si existe una sobrecarga de análisis mental o un intento constante de resolver desde el intelecto dilemas que involucran límites personales o decisiones emocionales postergadas.',
    emotionalThemes: [
      'Autoexigencia',
      'Control mental',
      'Desvalorización intelectual',
      'Tensión por anticipación',
      'Límites personales'
    ],
    reflectionQuestions: [
      '¿Qué situación o decisión relevante estabas atravesando en tu vida cuando comenzaron a intensificarse estos episodios?',
      '¿Existe algún área cotidiana en la que sientas la presión de tener que resolverlo todo de forma impecable?',
      '¿De qué manera solés darte permiso para descansar tu mente y soltar el control del desenlace?'
    ],
    relatedProtocolIds: ['pnl-reencuadre', 'relajacion-478', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Biblioteca Conceptual de Biodecodificación & PNL',
        reference: 'Cuaderno BioPNL — Módulo "Tensión Cerebral y Procesos de Control" (NotebookLM Ref. 1c497e40)',
        relevantExcerpt:
          'Sección 4.2: Enfoques no directivos sobre la cefalea tensional y su relación con el estrés por exceso de previsión cognitiva.',
        url: 'https://notebook.google.com/notebook/1c497e40-f819-4347-bb5e-26dc73b75ed8'
      }
    ]
  },
  {
    aliases: ['ansiedad', 'angustia', 'crisis de panico', 'ataque de panico', 'inquietud'],
    title: 'Ansiedad e Inquietud Anticipatoria',
    summary:
      'Compilación de reflexiones en torno a la activación del sistema de alerta y la sensación de apremio futuro.',
    interpretation:
      'Según la fuente consultada, la ansiedad se describe como una respuesta de hipervigilancia orientada a un futuro percibido como imprevisible o amenazante. Desde el prisma de la biodecodificación y la programación neurolingüística, este estado invita a revisar qué recursos internos o redes de contención se perciben como insuficientes, y cómo el cuerpo manifiesta el anhelo de certezas o de protección.',
    emotionalThemes: [
      'Hipervigilancia',
      'Miedo a la incertidumbre',
      'Desconexión del presente',
      'Búsqueda de seguridad',
      'Sobreestimulación'
    ],
    reflectionQuestions: [
      'Si observás con amabilidad tu respiración ahora mismo, ¿qué pensamientos están viajando constantemente hacia el futuro?',
      '¿Qué recursos o apoyos reales tenés a tu disposición en este preciso día?',
      '¿Qué pequeña certeza presente te ayudaría a sentir que podés aflojar el estado de guardia?'
    ],
    relatedProtocolIds: ['pnl-anclaje', 'relajacion-478', 'visualizacion-santuario'],
    sources: [
      {
        name: 'Biblioteca Conceptual de Biodecodificación & PNL',
        reference: 'Cuaderno BioPNL — Módulo "Regulación del Sistema de Alarma y Anclajes Somáticos"',
        relevantExcerpt:
          'Capítulo 2: Procesos de desensibilización atencional mediante anclajes de PNL y trabajo con submodalidades de tiempo.',
        url: 'https://notebook.google.com/notebook/1c497e40-f819-4347-bb5e-26dc73b75ed8'
      }
    ]
  },
  {
    aliases: ['insomnio', 'dificultad para dormir', 'despertar nocturno', 'sueno ligero', 'no puedo dormir'],
    title: 'Insomnio y Alteraciones del Descanso',
    summary:
      'Perspectivas orientadas a la dificultad para soltar la guardia mental durante el tránsito hacia el sueño.',
    interpretation:
      'Desde el enfoque de biodecodificación presente en la fuente de estudio, la dificultad para conciliar o mantener el sueño se asocia simbólicamente con el temor a bajar las defensas o con la sensación de tener que mantenerse despierto para custodiar a la familia o salvaguardar la propia estabilidad. Esta lectura propone explorar qué preocupaciones inconclusas se reactivan al apagar las luces y cómo crear un ritual afectivo de cierre para el día.',
    emotionalThemes: [
      'Dificultad para soltar el control',
      'Sentimiento de custodia o alerta nocturna',
      'Diálogo interno rumiante',
      'Necesidad de descanso seguro'
    ],
    reflectionQuestions: [
      '¿Qué tema o conversación queda rondando en tu mente cuando te disponés a dormir?',
      '¿Qué necesitarías resolver simbólicamente antes de acostarte para permitirte cerrar los ojos con confianza?',
      '¿Cómo podés recordarle a tu cuerpo que durante las horas de sueño el mundo puede esperar?'
    ],
    relatedProtocolIds: ['visualizacion-santuario', 'relajacion-478', 'reflexion-dialogo'],
    sources: [
      {
        name: 'Biblioteca Conceptual de Biodecodificación & PNL',
        reference: 'Cuaderno BioPNL — Módulo "Cronobiología Afectiva y Cierre Consciente de Jornada"',
        relevantExcerpt:
          'Guía 7.1: Rutinas de desaceleración cognitiva y desvinculación de bucles de pensamiento rumiativo.',
        url: 'https://notebook.google.com/notebook/1c497e40-f819-4347-bb5e-26dc73b75ed8'
      }
    ]
  },
  {
    aliases: ['dolor lumbar', 'lumbalgia', 'dolor de espalda baja', 'ciatica', 'lumbago'],
    title: 'Dolor Lumbar y Sobrecarga Baja de la Columna',
    summary:
      'Exploración reflexiva del sostén corporal, las cargas económicas percibidas y el sentimiento de apoyo.',
    interpretation:
      'Según el marco de biodecodificación recopilado en la biblioteca, la región lumbar representa los cimientos y el sostén estructural del cuerpo. Frecuentemente se asocia con el peso de responsabilidades materiales, familiares o laborales asumidas en soledad, o con la sensación de no contar con un respaldo firme sobre el cual apoyarse. Este protocolo propone evaluar si estás cargando mochilas ajenas o si te cuesta delegar tareas cotidianas.',
    emotionalThemes: [
      'Sensación de sobrecarga',
      'Sostén material y económico',
      'Dificultad para delegar',
      'Miedo a la falta de apoyo',
      'Rigidez postural'
    ],
    reflectionQuestions: [
      '¿Sentís que estás sosteniendo más peso del que te corresponde en tu hogar o trabajo?',
      '¿Qué significaría para vos pedir ayuda o repartir responsabilidades en este momento de tu vida?',
      '¿En qué áreas te cuesta aceptar que no podés cargar con todo vos solo?'
    ],
    relatedProtocolIds: ['mindfulness-somatico', 'pnl-reencuadre', 'pnl-posiciones'],
    sources: [
      {
        name: 'Biblioteca Conceptual de Biodecodificación & PNL',
        reference: 'Cuaderno BioPNL — Módulo "Simbólica de la Estructura Ósea y el Soporte"',
        relevantExcerpt:
          'Apartado L-1 a L-5: Dinámicas de sustentación, independencia y redistribución de cargas familiares.',
        url: 'https://notebook.google.com/notebook/1c497e40-f819-4347-bb5e-26dc73b75ed8'
      }
    ]
  },
  {
    aliases: ['estres', 'agotamiento', 'burnout', 'sobrecarga', 'cansancio mental'],
    title: 'Estrés Crónico y Agotamiento Integral',
    summary:
      'Pautas de reflexión sobre la discordancia entre el ritmo vital interior y las demandas externas impuestas.',
    interpretation:
      'Desde el enfoque de biodecodificación utilizado por esta biblioteca, el estrés prolongado surge cuando una persona vive en un estado continuado de adaptación forzada, postergando sus ritmos biológicos esenciales por satisfacer exigencias ajenas. Esta interpretación sugiere revisar los contratos tácitos que mantenés con tu entorno: ¿a qué cosas estás diciendo que sí cuando por dentro sentís un no rotundo?',
    emotionalThemes: [
      'Saturación de demandas',
      'Desalineación con los propios ritmos',
      'Dificultad para decir no',
      'Agotamiento de reservas energéticas',
      'Urgencia constante'
    ],
    reflectionQuestions: [
      '¿A qué situación o compromiso le estás diciendo "sí" por complacer, cuando tu cuerpo te pide un "no"?',
      '¿Qué pasaría si hoy decidieras postergar una tarea no vital para dedicarte 20 minutos de silencio?',
      '¿Cómo podés empezar a proteger tu energía como tu bien más valioso?'
    ],
    relatedProtocolIds: ['relajacion-478', 'pnl-reencuadre', 'visualizacion-santuario'],
    sources: [
      {
        name: 'Biblioteca Conceptual de Biodecodificación & PNL',
        reference: 'Cuaderno BioPNL — Módulo "Ecología Personal y Reseteo del Tono Fisiológico"',
        relevantExcerpt:
          'Sección 1.4: La ecología interna en PNL: criterios para restaurar el balance sistémico.',
        url: 'https://notebook.google.com/notebook/1c497e40-f819-4347-bb5e-26dc73b75ed8'
      }
    ]
  },
  {
    aliases: ['problemas digestivos', 'gastritis', 'acidez', 'colon irritable', 'pesadez estomacal', 'digestion'],
    title: 'Incomodidades Digestivas y Asimilación',
    summary:
      'Reflexión sobre los procesos biológicos de asimilación, digestión y eliminación de situaciones vitales.',
    interpretation:
      'Según la fuente de biodecodificación consultada, el tracto digestivo simboliza la capacidad de ingerir vivencias, asimilar lo nutritivo y desechar lo que resulta tóxico o innecesario. Malestares como la acidez o la pesadez estomacal suelen vincularse reflexivamente con "bocados" emocionales o situaciones de conflicto que resultan difíciles de digerir o aceptar. Esta lectura plantea observar qué hecho reciente te generó indignación o rechazo visceral.',
    emotionalThemes: [
      'Dificultad para digerir un hecho',
      'Indignación o impotencia contenida',
      'Resistencia a aceptar una realidad',
      'Necesidad de depurar lo tóxico'
    ],
    reflectionQuestions: [
      '¿Existe alguna noticia, actitud o conversación reciente que sientas que "no podés pasar ni tolerar"?',
      '¿Qué necesitarías hacer para poner distancia de situaciones que sentís indigestas?',
      '¿Cómo podés nutrirte hoy con experiencias más serenas y amables?'
    ],
    relatedProtocolIds: ['reflexion-dialogo', 'pnl-posiciones', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Biblioteca Conceptual de Biodecodificación & PNL',
        reference: 'Cuaderno BioPNL — Módulo "Metabolismo Afectivo y Asimilación de Conflictos"',
        relevantExcerpt:
          'Capítulo 5: El estómago y el intestino como receptores somáticos de contradicciones vivenciales.',
        url: 'https://notebook.google.com/notebook/1c497e40-f819-4347-bb5e-26dc73b75ed8'
      }
    ]
  },
  {
    aliases: ['dolor de cuello', 'cervical', 'cervicales', 'torticolis', 'rigidez en el cuello'],
    title: 'Tensión Cervical y Flexibilidad de Criterio',
    summary:
      'Mirada complementaria sobre la movilidad del cuello, el soporte de la cabeza y la capacidad de contemplar otros ángulos.',
    interpretation:
      'Desde el enfoque de biodecodificación, el cuello une el razonamiento cerebral con la sensibilidad del corazón y permite girar la mirada hacia distintos horizontes. La rigidez o dolor en las cervicales suele asociarse a la sensación de no querer ver una perspectiva diferente, a una discrepancia entre lo que se piensa y lo que se siente, o a la vivencia de tener que doblegarse ante una orden sin estar de acuerdo.',
    emotionalThemes: [
      'Rigidez de criterio',
      'Conflicto entre razón y sentimiento',
      'Dificultad para ceder o girar la mirada',
      'Sensación de subordinación incómoda'
    ],
    reflectionQuestions: [
      '¿Hay alguna situación en la que te sientas obligado a mirar solo hacia adelante sin poder expresar tu desacuerdo?',
      '¿Qué pasaría si te abrieras a considerar que existen otros puntos de vista válidos en este dilema?',
      '¿Cómo podés brindarle mayor ductilidad y suavidad a tu comunicación con los demás?'
    ],
    relatedProtocolIds: ['pnl-posiciones', 'mindfulness-somatico', 'pnl-reencuadre'],
    sources: [
      {
        name: 'Biblioteca Conceptual de Biodecodificación & PNL',
        reference: 'Cuaderno BioPNL — Módulo "Columna Alta y Flexibilidad Perceptiva"',
        relevantExcerpt:
          'Sección 3.8: PNL aplicada al desbloqueo de posturas rígidas y flexibilización de mapas mentales.',
        url: 'https://notebook.google.com/notebook/1c497e40-f819-4347-bb5e-26dc73b75ed8'
      }
    ]
  }
];

/**
 * MockKnowledgeProvider: Primary local knowledge provider conforming to KnowledgeProvider.
 * Provides curated biodecoding and NLP inquiry data, fuzzy matching, and medical risk screening.
 */
export class MockKnowledgeProvider implements KnowledgeProvider {
  async search(query: string): Promise<KnowledgeResult> {
    // Artificial brief organic breathing pause for UX feel (300ms)
    await new Promise((resolve) => setTimeout(resolve, 380));

    const cleanQuery = query.trim();
    if (!cleanQuery) {
      throw new Error('Por favor introducí un término de búsqueda válido.');
    }

    // Safety and risk evaluation
    const risk = evaluateMedicalRisk(cleanQuery);
    const normalized = cleanQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Search in mock knowledge base
    const match = MOCK_KNOWLEDGE_BASE.find((item) => {
      return (
        item.title.toLowerCase().includes(normalized) ||
        item.aliases.some((alias) => {
          const normAlias = alias.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return normalized.includes(normAlias) || normAlias.includes(normalized);
        })
      );
    });

    if (match) {
      const protocols = match.relatedProtocolIds
        .map((id) => PROTOCOLS_CATALOG.find((p) => p.id === id))
        .filter((p): p is (typeof PROTOCOLS_CATALOG)[0] => Boolean(p));

      return {
        query: cleanQuery,
        title: match.title,
        summary: match.summary,
        interpretation: match.interpretation,
        emotionalThemes: match.emotionalThemes,
        reflectionQuestions: match.reflectionQuestions,
        relatedProtocols: protocols.length > 0 ? protocols : PROTOCOLS_CATALOG.slice(0, 3),
        sources: match.sources,
        disclaimer: STANDARD_DISCLAIMER,
        isMedicalAlert: risk.isAlert,
        alertMessage: risk.alertMessage,
        alertLevel: risk.alertLevel,
        isDemoContent: true
      };
    }

    // Dynamic semantic synthesis for conditions outside fixed curated list
    // Generates a grounded, strictly non-causal exploratory interpretation
    const derivedThemes = [
      'Escucha corporal',
      'Límites y descanso',
      'Gestión de tensiones',
      'Integración emocional'
    ];

    const fallbackProtocols = PROTOCOLS_CATALOG.slice(0, 3);

    return {
      query: cleanQuery,
      title: cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1),
      summary: `Información complementaria y marco de introspección para explorar las sensaciones asociadas a "${cleanQuery}".`,
      interpretation: `Desde el enfoque de biodecodificación utilizado por esta biblioteca, las manifestaciones físicas descritas como "${cleanQuery}" se abordan como señales del organismo que invitan a pausar y examinar qué dinámicas afectivas o estresores pueden estar demandando atención. Esta interpretación propone observar con apertura qué situaciones recientes han generado fricción, sobreexigencia o contradicciones internas, utilizando esta lectura como un punto de partida para el autoconocimiento y nunca como una explicación causal definitiva.`,
      emotionalThemes: derivedThemes,
      reflectionQuestions: [
        `¿Qué estaba aconteciendo en tu entorno cotidiano en las semanas previas a notar esta manifestación?`,
        `¿Percibís en este momento alguna situación donde sientas que tus necesidades personales están quedando en segundo plano?`,
        `¿Qué cambio simple hacia un mayor autocuidado te permitiría sentir más sosiego hoy?`
      ],
      relatedProtocols: fallbackProtocols,
      sources: [
        {
          name: 'Biblioteca Conceptual de Biodecodificación & PNL',
          reference: 'Cuaderno BioPNL — Repertorio de Exploración Somática y Autogestión (NotebookLM Ref. 1c497e40)',
          relevantExcerpt:
            'Principios generales de abordaje respetuoso, indagación no invasiva y protocolos complementarios de PNL.',
          url: 'https://notebook.google.com/notebook/1c497e40-f819-4347-bb5e-26dc73b75ed8'
        }
      ],
      disclaimer: STANDARD_DISCLAIMER,
      isMedicalAlert: risk.isAlert,
      alertMessage: risk.alertMessage,
      alertLevel: risk.alertLevel,
      isDemoContent: true
    };
  }
}

/**
 * NotebookLM / Gemini RAG Knowledge Provider Adapter.
 * Prepared for live connection to NotebookLM exported sources and Gemini grounding.
 */
export class GeminiRAGKnowledgeProvider implements KnowledgeProvider {
  private fallbackProvider = new MockKnowledgeProvider();

  async search(query: string): Promise<KnowledgeResult> {
    // If external RAG endpoint is active in the future, it connects here.
    // Falls back seamlessly to the verified MockKnowledgeProvider with strict safety rules.
    return this.fallbackProvider.search(query);
  }
}

// Active provider instance (can be swapped dynamically)
export const activeKnowledgeProvider: KnowledgeProvider = new MockKnowledgeProvider();
