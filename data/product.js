const categorylist = ["Todos", "Electrodomesticos", "Herramientas", "Cocina", "Limpieza", "Hogar", "Dia a dia"]

const data = [
    {
        id: 1,
        name: "Licuadora Oster Pro",
        url: "https://osterla.vteximg.com.br/arquivos/ids/159147-700-700/BLSTBPST-1B.jpg?v=638873199169070000/",
        price: 239000,
        category: ["Electrodomesticos", "Cocina"],
        short_description: "Licuadora potente de 600W con vaso de vidrio.",
        long_description: "La licuadora Oster Pro está diseñada para ofrecer resultados profesionales en el hogar. Su motor de 600W y sus cuchillas de acero inoxidable pueden triturar hielo, frutas congeladas y todo tipo de ingredientes duros con facilidad. El vaso de vidrio de alta resistencia soporta cambios bruscos de temperatura, ideal para preparar desde batidos fríos hasta sopas calientes. Incluye control de velocidades, tapa hermetica y diseño desmontable para una limpieza sencilla, convirtiendose en un aliado duradero y versátil en la cocina moderna.",
        stack: 5
    },
    {
        id: 2,
        name: "Destornillador Philips",
        url: "https://cdn1.totalcommerce.cloud/metropolis/product-zoom/es/destornillador-punta-phillips-%232-4-%28stht69145%29-stanley-2.webp",
        price: 12000,
        category: ["Herramientas"],
        short_description: "Destornillador de punta cruz tamaño mediano.",
        long_description: "Fabricado con acero templado de alta resistencia, el destornillador Philips está diseñado para durar años sin perder su forma o filo. Su mango ergonómico con superficie antideslizante garantiza un agarre firme incluso en condiciones húmedas o grasosas. Ideal para trabajos electricos, mecánicos o domesticos, su tamaño mediano lo hace adecuado para una amplia variedad de tornillos. Un básico indispensable en cualquier caja de herramientas por su durabilidad y precisión.",
        stack: 5
    },
    {
        id: 3,
        name: "Aspiradora inalámbrica",
        url: "https://electroluxco.vtexassets.com/arquivos/ids/160236/ergorapido-erg24n.jpg?v=637644814285430000",
        price: 459000,
        category: ["Electrodomesticos", "Limpieza"],
        short_description: "Aspiradora ligera sin cable con bateria recargable.",
        long_description: "Esta aspiradora inalámbrica combina potencia y comodidad para facilitar la limpieza diaria. Su diseño ergonómico y su bajo peso permiten maniobrarla fácilmente por toda la casa, alcanzando rincones, escaleras y debajo de los muebles. La bateria de litio ofrece hasta 40 minutos de autonomia continua, mientras que su filtro HEPA retiene partículas finas de polvo y alergenos, mejorando la calidad del aire. Además, su sistema de vaciado higienico evita el contacto con la suciedad, haciendola práctica, segura y moderna.",
        stack: 5
    },
    {
        id: 4,
        name: "Cuchillo de chef",
        url: "https://cuisinart.com.co/cdn/shop/products/15479.jpg?v=1640269120",
        price: 58000,
        category: ["Cocina", "Hogar"],
        short_description: "Cuchillo de acero inoxidable de alta precisión.",
        long_description: "El cuchillo de chef de 8 pulgadas es una herramienta esencial en cualquier cocina, tanto profesional como domestica. Su hoja de acero inoxidable alemán proporciona un filo duradero y resistente a la corrosión, mientras que su mango ergonómico reduce la fatiga durante el uso prolongado. Perfecto para cortar carnes, vegetales, frutas y hierbas con precisión. Su equilibrio entre peso y longitud permite un control excepcional en cada corte, garantizando seguridad, eficiencia y elegancia en la preparación de alimentos.",
        stack: 5
    },
    {
        id: 5,
        name: "Silla ergonómica de oficina",
        url: "https://moblihouse.com/wp-content/uploads/2024/09/silla-gerente-deluxe-negra-giratoria-ergonomica-reposabrazos-8dcd1d11-94c9-4c22-b032-22f7b3f0763f.jpg",
        price: 389000,
        category: ["Hogar", "Dia a dia"],
        short_description: "Silla con soporte lumbar ajustable y ruedas suaves.",
        long_description: "Esta silla ergonómica ha sido diseñada para ofrecer el máximo confort durante largas jornadas de trabajo o estudio. Su respaldo de malla transpirable mantiene una ventilación constante, evitando la acumulación de calor. El soporte lumbar ajustable se adapta a la curvatura natural de la espalda, previniendo dolores posturales. Además, su asiento acolchado de espuma de alta densidad distribuye el peso de manera uniforme. Su base metálica con ruedas de nylon permite movilidad fluida en todo tipo de suelos, convirtiendola en una excelente inversión para la salud postural.",
        stack: 5
    },
    {
        id: 6,
        name: "Plancha a vapor Philips",
        url: "https://images.philips.com/is/image/philipsconsumer/vrs_2ea98c1e6c5eae94a26de5f73588486c397dd4a8?$pnglarge$&wid=1250",
        price: 189000,
        category: ["Electrodomesticos", "Limpieza"],
        short_description: "Plancha con suela antiadherente y vapor continuo.",
        long_description: "La plancha Philips EasySpeed combina tecnologia y practicidad para facilitar el planchado diario. Su suela cerámica antiadherente se desliza suavemente sobre todo tipo de telas, distribuyendo el calor de manera uniforme. El sistema de vapor continuo elimina las arrugas más difíciles sin esfuerzo, y su función de golpe de vapor es ideal para prendas gruesas. Incluye control de temperatura preciso, depósito transparente de agua y función antigoteo. Su diseño moderno garantiza resultados profesionales con menos tiempo y esfuerzo.",
        stack: 5
    },
    {
        id: 7,
        name: "Juego de ollas antiadherentes",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-WcGIjt6RDhxQd_F45qXmyvwoxx-VjDA8uw&s",
        price: 299000,
        category: ["Cocina"],
        short_description: "Set de 5 ollas con tapa de vidrio templado.",
        long_description: "Este juego de ollas antiadherentes está fabricado con materiales de alta calidad para garantizar durabilidad y seguridad alimentaria. El recubrimiento interior libre de PFOA evita que los alimentos se peguen, facilitando la limpieza sin necesidad de aceites excesivos. Las tapas de vidrio templado permiten supervisar la cocción sin perder calor, y los mangos resistentes al calor brindan un agarre seguro. Perfecto para preparar guisos, sopas y salsas, este set aporta practicidad, estetica y rendimiento a cualquier cocina moderna.",
        stack: 5
    },
    {
        id: 8,
        name: "Martillo de carpintero",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmpBoUD_6rwT4zxb7UBmT59m7vsM5cWyPMDw&s",
        price: 23000,
        category: ["Herramientas", "Hogar"],
        short_description: "Martillo de acero con mango de goma antideslizante.",
        long_description: "El martillo de carpintero es una herramienta esencial para todo tipo de trabajos de construcción, reparación o bricolaje. Su cabeza de acero endurecido proporciona gran fuerza de impacto sin deformarse, mientras que su mango de goma ergonómico absorbe las vibraciones para un uso más cómodo y seguro. Su equilibrio entre peso y tamaño permite un control óptimo tanto en clavos pequeños como en estructuras más resistentes. Ideal para uso profesional o domestico.",
        stack: 5
    },
    {
        id: 9,
        name: "Cafetera italiana de aluminio",
        url: "https://cdn1.totalcommerce.cloud/homesentry/product-zoom/es/cafetera-italiana-expressions-hf4_2-6tz-aluminio-negra-1.webp",
        price: 54000,
        category: ["Cocina", "Dia a dia"],
        short_description: "Cafetera clásica de 6 tazas.",
        long_description: "Esta cafetera italiana de aluminio recupera el sabor tradicional del cafe hecho al fuego. Su cuerpo de aluminio fundido distribuye el calor uniformemente, permitiendo una extracción completa del aroma y sabor. El mango resistente al calor y la válvula de seguridad integrada la hacen segura y duradera. Perfecta para preparar cafe fuerte y aromático en minutos, compatible con cocinas de gas y electricas. Un clásico atemporal para los amantes del buen cafe.",
        stack: 5
    },
    {
        id: 10,
        name: "Escoba multiusos con recogedor",
        url: "https://m.media-amazon.com/images/I/61dzDyfH11L._UF1000,1000_QL80_.jpg",
        price: 22000,
        category: ["Limpieza", "Hogar"],
        short_description: "Escoba con cerdas firmes y recogedor ajustado.",
        long_description: "Fabricada con materiales duraderos, esta escoba multiusos está diseñada para barrer polvo, migas y residuos grandes tanto en interiores como en exteriores. Sus cerdas firmes, pero flexibles, atrapan fácilmente la suciedad, mientras que el recogedor con borde de goma evita que el polvo se escape. Ideal para pisos cerámicos, madera o cemento. Su diseño ergonómico con mango largo reduce el esfuerzo en la espalda, ofreciendo limpieza rápida y eficiente.",
        stack: 5
    },
    {
        id: 11,
        name: "Taladro inalámbrico Bosch",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjaep-LtAkjjPq6Y9Gm3h-LPAdvq3USE6vjg&s",
        price: 479000,
        category: ["Herramientas", "Electrodomesticos"],
        short_description: "Taladro recargable de 12V con kit de brocas.",
        long_description: "El taladro inalámbrico Bosch combina potencia y precisión en un formato compacto. Su bateria de litio de 12V proporciona gran autonomia y carga rápida. Incluye control de velocidad variable, función de reversa y luz LED para trabajar en espacios con poca iluminación. El kit de brocas intercambiables permite perforar madera, metal y plástico con facilidad. Ideal para profesionales o aficionados al bricolaje que buscan fiabilidad, comodidad y tecnologia alemana en una sola herramienta.",
        stack: 5
    },
    {
        id: 12,
        name: "Set de toallas de algodón",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJegaqnygEl8jP_x-rNfAxtvGRF6g-eqzFNg&s",
        price: 89000,
        category: ["Hogar"],
        short_description: "Juego de 3 toallas suaves y absorbentes.",
        long_description: "Este set de toallas está elaborado con algodón 100% peinado, lo que garantiza una textura extra suave al tacto y una excelente capacidad de absorción. Su confección con fibras de alta densidad las hace resistentes al uso diario y a los lavados frecuentes sin perder color ni volumen. Son ideales tanto para baño personal como para invitados, ofreciendo una experiencia de confort y lujo. Además, su diseño moderno y colores neutros combinan perfectamente con cualquier estilo de baño.",
        stack: 5
    },
    {
        id: 13,
        name: "Microondas Samsung 20L",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd5aQDEtc_jv_Rfzpa43JI6qMrvb0kIX35ng&s",
        price: 499000,
        category: ["Electrodomesticos", "Cocina"],
        short_description: "Microondas compacto con descongelado rápido.",
        long_description: "El microondas Samsung de 20 litros ofrece un rendimiento confiable y eficiente para el uso diario. Con funciones automáticas para calentar, cocinar o descongelar, este Electrodomesticos reduce el tiempo en la cocina sin comprometer la calidad de los alimentos. Su interior de esmalte cerámico es resistente a rayones y facilita la limpieza. Incluye panel digital con temporizador y niveles de potencia ajustables. Perfecto para hogares modernos con espacios reducidos y rutinas dinámicas.",
        stack: 5
    },
    {
        id: 14,
        name: "Trapero con balde escurridor",
        url: "https://puntoscolombia.vtexassets.com/arquivos/ids/30307955-800-auto?v=638951078430670000&width=800&height=auto&aspect=true",
        price: 76000,
        category: ["Limpieza"],
        short_description: "Trapero giratorio con sistema de escurrido fácil.",
        long_description: "El trapero con balde escurridor facilita la limpieza del hogar con su sistema giratorio que elimina el exceso de agua sin esfuerzo. Su cabezal de microfibra absorbe líquidos y atrapa polvo y cabello con gran eficiencia. El balde está fabricado en plástico resistente con un mecanismo de escurrido duradero y suave al uso. Ideal para pisos de cerámica, mármol o madera, este sistema permite limpiar sin agacharse ni ensuciarse las manos, ofreciendo higiene y practicidad al mismo tiempo.",
        stack: 5
    },
    {
        id: 15,
        name: "Cuchara medidora de acero",
        url: "https://i5.walmartimages.cl/asr/ec9243b5-b993-49cf-aaf1-827eca27c38f.c372dd24b225557a78176269e4cfc8f0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        price: 18000,
        category: ["Cocina"],
        short_description: "Set de 5 cucharas medidoras de acero inoxidable.",
        long_description: "Este juego de cucharas medidoras de acero inoxidable es un aliado indispensable para la reposteria y la cocina precisa. Cada cuchara tiene grabada su medida exacta y está unida por un anillo desmontable que permite mantenerlas juntas. Resistentes a la oxidación, ligeras y aptas para lavavajillas, su diseño elegante las hace perfectas tanto para uso domestico como profesional. Garantizan resultados consistentes en cada receta, evitando errores de proporción en tus preparaciones.",
        stack: 5
    },
    {
        id: 16,
        name: "Lámpara de escritorio LED",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8uEwDq8pXpHD9zWxctlIDdlgq0u1VK3ukPQ&s",
        price: 129000,
        category: ["Hogar", "Dia a dia"],
        short_description: "Lámpara regulable con luz blanca cálida y fria.",
        long_description: "La lámpara de escritorio LED combina funcionalidad y diseño moderno. Cuenta con tres modos de iluminación (cálida, neutra y fria) ajustables en intensidad para adaptarse a la lectura, estudio o relajación. Su brazo flexible de 180° permite dirigir la luz con precisión, mientras que su base estable incluye un puerto USB para cargar dispositivos. Fabricada en materiales duraderos y con bajo consumo energetico, es ideal para escritorios, mesas de noche o espacios de trabajo creativos.",
        stack: 5
    },
    {
        id: 17,
        name: "Batidora de mano",
        url: "https://exitocol.vtexassets.com/arquivos/ids/18851383/batidora-de-mano-oster-de-5-velocidades-2499.jpg?v=638217692439330000",
        price: 99000,
        category: ["Electrodomesticos", "Cocina"],
        short_description: "Batidora ligera de 2 velocidades con accesorios.",
        long_description: "La batidora de mano es una herramienta versátil y práctica para preparar mezclas rápidas sin ocupar mucho espacio. Su motor de dos velocidades ofrece potencia suficiente para batir claras, preparar cremas o masas ligeras. Incluye accesorios desmontables de acero inoxidable y función turbo para un mezclado más uniforme. Su diseño ergonómico con mango antideslizante reduce la fatiga en las manos. Ideal para quienes disfrutan cocinar con comodidad y rapidez en el dia a dia.",
        stack: 5
    },
    {
        id: 18,
        name: "Guantes de limpieza reforzados",
        url: "https://http2.mlstatic.com/D_NQ_NP_648473-MLM41362723222_042020-O.webp",
        price: 9500,
        category: ["Limpieza"],
        short_description: "Guantes de goma gruesa con forro interior suave.",
        long_description: "Estos guantes de limpieza están diseñados para proteger tus manos durante tareas domesticas o de mantenimiento. Fabricados con caucho natural grueso, ofrecen gran resistencia frente a detergentes, productos químicos y agua caliente. Su interior de algodón suave evita la irritación y mejora el confort durante su uso prolongado. Gracias a su textura exterior rugosa, proporcionan un agarre firme incluso en superficies mojadas, haciendo la limpieza más segura y eficiente.",
        stack: 5
    },
    {
        id: 19,
        name: "Organizador de escritorio",
        url: "https://media.falabella.com/sodimacCO/874133_01/w=800,h=800,fit=pad",
        price: 34000,
        category: ["Hogar", "Dia a dia"],
        short_description: "Organizador de madera con compartimientos múltiples.",
        long_description: "El organizador de escritorio de madera natural permite mantener el espacio de trabajo limpio y ordenado. Con compartimientos de diferentes tamaños, es perfecto para guardar bolígrafos, notas adhesivas, cables, clips y accesorios tecnológicos. Su acabado pulido le da un toque elegante y cálido a cualquier escritorio. Fabricado con materiales ecológicos y resistentes, combina funcionalidad y estetica, ayudando a mejorar la productividad y reducir el desorden visual.",
        stack: 5
    },
    {
        id: 20,
        name: "Ventilador de mesa",
        url: "https://m.media-amazon.com/images/I/71NYZsZzB7L._UF894,1000_QL80_.jpg",
        price: 159000,
        category: ["Electrodomesticos", "Hogar"],
        short_description: "Ventilador compacto con tres velocidades.",
        long_description: "El ventilador de mesa de 12 pulgadas ofrece una brisa potente en un formato compacto y silencioso. Con tres niveles de velocidad y cabezal ajustable, distribuye el aire de forma uniforme en habitaciones pequeñas u oficinas. Su motor de bajo consumo garantiza eficiencia energetica sin sacrificar rendimiento. La rejilla metálica brinda seguridad y durabilidad, mientras que su base estable evita vibraciones. Perfecto para mantener ambientes frescos durante dias calurosos.",
        stack: 5
    },
    {
        id: 21,
        name: "Tendedero plegable de aluminio",
        url: "https://media.falabella.com/sodimacCO/719136/public",
        price: 135000,
        category: ["Hogar", "Limpieza"],
        short_description: "Tendedero liviano con alas plegables.",
        long_description: "Este tendedero de aluminio combina resistencia y ligereza, siendo ideal para uso interior o exterior. Sus alas laterales ajustables permiten colgar prendas largas sin que toquen el suelo. Gracias a su estructura plegable, puede guardarse fácilmente en espacios reducidos. El aluminio anodizado evita la corrosión, garantizando una larga vida útil. Perfecto para quienes buscan una solución práctica para secar ropa sin depender de secadoras electricas.",
        stack: 5
    },
    {
        id: 22,
        name: "Juego de llaves combinadas",
        url: "https://www.sata.com.co/sites/sata_colombia/files/styles/product_medium/public/pim_images/SAT_ST09021SJ_IMG-INSTOR.jpg?itok=rEbPo9h1",
        price: 89000,
        category: ["Herramientas"],
        short_description: "Set de 10 llaves de acero al cromo-vanadio.",
        long_description: "Este juego de llaves combinadas está fabricado en acero al cromo-vanadio, ofreciendo alta resistencia a la deformación y el desgaste. Incluye medidas metricas y en pulgadas, organizadas en un práctico soporte portátil. Cada llave tiene un extremo abierto y otro de estrella, lo que las hace útiles para apretar o aflojar tuercas en espacios reducidos. Es una herramienta indispensable para mecánicos, tecnicos y aficionados al bricolaje que valoran la calidad y precisión.",
        stack: 5
    },
    {
        id: 23,
        name: "Termo de acero inoxidable 1L",
        url: "https://http2.mlstatic.com/D_NQ_NP_673848-MLA44634164362_012021-O.webp",
        price: 62000,
        category: ["Dia a dia", "Hogar"],
        short_description: "Termo con tapa hermetica y retención de temperatura.",
        long_description: "El termo de acero inoxidable de 1 litro mantiene tus bebidas calientes o frias durante horas gracias a su doble pared con aislamiento al vacío. Su tapa hermetica evita derrames, y su cuerpo resistente soporta golpes y caídas leves. Ideal para viajes, caminatas o jornadas laborales, combina portabilidad y durabilidad. No retiene olores ni sabores, garantizando frescura en cada uso. Su diseño moderno y acabado metálico lo hacen tan práctico como elegante.",
        stack: 5
    },
    {
        id: 24,
        name: "Set de platos de cerámica",
        url: "https://m.media-amazon.com/images/I/61zD9AJqIEL._UF894,1000_QL80_.jpg",
        price: 199000,
        category: ["Cocina", "Hogar"],
        short_description: "Juego de 12 platos decorativos.",
        long_description: "El set de platos de cerámica está compuesto por piezas resistentes, elegantes y perfectas para el uso diario o cenas especiales. Fabricados con cerámica esmaltada de alta temperatura, ofrecen una textura suave y brillante que conserva su color a lo largo del tiempo. Apto para microondas y lavavajillas, combina practicidad y diseño. Su acabado artesanal aporta un toque sofisticado a la mesa, convirtiendo cada comida en una experiencia más agradable y estetica.",
        stack: 5
    },
    {
        id: 25,
        name: "Linterna recargable LED",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZ1a9-z5lbs3uBygbYUnODPhKRA-rEcuRBg&s",
        price: 54000,
        category: ["Herramientas", "Dia a dia"],
        short_description: "Linterna compacta con bateria recargable USB.",
        long_description: "La linterna LED recargable ofrece una iluminación potente en un cuerpo compacto y resistente. Su bateria integrada se carga mediante cable USB y proporciona varias horas de autonomia. Con tres modos de luz —alta, media y parpadeante—, es perfecta para emergencias, camping, caminatas nocturnas o reparaciones. Su carcasa de aluminio anodizado la hace resistente a impactos y salpicaduras. Una herramienta esencial para el hogar, el auto o actividades al aire libre.",
        stack: 5
    }
]
