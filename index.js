const express = require('express');

const app = express();

const PORT = 3000;

app.get('/setup', (_req, res) => {
  res.status(200).send('Setup Inicial'); 
}); 

app.listen(PORT, () => {
  console.log(`Aplicação ouvindo na porta ${PORT}`);
}); 