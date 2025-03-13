import { H5P } from "h5p-standalone";
import React, { useEffect, useRef, useState } from "react";
import { Box, Paper, Typography } from '@mui/material';

const H5PActivity = ({ activity }) => {
  const h5pContainer = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!h5pContainer.current) return;

    const loadH5P = async () => {
      try {
        setLoading(true);
        setError(null);

        // Configuration avec les deux chemins
        const options = {
          h5pJsonPath: '/h5p',  // dossier contenant h5p.json
          contentJsonPath: '/h5p/content', // dossier contenant content.json
          frameJs: '/h5p/frame.bundle.js',
          frameCss: '/h5p/styles/h5p.css'
        };

        console.log("Initializing H5P with options:", options);
        
        await new H5P(h5pContainer.current, options);
        
        console.log("H5P initialized successfully");
        setLoading(false);
      } catch (err) {
        console.error("H5P Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadH5P();

    return () => {
      if (h5pContainer.current) {
        h5pContainer.current.innerHTML = "";
      }
    };
  }, [activity]);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        p: 3,
        borderRadius: "16px",
        bgcolor: "#fff"
      }}
    >
      <Typography variant="h6" gutterBottom>
        {activity?.title || "Quiz Test"}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "400px",
          bgcolor: "rgba(0, 0, 0, 0.02)",
          borderRadius: "12px",
          overflow: "hidden"
        }}
      >
        {error && (
          <Typography color="error" sx={{ p: 2 }}>
            {error}
          </Typography>
        )}

        <div
          ref={h5pContainer}
          className="h5p-container"
          style={{ width: "100%", height: "100%", minHeight: "400px" }}
        />
      </Box>
    </Paper>
  );
};

export default H5PActivity;
