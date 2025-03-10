import { learningPaths } from '../data/mockData';
import { categories } from '../data/categories';
import { explanations } from '../data/explanations';
import { users } from '../data/users';

// Simuler un délai réseau
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Configuration des délais (en ms)
const CONFIG = {
  NETWORK_DELAY: {
    MIN: 500,
    MAX: 1500
  }
};

// Générer un délai aléatoire
const getRandomDelay = () => {
  return Math.floor(
    Math.random() * (CONFIG.NETWORK_DELAY.MAX - CONFIG.NETWORK_DELAY.MIN) + CONFIG.NETWORK_DELAY.MIN
  );
};

export const mockApiService = {
  // Récupérer tous les parcours
  getLearningPaths: async () => {
    await delay(getRandomDelay());
    return learningPaths;
  },

  // Récupérer un parcours spécifique
  getLearningPath: async (pathId) => {
    await delay(getRandomDelay());
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) throw new Error('Parcours non trouvé');
    return path;
  },

  // Récupérer une activité spécifique
  getActivity: async (pathId, activityId) => {
    await delay(getRandomDelay());
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) throw new Error('Parcours non trouvé');
    
    const activity = path.activities.find(a => a.id === activityId);
    if (!activity) throw new Error('Activité non trouvée');
    
    return activity;
  },

  // Vérifier une réponse
  checkAnswer: async (activityId, answer) => {
    await delay(getRandomDelay());
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
  },

  // Obtenir des explications détaillées
  getDetailedExplanation: async (activityId) => {
    await delay(getRandomDelay());
    const explanation = explanations[activityId];
    if (!explanation) throw new Error('Explication non trouvée');
    return explanation;
  },

  // Récupérer toutes les catégories
  getCategories: async () => {
    await delay(getRandomDelay());
    return categories;
  },

  // Récupérer les parcours par catégorie et sous-catégorie
  getPathsByCategory: async (categoryId, subcategoryId) => {
    await delay(getRandomDelay());
    
    const category = categories.find(c => c.id === categoryId);
    if (!category) throw new Error('Catégorie non trouvée');

    const subcategory = category.subcategories.find(s => s.id === subcategoryId);
    if (!subcategory) throw new Error('Sous-catégorie non trouvée');

    const paths = learningPaths.filter(p => subcategory.paths.includes(p.id));
    return paths;
  },

  // Méthodes pour les parcours utilisateur
  getUserPaths: async (userId) => {
    await delay(getRandomDelay());
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Utilisateur non trouvé');

    return user.myPaths.map(userPath => ({
      ...userPath,
      pathDetails: learningPaths.find(p => p.id === userPath.pathId)
    }));
  },

  startPath: async (userId, pathId) => {
    await delay(getRandomDelay());
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Utilisateur non trouvé');

    if (user.myPaths.find(p => p.pathId === pathId)) {
      throw new Error('Parcours déjà commencé');
    }

    const newUserPath = {
      pathId,
      progress: 0,
      startedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
      completedActivities: [],
      results: []
    };

    user.myPaths.push(newUserPath);
    return newUserPath;
  },

  updatePathProgress: async (userId, pathId, activityResult) => {
    await delay(getRandomDelay());
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Utilisateur non trouvé');

    const userPath = user.myPaths.find(p => p.pathId === pathId);
    if (!userPath) throw new Error('Parcours non trouvé');

    userPath.lastAccessedAt = new Date().toISOString();
    userPath.results.push(activityResult);
    
    if (!userPath.completedActivities.includes(activityResult.activityId)) {
      userPath.completedActivities.push(activityResult.activityId);
    }

    const path = learningPaths.find(p => p.id === pathId);
    userPath.progress = (userPath.completedActivities.length / path.activities.length) * 100;

    return userPath;
  },

  resumePath: async (userId, pathId) => {
    await delay(getRandomDelay());
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Utilisateur non trouvé');

    const userPath = user.myPaths.find(p => p.pathId === pathId);
    if (!userPath) throw new Error('Parcours non trouvé');

    const path = learningPaths.find(p => p.id === pathId);
    if (!path) throw new Error('Parcours non trouvé');

    // Mettre à jour la date du dernier accès
    userPath.lastAccessedAt = new Date().toISOString();

    // Retourner les informations nécessaires pour reprendre le parcours
    return {
      path,
      progress: userPath.progress,
      completedActivities: userPath.completedActivities,
      results: userPath.results,
      // Trouver la première activité non complétée
      nextActivityIndex: path.activities.findIndex(
        act => !userPath.completedActivities.includes(act.id)
      ),
      isCompleted: userPath.completedActivities.length === path.activities.length
    };
  },

  savePathResults: async (pathId, results) => {
    console.log('savePathResults', pathId, results);
    await delay(getRandomDelay());
    const user = users.find(u => u.id === localStorage.getItem('userId'));
    if (!user) {
      console.log('Utilisateur non connecté - résultats non sauvegardés');
      return {
        success: false,
        message: 'Utilisateur non connecté'
      };
    }

    // Simuler une sauvegarde dans un fichier JSON
    const resultData = {
      userId: user.id,
      pathId,
      results,
      completedAt: new Date().toISOString(),
      savedAt: new Date().toISOString()
    };

    // Récupérer les résultats existants du localStorage
    const savedResults = JSON.parse(localStorage.getItem('pathResults') || '[]');
    
    // Ajouter ou mettre à jour les résultats
    const existingIndex = savedResults.findIndex(r => 
      r.userId === user.id && r.pathId === pathId
    );
    
    if (existingIndex !== -1) {
      savedResults[existingIndex] = resultData;
    } else {
      savedResults.push(resultData);
    }

    // Sauvegarder dans le localStorage
    localStorage.setItem('pathResults', JSON.stringify(savedResults));
    console.log('Résultats sauvegardés:', resultData);

    return {
      success: true,
      message: 'Résultats sauvegardés avec succès'
    };
  }
}; 