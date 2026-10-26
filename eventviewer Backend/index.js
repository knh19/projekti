const express = require('express');
const eventRouter = require('./controllers/events')

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/api/events', eventRouter)

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Oii"
  });
});


app.listen(PORT, () => {
  console.log(`Palvelin käynnissä: http://localhost:${PORT}`);
});