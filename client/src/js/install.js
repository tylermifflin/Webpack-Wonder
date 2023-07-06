const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// set up a listener for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Update UI notify the user they can add to home screen
    butInstall.classList.toggle('hidden', false);
});

// set up a listener for the butInstall button
butInstall.addEventListener('click', async () => {
    // Show the prompt
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    butInstall.classList.toggle('hidden', true);
});

// set up a listener for the appinstalled event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
    // Log the installation to analytics or save the event somehow.
    console.log('👍', 'appinstalled', event);
});
