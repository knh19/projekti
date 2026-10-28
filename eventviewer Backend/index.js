const express = require('express');
const cors = require('cors');
const eventRouter = require('./controllers/events')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter)
app.use('/api/events', eventRouter)
app.use('/api/login', loginRouter)

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Oii"
  });
});


app.listen(PORT, () => {
  console.log(`Palvelin käynnissä: http://localhost:${PORT}`);
});