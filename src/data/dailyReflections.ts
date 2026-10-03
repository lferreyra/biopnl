export interface DailyReflection {
  id: string;
  thought: string;
  bodilyFocus: string;
  suggestedAction: string;
  category: string;
}

export const DAILY_REFLECTIONS: DailyReflection[] = [
  {
    id: 'ref-1',
    thought: '¿Qué responsabilidad o carga estás llevando hoy que no te corresponde?',
    bodilyFocus: 'Tensión en hombros y cuello',
    suggestedAction: 'Aflojá los hombros hacia atrás tres veces y permitite pedir ayuda o delegar una tarea.',
    category: 'Límites y Cargas'
  },
  {
    id: 'ref-2',
    thought: '¿Hay alguna palabra o emoción que te guardaste hoy para evitar una discusión?',
    bodilyFocus: 'Nudo en la garganta o presión en el pecho',
    suggestedAction: 'Hacé tres exhalaciones sonoras y escribí en un papel lo que no dijiste para soltarlo.',
    category: 'Expresión Emocional'
  },
  {
    id: 'ref-3',
    thought: '¿En qué momento del día te exigiste más de lo que tu cuerpo podía dar?',
    bodilyFocus: 'Pesadez en la frente o dolor de cabeza',
    suggestedAction: 'Cerrá los ojos durante dos minutos y recordá que descansar también es productivo.',
    category: 'Autoexigencia'
  },
  {
    id: 'ref-4',
    thought: '¿Qué situación reciente te está costando digerir o aceptar tal como es?',
    bodilyFocus: 'Ardor, acidez o pesadez en el estómago',
    suggestedAction: 'Colocá una mano tibia sobre tu abdomen y respirá hacia esa zona con calma.',
    category: 'Aceptación'
  },
  {
    id: 'ref-5',
    thought: '¿Cuándo fue la última vez que soltaste el control y confiaste en que todo saldrá bien?',
    bodilyFocus: 'Dolor en la zona lumbar o espalda baja',
    suggestedAction: 'Sentate con los pies firmes en el piso y sentí cómo la tierra te sostiene sin esfuerzo.',
    category: 'Confianza y Control'
  },
  {
    id: 'ref-6',
    thought: '¿Estás apretando la mandíbula o los dientes mientras pensás en tus pendientes?',
    bodilyFocus: 'Tensión mandibular y sienes',
    suggestedAction: 'Separá los labios, pasá la punta de la lengua por el paladar y dejá caer la mandíbula.',
    category: 'Alivio Muscular'
  },
  {
    id: 'ref-7',
    thought: '¿Qué pequeño momento de alegría o gratitud podés regalarte hoy sin culpa?',
    bodilyFocus: 'Apertura en el pecho y respiración fluida',
    suggestedAction: 'Tomate 5 minutos para disfrutar de algo simple: una infusión tibia, aire fresco o música suave.',
    category: 'Autocuidado'
  },
  {
    id: 'ref-8',
    thought: '¿A qué persona o situación necesitás decirle un "no" amable para decirte "sí" a vos?',
    bodilyFocus: 'Sensación de agobio o falta de aire',
    suggestedAction: 'Recordá que poner límites con respeto es cuidar tu propia salud y paz interior.',
    category: 'Límites Personales'
  }
];

export function getTodayReflection(): DailyReflection {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = Math.abs(dayOfYear) % DAILY_REFLECTIONS.length;
  return DAILY_REFLECTIONS[index];
}
