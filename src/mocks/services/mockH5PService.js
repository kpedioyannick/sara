import { h5pQuizContent, h5pDragDropContent } from '../data/h5pContent';

const MOCK_DELAY = 500; // Simule un délai réseau

export const mockH5PService = {
  async loadContent(contentId) {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      title: "Quiz JavaScript",
      language: "fr",
      mainLibrary: "H5P.QuestionSet",
      defaultLanguage: "fr",
      license: "U",
      embedTypes: ["div"],
      library: {
        name: "H5P.QuestionSet",
        majorVersion: 1,
        minorVersion: 17
      },
      params: {
        introPage: {
          showIntroPage: true,
          title: "Quiz JavaScript",
          introduction: "Testez vos connaissances"
        },
        questions: [
          {
            library: "H5P.MultiChoice 1.14",
            params: {
              question: "Qu'est-ce qu'une variable let ?",
              answers: [
                {
                  text: "Une variable qui peut être réassignée",
                  correct: true
                },
                {
                  text: "Une constante",
                  correct: false
                }
              ]
            }
          }
        ]
      }
    };
  },

  // Simuler les événements xAPI
  mockXAPIEvent(type, score = 1) {
    return {
      statement: {
        actor: {
          name: "Test User",
          mbox: "mailto:test@example.com"
        },
        verb: {
          id: `http://adlnet.gov/expapi/verbs/${type}`,
          display: {
            "en-US": type
          }
        },
        result: {
          score: {
            scaled: score,
            raw: score * 100,
            min: 0,
            max: 100
          },
          success: score >= 0.5,
          completion: true
        },
        timestamp: new Date().toISOString()
      }
    };
  }
}; 