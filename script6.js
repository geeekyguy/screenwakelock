const wakeLockButton = document.getElementById('wakeLockButton');
const uploadContainer = document.getElementById('uploadContainer'); // ✅ Add this

let wakeLock = null;

wakeLockButton.addEventListener('click', async () => {
  if (wakeLock) {
    await wakeLock.release();
    wakeLock = null;
    wakeLockButton.textContent = 'Enable Wake Lock';
    wakeLockButton.style.display = 'block';

    if (uploadContainer) {
      uploadContainer.style.display = 'block'; // ✅ Show upload again when wake lock is disabled
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  } else {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLockButton.textContent = 'Disable Wake Lock';
      wakeLockButton.style.display = 'none';

      if (uploadContainer) {
        uploadContainer.style.display = 'none'; // ✅ Hide upload section when wake lock is enabled
      }

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
    }
  }
});

document.addEventListener('fullscreenchange', async () => {
  if (!document.fullscreenElement) {
    wakeLockButton.style.display = 'block';
    wakeLockButton.textContent = 'Enable Wake Lock';

    if (uploadContainer) {
      uploadContainer.style.display = 'block'; // ✅ Also restore upload on fullscreen exit
    }

    if (wakeLock) {
      try {
        await wakeLock.release();
        wakeLock = null;
      } catch (err) {
        console.error('Failed to release wake lock:', err);
      }
    }
  }
});
