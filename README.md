# Exemplo-de-Push-notification
Exemplo de Push notification


public/: pasta estática que o Express irá servir. Contém o HTML, JS do frontend e o Service Worker.

index.js: servidor Node.js com Express que recebe inscrições e envia notificações.

sw.js: script do Service Worker, escuta notificações push e exibe no navegador.

app.js: script de frontend que lida com permissão, subscription e envio para o servidor.

package.json: dependências (como web-push, express, body-parser).


🛠 Como iniciar:
Crie a estrutura acima.

Rode:

bash
Copy
Edit
npm init -y
npm install express web-push body-parser
Inicie com:

bash
Copy
Edit
node index.js
Acesse: http://localhost:3000
