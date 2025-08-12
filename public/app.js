function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i)
    outputArray[i] = rawData.charCodeAt(i);

  return outputArray;
}

async function subscribeUser() {
  const registration = await navigator.serviceWorker.register('sw.js');
  console.log('Service Worker registrado:', registration);

  const publicVapidKey = 'BIarTgzNGeEO_nMeJNcpesIC-6I4mTK_MluyFuL-uO4CwjoP8gs5ors5HW0llkszjZ5eb_dTMgK9HRdUPM_OXDg';

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  console.log('Subscription obtida:', subscription);

  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: { 'Content-Type': 'application/json' }
  });
}

document.getElementById('subscribe').onclick = subscribeUser;
