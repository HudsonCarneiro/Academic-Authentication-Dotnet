const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
const cors = require("cors");

// Middleware para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota para dashboard
app.get("/Pages/dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Pages", "dashboard.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
