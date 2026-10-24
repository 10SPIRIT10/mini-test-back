const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

// Route de test POST pour enregistrer un contact
app.post("/api/submit", async (req, res) => {
  const { nom, telephone } = req.body;

  console.log("Données reçues du front :", nom, telephone);

  if (!nom || !telephone) {
    return res
      .status(400)
      .json({ success: false, message: "Nom et téléphone obligatoires" });
  }

  // Insertion dans la table mini_test
  const { data, error } = await supabase
    .from("mini_test")
    .insert([{ nom, telephone }]);

  if (error) {
    console.error("Erreur Supabase :", error);
    return res.status(500).json({ success: false, message: error.message });
  }

  res.json({
    success: true,
    message: "Utilisateur enregistré avec succès dans Supabase !",
  });
});

// Démarrage du serveur local
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé en local sur http://localhost:${PORT}`);
});
