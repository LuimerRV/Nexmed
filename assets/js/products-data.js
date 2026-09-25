/*
 * Catálogo de los 14 productos de muestra (de 66 en el archivo fuente del
 * cliente), uno representativo por categoría real disponible, más el
 * servicio de Urofusión (tipo "servicio": no comprable, ver más abajo). Precios y
 * nombres provienen del archivo "PRECIOS-PRODUCTOS-CATEGORIAS-MARCAS.xlsx"
 * del cliente. Los campos indicacion/presentacion/dosisHabitual/material
 * no existen en esa fuente: quedan en null a la espera de contenido real
 * (no se inventa información clínica).
 *
 * "indicacion" (suplementos y productos naturales): texto entregado por el
 * cliente que se suma al nombre visible ("Nombre – indicación") en tienda,
 * ficha, buscador y carrito vía NEXMED_DISPLAY_NAME.
 */
(function () {
  "use strict";

  window.NEXMED_PRODUCTS = [
    {
      codigo: "OP2026-EM",
      nombre: "Plantillas Standart a la Medida",
      categoria: "TRAUMATOLOGIA/FISIATRIA/KINESIOLOGIA",
      categoriaLabel: "Traumatología, Fisiatría y Kinesiología",
      subcategoria: "Órtesis plantar para la corrección de la pisada",
      marca: "NEXMED",
      precio: 70000,
      imagen: "assets/images/productos/plantilla-ortopedica.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "310TO03",
      nombre: "Tobillera Deportiva/Barras Laterales",
      categoria: "TRAUMATOLOGIA/FISIATRIA/KINESIOLOGIA",
      categoriaLabel: "Traumatología, Fisiatría y Kinesiología",
      subcategoria: "Tobillo/Pie",
      marca: "Theoduloz",
      precio: 30000,
      imagen: "assets/images/productos/tobillera-compresion.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "CC-703",
      nombre: "Corset de Hiperextensión Jewett",
      categoria: "TRAUMATOLOGIA/FISIATRIA/KINESIOLOGIA",
      categoriaLabel: "Traumatología, Fisiatría y Kinesiología",
      subcategoria: "Columna / Tórax",
      marca: "Blunding",
      precio: 270000,
      imagen: "assets/images/productos/corset-hiperextension-jewett.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "CC-700",
      nombre: "Corset de Hiperextensión Jewett",
      categoria: "TRAUMATOLOGIA/FISIATRIA/KINESIOLOGIA",
      categoriaLabel: "Traumatología, Fisiatría y Kinesiología",
      subcategoria: "Columna / Tórax",
      marca: "Blunding",
      precio: 248000,
      imagen: "assets/images/productos/corset-blunding.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "HM-0118BM1",
      nombre: "Soporte de Mano y Muñeca Ambidiestra",
      categoria: "TRAUMATOLOGIA/FISIATRIA/KINESIOLOGIA",
      categoriaLabel: "Traumatología, Fisiatría y Kinesiología",
      subcategoria: "Muñeca",
      marca: "Blunding",
      precio: 9300,
      imagen: "assets/images/productos/soporte-mano-muneca-ambidiestra.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "BV00001",
      nombre: "Proteína Bariatric Value Vainilla 1057gr",
      categoria: "MEDICINA BARIATRICA",
      categoriaLabel: "Medicina Bariátrica",
      subcategoria: "Nutrición clínica",
      marca: "Bariatric Value",
      precio: 59900,
      imagen: "assets/images/productos/proteina-bariatric-value-vainilla-1057gr.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "BVKIT01",
      nombre: "Kit Completo",
      categoria: "MEDICINA BARIATRICA",
      categoriaLabel: "Medicina Bariátrica",
      subcategoria: "Nutrición clínica",
      marca: "Bariatric Value",
      precio: 95000,
      imagen: null,
      tienePlaceholder: true,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "RECKFTRTR7",
      nombre: "T-R7 Hepagalen",
      categoria: "MEDICINA BIOREGULADORA",
      categoriaLabel: "Medicina Bioreguladora",
      subcategoria: "Medicina Bioreguladora",
      marca: "Dr. Reckeweg",
      precio: 25990,
      imagen: "assets/images/productos/producto-homeopatico.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "RECKFTR8",
      nombre: "Jutussin R8 Solución Oral",
      categoria: "MEDICINA BIOREGULADORA",
      categoriaLabel: "Medicina Bioreguladora",
      subcategoria: "Medicina Bioreguladora",
      marca: "Dr. Reckeweg",
      precio: 25990,
      imagen: "assets/images/productos/jutussin-r8-solucion-oral.webp",
      tienePlaceholder: false,
      indicacion: "coayudante en el tratamiento de la tos",
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "MI-016M",
      nombre: "Zapato Post Operatorio M",
      categoria: "ENFERMERIA",
      categoriaLabel: "Enfermería",
      subcategoria: "Zapato post operatorio",
      marca: "Blunding",
      precio: 19500,
      imagen: "assets/images/productos/zapato-post-operatorio-m.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "EVG01415",
      nombre: "Glutamina",
      categoria: "EVOGEN PREMIUM SUPPLEMENTS",
      categoriaLabel: "Suplementos",
      subcategoria: "Evogen Premium Supplements",
      marca: "Evogen",
      precio: 46990,
      imagen: "assets/images/productos/suplemento-deportivo.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "EVG01495",
      nombre: "Omega 3",
      categoria: "EVOGEN PREMIUM SUPPLEMENTS",
      categoriaLabel: "Suplementos",
      subcategoria: "Evogen Premium Supplements",
      marca: "Evogen",
      precio: 49990,
      imagen: "assets/images/productos/omega-3.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      codigo: "A-BACONFORT",
      nombre: "Bastón Access Comfort Black Grip",
      categoria: "AYUDAS TECNICAS",
      categoriaLabel: "Ayudas Técnicas",
      subcategoria: "Ayudas técnicas",
      marca: "Feldec",
      precio: 29990,
      imagen: "assets/images/productos/baston-access-comfort.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      // Precio de relleno: el cliente aún no entregó el precio real de este
      // producto (indicó explícitamente "colocar de relleno"). Código
      // interno generado por nosotros ante la ausencia de un SKU del
      // cliente; reemplazar ambos apenas se confirmen los datos reales.
      codigo: "SR-SPORT22",
      nombre: "Silla de Ruedas Eléctrica Adulto Sport 22",
      categoria: "AYUDAS TECNICAS",
      categoriaLabel: "Ayudas Técnicas",
      subcategoria: "Ayudas técnicas",
      marca: "GloMed",
      precio: 600000,
      imagen: "assets/images/productos/silla-de-ruedas-electrica-adulto-sport-22.webp",
      tienePlaceholder: false,
      indicacion: null,
      presentacion: null,
      dosisHabitual: null,
      material: null,
    },
    {
      /*
       * Servicio (no comprable): biopsias de Urofusión. Datos del archivo de
       * productos del cliente (código, categoría, subcategoría, marca;
       * precio "LINK / DERIVACIÓN") y de la ficha de referencia entregada
       * por el cliente. Se agenda en el sistema externo de Urofusión.
       * Logo: versión en alta entregada por el cliente, recortada y con
       * fondo transparente (assets/images/marcas/urofusion-logo.webp).
       */
      codigo: "URO-BP2026",
      tipo: "servicio",
      nombre: "Biopsias Prostáticas de Precisión",
      categoria: "UROLOGIA",
      categoriaLabel: "Urología",
      subcategoria: "Biopsia por fusión",
      marca: "UroFusión",
      precio: null,
      imagen: "assets/images/marcas/urofusion-logo.webp",
      tienePlaceholder: false,
      servicio: {
        puntos: [
          "Urofusión es una marca especializada en Biopsias prostáticas de Precisión con alta asertividad diagnóstica. Atienden en modalidad Fonasa, Isapres y convenios directos.",
          "Promedio de satisfacción del usuario es de un 98%.",
          "Requiere Prescripción médica del especialista.",
        ],
        ubicacion: "Providencia, Santiago.",
        telefonos: ["+56 9 33926067", "+56 9 33756868"],
        agendarUrl: "https://urofusion.site.agendapro.com/cl/sucursal/47229",
      },
    },
  ];

  /* Nombre visible: nombre + indicación del cliente cuando existe. */
  window.NEXMED_DISPLAY_NAME = function (product) {
    return product.indicacion ? product.nombre + " – " + product.indicacion : product.nombre;
  };

  /* Servicios: se muestran en Tienda y tienen ficha, pero no van al carrito. */
  window.NEXMED_IS_SERVICE = function (product) {
    return !!product && product.tipo === "servicio";
  };

  /*
   * Marcas que aparecen en el carrusel "Marcas con las que trabajamos" del
   * Home pero que todavía no tienen productos cargados en este catálogo
   * de muestra. Se listan aparte para que el filtro de marcas de Tienda
   * también las muestre (la marca existe; el catálogo de esa marca, no
   * todavía) sin inventar productos que no existen.
   */
  window.NEXMED_BRANDS_SIN_PRODUCTOS = ["Blunding Kids", "Mega Med", "Planty", "DenTek"];

  /*
   * Categorías del negocio que el cliente quiere disponibles en el filtro
   * de Tienda aunque este catálogo de muestra todavía no tenga productos
   * cargados en ellas (p. ej. Salud Dental, asociada a la marca DenTek).
   * Se listan aparte para no inventar productos que no existen.
   */
  window.NEXMED_CATEGORIES_SIN_PRODUCTOS = ["Salud Dental"];

  /*
   * Descripción breve (1 línea en desktop, 2 en móvil) bajo el título de cada categoría en Tienda.
   * ⚠ TEXTO PROVISORIO (Lorem Ipsum, pedido del cliente): reemplazar cada
   * valor por el texto aprobado de su categoría. Una categoría sin entrada
   * simplemente no muestra descripción.
   */
  var LOREM_CATEGORIA =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat sed mi in placerat.";
  window.NEXMED_CATEGORY_DESCRIPTIONS = {
    "Traumatología, Fisiatría y Kinesiología": LOREM_CATEGORIA,
    "Medicina Bariátrica": LOREM_CATEGORIA,
    "Medicina Bioreguladora": LOREM_CATEGORIA,
    "Enfermería": LOREM_CATEGORIA,
    "Suplementos": LOREM_CATEGORIA,
    "Ayudas Técnicas": LOREM_CATEGORIA,
    "Urología": LOREM_CATEGORIA,
    "Salud Dental": LOREM_CATEGORIA,
  };

  /*
   * Algunas categorías son en realidad una enumeración de especialidades
   * ("Traumatología, Fisiatría y Kinesiología") y deben mostrarse como
   * píldoras separadas, no como una sola píldora larga. Categorías simples
   * ("Medicina Bariátrica") quedan como una única píldora.
   */
  window.NEXMED_CATEGORY_PILLS = function (categoriaLabel) {
    return categoriaLabel
      .split(/,\s*| y /i)
      .map(function (part) {
        return part.trim();
      })
      .filter(Boolean);
  };
})();
