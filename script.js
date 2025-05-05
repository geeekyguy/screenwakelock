const wakeLockButton = document.getElementById('wakeLockButton');
let wakeLock = null;

wakeLockButton.addEventListener('click', async () => {
  if (wakeLock) {
    await wakeLock.release();
    wakeLock = null;
    wakeLockButton.textContent = 'Enable Wake Lock';
  } else {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLockButton.textContent = 'Disable Wake Lock';
    } catch (err) {
      console.error('Failed to request wake lock:', err);
      // Handle error, e.g., show an error message to the user
    }
  }
});
