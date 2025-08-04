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
    const publicVapidKey = 'BDEb0a1e5FLYVXgh3WSR6I3F6MTGJhXUxMC7XSo0qZJKSSG_eEPGV1-KU6mTkPOMHo_fzOlDFHEU_XYChgFVE-Y';
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
  
    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  document.getElementById('subscribe').onclick = subscribeUser;
  