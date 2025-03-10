import { learningPaths } from './mockData';

// Simuler un délai réseau
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Récupérer tous les parcours
  getLearningPaths: async () => {
    await delay(1000); // Simuler la latence réseau
    return learningPaths;
  },

  // Récupérer un parcours spécifique
  getLearningPath: async (pathId) => {
    await delay(800);
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) throw new Error('Parcours non trouvé');
    return path;
  },

  // Récupérer une activité spécifique
  getActivity: async (pathId, activityId) => {
    await delay(500);
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) throw new Error('Parcours non trouvé');
    
    const activity = path.activities.find(a => a.id === activityId);
    if (!activity) throw new Error('Activité non trouvée');
    
    return activity;
  },

  // Vérifier une réponse
  checkAnswer: async (activityId, answer) => {
    await delay(600);
    let activity;
    for (const path of learningPaths) {
      activity = path.activities.find(a => a.id === activityId);
      if (activity) break;
    }
    
    if (!activity) throw new Error('Activité non trouvée');
    
    return {
      correct: activity.correctAnswer === answer,
      correctAnswer: activity.correctAnswer,
      feedback: activity.correctAnswer === answer 
        ? "Excellent ! C'est la bonne réponse !"
        : `Ce n'est pas correct. La bonne réponse est ${activity.correctAnswer}.`
    };
  }
}; 