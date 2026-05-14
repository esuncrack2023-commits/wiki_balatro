import { db } from "./firebase.js";
import { doc, setDoc } from "firebase/firestore";

const cartas = [];

/* ===== DATOS PERSONALIZADOS ===== */
const datos = {
    1: {
        nombre: "Comodín",
        categoria: "comun",
        desc: `<span class="multi">+4</span> multi por cada carta`
    },
    2: {
        nombre: "Comodín Codicioso",
        categoria: "comun",
        desc: `<span class="multi">+4</span> multi por cada carta de Diamante cuando anota`
    },
    3: {
        nombre: "Comodín lugurioso",
        categoria: "comun",
        desc: `<span class="multi">+3</span> multi por cada carta de Corazon cuando anota`
    },
    4: {
        nombre: "Comodín irascible",
        categoria: "comun",
        desc: `<span class="multi">+3</span> multi por cada carta de Espadas cuando anota`
    },

    5: {
        nombre: "Comodín gloton",
        categoria: "comun",
        desc: `<span class="multi">+3</span> multi por cada carta de Treboles cuando anota`
    },
    6: {
        nombre: "Comodín contento",
        categoria: "comun",
        desc: `<span class="multi">+8</span> multi si la mano contiene 1 <span class="resaltar">Pareja</span>`
    },
    7: {
        nombre: "Comodín chifado",
        categoria: "comun",
        desc: `<span class="multi">+12</span> multi si la mano contiene 1 <span class="resaltar">Trio</span>`
    },
    8: {
        nombre: "Comodín demente",
        categoria: "comun",
        desc: `<span class="multi">+10</span> multi si la mano contiene 1 <span class="resaltar">Doble Pareja</span>`
    },
    9: {
        nombre: "Comodín loco",
        categoria: "comun",
        desc: `<span class="multi">+12</span> multi si la mano contiene 1 <span class="resaltar">Escalera</span>`
    },
    10: {
        nombre: "Comodín gracioso",
        categoria: "comun",
        desc: `<span class="multi">+10</span> multi si la mano contiene 1 <span class="resaltar">Color</span>`
    },
    11: {
        nombre: "Comodín artero",
        categoria: "comun",
        desc: `<span class="fichas">+50</span> fichas si la mano contiene 1 <span class="resaltar">Pareja</span>`
    },
    12: {
        nombre: "Comodín taimado",
        categoria: "comun",
        desc: `<span class="fichas">+100</span> fichas si la mano contiene 1 <span class="resaltar">Trio</span>`
    },
    13: {
        nombre: "Comodín astuto",
        categoria: "comun",
        desc: `<span class="fichas">+80</span> fichas si la mano contiene 1 <span class="resaltar">Doble Pareja</span>`
    },
    14: {
        nombre: "Comodín ladino",
        categoria: "comun",
        desc: `<span class="fichas">+100</span> fichas si la mano contiene 1 <span class="resaltar">Escalera</span>`
    },
    15: {
        nombre: "Comodín mañoso",
        categoria: "comun",
        desc: `<span class="fichas">+80</span> fichas si la mano contiene 1 <span class="resaltar">Color</span>`
    },
    16: {
        nombre: "Medio comodin",
        categoria: "comun",
        desc: `<span class="multi">+20</span> multi si la mano contiene 1 <span class="resaltar">3</span> o menos cartas`
    },
    17: {
        nombre: "Plantilla de comodín",
        categoria: "inusual",
        desc: `<span class="multix">X1</span> multi por cada ranura de <span class="resaltar">comodin</span> vacia <br/> (Plantilla de comodin inculida)`
    },
    18: {
        nombre: "Cuatro dedos",
        categoria: "inusual",
        desc: `Los <span class="resaltar">colores</span> y las <span class="resaltar">escaleras</span> pueden hacerse con <span class="resaltar">4</span> cartas`
    },
    19: {
        nombre: "Mimo",
        categoria: "inusual",
        desc: `Reactiva todas las habilidades de las cartas <span class="resaltar">en las mano</span>`
    },
    20: {
        nombre: "Tarjeta de creditos",
        categoria: "comun",
        desc: `Adiquiere hasta<span class="multi"> -$20</span> de deuda`
    },
    21: {
        nombre: "Daga ceremonial",
        categoria: "inusual",
        desc: `Cuando se selecciona la <span class="resaltar">ciega</span>, destruye al comodin de la derecha y agrega para siempre el <span class="resaltar">doble</span> de valor de venta a este <span class="multi">multi</span>`
    },
    22: {
        nombre: "Estandarte",
        categoria: "comun",
        desc: `<span class="fichas">+30</span> fichas por cada <span class="resaltar">descarte restante</span>`
    },
    23: {
        nombre: "Cumbre mistica",
        categoria: "inusual",
        desc: `<span class="multi">+15</span> multi cuando hay <span class="resaltar">0</span> descartes restantes`
    },
    24: {
        nombre: "Comodin de mármol",
        categoria: "inusual",
        desc: `Agrega una carta de <span class="resaltar">piedra</span> a tu baraja al selecionar la  <span class="resaltar">ciega</span>`
    },
    25: {
        nombre: "Tarjeta de fidelizacion",
        categoria: "inusual",
        desc: `<span class="multix">X4</span> multi cada <span class="resaltar">6</span> manos jugadas`
    },
    26: {
        nombre: "Bola 8",
        categoria: "comun",
        desc: `<span class="posibilidad">1 de 4</span> probabilidaddes por cada  <span class="resaltar">8</span> jugado de crear una carta de <span class="tarot">tarot</span>`
    },
    27: {
        nombre: "Error de imprenta",
        categoria: "comun",
        desc: `<span class="multi">+ramdon</span> del 0 al 23`
    },
    28: {
        nombre: "Atardecer",
        categoria: "inusual",
        desc: `Reativa todas las cartas de puntos en la <span class="resaltar">ultima mano</span> de la ronda`
    },
    29: {
        nombre: "Puño en lo alto",
        categoria: "comun",
        desc: `Añade el  <span class="resaltar">doble</span> de la categoria de la carta con la categoria mas <span class="resaltar">mas baja</span> que tengas en la mano al multi`
    },
    30: {
        nombre: "Caos del payaso",
        categoria: "comun",
        desc: `<span class="resaltar">1</span> <span class="posibilidad">cambios gratuitos</span>por la tienda`
    },
    31: {
        nombre: "Fibonacci",
        categoria: "inusual",
        desc: `<span class="multi">+8</span> multi por cada <span class="resaltar">as</span>, <span class="resaltar">2</span>, <span class="resaltar">3</span>, <span class="resaltar">5</span>, u <span class="resaltar">8</span> cuando anotan`
    },
    32: {
        nombre: "Comodin de acero",
        categoria: "inusual",
        desc: `Otorga un multil <span class="multix">X0.2</span>por cada <span class="resaltar>carta de acero</span> en la <span class="resaltar>baraja completa</span>`
    },
    33: {
        nombre: "Cara aterradora",
        categoria: "comun",
        desc: `Las cartas de <span class="resaltar">figuras</span> otorgan <span class="fichas">+30</span> fichas cuando anotan`
    },
    34: {
        nombre: "Comodin abstracto",
        categoria: "comun",
        desc: `<span class="multi">+3</span> multi por cada carta de <span class="resaltar">comodin</span>`
    },
    35: {
        nombre: "Satisfaccion retrasada",
        categoria: "comun",
        desc: `Gana <span class="dinero">$2</span> por <span class="resaltar">descarte</span> si no se uso para ninguno al final de la ronda`
    },
    36: {
        nombre: "Comediante",
        categoria: "inusual",
        desc: `Reactiva cada <span class="resaltar">2</span>, <span class="resaltar">3</span>, <span class="resaltar">4</span> y <span class="resaltar">5</span> cuando se jugado`
    },
    37: {
        nombre: "Pareidolia",
        categoria: "inusual",
        desc: `Todas las cartas se consideran de <span class="resaltar">figuras</span>`
    },
    38: {
        nombre: "Banano",
        categoria: "comun",
        desc: `<span class="multi">+15</span> multi <span class="posibilidad">1 en 6</span> de que la carta se destruya al final de la ronda`
    },
    39: {
        nombre: "Pares",
        categoria: "comun",
        desc: `Las cartas jugadas de categoría <span class="resaltar">par</span> otorgan <span class="multi">+4</span> Multi cuando anotan <br/> (10, 8, 6, 4, 2)`
    },

    40: {
        nombre: "Nones",
        categoria: "comun",
        desc: `Las cartas jugadas de categoría <span class="resaltar">inpar</span> otorgan <span class="multi">+4</span> Multi cuando anotan <br/> (A, 9, 7, 5, 3)`
    },

    41: {
        nombre: "Erudito",
        categoria: "comun",
        desc: `Los <span class="resaltar">as</span> otorgan <span class="fichas">+20</span> fichas y <span class="multi">+4</span> Multi cuando anotan`
    },
    42: {
        nombre: "Tarjeta de presentacion",
        categoria: "comun",
        desc: `Las cartas de <span class="resaltar">figuras</span> tienen <span class="pobalidad">1 en 2</span> probabilidades de otorgar <span class="dinero">$2</span> cuando anotan`
    },
    43: {
    nombre: "Supernova",
    categoria: "comun",
    desc: `Añade <span class="multi">+Multi</span> igual al número de veces que esa mano de póker ha sido jugada en esta partida`
    },
    44: {
    nombre: "Al autobús",
    categoria: "comun",
    desc: `Este comodín gana <span class="multi">+1 Multi</span> por cada mano consecutiva jugada sin cartas de <span class="resaltar">figura</span>`
    },
    45: {
    nombre: "Comodín espacial",
    categoria: "inusual",
    desc: `Tiene <span class="posibilidad">1 en 4</span> probabilidades de mejorar el nivel de la mano de póker jugada`
    },
    46: {
    nombre: "Huevo",
    categoria: "comun",
    desc: `Gana <span class="dinero">$3</span> de valor de venta al final de cada ronda`
    },
    47: {
    nombre: "Ladrón",
    categoria: "insual",
    desc: `Al seleccionar una <span class="resaltar">ciega</span>, ganas <span class="resaltar">+3 manos</span> y pierdes todos los descartes`
    },
    48: {
    nombre: "Pizarra",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X3 Multi</span> si todas las cartas en mano son <span class="resaltar">picas</span> o <span class="resaltar">tréboles</span>`
    },
    49: {
    nombre: "Corredor",
    categoria: "comun",
    desc: `Gana <span class="fichas">+15 fichas</span> si la mano jugada contiene una <span class="resaltar">escalera</span>`
    },
    50: {
    nombre: "Helado",
    categoria: "comun",
    desc: `Otorga <span class="fichas">+100 fichas</span>, pero pierde <span class="fichas">-5 fichas</span> por cada mano jugada`
    },
    51: {
    nombre: "ADN",
    categoria: "inusual",
    desc: `Si la primera mano de la ronda tiene solo <span class="resaltar">1 carta</span>, crea una copia permanente de esa carta en tu mazo`
    },
    52: {
    nombre: "Splash",
    categoria: "comun",
    desc: `Cada carta jugada cuenta para puntuar`
    },
    53: {
    nombre: "Joker azul",
    categoria: "comun",
    desc: `Otorga <span class="fichas">+Fichas</span> igual al número de cartas restantes en el mazo`
    },
    54: {
    nombre: "Sexto sentido",
    categoria: "inusual",
    desc: `Al descartar una única carta, tiene <span class="posibilidad">1 en 4</span> probabilidades de crear una carta <span class="tarot">Espectral</span>`
    },
    55: {
    nombre: "Constelación",
    categoria: "inusual",
    desc: `Gana <span class="multix">X0.1 Multi</span> cada vez que usas una carta de <span class="tarot">Planeta</span>`
    },
    56: {
    nombre: "Caminante",
    categoria: "comun",
    desc: `Otorga <span class="multi">+Multi</span> si la mano jugada contiene un <span class="resaltar">10</span> y un <span class="resaltar">4</span>`
    },
    57: {
    nombre: "Joker sin rostro",
    categoria: "comun",
    desc: `Ganas <span class="dinero">$5</span> si descartas <span class="resaltar">3 o más cartas de figura</span> al mismo tiempo`
    },
    58: {
    nombre: "Joker verde",
    categoria: "comun",
    desc: `Gana <span class="multi">+1 Multi</span> por cada mano jugada sin usar descartes`
    },
    59: {
    nombre: "Superposición",
    categoria: "inusual",
    desc: `Crea una carta de <span class="tarot">Tarot</span> si la mano contiene una <span class="resaltar">escalera</span> con un <span class="resaltar">As</span>`
    },
    60: {
    nombre: "Lista de tareas",
    categoria: "comun",
    desc: `Ganas <span class="dinero">$4</span> si la mano jugada coincide con la mano objetivo actual`
    },
    61: {
    nombre: "Cavendish",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X3 Multi</span>, pero tiene <span class="posibilidad">1 en 6</span> probabilidades de destruirse al final de la ronda`
    },
    62: {
    nombre: "Fullero",
    categoria: "comun",
    desc: `Otorga <span class="multix">X3 Multi</span> si la mano jugada ya fue jugada anteriormente en esta ronda`
    },
    63: {
    nombre: "Carta roja",
    categoria: "comun",
    desc: `Gana <span class="multi">+3 Multi</span> cada vez que omites un paquete`
    },
    64: {
    nombre: "Madness",
    categoria: "inusual",
    desc: `Al seleccionar una <span class="resaltar">ciega</span>, gana <span class="multix">X0.5 Multi</span> y destruye un comodín aleatorio`
    },
    65: {
    nombre: "Joker cuadrado",
    categoria: "comun",
    desc: `Gana <span class="fichas">+4 fichas</span> si la mano jugada tiene exactamente <span class="resaltar">4 cartas</span>`
    },
    66: {
    nombre: "Séance",
    categoria: "inusual",
    desc: `Crea una carta <span class="tarot">Espectral</span> si la mano jugada es una <span class="resaltar">escalera real</span>`
    },
    67: {
    nombre: "Riff-Raff",
    categoria: "comun",
    desc: `Al seleccionar una <span class="resaltar">ciega</span>, crea <span class="resaltar">2 comodines comunes</span>`
    },
    68: {
    nombre: "Vampiro",
    categoria: "inusual",
    desc: `Gana <span class="multix">X0.1 Multi</span> por cada carta mejorada anotada y elimina sus mejoras`
    },
    69: {
    nombre: "Atajo",
    categoria: "inusual",
    desc: `Permite formar <span class="resaltar">escaleras</span> con huecos de rango`
    },
    70: {
    nombre: "Holograma",
    categoria: "inusual",
    desc: `Gana <span class="multix">X0.25 Multi</span> cada vez que se añade una carta al mazo`
    },
    71: {
    nombre: "Vagabundo",
    categoria: "inusual",
    desc: `Si tienes <span class="dinero">$4</span> o menos, crea una carta de <span class="tarot">Tarot</span> al final de la ronda`
    },
    72: {
    nombre: "Barón",
    categoria: "inusual",
    desc: `Cada <span class="resaltar">Rey</span> en mano otorga <span class="multix">X1.5 Multi</span>`
    },
    73: {
    nombre: "Nube 9",
    categoria: "comun",
    desc: `Ganas <span class="dinero">$1</span> por cada <span class="resaltar">9</span> en tu mazo al final de la ronda`
    },
    74: {
    nombre: "Cohete",
    categoria: "inusual",
    desc: `Gana <span class="dinero">$1</span> al final de la ronda. Aumenta en <span class="dinero">$2</span> cada vez que derrotas una <span class="resaltar">ciega jefe</span>`
    },
    75: {
    nombre: "Obelisco",
    categoria: "inusual",
    desc: `Gana <span class="multix">X0.2 Multi</span> por cada mano jugada que no sea tu mano más usada`
    },
        76: {
    nombre: "Máscara de Midas",
    categoria: "inusual",
    desc: `Las cartas de <span class="resaltar">figura</span> se convierten en cartas <span class="resaltar">doradas</span> al anotar`
    },
    77: {
    nombre: "Luchador",
    categoria: "inusual",
    desc: `Desactiva la habilidad de la <span class="resaltar">ciega jefe</span>`
    },
    78: {
    nombre: "Fotografía",
    categoria: "comun",
    desc: `La primera carta de <span class="resaltar">figura</span> anotada otorga <span class="multix">X2 Multi</span>`
    },
    79: {
    nombre: "Carta de regalo",
    categoria: "comun",
    desc: `Añade <span class="dinero">$1</span> al valor de venta de cada comodín y consumible al final de la ronda`
    },
    80: {
    nombre: "Frijol tortuga",
    categoria: "comun",
    desc: `Otorga <span class="resaltar">+5 tamaño de mano</span>, pierde <span class="resaltar">-1 tamaño de mano</span> por cada ronda`
    },
    81: {
    nombre: "Erosión",
    categoria: "inusual",
    desc: `Otorga <span class="multi">+Multi</span> por cada carta faltante en tu mazo`
    },
    82: {
    nombre: "Estacionamiento reservado",
    categoria: "comun",
    desc: `Las cartas de <span class="resaltar">figura</span> en mano tienen <span class="posibilidad">1 en 2</span> probabilidades de otorgar <span class="dinero">$1</span>`
    },
    83: {
    nombre: "Reembolso por correo",
    categoria: "comun",
    desc: `Ganas <span class="dinero">$5</span> si descartas cartas del rango solicitado`
    },
    84: {
    nombre: "Hasta la luna",
    categoria: "inusual",
    desc: `Aumenta los <span class="dinero">intereses</span> ganados al final de la ronda`
    },
    85: {
    nombre: "Alucinación",
    categoria: "comun",
    desc: `Tiene <span class="posibilidad">1 en 2</span> probabilidades de crear una carta de <span class="tarot">Tarot</span> al abrir un paquete`
    },
    86: {
    nombre: "Adivino",
    categoria: "comun",
    desc: `Gana <span class="multi">+1 Multi</span> cada vez que usas una carta de <span class="tarot">Tarot</span>`
    },
    87: {
    nombre: "Malabarista",
    categoria: "comun",
    desc: `Otorga <span class="resaltar">+1 mano</span>`
    },
    88: {
    nombre: "Borracho",
    categoria: "comun",
    desc: `Otorga <span class="resaltar">+1 descarte</span>`
    },
    89: {
    nombre: "Joker de piedra",
    categoria: "comun",
    desc: `Gana <span class="fichas">+Fichas</span> por cada carta de <span class="resaltar">piedra</span> en tu mazo`
    },
    90: {
    nombre: "Joker dorado",
    categoria: "comun",
    desc: `Gana <span class="dinero">$4</span> al final de la ronda`
    },
    91: {
    nombre: "Gato de la suerte",
    categoria: "inusual",
    desc: `Gana <span class="multix">X0.25 Multi</span> cada vez que se activa una carta <span class="resaltar">de suerte</span>`
    },
    92: {
    nombre: "Carta de béisbol",
    categoria: "inusual",
    desc: `Los comodines <span class="resaltar">comunes</span> otorgan <span class="multix">X1.5 Multi</span>`
    },
    93: {
    nombre: "Toro",
    categoria: "inusual",
    desc: `Otorga <span class="fichas">+Fichas</span> igual a la cantidad de <span class="dinero">$</span> que tienes`
    },
    94: {
    nombre: "Cola dietética",
    categoria: "comun",
    desc: `Crea un comodín gratis al vender esta carta`
    },
    95: {
    nombre: "Carta comercial",
    categoria: "comun",
    desc: `Si la primera mano tiene una sola carta, destrúyela y gana <span class="dinero">$3</span>`
    },
    96: {
    nombre: "Carta flash",
    categoria: "comun",
    desc: `Gana <span class="multi">+2 Multi</span> cada vez que haces <span class="resaltar">reroll</span> en la tienda`
    },
    97: {
    nombre: "Palomitas",
    categoria: "comun",
    desc: `Otorga <span class="multi">+20 Multi</span>, pierde <span class="multi">-4 Multi</span> al final de la ronda`
    },
    98: {
    nombre: "Pantalones de repuesto",
    categoria: "comun",
    desc: `Gana <span class="multi">+2 Multi</span> si la mano jugada contiene <span class="resaltar">doble par</span>`
    },
    99: {
    nombre: "Joker antiguo",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X1.5 Multi</span> para un <span class="resaltar">palo</span> distinto cada ronda`
    },
    100: {
    nombre: "Ramen",
    categoria: "comun",
    desc: `Otorga <span class="multix">X2 Multi</span>, pierde <span class="multix">-0.01 Multi</span> por cada carta descartada`
    },
    101: {
    nombre: "Walkie Talkie",
    categoria: "comun",
    desc: `Las cartas <span class="resaltar">10</span> y <span class="resaltar">4</span> otorgan <span class="multi">+Multi</span>`
    },
    102: {
    nombre: "Seltzer",
    categoria: "comun",
    desc: `Reactiva todas las cartas jugadas durante las siguientes <span class="resaltar">10 manos</span>`
    },
    103: {
    nombre: "Castillo",
    categoria: "inusual",
    desc: `Gana <span class="fichas">+Fichas</span> al descartar cartas de un <span class="resaltar">palo específico</span>`
    },
    104: {
    nombre: "Cara sonriente",
    categoria: "comun",
    desc: `Las cartas de <span class="resaltar">figura</span> otorgan <span class="multi">+Multi</span>`
    },
    105: {
    nombre: "Fogata",
    categoria: "inusual",
    desc: `Gana <span class="multix">X0.25 Multi</span> cada vez que vendes una carta`
    },
    106: {
    nombre: "Billete de oro",
    categoria: "comun",
    desc: `Ganas <span class="dinero">$4</span> por cada carta <span class="resaltar">dorada</span> jugada`
    },
    107: {
    nombre: "Sr. Huesos",
    categoria: "inusual",
    desc: `Evita la muerte si las fichas obtenidas son al menos el <span class="resaltar">25%</span> de la puntuación requerida. Se destruye después`
    },
    108: {
    nombre: "Acróbata",
    categoria: "comun",
    desc: `Otorga <span class="multix">X3 Multi</span> en la <span class="resaltar">última mano</span> de la ronda`
    },
    109: {
    nombre: "Tragicomedia",
    categoria: "inusual",
    desc: `Las cartas de <span class="resaltar">figura</span> se reactivan una vez`
    },
    110: {
    nombre: "Aventurero",
    categoria: "inusual",
    desc: `Gana <span class="multix">X0.25 Multi</span> por cada comodín que tengas`
    },
    111: {
    nombre: "Trovador",
    categoria: "inusual",
    desc: `Otorga <span class="resaltar">+2 tamaño de mano</span>, pero <span class="resaltar">-1 mano</span>`
    },
    112: {
    nombre: "Certificado",
    categoria: "inusual",
    desc: `Al iniciar la ronda, añade una carta con <span class="resaltar">sello</span> a tu mazo`
    },
    113: {
    nombre: "Comodín borroso",
    categoria: "inusual",
    desc: `Todos los <span class="resaltar">palos</span> se consideran iguales (rojo/negro)`
    },
    114: {
    nombre: "Retro",
    categoria: "inusual",
    desc: `Gana <span class="multix">X0.25 Multi</span> cada vez que omites una <span class="resaltar">ciega</span>`
    },
    115: {
    nombre: "Papel perforado",
    categoria: "comun",
    desc: `Reactiva la <span class="resaltar">primera carta</span> jugada`
    },
    116: {
    nombre: "Gema en bruto",
    categoria: "inusual",
    desc: `Las cartas de <span class="resaltar">diamantes</span> otorgan <span class="dinero">$1</span> cuando anotan`
    },
    117: {
    nombre: "Heliotropo",
    categoria: "inusual",
    desc: `Las cartas de <span class="resaltar">corazones</span> otorgan <span class="multix">X1.5 Multi</span>`
    },
    118: {
    nombre: "Punta de flecha",
    categoria: "inusual",
    desc: `Las cartas de <span class="resaltar">picas</span> otorgan <span class="fichas">+Fichas</span>`
    },
    119: {
    nombre: "Ágata ónix",
    categoria: "inusual",
    desc: `Las cartas de <span class="resaltar">tréboles</span> otorgan <span class="multix">X1.5 Multi</span>`
    },
    120: {
    nombre: "Comodín de vidrio",
    categoria: "inusual",
    desc: `Gana <span class="multix">X0.25 Multi</span> cada vez que una carta de <span class="resaltar">vidrio</span> se rompe`
    },
    121: {
    nombre: "Jefe de pista",
    categoria: "inusual",
    desc: `Permite que aparezcan duplicados de comodines en la tienda`
    },
    122: {
    nombre: "Florero",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X3 Multi</span> si la mano contiene los <span class="resaltar">4 palos</span>`
    },
    123: {
    nombre: "Plano",
    categoria: "inusual",
    desc: `Copia el efecto del comodín a la <span class="resaltar">derecha</span>`
    },
    124: {
    nombre: "Comodín pequeño",
    categoria: "comun",
    desc: `Gana <span class="multix">X0.1 Multi</span> por cada carta de valor bajo jugada`
    },
    125: {
    nombre: "Loco por el circo",
    categoria: "inusual",
    desc: `Duplica los valores de todas las <span class="posibilidad">probabilidades</span>`
    },
    126: {
    nombre: "Solo seises",
    categoria: "inusual",
    desc: `Duplica todas las <span class="posibilidad">probabilidades</span> del juego`
    },
    127: {
    nombre: "El ídolo",
    categoria: "inusual",
    desc: `Una carta seleccionada otorga <span class="multix">X2 Multi</span> cuando anota`
    },
    128: {
    nombre: "Visión doble",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X2 Multi</span> si la mano contiene cartas de <span class="resaltar">dos palos distintos</span>`
    },
    129: {
    nombre: "Torero",
    categoria: "inusual",
    desc: `Gana <span class="dinero">$8</span> al derrotar una <span class="resaltar">ciega jefe</span>`
    },
    130: {
    nombre: "Al camino",
    categoria: "inusual",
    desc: `Gana <span class="multix">X0.5 Multi</span> por cada <span class="resaltar">Jota</span> descartada en esta ronda`
    },
    131: {
    nombre: "El dúo",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X2 Multi</span> si la mano es un <span class="resaltar">par</span>`
    },
    132: {
    nombre: "El trío",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X3 Multi</span> si la mano es un <span class="resaltar">trío</span>`
    },
    133: {
    nombre: "La familia",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X4 Multi</span> si la mano es un <span class="resaltar">full house</span>`
    },
    134: {
    nombre: "La orden",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X3 Multi</span> si la mano es una <span class="resaltar">escalera</span>`
    },
    135: {
    nombre: "La tribu",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X2 Multi</span> si la mano es un <span class="resaltar">color</span>`
    },
    136: {
    nombre: "Doble de riesgo",
    categoria: "inusual",
    desc: `Otorga <span class="fichas">+Fichas</span> masivas, pero reduce el <span class="resaltar">tamaño de mano</span>`
    },
    137: {
    nombre: "Comodín invisible",
    categoria: "inusual",
    desc: `Después de <span class="resaltar">2 rondas</span>, se vende para duplicar un comodín aleatorio`
    },
    138: {
    nombre: "Lluvia de ideas",
    categoria: "inusual",
    desc: `Copia el efecto del comodín más a la <span class="resaltar">izquierda</span>`
    },
    139: {
    nombre: "Satélite",
    categoria: "inusual",
    desc: `Gana <span class="dinero">$1</span> por cada carta <span class="tarot">Planeta</span> única usada en la partida`
    },
    140: {
    nombre: "Disparo a la luna",
    categoria: "inusual",
    desc: `Las <span class="resaltar">Reinas</span> en mano otorgan <span class="multi">+Multi</span>`
    },
    141: {
    nombre: "Permiso de conducir",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X3 Multi</span> si tienes al menos <span class="resaltar">16 cartas mejoradas</span> en el mazo`
    },
    142: {
    nombre: "Cartomante",
    categoria: "inusual",
    desc: `Crea una carta de <span class="tarot">Tarot</span> al seleccionar una <span class="resaltar">ciega</span>`
    },
    143: {
    nombre: "Astrónomo",
    categoria: "inusual",
    desc: `Las cartas de <span class="tarot">Planeta</span> son gratis`
    },
    144: {
    nombre: "Comodín quemado",
    categoria: "inusual",
    desc: `Mejora el nivel de la primera mano descartada en cada ronda`
    },
    145: {
    nombre: "Botas",
    categoria: "inusual",
    desc: `Otorga <span class="multix">X2 Multi</span> si tienes <span class="dinero">$0</span>`
    },
    146: {
    nombre: "Canio",
    categoria: "legendario",
    desc: `Gana <span class="multix">X1 Multi</span> cada vez que destruyes una carta de <span class="resaltar">figura</span>`
    },
    147: {
    nombre: "Triboulet",
    categoria: "legendario",
    desc: `Las cartas de <span class="resaltar">Rey</span> y <span class="resaltar">Reina</span> otorgan <span class="multix">X2 Multi</span>`
    },
    148: {
    nombre: "Yorick",
    categoria: "legendario",
    desc: `Gana <span class="multix">X1 Multi</span> cada <span class="resaltar">23 cartas descartadas</span>`
    },
    149: {
    nombre: "Chicot",
    categoria: "legendario",
    desc: `Desactiva el efecto de la <span class="resaltar">ciega jefe</span>`
    },
    150: {
    nombre: "Perkeo",
    categoria: "legendario",
    desc: `Crea una copia negativa de un consumible al final de la tienda`
    }














};




async function subirDatos() {

  for (const id in datos) {

    try {

      await setDoc(
        doc(db, "comodines", id),
        {
          ...datos[id],
          orden: Number(id)
        }
      );

      console.log(`Comodín ${id} subido`);

    } catch (error) {

      console.error(`Error con ${id}:`, error);

    }

  }

  console.log("TODO TERMINADO 🚀");
}

subirDatos();

