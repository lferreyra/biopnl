import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Wind, Activity, HelpCircle, Lightbulb } from 'lucide-react';
import { AppImages } from '../assets/images';

export interface BodyRegion {
  id: string;
  name: string;
  calloutLabel: string;
  side: 'left' | 'right';
  category: string;
  point: { x: number; y: number };
  callout: { lineX: number; textX: number; y: number };
  conflict: string;
  everydayExample: string;
  practicalRelief: string;
  unconsciousEmotion: string;
  searchQuery: string;
  affirmation: string;
  recommendedProtocolId?: string;
}

export const BODY_REGIONS: BodyRegion[] = [
  {
    id: 'cabeza',
    name: 'Cabeza & Pensamiento',
    calloutLabel: 'Cabeza',
    side: 'left',
    category: 'Autoexigencia y Sobreanálisis',
    point: { x: 180, y: 46 },
    callout: { lineX: 84, textX: 46, y: 46 },
    conflict: 'Autoexigencia intelectual desmedida y miedo a no tener el control o cometer un error.',
    everydayExample: 'Darle mil vueltas al mismo problema en la cama sin poder dormir; la creencia de que si vos no pensás y resolvés todo en detalle, las cosas van a salir mal.',
    practicalRelief: 'Aceptar que el cuerpo y la vida tienen sus propios ritmos. Date permiso para decir: "Hoy ya pensé suficiente, esto no se resuelve forzando la mente".',
    unconsciousEmotion: 'Presión por ser impecable; cefalea por no poder apagar el diálogo mental.',
    searchQuery: 'migraña y dolor de cabeza',
    affirmation: 'Me permito soltar el control y confiar en que todo encuentra su lugar.',
    recommendedProtocolId: 'pnl-reencuadre'
  },
  {
    id: 'garganta',
    name: 'Garganta & Cuello',
    calloutLabel: 'Garganta',
    side: 'left',
    category: 'Palabras y Límites',
    point: { x: 180, y: 92 },
    callout: { lineX: 84, textX: 46, y: 92 },
    conflict: 'El "bocado de palabra": lo que te tragás y no decís por miedo a incomodar, al conflicto o al rechazo.',
    everydayExample: 'Estar en una charla familiar o de trabajo, escuchar una injusticia o algo que te duele, morderte la lengua y callarte "para no armar lío", quedándote con un nudo en la garganta y bronca contenida.',
    practicalRelief: 'Aprender a decir "no" y expresar lo que sentís con tranquilidad. Decir tu verdad con calma y respeto no es agredir, es poner un límite sano.',
    unconsciousEmotion: 'Nudo en la garganta y carraspera por contener palabras que pugnan por salir.',
    searchQuery: 'dolor de garganta y afonia',
    affirmation: 'Mi voz es valiosa. Expreso lo que siento con calma, respeto y firmeza.',
    recommendedProtocolId: 'asertividad-limites'
  },
  {
    id: 'hombros',
    name: 'Hombros & Espalda Alta',
    calloutLabel: 'Hombros',
    side: 'right',
    category: 'Cargas y Responsabilidades',
    point: { x: 232, y: 122 },
    callout: { lineX: 276, textX: 314, y: 122 },
    conflict: 'Cargar con mochilas, responsabilidades y problemas ajenos que no te corresponden.',
    everydayExample: 'Sentir que si vos no te hacés cargo de solucionar los problemas económicos o emocionales de tus hijos adultos, de tus hermanos o de tu pareja, todo se derrumba. Asumir el papel del que "siempre tiene que aguantar".',
    practicalRelief: 'Devolverle con amor la mochila a quien le pertenece. Cada persona adulta necesita vivir sus propios desafíos para crecer.',
    unconsciousEmotion: 'Contracturas y pesadez en el trapecio por creer que nadie te ayuda y que todo depende de tu espalda.',
    searchQuery: 'contractura en cuello y hombros',
    affirmation: 'Dejo caer las cargas que no me pertenecen. Me permito descansar y recibir ayuda.',
    recommendedProtocolId: 'pnl-reencuadre'
  },
  {
    id: 'pecho_pulmones',
    name: 'Pecho, Corazón & Pulmones',
    calloutLabel: 'Pecho',
    side: 'left',
    category: 'Angustia y Espacio Propio',
    point: { x: 180, y: 160 },
    callout: { lineX: 84, textX: 46, y: 160 },
    conflict: 'Amenaza en el espacio personal, pena profunda o sentir que "no te dejan respirar".',
    everydayExample: 'Sentir que en tu propia casa o trabajo no tenés un rincón propio de tranquilidad; o guardar una tristeza o duelo viejo porque "tenías que ser fuerte para los demás".',
    practicalRelief: 'Reconquistar un espacio y un momento del día exclusivo para vos, y darte permiso de soltar el llanto guardado sin juzgarte.',
    unconsciousEmotion: 'Sensación de opresión o falta de aire por ahogar la tristeza en soledad.',
    searchQuery: 'opresion en el pecho y angustia',
    affirmation: 'Tengo derecho a respirar libremente y habitar mi lugar en paz.',
    recommendedProtocolId: 'relajacion-478'
  },
  {
    id: 'plexo_estomago',
    name: 'Plexo Solar & Estómago',
    calloutLabel: 'Estómago',
    side: 'right',
    category: 'Digestión Emocional',
    point: { x: 180, y: 208 },
    callout: { lineX: 276, textX: 314, y: 208 },
    conflict: 'Bocado indigesto: una situación, traición o desacuerdo que no podés "tragar" ni digerir.',
    everydayExample: 'Una discusión humillante, una herencia injusta, una estafa o una mentira de alguien cercano que sentís como una piedra en el estómago y que seguís recordando con indignación.',
    practicalRelief: 'Aceptar que el hecho ya ocurrió y que la realidad no va a cambiar porque te amargues. Dejar de masticar el enojo ajeno protege tu propio estómago.',
    unconsciousEmotion: 'Acidez, reflujo o gastritis por segregar ira contenida ante una situación no aceptada.',
    searchQuery: 'acidez estomacal y gastritis',
    affirmation: 'Digiero cada experiencia con calma. Lo que me hace daño, lo suelto en paz.',
    recommendedProtocolId: 'anclaje-recursos'
  },
  {
    id: 'lumbares_rinones',
    name: 'Cintura & Zona Lumbar',
    calloutLabel: 'Cintura',
    side: 'left',
    category: 'Sustento y Tranquilidad',
    point: { x: 180, y: 258 },
    callout: { lineX: 84, textX: 46, y: 258 },
    conflict: 'Miedo a la falta de sostén, a la inestabilidad económica o a no tener un respaldo firme.',
    everydayExample: 'Preocupación constante por el dinero, por el sustento de la casa o sentir que estás remando en soledad y que si te tropezás, nadie te va a atajar.',
    practicalRelief: 'Aprender a pedir ayuda concreta y reconocer que tu seguridad no depende solo de acumular o controlar, sino de apoyarte en los vínculos de confianza.',
    unconsciousEmotion: 'Dolor punzante o lumbago por sentir que cargás con todo el peso del hogar sin apoyo.',
    searchQuery: 'dolor lumbar bajo',
    affirmation: 'Estoy seguro/a y sostenido/a. La tranquilidad nace de mi presencia aquí y ahora.'
  },
  {
    id: 'pelvis_caderas',
    name: 'Caderas & Pelvis',
    calloutLabel: 'Caderas',
    side: 'right',
    category: 'Utilidad y Sentido de Avance',
    point: { x: 208, y: 305 },
    callout: { lineX: 276, textX: 314, y: 305 },
    conflict: 'Desvalorización profunda ligada al avance, la autonomía y el sentimiento de utilidad personal.',
    everydayExample: 'Muy común en etapas de jubilación, cuando los hijos se van de casa o cuando el cuerpo cambia de ritmo: la persona siente "ya no sirvo como antes, soy una molestia o una carga para los demás". O también el miedo a dar un paso decisivo hacia lo desconocido.',
    practicalRelief: 'Comprender que tu valor ya no se mide por la fuerza física de antes, sino por toda la experiencia y sabiduría que tenés para transmitir. Compartir tu conocimiento (aconsejar, enseñar, acompañar a los más jóvenes, participar en tu comunidad) te devuelve el sentido de utilidad y te permite caminar a tu propio ritmo con orgullo.',
    unconsciousEmotion: 'Rigidez o dolor en la articulación de la cadera por sentirte estancado/a o con miedo a ser dependiente.',
    searchQuery: 'cadera y artrosis de cadera',
    affirmation: 'Mi experiencia es valiosa. Avanzo a mi propio ritmo y comparto mi sabiduría con orgullo.'
  },
  {
    id: 'piernas_rodillas',
    name: 'Piernas & Rodillas',
    calloutLabel: 'Rodillas',
    side: 'left',
    category: 'Flexibilidad y Orgullo',
    point: { x: 154, y: 435 },
    callout: { lineX: 84, textX: 46, y: 435 },
    conflict: 'Dificultad para ceder, orgullo herido y conflicto de sumisión.',
    everydayExample: 'Chocar de frente con familiares, parejas o jefes por no querer dar el brazo a torcer; preferir lastimarte o romper un vínculo antes que reconocer que otra persona tiene razón; o culparte por haber tenido que ceder sintiéndote humillado/a.',
    practicalRelief: 'Flexibilizarse no es perder dignidad: un junco se dobla con el viento y no se quiebra; el roble rígido se parte. Ceder con serenidad afloja tus rodillas.',
    unconsciousEmotion: 'Dolor e inflamación en la rodilla por resistirte a aflojar una postura rígida.',
    searchQuery: 'dolor de rodillas',
    affirmation: 'Me flexibilizo sin perder mi valor. Ceder en paz me trae armonía.'
  },
  {
    id: 'pies_tobillos',
    name: 'Pies & Pisada',
    calloutLabel: 'Pies',
    side: 'right',
    category: 'Pisar Firme y Enraizamiento',
    point: { x: 196, y: 560 },
    callout: { lineX: 276, textX: 314, y: 560 },
    conflict: 'Dificultad para enraizarse, pisar firme y encontrar tu lugar en el mundo.',
    everydayExample: 'Sentir que vivís "en el aire", sin un rumbo claro o que cada jornada diaria es una marcha pesada y agotadora; conflictos no resueltos con las raíces familiares.',
    practicalRelief: 'Hacer contacto consciente con el suelo (descalzo en el pasto o sintiendo la planta del pie), dando un paso a la vez sin anticipar la meta.',
    unconsciousEmotion: 'Fascitis o dolor en el talón por sentir que el camino cotidiano es una carga sin disfrute.',
    searchQuery: 'fascitis plantar y dolor de pies',
    affirmation: 'Piso con confianza y firmeza en la tierra. Cada paso que doy me cuida.'
  }
];

interface InteractiveBodyMapProps {
  onSelectSymptomSearch: (query: string) => void;
  onOpenProtocolById?: (protocolId: string) => void;
  onNavigateToProtocols?: () => void;
}

export const InteractiveBodyMap: React.FC<InteractiveBodyMapProps> = ({
  onSelectSymptomSearch,
  onOpenProtocolById,
  onNavigateToProtocols
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('garganta');

  const selectedRegion = BODY_REGIONS.find((r) => r.id === selectedRegionId) || BODY_REGIONS[1];

  const handleOpenExercise = () => {
    if (selectedRegion.recommendedProtocolId && onOpenProtocolById) {
      onOpenProtocolById(selectedRegion.recommendedProtocolId);
    } else if (onNavigateToProtocols) {
      onNavigateToProtocols();
    } else {
      onSelectSymptomSearch(selectedRegion.searchQuery);
    }
  };

  return (
    <div className="w-full bio-glass-card rounded-[32px] sm:rounded-[36px] p-4 sm:p-7 border border-[#E8B8A6]/60 dark:border-white/10 shadow-xl transition-all duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-[#E8B8A6]/30 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8F3722]/10 dark:bg-[#E07853]/15 text-[#8F3722] dark:text-[#E07853] text-xs font-bold mb-1 border border-[#8F3722]/20">
            <Activity className="w-3.5 h-3.5" />
            <span>Escaneo Anatómico Biológico 3D</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1A1412] dark:text-[#FFF7F2] tracking-tight">
            Mapa del Cuerpo Humano
          </h2>
          <p className="text-sm sm:text-base text-[#4B3E39] dark:text-[#D1C4BD]">
            Tocá cualquier punto luminoso sobre el cuerpo o su etiqueta lateral para consultar el significado.
          </p>
        </div>

        {/* Selected Zone Pill */}
        <div className="self-start sm:self-auto px-4 py-2 rounded-full bg-white dark:bg-[#2A1D18] border border-[#8F3722]/30 dark:border-[#E07853]/40 text-sm font-bold text-[#8F3722] dark:text-[#F47A45] shadow-xs flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8F3722] dark:bg-[#F47A45] animate-pulse" />
          <span>Zona activa: {selectedRegion.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left: Authentic 3D Anatomical Human Body Scan with Interactive Callouts */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          {/* Locked Aspect Ratio 9:16 Container guarantees 1:1 pixel alignment on any device */}
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] rounded-[32px] overflow-hidden border border-[#E8B8A6]/70 dark:border-white/15 shadow-2xl transition-all duration-300 bg-gradient-to-b from-[#FFFDFB] via-[#FAF3EE] to-[#F5E9DF] dark:from-[#060403] dark:via-[#0E0907] dark:to-[#140D0A]">
            
            {/* Background 3D Human Scan Images (Locked to exact 9:16 aspect ratio) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              {/* Dark mode photorealistic 3D human scan */}
              <img
                src={AppImages.humanBodyMeshDark}
                alt="Escaneo anatómico 3D del cuerpo humano en modo oscuro"
                className="hidden dark:block w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Light mode photorealistic 3D human scan in terracotta & ivory */}
              <img
                src={AppImages.humanBodyMeshLight}
                alt="Escaneo anatómico 3D del cuerpo humano en modo claro"
                className="block dark:hidden w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Soft ambient scrims ensuring callouts and text stand out sharply */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF3EE]/50 via-transparent to-[#FAF3EE]/50 dark:from-[#080504]/70 dark:via-transparent dark:to-[#080504]/70 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAF3EE]/20 via-transparent to-[#FAF3EE]/35 dark:from-transparent dark:to-[#080504]/80 pointer-events-none" />
            </div>

            {/* Interactive SVG Overlay with Callouts, Leader Lines and Glowing Nodes */}
            <svg
              viewBox="0 0 360 640"
              className="absolute inset-0 w-full h-full select-none z-10 drop-shadow-md"
            >
              {BODY_REGIONS.map((region) => {
                const isSelected = selectedRegionId === region.id;
                const isLeft = region.side === 'left';

                return (
                  <g key={region.id} className="select-none">
                    {/* 1. Leader Line from Anatomical Point to Callout Badge */}
                    <polyline
                      points={`${region.point.x},${region.point.y} ${
                        isLeft ? region.point.x - 24 : region.point.x + 24
                      },${region.callout.y} ${region.callout.lineX},${region.callout.y}`}
                      fill="none"
                      strokeWidth={isSelected ? 2.5 : 1.2}
                      className={
                        isSelected
                          ? 'stroke-[#8F3722] dark:stroke-[#F47A45] transition-colors pointer-events-none'
                          : 'stroke-[#8F3722]/45 dark:stroke-[#38BDF8]/50 transition-colors pointer-events-none'
                      }
                    />

                    {/* Outer Target Circle on Leader line end */}
                    <circle
                      cx={region.callout.lineX}
                      cy={region.callout.y}
                      r={isSelected ? 4 : 2.5}
                      className={
                        isSelected
                          ? 'fill-[#8F3722] dark:fill-[#F47A45] pointer-events-none transition-all'
                          : 'fill-[#C95832]/70 dark:fill-[#38BDF8]/75 pointer-events-none transition-all'
                      }
                    />

                    {/* 2. Callout Badge Pill (Left or Right margin) */}
                    <g
                      onClick={() => setSelectedRegionId(region.id)}
                      className="cursor-pointer group/label"
                    >
                      {/* Pill backdrop rect */}
                      <rect
                        x={isLeft ? 10 : 278}
                        y={region.callout.y - 11}
                        width={72}
                        height={22}
                        rx={7}
                        className={
                          isSelected
                            ? 'fill-white dark:fill-[#2A1D18] stroke-[#8F3722] dark:stroke-[#F47A45] shadow-sm'
                            : 'fill-white/85 dark:fill-[#120B08]/85 stroke-transparent group-hover/label:fill-white dark:group-hover/label:fill-[#1E1512] group-hover/label:stroke-[#8F3722]/40'
                        }
                        strokeWidth={isSelected ? 1.5 : 0.8}
                      />

                      {/* Callout Text Label centered inside rect */}
                      <text
                        x={region.callout.textX}
                        y={region.callout.y + 4}
                        textAnchor="middle"
                        className={`font-sans text-[11.5px] font-extrabold transition-colors ${
                          isSelected
                            ? 'fill-[#8F3722] dark:fill-[#F47A45]'
                            : 'fill-[#1A1412] dark:fill-[#FFF7F2] group-hover/label:fill-[#8F3722] dark:group-hover/label:fill-[#38BDF8]'
                        }`}
                      >
                        {region.calloutLabel}
                      </text>
                    </g>

                    {/* 3. Anatomical Landmark Dot ON THE BODY - with rock-solid coordinates and 60px touch target */}
                    <g
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRegionId(region.id);
                      }}
                      className="cursor-pointer group/dot"
                    >
                      {/* Invisible Giant Touch / Click Target (Radius 30 = 60px hit area for effortless tapping) */}
                      <circle
                        cx={region.point.x}
                        cy={region.point.y}
                        r={30}
                        fill="transparent"
                        className="cursor-pointer"
                      />

                      {/* Hover highlight halo - perfectly centered, ZERO coordinate displacement */}
                      <circle
                        cx={region.point.x}
                        cy={region.point.y}
                        r={15}
                        className="fill-[#8F3722]/0 group-hover/dot:fill-[#8F3722]/25 dark:group-hover/dot:fill-[#38BDF8]/25 transition-all pointer-events-none"
                      />

                      {/* Fluid Pulsing Ripple Animation centered exactly on (cx, cy) */}
                      {isSelected && (
                        <motion.circle
                          cx={region.point.x}
                          cy={region.point.y}
                          initial={{ r: 6, opacity: 0.8 }}
                          animate={{ r: [6, 20, 6], opacity: [0.8, 0.1, 0.8] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2.2,
                            ease: 'easeInOut'
                          }}
                          className="fill-[#8F3722]/35 dark:fill-[#F47A45]/45 pointer-events-none"
                        />
                      )}

                      {/* Visible circle on the body (NO transform:scale to prevent SVG origin drift) */}
                      <circle
                        cx={region.point.x}
                        cy={region.point.y}
                        r={isSelected ? 8.5 : 6.5}
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        className={
                          isSelected
                            ? 'fill-[#F47A45] stroke-white dark:stroke-[#080504] transition-colors'
                            : 'fill-[#8F3722] dark:fill-[#38BDF8] stroke-white dark:stroke-[#110B08] group-hover/dot:fill-[#C95832] dark:group-hover/dot:fill-[#67E8F9] group-hover/dot:stroke-[2.5px] transition-all'
                        }
                      />

                      {/* Small center core dot */}
                      <circle
                        cx={region.point.x}
                        cy={region.point.y}
                        r={2}
                        className="fill-white pointer-events-none"
                      />
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* Bottom Status Footnote */}
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-[#3D3532] dark:text-[#E2D7D1] font-semibold tracking-wide bg-white/85 dark:bg-black/65 px-3.5 py-1 rounded-full backdrop-blur-xs shadow-xs z-20">
              👉 Tocá los puntos en el cuerpo o las etiquetas
            </span>
          </div>
        </div>

        {/* Right: Somatic Decoding Card with Concrete Real-life Examples & Grounded Language */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRegion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-[28px] p-5 sm:p-7 bg-white/95 dark:bg-[#1E1512] border border-[#E8B8A6]/60 dark:border-white/10 shadow-md space-y-4"
            >
              {/* Category & Title */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8F3722] dark:text-[#E07853]">
                  {selectedRegion.category}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1A1412] dark:text-[#FFF7F2] mt-1">
                  {selectedRegion.name}
                </h3>
              </div>

              {/* Grounded & Concrete Biodecoding Insights */}
              <div className="space-y-3 pt-1">
                {/* 1. Biological Conflict */}
                <div className="p-4 rounded-2xl bg-[#FAF3EE] dark:bg-white/5 border border-[#E8B8A6]/40 dark:border-white/10">
                  <h4 className="text-sm font-bold text-[#8F3722] dark:text-[#E07853] mb-1 flex items-center gap-1.5">
                    <Activity className="w-4 h-4" />
                    <span>Sentido biológico del malestar:</span>
                  </h4>
                  <p className="text-sm sm:text-base text-[#1A1412] dark:text-[#EAE0D9] leading-relaxed font-medium">
                    {selectedRegion.conflict}
                  </p>
                </div>

                {/* 2. Concrete Everyday Example (Bajado a tierra) */}
                <div className="p-4 rounded-2xl bg-[#FFF9F5] dark:bg-[#251B17]/70 border border-[#E8B8A6]/50 dark:border-white/10">
                  <h4 className="text-sm font-bold text-[#C95832] dark:text-[#F47A45] mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>Ejemplo concreto de la vida cotidiana:</span>
                  </h4>
                  <p className="text-sm sm:text-base text-[#2E2420] dark:text-[#EAE0D9] leading-relaxed">
                    {selectedRegion.everydayExample}
                  </p>
                </div>

                {/* 3. Practical Relief & Reconnection Action */}
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300/50 dark:border-amber-800/40">
                  <h4 className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Pista de alivio y acción concreta:</span>
                  </h4>
                  <p className="text-sm sm:text-base text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
                    {selectedRegion.practicalRelief}
                  </p>
                </div>

                {/* 4. Reframe Affirmation */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#8F3722]/10 to-[#E8B8A6]/20 dark:from-[#E07853]/15 dark:to-transparent border border-[#8F3722]/20">
                  <h4 className="text-sm font-bold text-[#8F3722] dark:text-[#E07853] mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Mensaje de alivio para tu cuerpo:</span>
                  </h4>
                  <p className="text-base sm:text-lg font-bold italic text-[#1A1412] dark:text-white leading-snug">
                    "{selectedRegion.affirmation}"
                  </p>
                </div>
              </div>

              {/* Big, Easy-to-Click Action Buttons */}
              <div className="pt-3 border-t border-[#E8B8A6]/30 dark:border-white/10 flex flex-col sm:flex-row items-stretch gap-3">
                {/* Main Action: Go to Protocols to relieve this zone */}
                <button
                  type="button"
                  onClick={handleOpenExercise}
                  className="flex-1 min-h-[50px] py-3 px-5 rounded-2xl bg-[#8F3722] hover:bg-[#7A2818] active:scale-98 text-white text-sm sm:text-base font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Wind className="w-5 h-5" />
                  <span>Ver ejercicios para aliviar esta zona</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Secondary Action: Read detailed biological explanation */}
                <button
                  type="button"
                  onClick={() => onSelectSymptomSearch(selectedRegion.searchQuery)}
                  className="min-h-[50px] py-3 px-4 rounded-2xl bg-white dark:bg-white/10 hover:bg-neutral-100 dark:hover:bg-white/15 text-[#1A1412] dark:text-white text-xs sm:text-sm font-bold border border-[#E8B8A6]/70 dark:border-white/15 shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4 text-[#8F3722] dark:text-[#E07853]" />
                  <span>Leer explicación en diccionario</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
