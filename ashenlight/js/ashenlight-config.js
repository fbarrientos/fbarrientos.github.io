/**
 * Ashenlight - Configuración y Catálogo Centralizado
 * 
 * Este archivo centraliza la información del espacio literario Ashenlight,
 * sus obras, estados editoriales, enlaces de compra y presencia en redes.
 * Para añadir un nuevo libro o actualizar enlaces, modifique los datos en este archivo.
 */

const ASHENLIGHT_CONFIG = {
    identity: {
        name: "Ashenlight",
        author: "Fredy Barrientos",
        tagline: {
            es: "Libros de Fredy Barrientos",
            en: "Books by Fredy Barrientos"
        },
        motto: {
            es: "Entre las cenizas y la luz, todavía hay una historia.",
            en: "Between ashes and light, there is still a story."
        },
        description: {
            es: "Libros y reflexiones sobre la memoria, la identidad y la reconstrucción de la vida después de experiencias que nos transforman.",
            en: "Books and reflections on memory, identity, and rebuilding a life after experiences that change us."
        }
    },

    // Redes sociales oficiales de la comunidad Ashenlight.
    // Dejar en blanco ("") para ocultar automáticamente el enlace hasta que se verifique.
    social: {
        facebook: "",   // Ej: "https://facebook.com/..."
        instagram: "",  // Ej: "https://instagram.com/..."
        youtube: ""     // Ej: "https://youtube.com/..."
    },

    // Proyecto editorial en preparación / próxima exploración
    nextExploration: {
        heading: {
            es: "Una nueva exploración",
            en: "A new exploration"
        },
        text: {
            es: "Un posible próximo libro explorará la vida interior después de sobrevivir: el miedo, la incertidumbre, la identidad y la relación con uno mismo.",
            en: "A possible future book will explore inner life after survival: fear, uncertainty, identity, and our relationship with ourselves."
        },
        status: {
            es: "En exploración",
            en: "In exploration"
        }
    },

    // Catálogo de libros de Ashenlight
    books: [
        {
            id: "lo-que-queda-de-mi",
            slug: "lo-que-queda-de-mi",
            title: {
                es: "Lo que queda de mí",
                en: "What Remains of Me"
            },
            subtitle: {
                es: "De acero a cenizas, de cenizas a luz",
                en: "" // Campo reservado para el subtítulo oficial en inglés cuando se defina
            },
            author: "FREDY BARRIENTOS",
            genre: {
                es: "Memorias",
                en: "Memoir"
            },
            synopsisShort: {
                es: "Una promesa durante el coma, la pérdida de dedos, una tesis escrita con un único dedo funcional y el aprendizaje de volver a caminar dos veces. Fredy Barrientos cuenta una experiencia de supervivencia y reconstrucción en la que el cuerpo cambia para siempre y la vida exige encontrar nuevas formas de continuar.",
                en: "A promise made in a coma, the loss of fingers, a thesis written with a single functioning finger, and learning to walk again—twice. Fredy Barrientos recounts an experience of survival and rebuilding, as his body changes forever and life demands new ways to carry on."
            },
            synopsisFull: {
                es: [
                    "Una promesa formulada en el límite más frágil de la consciencia, el despertar en una sala de cuidados intensivos y el impacto de comprobar que el cuerpo conocido ya no existe: la amputación de dedos, las cicatrices irreversibles y el desafío de volver a caminar no una, sino dos veces.",
                    "En 'Lo que queda de mí', Fredy Barrientos relata su proceso de supervivencia y reconstrucción. Con una honestidad despojada de dramatismos complacientes, la narración transita desde la vulnerabilidad de una hospitalización prolongada hasta el logro de culminar una tesis doctoral en inteligencia artificial escrita, tecla a tecla, con un único dedo funcional.",
                    "Más que una crónica médica, estas páginas constituyen una reflexión profunda sobre la identidad herida, la voluntad silenciosa y la búsqueda de significado cuando las certezas se quiebran y es necesario inventar una nueva forma de estar en el mundo."
                ],
                en: [
                    "A promise whispered at the fragile edge of consciousness, waking in an intensive care unit, and facing the realization that the body one knew is gone forever: the loss of fingers, permanent scars, and the grueling task of learning to walk again—not once, but twice.",
                    "In 'What Remains of Me' (original Spanish edition: *Lo que queda de mí*), Fredy Barrientos shares a journey of survival and renewal. Told with rigorous honesty and free of sentimentalism, the memoir moves from the vulnerability of extended hospitalization to completing a Ph.D. dissertation in artificial intelligence typed key by key with a single functioning finger.",
                    "Far more than a medical account, this work is a contemplative reflection on wounded identity, silent resolve, and finding purpose when all certainties shatter and one must build a new way forward."
                ]
            },
            formats: {
                es: ["Pasta blanda", "Kindle"],
                en: ["Paperback", "Kindle"]
            },
            editions: {
                es: {
                    available: true,
                    statusText: "Disponible en español en pasta blanda y Kindle.",
                    buyUrl: "https://a.co/d/05y5ee6Q",
                    buyButtonText: "Comprar en Amazon",
                    buyNote: "Edición en español",
                    englishStatusText: "Edición en inglés: traducción en curso"
                },
                en: {
                    available: false,
                    inProgress: true,
                    statusText: "Available in Spanish in paperback and Kindle.",
                    buyUrl: "https://a.co/d/05y5ee6Q",
                    buyButtonText: "Buy the Spanish edition on Amazon",
                    buyNote: "",
                    englishStatusText: "English edition: translation in progress"
                }
            },
            // Portada: false indica composición tipográfica sobria. Cambiar a true cuando se disponga de archivo de imagen.
            cover: {
                hasRealImage: false,
                imagePath: "ashenlight/images/lo-que-queda-de-mi.jpg",
                altText: {
                    es: "Portada del libro Lo que queda de mí, por Fredy Barrientos",
                    en: "Book cover of What Remains of Me, by Fredy Barrientos"
                }
            },
            // Fragmento de lectura: false hasta que haya un fragmento formalmente aprobado para publicación web.
            excerpt: {
                hasExcerpt: false,
                content: {
                    es: "",
                    en: ""
                }
            }
        }
    ]
};

// Exportación compatible tanto para navegador como para entornos modulares
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ASHENLIGHT_CONFIG;
}
