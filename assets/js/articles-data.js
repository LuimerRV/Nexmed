/*
 * Catálogo de artículos. Dos colecciones con públicos distintos:
 *
 * - NEXMED_ARTICLES ("Novedades"): blog para pacientes, lenguaje cercano y
 *   no técnico. Se muestra como carrusel en el Home. Título, fecha, resumen
 *   e imagen son reales; el cuerpo (articulo.html) sigue con texto de
 *   relleno hasta que el cliente entregue el contenido.
 *
 * - NEXMED_EVIDENCE ("Evidencia y estudios", profesionales.html): evidencia,
 *   estudios y experiencias clínicas entre profesionales. Acceso público;
 *   los estudios enviados pasan por revisión y aprobación de NEXMED antes
 *   de publicarse.
 *   ⚠ Los 4 artículos actuales son CONTENIDO DE PRUEBA (texto e imágenes
 *   ficticios, pedido por el cliente). Reemplazar por estudios reales
 *   aprobados antes de salir a producción.
 */
(function () {
  "use strict";

  window.NEXMED_ARTICLES = [
    {
      slug: "plantilla-ortopedica-adecuada",
      titulo: "Cómo elegir la plantilla ortopédica adecuada",
      fecha: "Ene 2026",
      resumen: "Claves para entender cuándo y por qué usarlas.",
      imagen: "assets/images/novedades/plantilla-ortopedica-adecuada.webp",
    },
    {
      slug: "cuidado-uso-ortesis",
      titulo: "Cuidados y uso correcto de las órtesis",
      fecha: "Feb 2026",
      resumen: "Recomendaciones generales de uso y mantención.",
      imagen: "assets/images/novedades/cuidado-uso-ortesis2.webp",
    },
    {
      slug: "medicina-biorreguladora",
      titulo: "Qué es la medicina biorreguladora",
      fecha: "Mar 2026",
      resumen: "Una introducción a esta línea de productos.",
      imagen: "assets/images/novedades/medicina-biorreguladora.webp",
    },
    // CONTENIDO DE PRUEBA (pedido por el cliente): reemplazar por un artículo real.
    {
      slug: "cada-cuanto-cambiar-plantillas",
      titulo: "¿Cada cuánto hay que cambiar las plantillas?",
      fecha: "Abr 2026",
      resumen: "Señales simples para saber si ya es momento de renovarlas.",
      imagen: "assets/images/novedades/cada-cuanto-cambiar-plantillas.webp",
    },
  ];

  // CONTENIDO DE PRUEBA — ver nota al inicio del archivo.
  window.NEXMED_EVIDENCE = [
    {
      slug: "plantillas-a-medida-fascitis-plantar",
      titulo: "Plantillas a medida en fascitis plantar: experiencia en consulta",
      fecha: "Abr 2026",
      resumen: "Seguimiento de pacientes con dolor de talón tratados con soporte plantar personalizado.",
      imagen: "assets/images/Profesionales/evidencia/plantillas-fascitis-plantar.webp",
      especialidad: "Traumatología, Fisiatría y Kinesiología",
      autor: "Equipo de kinesiología clínica",
      intro:
        "La fascitis plantar es una de las consultas más frecuentes por dolor de talón en adultos activos. En este reporte compartimos la experiencia de nuestro equipo al incorporar plantillas confeccionadas a partir de una evaluación de pisada como parte de un manejo conservador.",
      secciones: [
        {
          titulo: "Contexto clínico",
          parrafos: [
            "Los pacientes incluidos consultaron por dolor plantar en el talón de predominio matinal, con más de seis semanas de evolución. Todos contaban con evaluación médica previa y habían iniciado ejercicios de elongación de fascia y tríceps sural.",
            "La evaluación de pisada se realizó en bipedestación y durante la marcha, registrando el apoyo plantar y el comportamiento del arco longitudinal medial.",
          ],
        },
        {
          titulo: "Intervención",
          parrafos: [
            "Se confeccionaron plantillas con soporte de arco y descarga del talón según el patrón de cada paciente, complementadas con el programa de ejercicios y educación sobre calzado.",
            "Los controles se agendaron a las cuatro y a las ocho semanas para ajustar la plantilla y revisar la adherencia al uso diario.",
          ],
        },
        {
          titulo: "Observaciones del equipo",
          parrafos: [
            "En los controles, la mayoría de los pacientes refirió menor dolor al levantarse y mayor tolerancia a la bipedestación prolongada. Los ajustes más frecuentes fueron sobre la altura del soporte de arco durante las primeras semanas.",
            "Estas observaciones corresponden a la práctica de un equipo y no reemplazan estudios controlados; la indicación de plantillas debe considerar la evaluación individual de cada paciente.",
          ],
        },
      ],
    },
    {
      slug: "ortesis-tobillo-esguince",
      titulo: "Uso de órtesis de tobillo en la rehabilitación de esguinces",
      fecha: "May 2026",
      resumen: "Criterios prácticos para indicar y retirar una órtesis funcional tras un esguince lateral.",
      imagen: "assets/images/Profesionales/evidencia/ortesis-tobillo-esguince.webp",
      especialidad: "Traumatología, Fisiatría y Kinesiología",
      autor: "Unidad de rehabilitación musculoesquelética",
      intro:
        "El esguince lateral de tobillo es una lesión habitual tanto en deportistas como en la población general. Compartimos los criterios que usamos en nuestra unidad para incorporar una órtesis funcional durante la rehabilitación y planificar su retiro progresivo.",
      secciones: [
        {
          titulo: "Cuándo indicamos la órtesis",
          parrafos: [
            "La consideramos en esguinces con dolor e inestabilidad que dificultan la marcha, una vez descartadas lesiones que requieran inmovilización rígida o manejo quirúrgico.",
            "El objetivo es proteger el ligamento en la fase inicial sin impedir la carga progresiva ni el trabajo temprano de movilidad.",
          ],
        },
        {
          titulo: "Rehabilitación en paralelo",
          parrafos: [
            "El uso de la órtesis siempre va acompañado de ejercicios de movilidad, fortalecimiento de peroneos y trabajo propioceptivo, que se intensifican según tolerancia.",
            "Educamos al paciente sobre la correcta colocación y el ajuste de las correas para evitar compresión excesiva.",
          ],
        },
        {
          titulo: "Retiro progresivo",
          parrafos: [
            "El retiro se plantea cuando el paciente logra una marcha sin dolor y un control adecuado en apoyo monopodal. En quienes retoman deporte, mantenemos la órtesis en entrenamientos durante un período adicional.",
            "La decisión final depende de la evaluación clínica de cada caso.",
          ],
        },
      ],
    },
    {
      slug: "proteina-post-cirugia-bariatrica",
      titulo: "Suplementación proteica después de una cirugía bariátrica",
      fecha: "Jun 2026",
      resumen: "Recomendaciones de seguimiento nutricional compartidas desde la práctica clínica.",
      imagen: "assets/images/Profesionales/evidencia/proteina-post-bariatrica.webp",
      especialidad: "Medicina Bariátrica",
      autor: "Equipo de nutrición clínica",
      intro:
        "Tras una cirugía bariátrica, cubrir los requerimientos de proteína es uno de los desafíos más frecuentes del seguimiento. Resumimos cómo abordamos la suplementación proteica en nuestras consultas de control.",
      secciones: [
        {
          titulo: "Por qué es relevante",
          parrafos: [
            "La menor capacidad gástrica y los cambios en la tolerancia a ciertos alimentos hacen que muchos pacientes no alcancen su meta de proteína solo con la dieta, especialmente en las primeras etapas.",
          ],
        },
        {
          titulo: "Cómo lo abordamos",
          parrafos: [
            "Indicamos suplementos proteicos como complemento de la alimentación, fraccionados en pequeñas tomas a lo largo del día y ajustados a la etapa de la dieta en que se encuentra el paciente.",
            "En cada control revisamos tolerancia, sabor y adherencia, ya que son los factores que más influyen en que el paciente mantenga la suplementación.",
          ],
        },
        {
          titulo: "Seguimiento",
          parrafos: [
            "El seguimiento es siempre multidisciplinario y la indicación se individualiza según la técnica quirúrgica, los exámenes de control y la evolución de cada paciente.",
          ],
        },
      ],
    },
    {
      slug: "medicina-biorreguladora-complemento",
      titulo: "Medicina biorreguladora como complemento terapéutico",
      fecha: "Jul 2026",
      resumen: "Experiencias compartidas por profesionales que la integran en su práctica.",
      imagen: "assets/images/Profesionales/evidencia/biorreguladora-complemento.webp",
      especialidad: "Medicina Bioreguladora",
      autor: "Red de profesionales NEXMED",
      intro:
        "Distintos profesionales de nuestra red integran la medicina biorreguladora como complemento de sus tratamientos habituales. En este artículo recopilamos sus experiencias sobre cómo la incorporan y comunican a sus pacientes.",
      secciones: [
        {
          titulo: "Un enfoque complementario",
          parrafos: [
            "Los profesionales consultados coinciden en utilizarla como apoyo a un plan terapéutico definido, nunca como reemplazo de tratamientos indicados.",
          ],
        },
        {
          titulo: "Comunicación con el paciente",
          parrafos: [
            "Destacan la importancia de explicar con claridad el objetivo del complemento, los tiempos esperables y la necesidad de mantener los controles habituales.",
            "También recomiendan registrar la evolución en cada consulta para evaluar la respuesta de forma individual.",
          ],
        },
        {
          titulo: "Próximos pasos",
          parrafos: [
            "Invitamos a los profesionales que trabajan con esta línea a compartir sus casos y estudios a través del formulario de envío, para que, tras la revisión de NEXMED, enriquezcan este espacio.",
          ],
        },
      ],
    },
  ];
})();
