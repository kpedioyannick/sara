export const learningPaths = [
  {
    id: 'path1',
    title: 'Les bases des mathématiques',
    description: 'Parcours d\'introduction aux mathématiques',
    skills: {
      'Calcul mental': 0,
      'Logique': 0,
      'Géométrie': 0,
      'Algèbre': 0,
      'Résolution de problèmes': 0
    },
    activities: [
      {
        id: 'act1',
        type: 'multiple_choice',
        content: {
          question: 'Combien font 2 + 2 ?',
          options: [
            { text: '3', is_correct: false },
            { text: '4', is_correct: true },
            { text: '5', is_correct: false },
            { text: '6', is_correct: false }
          ],
          explanation: {
            steps: [
              { detail: "2 + 2 = 4 est une opération de base en arithmétique" }
            ]
          }
        },
        skillsImpact: {
          'Calcul mental': 20,
          'Logique': 10
        }
      },
      {
        id: 'act2',
        type: 'true_false',
        content: {
          question: 'La racine carrée de 16 est égale à 4.',
          correct_answer: true,
          explanation: {
            steps: [
              { detail: "4 × 4 = 16, donc 4 est bien la racine carrée de 16" }
            ]
          }
        },
        skillsImpact: {
          'Calcul mental': 15,
          'Algèbre': 25
        }
      },
      {
        id: 'act3',
        type: 'fill_in_the_blank',
        content: {
          text: ["Pour obtenir 10, il faut ajouter _____ à 7"],
          answers: ["3"],
          explanation: {
            steps: [
              { detail: "7 + 3 = 10, donc il faut ajouter 3 à 7 pour obtenir 10" }
            ]
          }
        },
        skillsImpact: {
          'Calcul mental': 20,
          'Logique': 15
        }
      },
      {
        id: 'act4',
        type: 'open_ended',
        content: {
          question: "Expliquez pourquoi il est important de connaître ses tables de multiplication.",
          answer: "calcul mental rapidité quotidien",
          explanation: {
            steps: [
              { detail: "Les tables de multiplication sont essentielles pour le calcul mental" },
              { detail: "Elles permettent de résoudre rapidement des problèmes du quotidien" }
            ]
          },
          typeTagHtmlAnswer: "input"
        },
        skillsImpact: {
          'Expression écrite': 25,
          'Logique': 20
        }
      },
      {
        id: 'act5',
        type: 'multiple_choice',
        content: {
          question: 'Quelle est la racine carrée de 16 ?',
          options: [
            { text: '2', is_correct: false },
            { text: '4', is_correct: true },
            { text: '6', is_correct: false },
            { text: '8', is_correct: false }
          ],
          explanation: {
            steps: [
              { detail: "La racine carrée de 16 est 4 car 4 × 4 = 16" }
            ]
          }
        },
        skillsImpact: {
          'Calcul mental': 15,
          'Algèbre': 25
        }
      },
      {
        id: 'act6',
        type: 'fill_in_the_blank',
        content: {
          text: [
            "Le double de 7 est _____",
            "La moitié de 14 est _____"
          ],
          answers: ["14", "7"],
          explanation: {
            steps: [
              { detail: "Le double de 7 est 14 car 7 × 2 = 14" },
              { detail: "La moitié de 14 est 7 car 14 ÷ 2 = 7" }
            ]
          }
        },
        skillsImpact: {
          'Calcul mental': 20,
          'Logique': 15
        }
      },
      {
        id: 'revision_1',
        type: 'revision_sheet',
        content: [
          {
            type: 'section',
            title: 'Les nombres relatifs',
            content: 'Un nombre relatif est un nombre qui peut être positif, négatif ou nul. Il est utilisé pour indiquer une direction ou une différence de quantité. Exemple : -3, 5, -10, 0'
          },
          {
            type: 'subsection',
            title: 'Les nombres relatifs en détail',
            content: 'Les nombres relatifs sont utilisés pour représenter des quantités ou des points sur une droite graduée. Le signe indique la direction et la valeur absolue indique la distance par rapport à zéro.'
          },
          {
            type: 'example',
            title: 'Exemple d\'utilisation',
            content: 'Si on ajoute -5 à 3, cela donne -2. Cela signifie que l\'on se déplace de 5 unités vers la gauche à partir de 3.'
          },
          {
            type: 'remark',
            title: 'Remarque importante',
            content: 'Il est essentiel de bien comprendre la notion de signe dans les nombres relatifs pour réaliser des opérations correctement.'
          },
          {
            "type": "question",
            questions: [
              {
                "question": "Qu'est-ce qu'un nombre relatif ?",
                "options": [
                  { "text": "Un nombre qui peut être positif, négatif ou nul.", "is_correct": true },
                  { "text": "Un nombre entier uniquement.", "is_correct": false },  
                ],
                "explanation": {
                  "steps": [
                    { "detail": "Un nombre relatif est un nombre qui peut être positif, négatif ou nul." }
                  ]
                }
              },
              { 
                "question": "Qu'est-ce qu'un nombre de 3 chiffres ?",
                "options": [
                  { "text": "Un nombre qui a 3 chiffres.", "is_correct": true },
                  { "text": "Un nombre qui a 2 chiffres.", "is_correct": false },  
                ],
                "explanation": {
                  "steps": [
                    { "detail": "Un nombre de 3 chiffres est un nombre qui a 3 chiffres." }
                  ]
                }
              }
            ]
          }
        ],
        skillsImpact: {
          'Calcul': 10,
          'Algèbre': 5
        }
      },
      {
        id: 296,
        type: 'revision_sheet_video',
        path_type: 'revision',
        content: {
          video: 'http://localhost:8000/manim/video/MobileRevision_259.mp4',
          className: 'MobileRevision_259',
          questions: [
            {
              "question": "Qu'est-ce qu'un nombre relatif ?",
              "options": [
                { "text": "Un nombre qui peut être positif, négatif ou nul.", "is_correct": true },
                { "text": "Un nombre entier uniquement.", "is_correct": false },  
              ],
              "explanation": {
                "steps": [
                  { "detail": "Un nombre relatif est un nombre qui peut être positif, négatif ou nul." }
                ]
              }
            },
            { 
              "question": "Qu'est-ce qu'un nombre de 3 chiffres ?",
              "options": [
                { "text": "Un nombre qui a 3 chiffres.", "is_correct": true },
                { "text": "Un nombre qui a 2 chiffres.", "is_correct": false },  
              ],
              "explanation": {
                "steps": [
                  { "detail": "Un nombre de 3 chiffres est un nombre qui a 3 chiffres." }
                ]
              }
            }
          ]
        },
        skillsImpact: {
          'Calcul': 5,
          'Algèbre': 5
        }
      }
    ]
  },
  {
    id: 'path2',
    title: 'Géographie de base',
    description: 'Découverte des capitales européennes',
    skills: {
      'Culture générale': 0,
      'Géographie': 0,
      'Mémoire': 0,
      'Histoire': 0
    },
    activities: [
      {
        id: 'act7',
        type: 'question',
        question: 'Quelle est la capitale de la France ?',
        options: ['Paris', 'Londres', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
        skillsImpact: {
          'Géographie': 20,
          'Culture générale': 15
        }
      },
      {
        id: 'act8',
        type: 'question',
        question: 'Quelle est la capitale de l\'Espagne ?',
        options: ['Lisbonne', 'Rome', 'Madrid', 'Barcelone'],
        correctAnswer: 'Madrid',
        skillsImpact: {
          'Géographie': 20,
          'Culture générale': 15
        }
      }
    ]
  }
]; 