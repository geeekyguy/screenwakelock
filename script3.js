const wakeLockButton = document.getElementById('wakeLockButton');
let wakeLock = null;

wakeLockButton.addEventListener('click', async () => {
  if (wakeLock) {
    await wakeLock.release();
    wakeLock = null;
    wakeLockButton.textContent = 'Enable Wake Lock';
    wakeLockButton.style.display = 'block'; // Show the button again
    // Exit full screen mode
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  } else {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLockButton.textContent = 'Disable Wake Lock';
      wakeLockButton.style.display = 'none'; // Hide the button after enabling wake lock
      // Enter full screen mode
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } catch (err) {
      console.error('Failed to request wake lock:', err);
      // Handle error, e.g., show an error message to the user
    }
  }
});
