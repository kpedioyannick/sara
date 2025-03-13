export const h5pService = {
  async getContent(contentId) {
    try {
      const response = await fetch(`/api/h5p/content/${contentId}`);
      if (!response.ok) throw new Error('Erreur lors du chargement du contenu H5P');
      return await response.json();
    } catch (error) {
      console.error('H5P service error:', error);
      throw error;
    }
  },

  async getLibraries() {
    try {
      const response = await fetch('/api/h5p/libraries');
      if (!response.ok) throw new Error('Erreur lors du chargement des bibliothèques H5P');
      return await response.json();
    } catch (error) {
      console.error('H5P service error:', error);
      throw error;
    }
  }
}; 