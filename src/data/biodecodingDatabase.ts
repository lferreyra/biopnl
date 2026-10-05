import { Source } from '../types';

export interface BiodecodingEntry {
  aliases: string[];
  title: string;
  summary: string;
  interpretation: string;
  emotionalThemes: string[];
  reflectionQuestions: string[];
  recommendedProtocolIds: string[];
  sources: Source[];
}

export const BIODECODING_DATABASE: BiodecodingEntry[] = [
  // 1. Acné y Espinillas
  {
    aliases: ['acne', 'acné', 'grano', 'granos', 'espinilla', 'espinillas', 'puntos negros', 'forunculo', 'barro', 'barros'],
    title: 'Acné y Espinillas (Miedo al Rechazo y Protección de la Intimidad)',
    summary:
      'El acné afecta las glándulas sebáceas de la piel. En biodecodificación refleja el miedo a ser rechazado/a por la propia imagen, creando una barrera física para mantener a los demás a distancia.',
    interpretation:
      'La piel es el órgano con el que entramos en contacto con los demás y nos mostramos al mundo. En biodecodificación, el acné y las espinillas expresan un doble conflicto: el miedo al rechazo de la propia imagen (sentir que uno no es agradable o deseable) y la necesidad inconsciente de poner una barrera para que los demás "no se acerquen demasiado".\n\nPor ejemplo en la vida diaria: etapas de cambios personales donde sentís mucha inseguridad con tu cuerpo, miedo a intimar con otra persona por temor a que descubra tus defectos, o sentirte constantemente observado/a y juzgado/a en tu entorno familiar o laboral. Los granos actúan como un escudo biológico que dice inconscientemente: "No me mires de cerca, tengo miedo a ser herido/a".\n\nEl camino de alivio: reconciliarte con tu belleza y tu valor interior. La verdadera atracción y dignidad no nacen de una piel sin marcas, sino de la ternura con la que te tratás a vos mismo/a. Cuando te aceptás y dejás de juzgarte frente al espejo, tu piel ya no necesita levantar barreras inflamatorias para defenderse.',
    emotionalThemes: [
      'Miedo al rechazo de la propia imagen',
      'Inseguridad e intimidad',
      'Pudor y barrera de protección',
      'Aceptación y amor propio'
    ],
    reflectionQuestions: [
      '¿En qué momentos sentís que tu aspecto físico no es suficiente para ser querido/a o aceptado/a?',
      '¿Tenés miedo a que alguien se acerque demasiado a tu intimidad y descubra tus inseguridades?',
      '¿Cómo podés empezar hoy a mirarte al espejo reconociendo lo valioso que hay en vos?'
    ],
    recommendedProtocolIds: ['pnl-reencuadre', 'mindfulness-somatico', 'pnl-anclaje'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Piel: Glándulas sebáceas, pudor y auto-rechazo estético',
        relevantExcerpt: 'El acné como defensa biológica frente a la mirada inquisidora y la desvalorización estética.'
      }
    ]
  },

  // 2. Manchas en el rostro / Melasma / Pigmentación
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
      'manchas oscuras',
      'mancha'
    ],
    title: 'Manchas en el Rostro y la Piel (Pigmentación y Melasma)',
    summary:
      'La cara es la parte del cuerpo con la que "damos la cara" ante los demás. Las manchas oscuras suelen aparecer como un escudo biológico cuando sentimos que nuestra imagen fue atacada, juzgada o "ensuciada".',
    interpretation:
      'La piel del rostro es nuestra carta de presentación. En biodecodificación, cuando la piel produce más melanina y oscurece ciertas zonas, el cuerpo está creando literalmente una pantalla o "escudo" protector frente a una agresión que sentimos hacia nuestra imagen o dignidad.\n\nPor ejemplo en la vida diaria: haber vivido una situación de mucha vergüenza, chismes familiares o laborales donde sentiste que hablaron mal de vos y "mancharon tu reputación", o sentirte expuesto/a a que los demás te critiquen y juzguen tus decisiones. El cuerpo busca "tapar" o proteger esa zona para que no te sigan hiriendo.\n\nEl camino de alivio: entender que tu valor como persona no depende de la opinión ajena ni de los errores del pasado. Cuando te perdonás, te mirás al espejo con cariño y dejás de necesitar la aprobación de los demás, tu piel comprende que ya está a salvo y ya no necesita defenderse.',
    emotionalThemes: [
      'Proteger la propia imagen',
      'Miedo a la mirada y crítica ajena',
      'Sentirse juzgado o avergonzado',
      'Reconciliación con uno mismo'
    ],
    reflectionQuestions: [
      '¿Hubo alguna situación donde sentiste que hablaron mal de vos o que "mancharon" tu nombre?',
      '¿Sentís que tenés que mostrarte siempre impecable para evitar que otros te critiquen?',
      '¿Qué pasaría si hoy empezaras a mirarte con compasión, recordando que tu valor no lo define nadie de afuera?'
    ],
    recommendedProtocolIds: ['pnl-reencuadre', 'pnl-anclaje', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Piel y Contacto: Rostro, límites y protección de la imagen personal',
        relevantExcerpt: 'La pigmentación dérmica como respuesta arcaica de defensa ante agresiones a la dignidad personal.'
      }
    ]
  },

  // 3. Caderas / Artrosis de cadera
  {
    aliases: ['cadera', 'caderas', 'artrosis de cadera', 'dolor de cadera', 'coxartrosis', 'coxalgia', 'desgaste de cadera'],
    title: 'Cadera, Autonomía y el Valor de Sentirse Útil',
    summary:
      'La cadera sostiene el cuerpo y nos permite caminar. Su dolor o desgaste se relaciona con la sensación de "ya no sirvo para nada" o el miedo a ser una carga para la familia.',
    interpretation:
      'La articulación de la cadera nos permite dar pasos firmes hacia adelante y sostener nuestro propio peso con independencia. Cuando duelen las caderas o se desgasta la articulación, el cuerpo somatiza un sentimiento profundo de desvalorización sobre la propia utilidad: la sensación de "ya no puedo hacer lo que hacía antes", "los demás tienen que arrastrarme" o "siento que soy un estorbo para los míos".\n\nPor ejemplo en la vida diaria: personas que se jubilan, que ven que sus hijos ya crecieron y no las necesitan, o que sienten que su ritmo físico ya no es el de antes. El miedo a perder la autonomía o a depender de otros frena el paso y tensa la cadera.\n\nEl camino de alivio: tu valor en esta etapa de la vida ya no está en la fuerza bruta ni en la velocidad, sino en toda la sabiduría y experiencia que tenés para dar. Compartir lo que sabés (enseñar, aconsejar con cariño a los más jóvenes, participar en actividades donde tu palabra sea valorada) te devuelve la certeza de ser muy útil. Caminar a tu propio paso, sin apuro pero con orgullo.',
    emotionalThemes: [
      'Sentimiento de utilidad y propósito',
      'Miedo a ser una carga o depender de otros',
      'Transmisión de sabiduría y experiencia',
      'Avanzar a propio ritmo'
    ],
    reflectionQuestions: [
      '¿Sentís que en esta etapa de tu vida perdiste tu lugar de utilidad o que te cuesta aceptar que tu cuerpo pide otro ritmo?',
      '¿Qué conocimientos o historias valiosas tenés que podrías compartir con tus seres queridos?',
      '¿Cómo podés recordarle a tu cuerpo que tu presencia y experiencia siguen siendo un regalo para los demás?'
    ],
    recommendedProtocolIds: ['pnl-reencuadre', 'pnl-anclaje', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Módulo Articulaciones: Caderas, pelvis y el tránsito a la sabiduría',
        relevantExcerpt: 'La articulación de la cadera y el conflicto de desvalorización respecto al avance y la utilidad personal.'
      }
    ]
  },

  // 4. Asma y Dificultad Respiratoria
  {
    aliases: ['asma', 'ataque de asma', 'broncoespasmo', 'silbido en el pecho', 'ahogo', 'asfixia'],
    title: 'Asma y Bronquios (Amenaza en el Territorio y Espacio Propio)',
    summary:
      'El asma afecta los bronquios, que llevan el aire a los pulmones. En biodecodificación expresa la sensación de invasión en el espacio personal: sentir que "te quitan el aire" o que no podés respirar libremente.',
    interpretation:
      'Los bronquios representan los caminos por donde ingresa la vida a nuestro territorio. En biodecodificación, el asma refleja una vivencia de opresión o asfixia en el entorno más íntimo: la sensación de que alguien ejerce un control tan sofocante sobre vos que sentís que literalmente "no te dejan respirar".\n\nPor ejemplo en la vida diaria: convivir en un ambiente familiar donde hay discusiones continuas, mandatos rígidos o sobreprotección asfixiante, donde sentís que no tenés libertad para ser vos mismo/a sin ser censurado/a o vigilado/a. El espasmo bronquial retiene el aire como una forma de no dejar entrar el aire tóxico del entorno.\n\nEl camino de alivio: marcar tu espacio vital y expresar lo que necesitás sin culpa. Tenés derecho a respirar a pleno pulmón y a poner límites sanos a quienes invaden tu tranquilidad.',
    emotionalThemes: [
      'Sensación de asfixia en el entorno',
      'Invasión del territorio personal',
      'Miedo a la confrontación',
      'Derecho a respirar libremente'
    ],
    reflectionQuestions: [
      '¿Sentís que en tu casa o trabajo alguien ejerce un control que te ahoga o te quita libertad?',
      '¿En qué situaciones sentís que tenés que aguantar la respiración para no generar problemas?',
      '¿Qué rincón de paz podés regalarte hoy donde nadie interfiera con tu aire?'
    ],
    recommendedProtocolIds: ['relajacion-478', 'visualizacion-santuario', 'asertividad-limites'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Sistema Respiratorio: Bronquios y disputas territoriales',
        relevantExcerpt: 'El broncoespasmo como reacción de defensa ante la invasión del espacio vital.'
      }
    ]
  },

  // 5. Tiroides (Hipotiroidismo e Hipertiroidismo)
  {
    aliases: ['tiroides', 'hipotiroidismo', 'hipertiroidismo', 'nodulo tiroideo', 'nodulos en la tiroides', 'bocio'],
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
    recommendedProtocolIds: ['mindfulness-somatico', 'relajacion-478', 'pnl-reencuadre'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Sistema Endocrino: Tiroides, reloj biológico y gestión de la prisa',
        relevantExcerpt: 'La alteración tiroidea como desfasaje entre el tiempo biológico y la exigencia externa.'
      }
    ]
  },

  // 6. Ciática y Dolor Lumbar
  {
    aliases: ['ciatica', 'dolor ciatico', 'nervio ciatico', 'lumbalgia', 'dolor lumbar', 'lumbago', 'cintura'],
    title: 'Ciática y Lumbar (Miedo al Futuro Económico y Sostén)',
    summary:
      'El nervio ciático baja por la pierna y sostiene el avance. Se inflama cuando tenemos miedo a no llegar a fin de mes o cuando dudamos de dar un paso importante por temor material.',
    interpretation:
      'El nervio ciático es el gran conductor del movimiento hacia adelante. En biodecodificación, la ciática expresa un conflicto directo entre querer avanzar y el miedo paralizante a la escasez material: "¿Tendré dinero suficiente?", "¿Podré mantener mi hogar?", "¿Qué pasa si doy este paso y me va mal?".\n\nPor ejemplo en la vida diaria: tener que tomar una decisión laboral o económica difícil, sentir que estás remando en absoluta soledad sin el apoyo de tu pareja o familia, o el estrés constante por las deudas y la estabilidad del hogar.\n\nEl camino de alivio: reconocer que tu valor y tu seguridad no dependen exclusivamente de los números bancarios. Dar un paso a la vez, apoyándote en la confianza de que siempre encontraste la forma de salir adelante.',
    emotionalThemes: [
      'Miedo a la falta de dinero o sustento',
      'Duda o parálisis ante un cambio de rumbo',
      'Sensación de no tener respaldo',
      'Confianza en el propio camino'
    ],
    reflectionQuestions: [
      '¿Qué decisión económica o cambio de vida te genera miedo o parálisis en este momento?',
      '¿Sentís que si vos no sostenés todo, nadie te va a dar una mano?',
      '¿Qué pequeño paso seguro podés dar hoy sin angustiarte por el futuro lejano?'
    ],
    recommendedProtocolIds: ['pnl-anclaje', 'pnl-reencuadre', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Columna Lumbar: Nervio ciático y soporte material',
        relevantExcerpt: 'La ciatalgia como conflicto de desvalorización financiera y miedo al avance.'
      }
    ]
  },

  // 7. Hernia de Disco y Columna Vertebral
  {
    aliases: ['hernia de disco', 'hernia discal', 'protrusion discal', 'columna', 'dolor de espalda'],
    title: 'Hernia de Disco (Exceso de Peso y Falta de Apoyo)',
    summary:
      'Los discos vertebrales amortiguan las presiones. Se hernian cuando sentimos que nos exigen sostener más peso del humanamente posible sin ayuda de nadie.',
    interpretation:
      'Los discos intervertebrales actúan como amortiguadores ante las cargas de la vida. Cuando un disco se desgasta o se sale de su lugar (hernia), el cuerpo está gritando que el nivel de exigencia que estás cargando sobrepasa tus fuerzas biológicas.\n\nPor ejemplo en la vida diaria: ser el pilar del que todos dependen, sentir que no podés decir que no a ningún pedido familiar o laboral, y aguantar en silencio hasta que tu cuerpo literalmente se frena para obligarte a parar.\n\nEl camino de alivio: bajarte del rol del que "todo lo puede". Aprender a decir: "Hasta acá llego yo, esto no lo puedo sostener solo/a". Delegar es un acto de supervivencia y respeto por tu columna.',
    emotionalThemes: [
      'Sobrecarga extrema de responsabilidades',
      'Dificultad para poner límites a los pedidos ajenos',
      'Sentimiento de colapso o falta de amortiguación',
      'Aprender a delegar y descansar'
    ],
    reflectionQuestions: [
      '¿Qué peso o responsabilidad sentís que ya no podés sostener más en tu vida?',
      '¿Por qué sentís que tenés que ser siempre vos quien resuelva todo?',
      '¿A quién podrías pedirle hoy que asuma su parte del esfuerzo?'
    ],
    recommendedProtocolIds: ['pnl-reencuadre', 'mindfulness-somatico', 'relajacion-478'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Columna Vertebral: Discos intervertebrales y colapso de sostén',
        relevantExcerpt: 'La hernia discal como límite fisiológico ante la sobrecarga de deberes asumidos.'
      }
    ]
  },

  // 8. Cistitis e Infección Urinaria
  {
    aliases: ['cistitis', 'infeccion urinaria', 'vejiga', 'ardor al orinar', 'orina', 'infeccion de orina'],
    title: 'Cistitis y Vejiga (Marcar el Territorio y Límites Invadidos)',
    summary:
      'La vejiga sirve biológicamente para delimitar el territorio. La cistitis aparece cuando sentimos que alguien invade nuestro espacio personal o cuando no podemos poner límites claros.',
    interpretation:
      'En el reino animal, la orina es la señal con la que se marcan los límites del territorio ("este es mi lugar"). En biodecodificación, la inflamación de la vejiga y el ardor al orinar aparecen cuando sentís que alguien se metió en tu espacio, en tu casa, en tu habitación o en tus decisiones íntimas sin tu consentimiento.\n\nPor ejemplo en la vida diaria: visitas invasivas en tu hogar que no sabés cómo despedir, parejas o familiares que revisan tus cosas o te imponen cómo vivir, o sentir que en tu propio espacio no podés poner tus reglas.\n\nEl camino de alivio: marcar tus límites con tranquilidad. Decir claramente: "Este es mi espacio y estas son mis condiciones". Cuando dejás en claro tus fronteras, tu vejiga deja de inflamarse para marcar el territorio.',
    emotionalThemes: [
      'Invasión del espacio personal',
      'Dificultad para poner límites en el hogar',
      'Sentirse avasallado/a o invadido/a',
      'Delimitar fronteras sanas'
    ],
    reflectionQuestions: [
      '¿Quién sentís que está invadiendo tu espacio, tu tiempo o tu tranquilidad?',
      '¿Por qué te cuesta decirle a esa persona que respete tu lugar?',
      '¿Cómo podés expresar tus límites hoy con serenidad pero con total firmeza?'
    ],
    recommendedProtocolIds: ['asertividad-limites', 'pnl-reencuadre', 'relajacion-478'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Sistema Urinario: Vejiga y delimitación del territorio personal',
        relevantExcerpt: 'La cistitis de repetición como conflicto crónico de invasión de los propios límites.'
      }
    ]
  },

  // 9. Hipertensión y Presión Alta
  {
    aliases: ['presion alta', 'hipertension', 'hipertensión', 'presion arterial alta', 'presion'],
    title: 'Presión Alta (Olla a Presión y Control Excesivo)',
    summary:
      'La presión sanguínea aumenta cuando queremos controlar todo lo que pasa a nuestro alrededor, acumulando tensión sin permitirnos un desahogo.',
    interpretation:
      'La sangre representa la alegría de vivir y el calor afectivo que circula por el cuerpo. En biodecodificación, la presión arterial alta es el resultado de vivir como una "olla a presión": una persona que se exige estar siempre alerta, que quiere controlar las reacciones de todos y que reprime su enojo para no explotar.\n\nPor ejemplo en la vida diaria: preocuparte por lo que hacen tus hijos, tu pareja o tus compañeros, sintiendo que si vos no vigilás todo, habrá un desastre; y tragarte la frustración acumulando tensión en las arterias.\n\nEl camino de alivio: soltar la necesidad de que los demás actúen como vos querés. Abrir la válvula de escape: hacer actividad física suave, respirar hondo y entender que no podés vivir la vida por otros.',
    emotionalThemes: [
      'Necesidad de control exhaustivo',
      'Tensión acumulada sin válvula de escape',
      'Autoexigencia y sentido del deber rígido',
      'Aprender a soltar y confiar'
    ],
    reflectionQuestions: [
      '¿Qué situación o persona estás intentando controlar desesperadamente sin éxito?',
      '¿De qué manera solés desahogar la tensión acumulada durante el día?',
      '¿Qué pasaría si hoy decidieras que cada uno se haga responsable de sus actos?'
    ],
    recommendedProtocolIds: ['relajacion-478', 'mindfulness-somatico', 'pnl-reencuadre'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Sistema Cardiovascular: Presión arterial y control de los afectos',
        relevantExcerpt: 'La hipertensión arterial como resistencia hemodinámica ante la pérdida de control percibida.'
      }
    ]
  },

  // 10. Gastritis, Acidez y Reflujo
  {
    aliases: ['gastritis', 'acidez', 'reflujo', 'estomago', 'dolor de estomago', 'ardor de estomago', 'pesadez estomacal'],
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
    recommendedProtocolIds: ['pnl-reencuadre', 'pnl-anclaje', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Sistema Digestivo Alto: El bocado indigesto y la secreción ácida reactiva',
        relevantExcerpt: 'La gastritis y el reflujo como manifestación de ira e impotencia no digerida.'
      }
    ]
  },

  // 11. Rodillas y Meniscos
  {
    aliases: ['rodilla', 'rodillas', 'dolor de rodilla', 'meniscos', 'artrosis de rodilla', 'rotula'],
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
    recommendedProtocolIds: ['pnl-reencuadre', 'pnl-posiciones', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Miembros Inferiores: Rodillas, flexibilidad y resolución pacífica del ego',
        relevantExcerpt: 'La articulación de la rodilla como receptora de la tozudez y el conflicto de sumisión forzada.'
      }
    ]
  },

  // 12. Migraña y Dolor de Cabeza
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
    recommendedProtocolIds: ['pnl-reencuadre', 'relajacion-478', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Cabeza: Tensión mental y control exhaustivo',
        relevantExcerpt: 'La cefalea tensional como reflejo de la hiperactividad analítica y el miedo al error.'
      }
    ]
  },

  // 13. Garganta y Afonía
  {
    aliases: ['garganta', 'dolor de garganta', 'afonia', 'disfonia', 'faringitis', 'nudo en la garganta', 'anginas'],
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
    recommendedProtocolIds: ['asertividad-limites', 'pnl-reencuadre', 'relajacion-478'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Garganta: Expresión, asertividad y conflicto de sumisión verbal',
        relevantExcerpt: 'El nudo de garganta y la inflamación laríngea por retención de la propia verdad.'
      }
    ]
  },

  // 14. Hombros y Espalda Alta
  {
    aliases: ['hombros', 'dolor de hombros', 'contractura', 'contracturas', 'trapecio', 'espalda alta', 'omoplato'],
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
    recommendedProtocolIds: ['pnl-reencuadre', 'mindfulness-somatico', 'pnl-posiciones'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Columna Alta y Cintura Escapular: Cargas familiares y rol de sostén',
        relevantExcerpt: 'Sobrecarga del trapecio como manifestación del salvador familiar que no delega.'
      }
    ]
  },

  // 15. Sobrepeso y Retención de Líquidos
  {
    aliases: ['sobrepeso', 'kilos de mas', 'grasa', 'retencion de liquidos', 'hinchazon', 'obesidad'],
    title: 'Sobrepeso y Grasa Corporal (Armadura de Protección y Abandono)',
    summary:
      'El tejido adiposo sirve biológicamente como aislamiento y protección. El sobrepeso suele aparecer como un escudo frente a agresiones emocionales o sensación de abandono.',
    interpretation:
      'La grasa corporal no es un enemigo, es el escudo arcaico con el que el cuerpo se aísla del frío, del hambre o de los golpes. En biodecodificación, el aumento de peso involuntario se asocia a la necesidad de "hacerse más grande y fuerte" para defenderse de agresiones, o a la vivencia de sentirse desamparado/a y abandonado/a en un entorno hostil.\n\nPor ejemplo en la vida diaria: haber vivido situaciones de abuso, humillación o soledad profunda, donde el inconsciente decidió que un cuerpo más voluminoso es menos vulnerable a los ataques ajenos; o retener líquidos por la angustia de sentirse "como un pez fuera del agua".\n\nEl camino de alivio: hacer las paces con tu cuerpo y recordarle que hoy estás a salvo. El cuerpo suelta la armadura de grasa cuando siente que ya no necesita defenderse del mundo exterior.',
    emotionalThemes: [
      'Armadura de protección contra agresiones',
      'Miedo al desamparo o abandono',
      'Sensación de vulnerabilidad afectiva',
      'Seguridad y reconciliación corporal'
    ],
    reflectionQuestions: [
      '¿De qué o de quién sentís que necesitás protegerte con una coraza?',
      '¿Hubo algún momento en tu vida donde te sentiste completamente solo/a o desamparado/a?',
      '¿Cómo podés brindarte hoy un espacio seguro donde no necesites ponerte a la defensiva?'
    ],
    recommendedProtocolIds: ['pnl-reencuadre', 'visualizacion-santuario', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Metabolismo: Tejido adiposo, coraza y memorias de aislamiento',
        relevantExcerpt: 'La lipogénesis reactiva como respuesta adaptativa de protección y reserva energética.'
      }
    ]
  },

  // 16. Ojos y Problemas Visuales
  {
    aliases: ['ojos', 'vista', 'miopia', 'astigmatismo', 'cansancio de vista', 'cataratas', 'conjuntivitis', 'dolor de ojos'],
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
    recommendedProtocolIds: ['mindfulness-somatico', 'pnl-reencuadre', 'relajacion-478'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Ojos: Percepción visual, horizonte de vida y temor a la mirada',
        relevantExcerpt: 'La fatiga ocular como resistencia a contemplar realidades dolorosas.'
      }
    ]
  },

  // 17. Oídos y Tinnitus
  {
    aliases: ['oidos', 'oido', 'zumbido', 'zumbidos', 'tinnitus', 'acufenos', 'dolor de oido', 'otitis', 'sordera'],
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
    recommendedProtocolIds: ['relajacion-478', 'visualizacion-santuario', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Oídos: Audición, palabras hirientes y saturación acústica',
        relevantExcerpt: 'El acúfeno como zumbido de alerta ante agresiones verbales no digeridas.'
      }
    ]
  },

  // 18. Dientes y Bruxismo
  {
    aliases: ['bruxismo', 'apretar los dientes', 'mandibula', 'dientes', 'dolor de muela', 'encias'],
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
    recommendedProtocolIds: ['relajacion-478', 'asertividad-limites', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Mandíbula y Dientes: Instinto de defensa, mordida y agresión reprimida',
        relevantExcerpt: 'El bruxismo nocturno como canalización inconsciente de la impotencia diurna.'
      }
    ]
  },

  // 19. Colon Irritable y Estreñimiento
  {
    aliases: ['colon irritable', 'colon', 'intestino', 'intestinos', 'estrenimiento', 'constipacion', 'diarrea', 'hinchazon abdominal', 'gases'],
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
    recommendedProtocolIds: ['relajacion-478', 'mindfulness-somatico', 'pnl-reencuadre'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Intestinos: Retención, miedo a la escasez y evacuación de conflictos',
        relevantExcerpt: 'El colon espástico como respuesta de alarma ante situaciones consideradas sucias o deshonestas.'
      }
    ]
  },

  // 20. Hígado y Vesícula Biliar
  {
    aliases: ['higado', 'vesicula', 'vesicula biliar', 'calculos biliares', 'piedras en la vesicula', 'amargura'],
    title: 'Hígado y Vesícula (Miedo a la Escasez y Rencor Familiar)',
    summary:
      'El hígado almacena reservas para no morir de hambre y la vesícula segrega bilis amarga. Se afectan ante disputas por dinero o rencores familiares amargos.',
    interpretation:
      'El hígado es el banco de reservas del cuerpo humano. En biodecodificación, los problemas de hígado se vinculan al miedo arcaico a "morir de hambre" o quedarse sin sustento, y a rencores profundos dentro de la familia (conflictos de herencia, dinero o falta de comida). La vesícula somatiza la "amargura", la sensación de tener que tragarse injusticias familiares continuas.\n\nPor ejemplo en la vida diaria: hermanos que se pelean por una propiedad, reproches por dinero que duran décadas o sentir que alguien de tu propia sangre te quitó lo que te correspondía.\n\nEl camino de alivio: entender que guardar rencor es como tomar veneno esperando que el otro se muera. Tu sustento y tu paz interior valen infinitamente más que cualquier disputa material.',
    emotionalThemes: [
      'Miedo a la carencia extrema',
      'Rencor amargo en el clan familiar',
      'Disputas de herencia o dinero',
      'Limpieza emocional del rencor'
    ],
    reflectionQuestions: [
      '¿Qué hecho o pelea familiar te dejó un sabor amargo que todavía no podés perdonar?',
      '¿Sentís miedo constante a que te falten los recursos para vivir?',
      '¿Cómo podés empezar hoy a soltar esa amargura para cuidar tu salud digestiva?'
    ],
    recommendedProtocolIds: ['pnl-reencuadre', 'pnl-posiciones', 'mindfulness-somatico'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Hígado y Vías Biliares: Carencia, bilis y litigios en el clan',
        relevantExcerpt: 'La litiasis biliar como rencor calcificado ante injusticias percibidas.'
      }
    ]
  },

  // 21. Vértigo y Mareos
  {
    aliases: ['vertigo', 'mareo', 'mareos', 'desequilibrio', 'perdida de equilibrio'],
    title: 'Vértigo y Mareos (Pérdida de Puntos de Referencia)',
    summary:
      'El equilibrio nos orienta en el espacio. El vértigo aparece cuando sentimos que nos "movieron el piso", perdiendo la estabilidad ante un cambio brusco.',
    interpretation:
      'El sistema vestibular del oído interno y la vista coordinan nuestro balance. En biodecodificación, el mareo o vértigo surge cuando vivís una situación donde sentís que "te movieron el piso": un cambio repentino de planes, una traición inesperada, una mudanza o una separación que te deja sin saber de dónde agarrarte.\n\nPor ejemplo en la vida diaria: cuando una situación que dabas por segura se derrumba de un día para el otro, y sentís que estás en el aire sin suelo firme donde apoyarte.\n\nEl camino de alivio: buscar el equilibrio adentro, no afuera. Sentar los pies en la tierra, respirar hondo y recordar que aunque las circunstancias cambien, tu centro interior permanece estable.',
    emotionalThemes: [
      'Sensación de suelo inestable',
      'Cambio brusco e imprevisto',
      'Falta de puntos de referencia',
      'Encontrar el centro interior'
    ],
    reflectionQuestions: [
      '¿Qué cambio repentino en tu vida te hizo sentir que te "movieron el piso"?',
      '¿Qué certezas internas tenés que nada de afuera puede quitarte?',
      '¿Cómo podés apoyarte hoy en cosas simples y presentes para recuperar la estabilidad?'
    ],
    recommendedProtocolIds: ['pnl-anclaje', 'mindfulness-somatico', 'relajacion-478'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Sistema Vestibular: Equilibrio, desorientación y anclaje espacial',
        relevantExcerpt: 'El vértigo posicional como respuesta ante la pérdida súbita de referencias vitales.'
      }
    ]
  },

  // 22. Pies y Fascitis Plantar
  {
    aliases: ['pies', 'pie', 'dolor de pies', 'fascitis plantar', 'espolon', 'espolon calcaneo', 'tobillo', 'tobillos'],
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
    recommendedProtocolIds: ['mindfulness-somatico', 'pnl-anclaje', 'relajacion-478'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Pies: Enraizamiento, pisada firme y relación con las raíces primordiales',
        relevantExcerpt: 'Fascitis plantar y dolor calcáneo como señal de agotamiento en el camino elegido.'
      }
    ]
  },

  // 23. Alergias en la Piel, Dermatitis y Eczema
  {
    aliases: ['dermatitis', 'eczema', 'eccema', 'alergia en la piel', 'erupcion', 'picazon', 'psoriasis', 'rosacea', 'urticaria'],
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
    recommendedProtocolIds: ['pnl-anclaje', 'mindfulness-somatico', 'pnl-reencuadre'],
    sources: [
      {
        name: 'Diccionario de Biodecodificación Práctica',
        reference: 'Capítulo Piel: Epidermis, contacto afectivo y memorias de separación',
        relevantExcerpt: 'El eczema y la dermatitis atópica como expresión del anhelo o el rechazo del contacto.'
      }
    ]
  }
];

/**
 * Intelligent semantic matcher that searches by normalized aliases and individual keywords
 * using strict word boundaries to avoid false substring matches (e.g. 'asma' matching 'melasma')
 */
export function findBiodecodingMatch(query: string): BiodecodingEntry | null {
  const normalized = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  if (!normalized) return null;

  const queryWords = normalized.split(/[^a-z0-9]+/).filter(Boolean);

  // 1. Exact match on title or alias
  for (const item of BIODECODING_DATABASE) {
    const normTitle = item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (normTitle === normalized) return item;

    for (const alias of item.aliases) {
      const normAlias = alias.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (normAlias === normalized) return item;
    }
  }

  // 2. Multi-word phrase match (e.g. "dolor de cabeza" inside "tengo un dolor de cabeza fuerte")
  for (const item of BIODECODING_DATABASE) {
    for (const alias of item.aliases) {
      const normAlias = alias.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (normAlias.includes(' ')) {
        const regex = new RegExp(`\\b${normAlias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (regex.test(normalized)) return item;
      }
    }
  }

  // 3. Single-word exact token match (e.g. query has "asma" -> only matches alias "asma", NOT "melasma")
  for (const word of queryWords) {
    if (word.length < 3) continue;
    for (const item of BIODECODING_DATABASE) {
      for (const alias of item.aliases) {
        const normAlias = alias.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (normAlias === word) return item;
      }
    }
  }

  // 4. Fallback search on title containing word boundary
  for (const word of queryWords) {
    if (word.length < 4) continue;
    for (const item of BIODECODING_DATABASE) {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(item.title.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) return item;
    }
  }

  return null;
}
