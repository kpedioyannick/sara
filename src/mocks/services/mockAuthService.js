import { users, userSessions } from '../data/users';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
  login: async (email, password) => {
    await delay(1000);
    const user = users.find(u => u.email === email);
    if (!user) throw new Error('Utilisateur non trouvé');
    
    // Dans un vrai service, on vérifierait le mot de passe ici
    const token = 'token123';
    return { user, token };
  },

  register: async (email, password, name) => {
    await delay(1000);
    if (users.find(u => u.email === email)) {
      throw new Error('Email déjà utilisé');
    }

    const newUser = {
      id: `user${users.length + 1}`,
      email,
      name,
      myPaths: []
    };
    users.push(newUser);
    const token = `token${users.length}`;
    return { user: newUser, token };
  },

  getCurrentUser: async (token) => {
    await delay(500);
    const userId = userSessions[token];
    if (!userId) throw new Error('Session invalide');
    
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Utilisateur non trouvé');
    
    return user;
  },

  logout: async () => {
    await delay(500);
    // Dans un vrai service, on invaliderait le token ici
    return true;
  }
}; 