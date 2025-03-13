export const h5pContent = {
  id: 'quiz-1',
  library: 'H5P.QuestionSet 1.17',
  params: {
    introPage: {
      showIntroPage: true,
      title: "Quiz JavaScript",
      introduction: "Testez vos connaissances"
    },
    progressType: "dots",
    passPercentage: 50,
    behaviour: {
      enableRetry: true,
      enableSolutionsButton: true,
      enableCheckButton: true
    },
    questions: [
      {
        library: "H5P.MultiChoice 1.14",
        params: {
          question: "Qu'est-ce qu'une variable let ?",
          answers: [
            {
              text: "Une variable qui peut être réassignée",
              correct: true,
              feedback: "Correct !"
            },
            {
              text: "Une constante",
              correct: false,
              feedback: "Non, c'est const qui définit une constante"
            }
          ],
          behaviour: {
            enableRetry: true,
            enableSolutionsButton: true,
            singlePoint: true
          }
        }
      },
      {
        library: "H5P.DragText 1.8",
        params: {
          taskDescription: "Placez les éléments dans le bon ordre pour créer une fonction",
          textField: "function *calculateSum* { *return* a + b; }",
          dropZones: ["calculateSum", "return"],
          behaviour: {
            enableRetry: true,
            showSolutionsRequiresInput: true
          }
        }
      }
    ]
  },
  metadata: {
    title: 'Mon Quiz',
    license: 'U',
    authors: [{ name: 'SARA', role: 'Author' }]
  }
}; 

export const h5pDragDropContent = {
  "title": "Drag & Drop Concepts",
  "library": "H5P.DragQuestion 1.13",
  "params": {
    "question": "Placez les concepts dans la bonne catégorie",
    "background": {
      "path": "images/programming-concepts.jpg"
    },
    "dropZones": [
      {
        "label": "Variables",
        "x": 25,
        "y": 25,
        "correctElements": ["0", "1"]
      },
      {
        "label": "Fonctions",
        "x": 75,
        "y": 25,
        "correctElements": ["2", "3"]
      }
    ],
    "elements": [
      {
        "type": "text",
        "value": "let",
        "x": 20,
        "y": 80
      },
      {
        "type": "text",
        "value": "const",
        "x": 40,
        "y": 80
      },
      {
        "type": "text",
        "value": "function",
        "x": 60,
        "y": 80
      },
      {
        "type": "text",
        "value": "=>",
        "x": 80,
        "y": 80
      }
    ]
  }
}; 