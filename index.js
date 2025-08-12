const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const publicVapidKey = 'BIarTgzNGeEO_nMeJNcpesIC-6I4mTK_MluyFuL-uO4CwjoP8gs5ors5HW0llkszjZ5eb_dTMgK9HRdUPM_OXDg';
const privateVapidKey = 'Oj4uPOU-s30fW_pKBLJ0_pXnFgPkHd2fu2G2VuG-e7M';

webpush.setVapidDetails(
  'mailto:seu-email@exemplo.com',
  publicVapidKey,
  privateVapidKey
);

const subscriptions = [];

app.post('/subscribe', async (req, res) => {
  const subscription = req.body;
  console.log('Recebido subscription:', subscription);
  subscriptions.push(subscription);

  const payload = JSON.stringify({
    title: 'Notificações ativadas!',
    body: 'Você receberá notificações a partir de agora.'
  });

  try {
    await webpush.sendNotification(subscription, payload);
    res.status(201).json({ message: 'Inscrito e notificado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    res.status(500).json({ error: 'Erro ao enviar notificação' });
  }
});

app.listen(3002, () => console.log('Servidor rodando em http://localhost:3002'));
