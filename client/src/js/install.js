const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Update UI notify the user they can add to home screen
    butInstall.removeAttribute('hidden');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Show the prompt
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    butInstall.setAttribute('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {});
