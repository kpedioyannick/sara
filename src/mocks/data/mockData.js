export const learningPaths = [
  {
    id: 'path1',
    title: 'Notions de Probabilité',
    description: 'Découverte des probabilités et de l\'équiprobabilité',
    skills: {
      'Probabilités': 0,
      'Logique': 0,
      'Calculs mathématiques': 0
    },
    activities: [
      {
        "id": "12",
        "type": "multiple_choice",
        "content": {
          "question": "On lance un dé à 6 faces. Quelle est la probabilité d'obtenir un 4 ?",
          "options": [
            { "text": "1/6", "is_correct": true },
            { "text": "1/3", "is_correct": false },
            { "text": "1/2", "is_correct": false },
            { "text": "1/4", "is_correct": false }
          ],
          "explanation": {
            "steps": [
              { "detail": "Un dé a 6 faces et chaque face a la même probabilité d'apparaître. La probabilité d'obtenir un 4 est donc 1/6." }
            ]
          }
        },
        "skillsImpact": {
          "Notion de probabilité": 20,
          "Équiprobabilité": 20
        }
      },
      {
        id: 'act1',
        type: 'multiple_choice',
        content: {
          question: 'Un dé à six faces équilibré est lancé. Quelle est la probabilité d\'obtenir un nombre pair ?',
          options: [
            { text: '1/2', is_correct: true },
            { text: '1/3', is_correct: false },
            { text: '2/3', is_correct: false },
            { text: '1/6', is_correct: false }
          ],
          explanation: {
            steps: [
              { detail: "Les nombres pairs sur un dé à six faces sont 2, 4 et 6. Il y a 3 issues favorables sur 6, donc la probabilité est 3/6 = 1/2." }
            ]
          }
        },
        skillsImpact: {
          'Probabilités': 20,
          'Logique': 10
        }
      },
      {
        id: 'act2',
        type: 'true_false',
        content: {
          question: 'Si on tire une carte au hasard d\'un jeu de 52 cartes, la probabilité d\'obtenir un roi est de 4/52.',
          correct_answer: true,
          explanation: {
            steps: [
              { detail: "Il y a 4 rois dans un jeu de 52 cartes. La probabilité est donc 4/52, soit 1/13." }
            ]
          }
        },
        skillsImpact: {
          'Probabilités': 15,
          'Logique': 10
        }
      },
      {
        id: 'act3',
        type: 'fill_in_the_blank',
        content: {
          text: ["Une urne contient 5 boules rouges et 3 boules bleues. La probabilité de tirer une boule rouge est _____"],
          answers: ["5/8"],
          explanation: {
            steps: [
              { detail: "Il y a 5 boules rouges et un total de 8 boules. La probabilité est donc 5/8." }
            ]
          }
        },
        skillsImpact: {
          'Probabilités': 20,
          'Calculs mathématiques': 15
        }
      },
      {
        id: 'act4',
        type: 'open_ended',
        content: {
          question: "Explique pourquoi la somme des probabilités de toutes les issues d'une expérience aléatoire est toujours égale à 1.",
          answer: "Totalité des issues, événement certain, répartition des probabilités",
          explanation: {
            steps: [
              { detail: "Dans une expérience aléatoire, une issue doit forcément se produire." },
              { detail: "La somme des probabilités de toutes les issues doit donc être 1." }
            ]
          },
          typeTagHtmlAnswer: "input"
        },
        skillsImpact: {
          'Expression écrite': 25,
          'Probabilités': 20
        }
      },
      {
        id: 'act5',
        type: 'revision_sheet',
        content: [
          {
            type: 'section',
            title: 'Définition de la probabilité',
            content: 'La probabilité d\'un événement est un nombre compris entre 0 et 1 qui mesure la chance que cet événement se produise.'
          },
          {
            type: 'example',
            title: 'Exemple',
            content: 'Si on lance un dé équilibré, la probabilité d\'obtenir un 3 est de 1/6, car il y a 1 chance sur 6 d\'obtenir un 3.'
          },
          {
            type: 'remark',
            title: 'Remarque',
            content: 'Si un événement est certain, sa probabilité est 1. Si un événement est impossible, sa probabilité est 0.'
          },
          {
            type: 'question',
            questions: [
              {
                question: "Quelle est la somme des probabilités de toutes les issues possibles d'une expérience aléatoire ?",
                options: [
                  { text: "1", is_correct: true },
                  { text: "0", is_correct: false }
                ],
                explanation: {
                  steps: [
                    { detail: "La somme des probabilités de toutes les issues d\'une expérience est toujours 1." }
                  ]
                }
              }
            ]
          }
        ],
        skillsImpact: {
          'Probabilités': 10,
          'Logique': 5
        }
      },
      {
        "id": "13",
        "type": "true_false",
        "content": {
          "question": "Lorsqu’on tire une carte d’un jeu de 52 cartes, la probabilité d’obtenir un as est de 1/13.",
          "correct_answer": true,
          "explanation": {
            "steps": [
              { "detail": "Il y a 4 as dans un jeu de 52 cartes. Donc, la probabilité est 4/52 = 1/13." }
            ]
          }
        },
        "skillsImpact": {
          "Calcul de probabilités": 15,
          "Analyse de fréquence": 25
        }
      },
      {
        "id": "14",
        "type": "fill_in_the_blank",
        "content": {
          "text": ["On lance une pièce équilibrée. La probabilité d’obtenir face est _____."],
          "answers": ["1/2"],
          "explanation": {
            "steps": [
              { "detail": "Une pièce a deux faces : pile et face. Chaque issue a une probabilité de 1/2." }
            ]
          }
        },
        "skillsImpact": {
          "Calcul de probabilités": 20,
          "Logique": 15
        }
      },
      {
        "id": "act5",
        "type": "multiple_choice",
        "content": {
          "question": "On tire une boule d’un sac contenant 3 boules rouges, 2 bleues et 5 vertes. Quelle est la probabilité de tirer une boule rouge ?",
          "options": [
            { "text": "3/10", "is_correct": true },
            { "text": "1/5", "is_correct": false },
            { "text": "3/5", "is_correct": false },
            { "text": "2/10", "is_correct": false }
          ],
          "explanation": {
            "steps": [
              { "detail": "Il y a 3 boules rouges sur un total de 10 boules. Donc, P(rouge) = 3/10." }
            ]
          }
        },
        "skillsImpact": {
          "Calcul de probabilités": 15,
          "Analyse de fréquence": 25
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