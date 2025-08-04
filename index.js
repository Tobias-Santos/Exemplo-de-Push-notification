const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const subscriptions = [];


// Receber inscrição
app.post('/subscribe', (req, res) => {
  subscriptions.push(req.body);
  res.status(201).json({ message: 'Inscrito com sucesso!' });
});

// Simular envio
app.get('/send', async (req, res) => {
  const notificationPayload = JSON.stringify({
    title: 'Nova notícia!',
    body: 'Clique para ler agora.'
  });

  const results = await Promise.allSettled(
    subscriptions.map(sub =>
      webpush.sendNotification(sub, notificationPayload)
    )
  );

  res.status(200).json({ resultados: results.length });
});

app.listen(3002, () => console.log('Servidor no http://localhost:3002'));
