require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { DB_PORT } = process.env;

const app = express();
const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');
const categRouter = require('./routers/categRouter');
const postRouter = require('./routers/postRouter');

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categRouter);
app.use('/post', postRouter);

app.listen(DB_PORT);

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: err.message });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
