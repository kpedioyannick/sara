const BASE_URL = 'https://7bcb-2a01-cb05-8941-2600-2cb6-85a5-c3f2-f0e7.ngrok-free.app';

export const apiService = {
  // Obtenir des explications détaillées
  getDetailedExplanation: async (activityId, problem) => {
    try {
      const response = await fetch(`${BASE_URL}/api/explanation/${activityId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problem }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'explication');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur serveur');
      }

      return data.data; // Retourne directement les données d'explication
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
}; 