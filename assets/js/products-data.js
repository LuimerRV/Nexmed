/*
 * Catálogo de los 12 productos de muestra (de 66 en el archivo fuente del
 * cliente), uno representativo por categoría real disponible. Precios y
 * nombres provienen del archivo "PRECIOS-PRODUCTOS-CATEGORIAS-MARCAS.xlsx"
 * del cliente. Los campos indicacion/presentacion/dosisHabitual/material
 * no existen en esa fuente: quedan en null a la espera de contenido real
 * (no se inventa información clínica).
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
      imagen: "assets/images/productos/plantilla-ortopedica.png",
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
      imagen: "assets/images/productos/tobillera-compresion.png",
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
      imagen: "assets/images/productos/producto-homeopatico.png",
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
      indicacion: null,
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
      imagen: "assets/images/productos/suplemento-deportivo.png",
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
  ];

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
