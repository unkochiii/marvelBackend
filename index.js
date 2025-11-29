// importer les dependances
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//premiere route générale
app.get("/", (req, res) => {
  res.json({ message: "Coucou, ceci est mon serveur Marvel:)" });
});

//voir tous les personnages
app.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || "";
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 100;

    const response = await axios.get(`${process.env.BASE_URL}/characters`, {
      params: {
        apiKey: process.env.API_KEY,
        skip: skip,
        limit: limit,
        ...(name && { name: name }), // Ajoute name seulement s'il existe
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Personnages introuvables" });
  }
});

//voir tous les comics
app.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 100;

    const response = await axios.get(`${process.env.BASE_URL}/comics`, {
      params: {
        apiKey: process.env.API_KEY,
        skip: skip,
        limit: limit,
        ...(title && { title: title }), // Ajoute title seulement s'il existe
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Comics introuvables" });
  }
});

//voir toutes les infos d'un comic
app.get("/comic/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/comic/${req.params.id}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error GET /comics/:id",
      error.response ? error.response.status : error.message
    );
    res.status(500).json({ error: "Comic introuvable" });
  }
});

//voir toutes les infos d'un personnage
app.get("/character/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/character/${req.params.id}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error GET /characters/:id",
      error.response ? error.response.status : error.message
    );
    res.status(500).json({ error: "Personnage introuvable" });
  }
});

//voir tous les comics contenant un personnage
app.get("/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/comics/${req.params.id}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error GET /comics/:id",
      error.response ? error.response.status : error.message
    );
    res.status(500).json({ error: "Comic introuvable" });
  }
});

//route si rien
app.all(/.*/, (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur Express démarré sur http://localhost:${port}`);
});
