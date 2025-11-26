require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Coucou, ceci est mon serveur Vinted :)" });
});

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/characters?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Personnages introuvables" });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/comics?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Comics introuvables" });
  }
});

app.get("/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/comics/${req.params.id}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Comic introuvable" });
  }
});

app.get("/characters/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/characters/${req.params.id}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Personnage introuvable" });
  }
});

app.all(/.*/, (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur Express démarré sur http://localhost:${port}`);
});
