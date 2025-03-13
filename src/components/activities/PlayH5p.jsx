import { H5P as H5PStandalone } from "h5p-standalone";
import React, { useEffect, useRef } from "react";

function PlayH5p({ h5pJsonPath }) {
  const h5pContainer = useRef(null);

  useEffect(() => {
    const loadH5P = async () => {
      try {
        const el = h5pContainer.current;
        const options = {
          h5pJsonPath: h5pJsonPath,
          frameJs: "/h5p/frame.bundle.js",
          frameCss: "/h5p/styles/h5p.css",
        };

        // 1️⃣ Charger H5P
        await new H5PStandalone(el, options);

        // 2️⃣ Vérifier que window.H5P est bien défini
        if (window.H5P && window.H5P.externalDispatcher) {
          console.log("H5P chargé avec succès");

          // 3️⃣ Masquer le bouton "Suivant" au démarrage
          const nextButton = document.querySelector(".h5p-next");
          if (nextButton) {
            nextButton.style.display = "none";
          }

          // 4️⃣ Écouter les événements xAPI une fois le player prêt
          window.H5P.externalDispatcher.on("xAPI", (event) => {
            console.log("xAPI event: ", event);

            // Vérifier si l'utilisateur a répondu à la question
              console.log("L'utilisateur a répondu !");
              
              // Afficher le bouton "Suivant"
              if (nextButton) {
                nextButton.style.display = "block";
              }
          });
        } else {
          console.error("H5P n'est pas disponible dans window !");
        }
      } catch (error) {
        console.error("Erreur lors du chargement de H5P :", error);
      }
    };

    loadH5P();
  }, [h5pJsonPath]);

  return <div ref={h5pContainer}></div>;
}

export default PlayH5p;
