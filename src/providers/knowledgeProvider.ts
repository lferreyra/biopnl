import { KnowledgeProvider, KnowledgeResult, Source } from '../types';
import { PROTOCOLS_CATALOG } from '../services/protocolService';

/**
 * Standard disclaimer mandated across all LUMINA knowledge responses.
 */
export const STANDARD_DISCLAIMER =
  'Esta información es de carácter orientativo y reflexivo para tu autoconocimiento. No reemplaza bajo ninguna circunstancia la consulta, diagnóstico o tratamiento de tu médico o profesional de la salud.';

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
  'dolor de pecho intenso',
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
          'ALERTA MÉDICA: Si vos o alguien cercano tiene un síntoma grave o repentino (como dolor de pecho agudo, falta de aire repentina o pérdida de conocimiento), acudí de inmediato a una guardia médica o llamá al servicio de emergencias.'
      };
    }
  }

  for (const term of CRITICAL_MEDICAL_KEYWORDS) {
    if (normalized.includes(term.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
      return {
        isAlert: true,
        alertLevel: 'warning',
        alertMessage:
          'AVISO IMPORTANTE: Esta información es solo para acompañar tu reflexión emocional y nunca debe sustituir las indicaciones, tratamientos ni estudios ordenados por tu equipo médico.'
      };
    }
  }

  return { isAlert: false, alertLevel: 'none' };
}

/**
 * Down-to-earth, empathetic biodecoding knowledge database.
 * No academic jargon, no wordy fillers. Plain Spanish with real-life concrete examples.
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
  // 1. Manchas en la piel / Rostro / Melasma / Pigmentación (User's specific case)
  {
    aliases: [
      'manchas en el rostro',
      'manchas en la cara',
      'sobre pigmentacion',
      'sobrepigmentacion',
      'hiperpigmentacion',
      'pigmentacion',
      'melasma',
      'paño',
      'manchas en la piel',
      'manchas oscuras'
    ],
    title: 'Manchas en el Rostro y la Piel (Pigmentación y Melasma)',
    summary:
      'La cara es la parte del cuerpo con la que "damos la cara" ante los demás. Las manchas oscuras suelen aparecer como un escudo biológico cuando sentimos que nuestra imagen fue atacada, juzgada o "ensuciada".',
    interpretation:
      'La piel del rostro es nuestra carta de presentación. En biodecodificación, cuando la piel produce más melanina y oscurece ciertas zonas (lo que llamamos sobrepigmentación, melasma o paño), el cuerpo está creando literalmente una pantalla o "escudo" protector frente a una agresión que sentimos hacia nuestra imagen o dignidad.\n\nPor ejemplo en la vida diaria: haber vivido una situación de mucha vergüenza, chismes o comentarios familiares o de trabajo donde sentiste que hablaron mal de vos y "mancharon tu reputación", o sentirte constantemente expuesto/a a que los demás te critiquen y juzguen tus decisiones. El cuerpo busca "tapar" o proteger esa zona para que no te sigan hiriendo.\n\nEl camino de alivio: entender que tu valor como persona no depende de la opinión ajena ni de los errores del pasado. Cuando te perdonás, te mirás al espejo con cariño y dejás de necesitar la aprobación de los demás, tu piel comprende que ya está a salvo y ya no necesita defenderse.',
    emotionalThemes: [
      'Proteger la propia imagen',
      'Miedo a la mirada y crítica ajena',
      'Sentirse juzgado o avergonzado',
      'Reconciliación con uno mismo'
    ],
    reflectionQuestions: [
      '¿Hubo alguna situación reciente o del pasado donde sentiste que hablaron mal de vos o que "mancharon" tu nombre?',
      '¿Sentís que tenés que mostrarte siempre impecable para evitar que otros te critiquen o te desaprueben?',
      '¿Qué pasaría si hoy empezaras a mirarte al espejo con compasión, recordando que tu valor no lo define nadie de afuera?'
    ],
    relatedProtocolIds: ['pnl-reencuadre', 'anclaje-recursos', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Piel y Contacto: Rostro, límites y protección de la imagen personal',
        relevantExcerpt: 'La pigmentación dérmica como respuesta arcaica de defensa ante agresiones a la dignidad personal.'
      }
    ]
  },

  // 2. Caderas / Artrosis de cadera / Coxartrosis (User's specific reference)
  {
    aliases: [
      'cadera',
      'caderas',
      'artrosis de cadera',
      'dolor de cadera',
      'coxartrosis',
      'coxalgia',
      'desgaste de cadera'
    ],
    title: 'Cadera, Autonomía y el Valor de Sentirse Útil',
    summary:
      'La cadera sostiene el cuerpo y nos permite caminar. Su dolor o desgaste se relaciona con la sensación de "ya no sirvo para nada" o el miedo a ser una carga para la familia.',
    interpretation:
      'La articulación de la cadera nos permite dar pasos firmes hacia adelante y sostener nuestro propio peso con independencia. Cuando duelen las caderas o se desgasta la articulación (como en la artrosis), el cuerpo somatiza un sentimiento profundo de desvalorización sobre la propia utilidad: la sensación de "ya no puedo hacer lo que hacía antes", "los demás tienen que arrastrarme o ayudarme" o "siento que soy un estorbo para los míos".\n\nPor ejemplo en la vida diaria: personas que se jubilan, que ven que sus hijos ya crecieron y no las necesitan, o que sienten que su ritmo físico ya no es el de la juventud. El miedo a perder la autonomía o a depender de otros frena el paso y tensa la cadera.\n\nEl camino de alivio: tu valor en esta etapa de la vida ya no está en la fuerza bruta ni en la velocidad, sino en toda la sabiduría, calma y experiencia que tenés para dar. Compartir lo que sabés (enseñar, aconsejar con cariño a los más jóvenes, participar en actividades donde tu palabra sea escuchada) te devuelve la certeza de ser muy útil. Caminar a tu propio paso, sin apuro pero con orgullo.',
    emotionalThemes: [
      'Sentimiento de utilidad y propósito',
      'Miedo a ser una carga o depender de otros',
      'Transmisión de sabiduría y experiencia',
      'Avanzar a propio ritmo'
    ],
    reflectionQuestions: [
      '¿Sentís que en esta etapa de tu vida perdiste tu lugar de utilidad o que te cuesta aceptar que tu cuerpo pide otro ritmo?',
      '¿Qué conocimientos, historias o habilidades valiosas tenés que podrías compartir con tus hijos, nietos o personas cercanas?',
      '¿Cómo podés recordarle a tu cuerpo que tu presencia y experiencia siguen siendo un regalo para los que te rodean?'
    ],
    relatedProtocolIds: ['pnl-reencuadre', 'anclaje-recursos', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Módulo Articulaciones: Caderas, pelvis y el tránsito del esfuerzo físico a la sabiduría',
        relevantExcerpt: 'La articulación de la cadera y el conflicto de desvalorización respecto al avance y la utilidad personal.'
      }
    ]
  },

  // 3. Cabeza / Migrañas / Jaquecas
  {
    aliases: ['migraña', 'migrana', 'dolor de cabeza', 'jaqueca', 'cefalea'],
    title: 'Dolor de Cabeza y Migrañas (Sobreanálisis)',
    summary:
      'La cabeza duele cuando le damos vueltas sin parar a los problemas, con la autoexigencia de resolverlo todo a la perfección por miedo a equivocarnos.',
    interpretation:
      'El dolor de cabeza o la migraña aparecen cuando queremos controlar todo desde la mente racional. En biodecodificación, es el choque entre una autoexigencia implacable (sentir que tenés que ser perfecto/a y no fallar jamás) y el miedo a que las cosas salgan mal si no las supervisás en persona.\n\nPor ejemplo en la vida diaria: quedarte en la cama pensando y repasando conversaciones, preocupándote por cosas que todavía no pasaron o sintiendo una enorme frustración cada vez que alguien no hace las cosas como vos querías. El cerebro se satura de presión porque querés solucionar con pensamientos dilemas que en realidad requieren poner límites o soltar el control.\n\nEl camino de alivio: date permiso para decirte "hoy ya pensé bastante, no todo se resuelve forzando la mente". Aceptar equivocarse afloja la presión en la cabeza.',
    emotionalThemes: [
      'Autoexigencia y perfeccionismo',
      'Miedo a perder el control',
      'Rumiación y sobrepensamiento',
      'Permiso para descansar la mente'
    ],
    reflectionQuestions: [
      '¿A qué problema le estás dando mil vueltas en la cabeza sin encontrarle salida?',
      '¿Te cuesta aceptar que no podés controlar cómo actúan las demás personas?',
      '¿Qué pasaría si por hoy soltaras la necesidad de que todo salga perfecto?'
    ],
    relatedProtocolIds: ['pnl-reencuadre', 'relajacion-478', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Cabeza: Tensión mental y control exhaustivo',
        relevantExcerpt: 'La cefalea tensional como reflejo de la hiperactividad analítica y el miedo al error.'
      }
    ]
  },

  // 4. Garganta / Cuello / Afonía
  {
    aliases: [
      'garganta',
      'dolor de garganta',
      'afonia',
      'disfonia',
      'faringitis',
      'nudo en la garganta',
      'anginas'
    ],
    title: 'Garganta y Cuello (Palabras Tragadas y Límites)',
    summary:
      'En la garganta se quedan atascadas las palabras que no nos animamos a decir por miedo a pelear, a que nos rechacen o a "armar lío".',
    interpretation:
      'La garganta es el puente entre lo que sentimos en el corazón y lo que expresamos al mundo. En biodecodificación se habla del "bocado de palabra": aquello que necesitabas decir con urgencia pero te lo tragaste a la fuerza.\n\nPor ejemplo en la vida diaria: estar en un almuerzo familiar o en el trabajo, escuchar algo injusto o hiriente, morderte la lengua y callarte "para mantener la paz", quedándote después horas o días con la bronca atragantada y la sensación de un nudo caliente en el cuello.\n\nEl camino de alivio: tu voz es valiosa y tenés todo el derecho a decir lo que sentís. Poner un límite con respeto y serenidad no es pelear, es cuidarte a vos mismo/a. Decir un "no" a tiempo alivia inmediatamente la garganta.',
    emotionalThemes: [
      'Miedo a decir lo que se siente',
      'Callarse para no generar conflicto',
      'Bronca o impotencia atragantada',
      'Poner límites con serenidad'
    ],
    reflectionQuestions: [
      '¿Qué conversación o verdad importante te estás callando por miedo a la reacción de la otra persona?',
      '¿A qué situación le estás diciendo que sí cuando por dentro sentís un no rotundo?',
      '¿Cómo podrías expresar lo que te molesta de forma tranquila pero firme?'
    ],
    relatedProtocolIds: ['asertividad-limites', 'pnl-reencuadre', 'relajacion-478'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Garganta: Expresión, asertividad y conflicto de sumisión verbal',
        relevantExcerpt: 'El nudo de garganta y la inflamación laríngea por retención de la propia verdad.'
      }
    ]
  },

  // 5. Hombros / Trapecios / Espalda Alta
  {
    aliases: [
      'hombros',
      'dolor de hombros',
      'contractura',
      'contracturas',
      'trapecio',
      'espalda alta',
      'omoplato'
    ],
    title: 'Hombros y Espalda Alta (Mochilas y Cargas Ajenas)',
    summary:
      'Los hombros cargan el peso de la vida. Duelen cuando asumís responsabilidades de otros y sentís que si no estás vos, todo se viene abajo.',
    interpretation:
      'Los hombros están diseñados para levantar pesos propios, no para cargar la vida entera de los demás. En biodecodificación, las contracturas y dolores en hombros y trapecios representan la sensación de estar llevando una mochila pesadísima sobre la espalda, con la creencia de que "nadie me ayuda" y "todo depende de mí".\n\nPor ejemplo en la vida diaria: hacerte cargo de resolverle los problemas económicos o afectivos a hijos adultos, hermanos o parejas; asumir tareas ajenas por miedo a que el otro falle o sufra; y después sentirte agotado/a y con bronca porque sentís que nadie valora tu esfuerzo.\n\nEl camino de alivio: devolver la mochila ajena con amor. Cada persona adulta necesita tropezar y aprender de sus propios desafíos. Cuando soltás lo que no te corresponde, los hombros vuelven a sentirse livianos.',
    emotionalThemes: [
      'Cargar con problemas de otros',
      'Dificultad para delegar o pedir ayuda',
      'Sensación de estar solo/a con la carga',
      'Aprender a soltar responsabilidades ajenas'
    ],
    reflectionQuestions: [
      '¿De qué persona cercana te estás haciendo cargo más de lo que te corresponde?',
      '¿Qué creés que pasaría si dejaras que los demás resuelvan sus propios asuntos?',
      '¿Cómo podés empezar hoy a quitarte un peso de encima y pedir colaboración?'
    ],
    relatedProtocolIds: ['pnl-reencuadre', 'mindfulness-somatico', 'pnl-posiciones'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Columna Alta y Cintura Escapular: Cargas familiares y rol de sostén',
        relevantExcerpt: 'Sobrecarga del trapecio como manifestación del salvador familiar que no delega.'
      }
    ]
  },

  // 6. Pecho / Corazón / Pulmones / Angustia
  {
    aliases: [
      'pecho',
      'opresion en el pecho',
      'angustia',
      'falta de aire',
      'pulmones',
      'bronquios',
      'tristeza en el pecho'
    ],
    title: 'Pecho, Pulmones y Angustia (Espacio Propio y Penas Guardadas)',
    summary:
      'El pecho se aprieta cuando sentimos que no tenemos espacio propio para respirar en paz, o cuando guardamos una pena honda sin permitirnos llorar.',
    interpretation:
      'Respirar hondo es el primer acto de autonomía al nacer. En biodecodificación, la opresión en el pecho y la sensación de falta de aire se relacionan con dos vivencias: sentir que en tu propia casa o trabajo te invaden y "no te dejan respirar", o estar cargando una tristeza vieja (un duelo, una pérdida o una decepción grande) que te guardaste adentro porque "tenías que ser fuerte para los demás".\n\nPor ejemplo en la vida diaria: vivir en un ambiente donde sentís que no tenés intimidad, donde opinan constantemente sobre tu vida; o no haberte permitido llorar a un ser querido o una etapa que terminó porque sentías que tenías que sostener a la familia.\n\nEl camino de alivio: tenés derecho a habitar tu espacio y respirar libremente. Llorar lo pendiente no es debilidad, es el desahogo natural que tu pecho necesita para aflojarse.',
    emotionalThemes: [
      'Necesidad de espacio personal',
      'Pena o duelo no expresado',
      'Sensación de ahogo o asfixia en el entorno',
      'Permiso para desahogarse'
    ],
    reflectionQuestions: [
      '¿Sentís que en tu casa o entorno cotidiano tenés un rincón de verdadera paz para vos solo/a?',
      '¿Hay alguna tristeza o pérdida vieja que no te diste permiso de llorar por hacerte el fuerte?',
      '¿Qué actividad simple y tranquila te ayudaría hoy a respirar hondo y con alivio?'
    ],
    relatedProtocolIds: ['relajacion-478', 'visualizacion-santuario', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Caja Torácica y Pulmones: Territorio, pérdida de espacio y tristeza profunda',
        relevantExcerpt: 'La respiración contenida y la opresión esternal como memoria de ahogo emocional.'
      }
    ]
  },

  // 7. Estómago / Gastritis / Acidez / Reflujo
  {
    aliases: [
      'estomago',
      'acidez',
      'gastritis',
      'reflujo',
      'ardor de estomago',
      'dolor de estomago',
      'pesadez estomacal',
      'digestion'
    ],
    title: 'Estómago, Acidez y Gastritis (Bocados Indigestos)',
    summary:
      'El estómago somatiza lo que nos resulta "incomible": una situación injusta, una mentira o una traición que no podemos digerir ni aceptar.',
    interpretation:
      'El estómago produce ácido para deshacer los alimentos duros. Cuando vivimos una situación que nos indigna, el cuerpo reacciona de la misma manera: segrega ácido para intentar "deshacer y digerir" un bocado emocional que consideramos inaceptable.\n\nPor ejemplo en la vida diaria: una mentira de alguien en quien confiabas, una discusión de dinero o una herencia injusta, o enterarte de algo que te dio tanta bronca que sentiste literalmente una piedra en la boca del estómago. Seguir masticando mentalmente ese rencor meses después hace que el estómago siga quemando por dentro.\n\nEl camino de alivio: la realidad ya ocurrió y no va a cambiar porque te amargues la panza. Dejar de masticar el veneno ajeno no es justificar al otro, es proteger tu propia salud.',
    emotionalThemes: [
      'Situación que no se puede tragar ni aceptar',
      'Bronca e indignación contenida',
      'Rumiar hechos del pasado',
      'Soltar el resentimiento'
    ],
    reflectionQuestions: [
      '¿Qué noticia, actitud o conversación reciente te cayó tan mal que sentís que "no la podés tragar"?',
      '¿Qué ganás repitiendo mentalmente esa situación una y otra vez?',
      '¿Cómo podés empezar hoy a poner distancia de personas o temas que te revuelven el estómago?'
    ],
    relatedProtocolIds: ['pnl-reencuadre', 'anclaje-recursos', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Sistema Digestivo Alto: El bocado indigesto y la secreción ácida reactiva',
        relevantExcerpt: 'La gastritis y el reflujo como manifestación de ira e impotencia no digerida.'
      }
    ]
  },

  // 8. Intestinos / Colon Irritable / Estreñimiento
  {
    aliases: [
      'colon irritable',
      'intestino',
      'intestinos',
      'estrenimiento',
      'constipacion',
      'diarrea',
      'hinchazon abdominal',
      'gases'
    ],
    title: 'Intestinos y Colon (Miedos Viscerales y Soltar)',
    summary:
      'Los intestinos asimilan lo bueno y eliminan los desechos. Se alteran cuando tenemos miedo a que nos falte algo o cuando retenemos broncas viejas.',
    interpretation:
      'La función biológica de los intestinos es soltar lo que ya cumplió su ciclo. En biodecodificación, el colon irritable o el estreñimiento reflejan el miedo a soltar: querer retener por temor a la carencia (miedo a que falte dinero, cariño o seguridad), o la dificultad para evacuar "porquerías" que nos hicieron en el pasado.\n\nPor ejemplo en la vida diaria: guardar rencores de hace años sin poder perdonar, o vivir con una preocupación visceral sobre si va a alcanzar la plata, guardando todo y controlando cada centavo con angustia.\n\nEl camino de alivio: confiar en que el cuerpo y la vida renuevan lo que necesitás. Soltar lo que ya no sirve abre espacio para que lleguen cosas mejores y más tranquilas.',
    emotionalThemes: [
      'Miedo a la escasez o la falta',
      'Dificultad para soltar el pasado',
      'Retener emociones o rencores',
      'Confianza en los procesos de la vida'
    ],
    reflectionQuestions: [
      '¿A qué situación o rencor viejo te estás aferrando con tanta fuerza?',
      '¿Tenés miedo a quedarte sin sustento o sentís que tenés que controlarlo todo?',
      '¿Qué necesitarías soltar hoy para sentirte más liviano/a por dentro?'
    ],
    relatedProtocolIds: ['relajacion-478', 'mindfulness-somatico', 'pnl-reencuadre'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Intestinos: Retención, miedo a la escasez y evacuación de conflictos',
        relevantExcerpt: 'El colon espástico como respuesta de alarma ante situaciones consideradas sucias o deshonestas.'
      }
    ]
  },

  // 9. Cintura / Lumbar / Ciática
  {
    aliases: [
      'dolor lumbar',
      'lumbalgia',
      'cintura',
      'dolor de cintura',
      'ciatica',
      'lumbago',
      'espalda baja'
    ],
    title: 'Cintura y Zona Lumbar (Sostén Económico y Apoyo)',
    summary:
      'La zona lumbar sostiene todo el peso del torso. Duele cuando tenemos miedo a no llegar a fin de mes o cuando sentimos que nadie nos apoya.',
    interpretation:
      'Las vértebras lumbares son los cimientos del edificio corporal. En biodecodificación, la cintura y el dolor ciático se vinculan directamente con el miedo a la inestabilidad material: no tener suficiente para vivir, temor a que falte el trabajo o la vivienda, o sentir que si vos te caés, nadie te va a atajar porque estás remando en absoluta soledad.\n\nPor ejemplo en la vida diaria: acostarte pensando en las cuentas pendientes, sentir que tu pareja o tu familia no colaboran con el esfuerzo del hogar, o sentirte totalmente desamparado/a frente a un cambio económico o laboral.\n\nEl camino de alivio: pedir ayuda concreta y dejar de aislarte en la queja solitaria. Tu tranquilidad nace de estar presente hoy y saber que siempre encontraste la forma de salir adelante.',
    emotionalThemes: [
      'Miedo a la inestabilidad material y económica',
      'Sensación de falta de apoyo o respaldo',
      'Sentirse solo/a remando contra la corriente',
      'Aprender a confiar y recibir ayuda'
    ],
    reflectionQuestions: [
      '¿Qué preocupación sobre dinero o seguridad material te está quitando el sueño en este momento?',
      '¿Sentís que tu entorno te respalda o sentís que todo el peso del hogar cae sobre vos?',
      '¿A quién podrías pedirle una mano concreta para aliviar la carga económica o práctica?'
    ],
    relatedProtocolIds: ['anclaje-recursos', 'pnl-reencuadre', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Columna Lumbar: Raíces materiales, supervivencia y apoyo afectivo',
        relevantExcerpt: 'Lumbago y ciatalgia como somatización de desvalorización financiera o falta de respaldo.'
      }
    ]
  },

  // 10. Rodillas / Meniscos
  {
    aliases: [
      'dolor de rodilla',
      'rodillas',
      'rodilla',
      'meniscos',
      'artrosis de rodilla',
      'rotula'
    ],
    title: 'Rodillas (Flexibilidad, Orgullo y el Arte de Ceder)',
    summary:
      'Las rodillas son las articulaciones que nos permiten agacharnos. Duelen cuando nos negamos a dar el brazo a torcer o cuando sentimos que nos obligan a doblegarnos.',
    interpretation:
      'La rodilla es el símbolo de la humildad y la adaptación. En biodecodificación, el dolor o inflamación en las rodillas aparece cuando chocamos contra una situación o persona y nos negamos en redondo a ceder: preferimos rompernos antes que dar el brazo a torcer.\n\nPor ejemplo en la vida diaria: discutir fuertemente con la pareja, con hijos o con jefes, sintiendo que si aflojás tu postura "perdés tu dignidad"; o haber tenido que aceptar una orden que considerás injusta y sentirte profundamente humillado/a por haber tenido que agachar la cabeza.\n\nEl camino de alivio: la verdadera fuerza no es la rigidez, sino la flexibilidad. El junco que se dobla con el viento sobrevive a la tormenta; el árbol duro y rígido se quiebra. Ceder por paz mental no es perder, es sabiduría que afloja tus rodillas.',
    emotionalThemes: [
      'Orgullo herido y resistencia a ceder',
      'Conflicto con la autoridad o imposiciones',
      'Miedo a la humillación',
      'Flexibilidad y paz interior'
    ],
    reflectionQuestions: [
      '¿Frente a quién o qué situación sentís que no querés dar el brazo a torcer por orgullo?',
      '¿Vale más tener la razón en una discusión o tener paz mental y buena convivencia?',
      '¿Cómo podés ser más flexible con vos mismo/a y con los errores de los demás?'
    ],
    relatedProtocolIds: ['pnl-reencuadre', 'pnl-posiciones', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Miembros Inferiores: Rodillas, flexibilidad y resolución pacífica del ego',
        relevantExcerpt: 'La articulación de la rodilla como receptora de la tozudez y el conflicto de sumisión forzada.'
      }
    ]
  },

  // 11. Pies / Tobillos / Fascitis
  {
    aliases: [
      'pies',
      'pie',
      'dolor de pies',
      'fascitis plantar',
      'espolon',
      'espolon calcaneo',
      'tobillo',
      'tobillos'
    ],
    title: 'Pies y Tobillos (Pisar Firme y Sentido del Rumbo)',
    summary:
      'Los pies nos conectan con la tierra. Duelen cuando sentimos que la vida cotidiana es un camino pesado o cuando tenemos miedo a no saber hacia dónde vamos.',
    interpretation:
      'Los pies son nuestro contacto directo con el suelo, con la realidad y con nuestras raíces. En biodecodificación, el dolor de pies o la fascitis plantar representan la vivencia de que "caminar en el día a día se volvió una marcha pesada y sin disfrute".\n\nPor ejemplo en la vida diaria: levantarte a la mañana sintiendo que la rutina es una carga agotadora, no tener claro hacia dónde querés dirigir tu vida o sentir miedo ante un cambio de rumbo; también se asocia a conflictos no resueltos con la figura materna (que simbólicamente representa la Tierra y el sostén).\n\nEl camino de alivio: dar un solo paso a la vez. No intentes resolver el año entero hoy. Pisar descalzo en el pasto, sentir el contacto con el suelo y agradecer cada pequeño avance devuelve el disfrute a la pisada.',
    emotionalThemes: [
      'Sensación de camino pesado o agotador',
      'Miedo al rumbo que está tomando la vida',
      'Enraizamiento y contacto con el presente',
      'Avanzar paso a paso'
    ],
    reflectionQuestions: [
      '¿Sentís que tus días se volvieron una obligación pesada sin momentos de alegría?',
      '¿Hacia dónde sentís que querés dar el próximo paso en tu vida?',
      '¿Cómo podés bajar el ritmo hoy y regalarte un momento de descanso para tus pies?'
    ],
    relatedProtocolIds: ['mindfulness-somatico', 'anclaje-recursos', 'relajacion-478'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Pies: Enraizamiento, pisada firme y relación con las raíces primordiales',
        relevantExcerpt: 'Fascitis plantar y dolor calcáneo como señal de agotamiento en el camino elegido.'
      }
    ]
  },

  // 12. Dientes / Bruxismo / Mandíbula
  {
    aliases: [
      'bruxismo',
      'apretar los dientes',
      'mandibula',
      'dientes',
      'dolor de muela',
      'encias'
    ],
    title: 'Bruxismo y Mandíbula (Bronca Masticada y Querer Morder)',
    summary:
      'Apretamos los dientes cuando tenemos una rabia contenida que no podemos morder ni soltar: aguantarse la impotencia sin poder defenderse.',
    interpretation:
      'En el reino animal, los dientes sirven para morder, atrapar la presa o defenderse ante una amenaza. En biodecodificación, el bruxismo (apretar o rechinar los dientes de noche) ocurre cuando durante el día acumulaste mucha rabia o ganas de "morder" (responder con furia a alguien) pero no te lo permitiste por miedo a las consecuencias.\n\nPor ejemplo en la vida diaria: soportar a un jefe maltratador, a un familiar invasivo o a alguien que te faltó el respeto, sin poder ponerle un freno en el momento. Toda esa tensión reprimida se descarga mientras dormís, tensando la mandíbula.\n\nEl camino de alivio: buscar formas saludables de descargar la rabia acumulada (hacer ejercicio físico, escribir todo lo que sentís en un papel sin filtro y romperlo, o practicar poner límites con firmeza antes de llegar al límite).',
    emotionalThemes: [
      'Rabia e impotencia contenida',
      'Ganas de morder o atacar no expresadas',
      'Tensión acumulada en la mandíbula',
      'Descarga saludable de la frustración'
    ],
    reflectionQuestions: [
      '¿Frente a quién o qué situación sentiste ganas de "morder" o gritar y tuviste que aguantártelo?',
      '¿A quién necesitás ponerle un límite firme para dejar de acumular bronca en silencio?',
      '¿Qué actividad física o descarga te ayudaría a aflojar la mandíbula antes de acostarte?'
    ],
    relatedProtocolIds: ['relajacion-478', 'asertividad-limites', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Mandíbula y Dientes: Instinto de defensa, mordida y agresión reprimida',
        relevantExcerpt: 'El bruxismo nocturno como canalización inconsciente de la impotencia diurna.'
      }
    ]
  },

  // 13. Piel / Eczema / Alergias / Dermatitis
  {
    aliases: [
      'piel',
      'alergia en la piel',
      'dermatitis',
      'eczema',
      'erupcion',
      'picazon',
      'psoriasis',
      'rosacea',
      'urticaria'
    ],
    title: 'Alergias en la Piel y Eczema (Contacto y Separación)',
    summary:
      'La piel es el órgano del contacto con los demás. Se brota o pica cuando extrañamos a alguien que se alejó, o cuando sufrimos un contacto que sentimos molesto o invasivo.',
    interpretation:
      'La piel nos separa del mundo y a la vez nos permite sentir las caricias. En biodecodificación, los problemas de piel (eccema, brotes, dermatitis) se denominan "conflictos de separación": haber perdido repentinamente el contacto con un ser querido que se fue, o al revés, tener que soportar la cercanía de alguien que sentimos invasivo y tóxico.\n\nPor ejemplo en la vida diaria: una separación de pareja, un hijo que se muda lejos, la pérdida de una mascota querida, o convivir con alguien con quien no te sentís a gusto. La piel reacciona picando o inflamándose como si buscara reconectar o repeler ese contacto.\n\nEl camino de alivio: aprender a sentirte seguro/a y contenido/a en tu propio cuerpo. Reconocer que los vínculos cambian pero tu valor y tu paz interior están con vos.',
    emotionalThemes: [
      'Conflicto de separación o pérdida de contacto',
      'Sensación de invasión o rechazo',
      'Necesidad de cariño y protección',
      'Límites entre vos y los demás'
    ],
    reflectionQuestions: [
      '¿Perdiste recientemente el contacto o la cercanía con alguien muy querido?',
      '¿Hay alguien en tu entorno cercano cuya presencia o comentarios te resultan irritantes o invasivos?',
      '¿Cómo podés brindarte hoy a vos mismo/a el cuidado y la tranquilidad que tu piel te está pidiendo?'
    ],
    relatedProtocolIds: ['anclaje-recursos', 'mindfulness-somatico', 'pnl-reencuadre'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Piel: Epidermis, contacto afectivo y memorias de separación',
        relevantExcerpt: 'El eczema y la dermatitis atópica como expresión del anhelo o el rechazo del contacto.'
      }
    ]
  },

  // 14. Ojos / Vista / Miopía / Astigmatismo
  {
    aliases: [
      'ojos',
      'vista',
      'miopia',
      'astigmatismo',
      'cansancio de vista',
      'cataratas',
      'conjuntivitis',
      'dolor de ojos'
    ],
    title: 'Ojos y Vista (Lo que no queremos ver o miedo al futuro)',
    summary:
      'Los ojos nos permiten mirar la realidad. Se cansan o fallan cuando presenciamos situaciones dolorosas que no queremos ver, o cuando tememos al porvenir.',
    interpretation:
      'En biodecodificación, los problemas visuales se relacionan con lo que entra por los ojos: cosas que nos duelen ver o cosas que tememos perder de vista. La miopía, por ejemplo, suele asociarse al miedo al futuro lejano (querer ver solo lo que está cerca para sentirse seguro); la presbicia o cataratas, al deseo de no ver el deterioro o las dificultades del entorno.\n\nPor ejemplo en la vida diaria: peleas familiares continuas en la mesa, ver envejecer con sufrimiento a un familiar o no querer ver que una relación ya no funciona.\n\nEl camino de alivio: mirar tu vida presente con ternura y aceptar que las cosas cambian. Dejar de forzar la vista para controlar lo que vendrá.',
    emotionalThemes: [
      'Lo que duele mirar',
      'Miedo al futuro o a lo desconocido',
      'Querer cerrar los ojos ante un conflicto',
      'Aceptación serena de la realidad'
    ],
    reflectionQuestions: [
      '¿Hay alguna situación en tu casa o entorno que te cueste mucho mirar o aceptar?',
      '¿Sentís miedo o incertidumbre sobre lo que pueda pasar en el futuro?',
      '¿Cómo podés mirar hoy tu vida con ojos más amables y menos exigentes?'
    ],
    relatedProtocolIds: ['mindfulness-somatico', 'pnl-reencuadre', 'relajacion-478'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Ojos: Percepción visual, horizonte de vida y temor a la mirada',
        relevantExcerpt: 'La fatiga ocular como resistencia a contemplar realidades dolorosas.'
      }
    ]
  },

  // 15. Oídos / Zumbidos / Tinnitus
  {
    aliases: [
      'oidos',
      'oido',
      'zumbido',
      'zumbidos',
      'tinnitus',
      'acufenos',
      'dolor de oido',
      'otitis',
      'sordera'
    ],
    title: 'Oídos y Zumbidos (Cosas que Dolió Escuchar)',
    summary:
      'Los oídos captan el sonido del mundo. Se inflaman o zumban cuando escuchamos palabras hirientes que nos dolieron o cuando no queremos oír más quejas ni reproches.',
    interpretation:
      'El sentido biológico del oído es alertarnos y comunicarnos. En biodecodificación, el zumbido de oídos (tinnitus) o las molestias auditivas se vinculan a palabras que nos calaron hondo: insultos, gritos, reproches o noticias tristes que nos dejaron un "silbido" en la cabeza. O también, la saturación de vivir en un ambiente de quejas constantes donde la mente busca desconectarse del ruido exterior.\n\nPor ejemplo en la vida diaria: una discusión donde te dijeron cosas muy dolorosas que te siguen resonando en la cabeza, o sentirte aturdido/a por las quejas continuas de personas tóxicas.\n\nEl camino de alivio: filtrar lo que escuchás. Las palabras ajenas hablan de quien las dice, no de vos. Regalate momentos de silencio y protegé tu paz auditiva.',
    emotionalThemes: [
      'Palabras hirientes que quedaron resonando',
      'Saturación de quejas o reproches',
      'Necesidad de silencio y tranquilidad',
      'Desconectar del ruido ajeno'
    ],
    reflectionQuestions: [
      '¿Qué comentario o frase hiriente te dijeron recientemente que no podés sacarte de la cabeza?',
      '¿Te sentís aturdido/a por las quejas o la negatividad de personas cercanas?',
      '¿Cómo podés regalarte hoy 15 minutos de silencio absoluto y calma interior?'
    ],
    relatedProtocolIds: ['relajacion-478', 'visualizacion-santuario', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Oídos: Audición, palabras hirientes y saturación acústica',
        relevantExcerpt: 'El acúfeno como zumbido de alerta ante agresiones verbales no digeridas.'
      }
    ]
  },

  // 16. Tiroides / Apremio del tiempo
  {
    aliases: [
      'tiroides',
      'hipotiroidismo',
      'hipertiroidismo',
      'nodulos en la tiroides',
      'apurado',
      'tiempo'
    ],
    title: 'Tiroides (La Pelea con el Tiempo y la Urgencia)',
    summary:
      'La tiroides es el reloj metabólico del cuerpo. Se desequilibra cuando sentimos que el tiempo no alcanza, que tenemos que apurarnos para todo o que llegamos tarde a la vida.',
    interpretation:
      'La tiroides regula la velocidad a la que funciona el organismo. En biodecodificación, representa nuestra relación con el tiempo. El hipertiroidismo surge de la urgencia desesperada por ir más rápido ("tengo que llegar ya, se me escapa el tiempo"); el hipotiroidismo, del deseo inconsciente de frenar el reloj porque el ritmo actual nos sobrepasa y no damos más.\n\nPor ejemplo en la vida diaria: vivir corriendo todo el día sintiendo que nunca llegás a cumplir con todo, o postergar tus deseos por sentir que "ya se te pasó el tren" o que es tarde para vos.\n\nEl camino de alivio: recuperar tu propio ritmo natural. La vida no es una carrera contra el reloj. Hacé una cosa a la vez y disfrutá cada minuto sin correr.',
    emotionalThemes: [
      'Sensación de apuro o urgencia constante',
      'Sentir que el tiempo no alcanza',
      'Miedo a llegar tarde a los objetivos',
      'Paciencia y ritmo propio'
    ],
    reflectionQuestions: [
      '¿Vivís con la sensación constante de que tenés que apurarte para todo?',
      '¿Sentís que se te pasó el tiempo para concretar algo que deseabas mucho?',
      '¿Qué pasaría si hoy decidieras hacer las cosas a tu propio ritmo, sin mirar el reloj?'
    ],
    relatedProtocolIds: ['mindfulness-somatico', 'relajacion-478', 'pnl-reencuadre'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Sistema Endocrino: Tiroides, reloj biológico y gestión de la prisa',
        relevantExcerpt: 'La alteración tiroidea como desfasaje entre el tiempo biológico y la exigencia externa.'
      }
    ]
  }
];

/**
 * Intelligent Semantic Fallback Resolver.
 * When a query isn't matched verbatim, it scans for anatomical and somatic keywords
 * and generates a simple, grounded, empathetic explanation — NO BUREAUCRATIC BOILERPLATE!
 */
function generateGroundedFallback(cleanQuery: string): {
  title: string;
  summary: string;
  interpretation: string;
  emotionalThemes: string[];
  reflectionQuestions: string[];
} {
  const q = cleanQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 1. Skin / Face / Melasma detection
  if (
    q.includes('mancha') ||
    q.includes('pigment') ||
    q.includes('rostro') ||
    q.includes('cara') ||
    q.includes('melasma') ||
    q.includes('cutane')
  ) {
    return {
      title: `Manchas y Sensibilidad en el Rostro ("${cleanQuery}")`,
      summary:
        'La cara es nuestra carta de presentación. En biodecodificación, las manchas o marcas suelen aparecer como un escudo para proteger nuestra dignidad o cuando sentimos que nuestra imagen fue criticada o ensuciada.',
      interpretation:
        'La piel de la cara es con lo que "damos la cara" ante el mundo. Cuando aparecen manchas, oscurecimientos o alteraciones en el rostro, el cuerpo reacciona como si necesitara poner una pantalla protectora frente a miradas o comentarios que sintió agresivos.\n\nPor ejemplo: haber pasado por una situación de vergüenza, comentarios malintencionados en la familia o en el trabajo donde sentiste que hablaron mal de vos a tus espaldas, o la presión de tener que mostrarte siempre perfecto/a para no ser criticado/a.\n\nPara aliviar esta carga: tu valor personal no depende de lo que otros opinen ni de los errores del pasado. Mirarte al espejo con ternura y dejar de necesitar la aprobación ajena le avisa a tu piel que ya no tiene que defenderse.',
      emotionalThemes: [
        'Proteger la propia imagen',
        'Miedo a la crítica ajena',
        'Sentirse juzgado/a o avergonzado/a',
        'Aceptación y perdón personal'
      ],
      reflectionQuestions: [
        '¿Viviste alguna situación donde sentiste que hablaron mal de vos o que te juzgaron con dureza?',
        '¿Te preocupa mucho lo que la gente piense o diga sobre tu persona?',
        '¿Cómo podés empezar hoy a mirarte con más cariño y dejar de exigirte tanto?'
      ]
    };
  }

  // 2. Joints / Bones / Arthritis
  if (
    q.includes('hueso') ||
    q.includes('articulacion') ||
    q.includes('artritis') ||
    q.includes('artrosis') ||
    q.includes('reuma') ||
    q.includes('reuma')
  ) {
    return {
      title: `Articulaciones y Movimiento ("${cleanQuery}")`,
      summary:
        'Las articulaciones permiten el movimiento y la flexibilidad. Duelen cuando nos exigimos de más o nos sentimos poco valorados en lo que hacemos.',
      interpretation:
        'Los huesos y las articulaciones forman la estructura que nos sostiene. En biodecodificación, el dolor o desgaste articular se asocia a la desvalorización: sentir que ya no rendís como antes, ser demasiado duro/a con vos mismo/a o mantenerte en posturas inflexibles por orgullo.\n\nPor ejemplo: sentir que en tu familia o trabajo tu esfuerzo no es reconocido, o reprocharte no haber podido hacer más. Cuando nos juzgamos con dureza, las articulaciones se vuelven rígidas.\n\nPara aliviarlo: flexibilizate con tus propios tiempos. Valorá todo el camino recorrido y date permiso para descansar sin sentirte culpable.',
      emotionalThemes: [
        'Desvalorización y autoexigencia',
        'Rigidez frente a los cambios',
        'Necesidad de reconocimiento',
        'Flexibilidad y descanso'
      ],
      reflectionQuestions: [
        '¿En qué situación sentís que te estás exigiendo mucho más de lo que tu cuerpo puede dar?',
        '¿Te cuesta reconocer y felicitarte por lo que hacés cada día?',
        '¿Cómo podés regalarle hoy a tu cuerpo un trato más suave y paciente?'
      ]
    };
  }

  // 3. Digestion / Liver / Abdomen
  if (
    q.includes('higado') ||
    q.includes('panza') ||
    q.includes('vesicula') ||
    q.includes('vientre') ||
    q.includes('gastro')
  ) {
    return {
      title: `Digestión y Emociones ("${cleanQuery}")`,
      summary:
        'El sistema digestivo asimila la comida igual que procesa las vivencias. Molesta cuando vivimos situaciones que nos resultan difíciles de tragar o de aceptar.',
      interpretation:
        'El cuerpo digiere tanto los alimentos como los hechos de la vida. Cuando sentís malestar en esta zona, suele relacionarse con situaciones que te indignan o te dan bronca y que no pudiste expresar en el momento.\n\nPor ejemplo: discusiones donde sentiste que te pasaron por encima, desacuerdos económicos o mentiras de personas cercanas que te quedaron atragantadas como una molestia que no se va.\n\nPara aliviarlo: la situación ya ocurrió. Seguir masticando la bronca solo te lastima a vos. Aceptá lo que fue, poné los límites necesarios y cuidá tu tranquilidad.',
      emotionalThemes: [
        'Situaciones difíciles de digerir',
        'Bronca o resentimiento guardado',
        'Necesidad de depurar lo tóxico',
        'Poner límites sanos'
      ],
      reflectionQuestions: [
        '¿Qué hecho o conversación reciente sentís que te cayó mal y no podés soltar?',
        '¿A qué persona o situación le estás dedicando demasiada energía de enojo?',
        '¿Qué cambio simple podés hacer hoy para cuidar tu paz mental?'
      ]
    };
  }

  // 4. General Grounded Empathic Fallback (NO BOILERPLATE)
  return {
    title: cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1),
    summary: `Tu cuerpo te está enviando una señal para que revises qué situación reciente te generó tensión, cansancio o angustia.`,
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
    ]
  };
}

/**
 * MockKnowledgeProvider: Primary local knowledge provider conforming to KnowledgeProvider.
 * Provides curated biodecoding and NLP inquiry data, fuzzy matching, and medical risk screening.
 */
export class MockKnowledgeProvider implements KnowledgeProvider {
  async search(query: string): Promise<KnowledgeResult> {
    // Artificial brief organic breathing pause for UX feel (280ms)
    await new Promise((resolve) => setTimeout(resolve, 280));

    const cleanQuery = query.trim();
    if (!cleanQuery) {
      throw new Error('Por favor introducí un término de búsqueda válido.');
    }

    // Safety and risk evaluation
    const risk = evaluateMedicalRisk(cleanQuery);
    const normalized = cleanQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Search in mock knowledge base
    const match = MOCK_KNOWLEDGE_BASE.find((item) => {
      const normTitle = item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return (
        normTitle.includes(normalized) ||
        normalized.includes(normTitle) ||
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

    // Dynamic grounded fallback (NO BUREAUCRACY)
    const fallback = generateGroundedFallback(cleanQuery);
    const fallbackProtocols = PROTOCOLS_CATALOG.slice(0, 3);

    return {
      query: cleanQuery,
      title: fallback.title,
      summary: fallback.summary,
      interpretation: fallback.interpretation,
      emotionalThemes: fallback.emotionalThemes,
      reflectionQuestions: fallback.reflectionQuestions,
      relatedProtocols: fallbackProtocols,
      sources: [
        {
          name: 'Diccionario de Biodecodificación Práctica',
          reference: 'Compendio de Somatización y Autoconocimiento',
          relevantExcerpt:
            'Lectura biológica y orientativa sobre las señales corporales y la gestión de tensiones cotidianas.'
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
 */
export class GeminiRAGKnowledgeProvider implements KnowledgeProvider {
  private fallbackProvider = new MockKnowledgeProvider();

  async search(query: string): Promise<KnowledgeResult> {
    return this.fallbackProvider.search(query);
  }
}

// Active provider instance
export const activeKnowledgeProvider: KnowledgeProvider = new MockKnowledgeProvider();
