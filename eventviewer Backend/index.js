import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Backend toimii!"
  });
});


app.listen(PORT, () => {
  console.log(`Palvelin käynnissä: http://localhost:${PORT}`);
});