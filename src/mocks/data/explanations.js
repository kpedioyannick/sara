export const explanations = {
  'act1': {
    steps: [
      {
        step: 1,
        instruction: "Pour résoudre 2 + 2, visualisons d'abord ce que représente le premier nombre",
        hint: "Dessinez ou imaginez 2 objets",
        question: {
          text: "Combien d'objets avez-vous maintenant ?",
          options: [
            { text: "1 objet", is_correct: false },
            { text: "2 objets", is_correct: true },
            { text: "3 objets", is_correct: false }
          ]
        }
      },
      {
        step: 2,
        instruction: "Maintenant, nous devons ajouter le deuxième nombre",
        hint: "Ajoutez 2 autres objets à côté des premiers",
        question: {
          text: "Que devez-vous faire avec ces nouveaux objets ?",
          options: [
            { text: "Les enlever", is_correct: false },
            { text: "Les ajouter aux premiers", is_correct: true },
            { text: "Les multiplier", is_correct: false }
          ]
        }
      },
      {
        step: 3,
        instruction: "Maintenant que nous avons tous les objets ensemble, comptons-les",
        hint: "Comptez un par un tous les objets",
        question: {
          text: "Combien d'objets avez-vous au total ?",
          options: [
            { text: "3 objets", is_correct: false },
            { text: "4 objets", is_correct: true },
            { text: "5 objets", is_correct: false }
          ]
        }
      }
    ],
    finalExplanation: "En additionnant 2 + 2, nous avons combiné 2 groupes de 2 objets pour obtenir un total de 4 objets.",
    visualAid: "🍎🍎 + 🍎🍎 = 🍎🍎🍎🍎"
  },
  // ... autres explications ...
}; 