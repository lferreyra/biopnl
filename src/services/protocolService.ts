import { Protocol } from '../types';

export const PROTOCOLS_CATALOG: Protocol[] = [
  {
    id: 'pnl-reencuadre',
    title: 'Reencuadre de Intención Positiva',
    shortDescription: 'Descubrí el mensaje subyacente y la intención protectora de tus reacciones automáticas.',
    durationMinutes: 12,
    category: 'PNL',
    iconName: 'Sparkles',
    objective: 'Distinguir entre la conducta o tensión involuntaria y su posible propósito de cuidado o preservación personal.',
    preparation: 'Buscá un rincón tranquilo, con papel y lápiz a mano si deseás anotar sensaciones. Asegurate de no tener interrupciones durante 12 minutos.',
    steps: [
      {
        stepNumber: 1,
        title: 'Identificación de la respuesta habitual',
        instruction: 'Traé a tu mente la conducta, patrón de tensión o pensamiento recurrente que suele incomodarte. Observalo sin juzgarte.'
      },
      {
        stepNumber: 2,
        title: 'Establecimiento de comunicación interna',
        instruction: 'Agradecé a esa parte de vos que genera esa señal, reconociendo que busca protegerte o advertirte de algo importante.'
      },
      {
        stepNumber: 3,
        title: 'Búsqueda de la intención positiva',
        instruction: 'Hacete internamente la pregunta: "¿Qué beneficio intenta otorgarme esta respuesta? ¿Qué pretende cuidar en mi vida?". Prestá atención a la primera intuición que surja.'
      },
      {
        stepNumber: 4,
        title: 'Creación de alternativas ecológicas',
        instruction: 'Imaginá dos formas nuevas y más amables de satisfacer esa misma necesidad de cuidado, sin generar el desgaste o malestar anterior.'
      },
      {
        stepNumber: 5,
        title: 'Chequeo de coherencia y puente al futuro',
        instruction: 'Visualizate en una situación similar dentro de las próximas semanas respondiendo desde esta nueva perspectiva.'
      }
    ],
    closure: 'Tomá tres respiraciones profundas, sentí el apoyo de tu cuerpo sobre el asiento y permití que la mente asimile este nuevo entendimiento.',
    reflectionQuestions: [
      '¿Qué aspecto de mi seguridad o bienestar estaba intentando resguardar esta respuesta?',
      '¿De qué manera puedo honrar esa necesidad sin sobrecargar a mi cuerpo de tensión?'
    ]
  },
  {
    id: 'pnl-anclaje',
    title: 'Anclaje de Calma y Seguridad',
    shortDescription: 'Asociá un estado de tranquilidad profunda a un estímulo táctil discreto para acceder a él cuando lo necesites.',
    durationMinutes: 10,
    category: 'PNL',
    iconName: 'Brain',
    objective: 'Crear un recurso neuroasociativo al que puedas acudir en momentos de sobreexigencia o intranquilidad cotidiana.',
    preparation: 'Ubicá una postura cómoda y erguida. Elegí el estímulo físico que usarás como ancla (por ejemplo, presionar suavemente la yema del pulgar contra el índice).',
    steps: [
      {
        stepNumber: 1,
        title: 'Elección de un recuerdo vívido de plenitud',
        instruction: 'Rememorá un instante de tu vida en el que hayas experimentado paz total, serenidad o profunda confianza en vos mismo.'
      },
      {
        stepNumber: 2,
        title: 'Inmersión sensorial completa',
        instruction: 'Volvé a ese lugar a través de tus sentidos: mirá lo que veías en ese momento, escuchá los sonidos ambientales y percibí la temperatura corporal de ese recuerdo.'
      },
      {
        stepNumber: 3,
        title: 'Fijación del ancla en el punto álgido',
        instruction: 'Justo cuando la sensación de paz alcance su mayor intensidad en tu pecho o abdomen, presioná con suavidad la yema del pulgar contra el índice durante 5 segundos.'
      },
      {
        stepNumber: 4,
        title: 'Ruptura de estado y comprobación',
        instruction: 'Abrí los ojos, mirá un objeto a tu alrededor y estirate. Luego, volvé a presionar el ancla y observá cómo tu cuerpo recuerda espontáneamente esa tranquilidad.'
      }
    ],
    closure: 'Agradecé a tu sistema nervioso por su capacidad de almacenar estados restaurativos.',
    reflectionQuestions: [
      '¿En qué momentos de mi jornada habitual me resultaría más útil activar este ancla?',
      '¿Qué detalles sensoriales de paz resuenan con más fuerza en mi memoria corporal?'
    ]
  },
  {
    id: 'relajacion-478',
    title: 'Respiración Consciente 4-7-8',
    shortDescription: 'Regulación del sistema parasimpático para calmar el ritmo cardíaco y desactivar el estado de alarma.',
    durationMinutes: 8,
    category: 'Relajación',
    iconName: 'Wind',
    objective: 'Promover la desaceleración del tono simpático facilitando una rápida relajación muscular y mental.',
    preparation: 'Colocá la punta de la lengua justo contra el tejido detrás de los dientes frontales superiores. Mantenela allí durante todo el ciclo.',
    steps: [
      {
        stepNumber: 1,
        title: 'Exhalación preparatoria',
        instruction: 'Exhalá por completo por la boca emitiendo un sonido suave de alivio, vaciando por completo los pulmones.'
      },
      {
        stepNumber: 2,
        title: 'Inhalación en 4 tiempos',
        instruction: 'Cerrá la boca e inhalá silenciosamente por la nariz contando mentalmente hasta cuatro (1, 2, 3, 4).'
      },
      {
        stepNumber: 3,
        title: 'Retención serena en 7 tiempos',
        instruction: 'Mantené el aire en tus pulmones sin tensar el cuello ni los hombros durante siete segundos (1 al 7).'
      },
      {
        stepNumber: 4,
        title: 'Exhalación prolongada en 8 tiempos',
        instruction: 'Exhalá lenta y constantemente por la boca durante ocho segundos completos (1 al 8).'
      },
      {
        stepNumber: 5,
        title: 'Repetición del ciclo',
        instruction: 'Repetí este ciclo cuatro veces consecutivas manteniendo un ritmo pausado y sin forzar el aire.'
      }
    ],
    closure: 'Dejá que tu respiración recupere su flujo natural espontáneo y notá el peso cálido de tus hombros descendiendo.',
    reflectionQuestions: [
      '¿Qué cambió en la sensación de tensión en mi mandíbula y cuello tras este ejercicio?',
      '¿Cómo percibo ahora el espacio entre mis pensamientos?'
    ]
  },
  {
    id: 'mindfulness-somatico',
    title: 'Escaneo Somático y Liberación de Cargas',
    shortDescription: 'Un recorrido de atención plena por las zonas corporales donde se acumula la tensión cotidiana.',
    durationMinutes: 15,
    category: 'Mindfulness',
    iconName: 'Heart',
    objective: 'Desarrollar una escucha afectuosa del cuerpo sin intentar modificarlo inmediatamente.',
    preparation: 'Recostate sobre una superficie firme o sentate con la espalda apoyada y los pies en contacto plano con el suelo.',
    steps: [
      {
        stepNumber: 1,
        title: 'Enraizamiento inicial',
        instruction: 'Tomá contacto con los puntos de apoyo de tu cuerpo: los talones, las pantorrillas, los glúteos y los omóplatos descansando.'
      },
      {
        stepNumber: 2,
        title: 'Exploración del abdomen y diafragma',
        instruction: 'Llevá una mano al ombligo y notá el movimiento de expansión natural. Si sentís tensión o un nudo, dale la bienvenida sin forzar nada.'
      },
      {
        stepNumber: 3,
        title: 'Hombros, cuello y mandíbula',
        instruction: 'Permití que la lengua caiga suave en el paladar inferior y que los hombros se desprendan de cualquier peso imaginario.'
      },
      {
        stepNumber: 4,
        title: 'Espacio de acogida integral',
        instruction: 'Inhalá como si todo tu cuerpo fuera una sola membrana que respira al unísono, disolviendo los bordes de la rigidez.'
      }
    ],
    closure: 'Realizá pequeños movimientos con los dedos de las manos y pies antes de incorporarte despacio.',
    reflectionQuestions: [
      '¿Qué zona de mi cuerpo albergaba mayor resistencia hoy?',
      '¿Pude observar la sensación física sin convertirla en un relato mental?'
    ]
  },
  {
    id: 'visualizacion-santuario',
    title: 'Visualización del Santuario Interior',
    shortDescription: 'Construcción mental de un espacio íntimo de regeneración, descanso y protección psicológica.',
    durationMinutes: 14,
    category: 'Visualización',
    iconName: 'Sun',
    objective: 'Proporcionar al sistema nervioso un entorno mental percibido como 100% seguro para bajar la guardia.',
    preparation: 'Asegurate de estar en un ambiente con luz tenue y temperatura templada. Podés cerrar los ojos o mantener una mirada suave.',
    steps: [
      {
        stepNumber: 1,
        title: 'Diseño del paisaje protector',
        instruction: 'Imaginá un sendero que desciende suavemente hacia un lugar de naturaleza o arquitectura acogedora: un bosque tibio, un lago sereno o una cabaña con fuego encendido.'
      },
      {
        stepNumber: 2,
        title: 'Llegada y bienvenida',
        instruction: 'Entrá a ese espacio sabiendo que allí nada se te exige, no hay roles que cumplir ni expectativas que sostener.'
      },
      {
        stepNumber: 3,
        title: 'La fuente de luz regeneradora',
        instruction: 'Encontrá en el centro de tu santuario una luz cálida con tonos terracota y ámbar que baña tu piel, reconfortando cada célula.'
      },
      {
        stepNumber: 4,
        title: 'Depósito simbólico de cargas',
        instruction: 'Dejá a un lado de la entrada una caja o cofre donde depositás simbólicamente los asuntos pendientes de tu día.'
      }
    ],
    closure: 'Sabiendo que este lugar permanece intacto dentro tuyo en cualquier momento que elijas volver, comenzá tu regreso tranquilo.',
    reflectionQuestions: [
      '¿Qué elemento de mi santuario me produjo mayor sensación de reposo?',
      '¿Qué carga pude depositar afuera aunque fuera por unos minutos?'
    ]
  },
  {
    id: 'pnl-posiciones',
    title: 'Las Tres Posiciones Perceptivas',
    shortDescription: 'Herramienta de PNL para desenredar desacuerdos y tomar distancia saludable de un conflicto.',
    durationMinutes: 18,
    category: 'PNL',
    iconName: 'Compass',
    objective: 'Explorar un vínculo o situación tensa desde primera, segunda y tercera posición para generar comprensión y flexibilidad.',
    preparation: 'Si tenés espacio físico, podés identificar tres lugares en la habitación para moverte entre ellos: Tu lugar (1ª), El lugar del otro (2ª), El observador sabio (3ª).',
    steps: [
      {
        stepNumber: 1,
        title: '1ª Posición: Tus propios ojos',
        instruction: 'Parate o sentate en tu lugar habitual. Expresá lo que sentís, lo que necesitás y lo que te duele desde tu "yo" con honestidad.'
      },
      {
        stepNumber: 2,
        title: 'Paso intermedio de limpieza',
        instruction: 'Sacudí suavemente los brazos y respirá para soltar esa postura.'
      },
      {
        stepNumber: 3,
        title: '2ª Posición: Ponete en los zapatos de la otra persona',
        instruction: 'Muvete al lugar de la otra persona. Adoptá su tono, su postura física y preguntate: "¿Cómo se ve el mundo desde sus vivencias y sus miedos?".'
      },
      {
        stepNumber: 4,
        title: '3ª Posición: El observador imparcial y compasivo',
        instruction: 'Ubicatete en un punto neutral, como un consultor o una cámara cinematográfica sabia. Observá la dinámica entre los dos con neutralidad.'
      },
      {
        stepNumber: 5,
        title: 'Integración del aprendizaje en 1ª posición',
        instruction: 'Regresá a tu lugar original trayendo con vos la visión amplia del observador y el entendimiento empático.'
      }
    ],
    closure: 'Respirá profundamente integrando el entendimiento ampliado de la relación.',
    reflectionQuestions: [
      '¿Qué vio el observador neutral que yo no alcanzaba a percibir atrapado en mi emoción?',
      '¿Qué pequeña acción constructiva puedo dar a partir de esta nueva mirada?'
    ]
  },
  {
    id: 'reflexion-dialogo',
    title: 'Escritura Reflexiva y Diálogo con la Tensión',
    shortDescription: 'Un ejercicio reflexivo de escucha para poner en palabras el sentir corporal sin resistencias.',
    durationMinutes: 15,
    category: 'Reflexión',
    iconName: 'Moon',
    objective: 'Traducir la incomodidad somática en preguntas de vida y autoconocimiento.',
    preparation: 'Disponé de cuaderno y bolígrafo. Escribí de forma continua, sin corregir la gramática ni frenar el flujo de pensamientos.',
    steps: [
      {
        stepNumber: 1,
        title: 'Nombrar la sensación física',
        instruction: 'Escribí en la parte superior de la página: "Querido cuerpo, hoy percibo en vos..." y describí la temperatura, peso y textura del síntoma.'
      },
      {
        stepNumber: 2,
        title: 'Darle voz a la incomodidad',
        instruction: 'Escribí: "Si esta tensión pudiera hablarme como una carta, me diría: ..." y dejá que tu mano redacte sin censura.'
      },
      {
        stepNumber: 3,
        title: 'La respuesta de gratitud y compromiso',
        instruction: 'Respondé a tu cuerpo reconociendo lo que te pide (descanso, límites claros, expresar una verdad o soltar una exigencia).'
      }
    ],
    closure: 'Cerrá el cuaderno, colocá ambas manos sobre el pecho y regalate una sonrisa compasiva.',
    reflectionQuestions: [
      '¿Qué límite o verdad pendiente me estaba señalando mi cuerpo?',
      '¿Qué pequeño gesto de cuidado puedo brindarme hoy mismo?'
    ]
  }
];

export class ProtocolService {
  static getAll(): Protocol[] {
    return PROTOCOLS_CATALOG;
  }

  static getById(id: string): Protocol | undefined {
    return PROTOCOLS_CATALOG.find((p) => p.id === id);
  }

  static getByCategory(category: string): Protocol[] {
    if (category === 'Todos') return PROTOCOLS_CATALOG;
    return PROTOCOLS_CATALOG.filter((p) => p.category === category);
  }

  static getForThemes(themes: string[]): Protocol[] {
    const lowerThemes = themes.map((t) => t.toLowerCase());
    return PROTOCOLS_CATALOG.filter((p) => {
      return (
        lowerThemes.some((t) => p.title.toLowerCase().includes(t)) ||
        lowerThemes.some((t) => p.shortDescription.toLowerCase().includes(t)) ||
        lowerThemes.some((t) => p.objective.toLowerCase().includes(t))
      );
    }).slice(0, 3);
  }
}
