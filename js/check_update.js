
// make the whole serviceworker process into a promise so later on we can
// listen to it and in case new content is available a toast will be shown
window.isUpdateAvailable = new Promise(function(resolve, reject) {
	// lazy way of disabling service workers while developing
	if ('serviceWorker' in navigator && ['localhost', '127'].indexOf(location.hostname) === -1) {
		// register service worker file
		navigator.serviceWorker.register('service-worker.js')
			.then(reg => {
				reg.onupdatefound = () => {
					const installingWorker = reg.installing;
					installingWorker.onstatechange = () => {
						switch (installingWorker.state) {
							case 'installed':
								if (navigator.serviceWorker.controller) {
									// new update available
									resolve(true);
								} else {
									// no update available
									resolve(false);
								}
								break;
						}
					};
				};
			})
			.catch(err => console.error('[SW ERROR]', err));
	}
});

// Update:
// this also can be incorporated right into e.g. your run() function in angular,
// to avoid using the global namespace for such a thing.
// because the registering of a service worker doesn't need to be executed on the first load of the page


// listen to the service worker promise in index.html to see if there has been a new update.
// condition: the service-worker.js needs to have some kind of change - e.g. increment CACHE_VERSION.
window['isUpdateAvailable']
    .then(isAvailable => {
    if (isAvailable) {
        const toast = this.toastCtrl.create({
            message: 'New Update available! Reload the webapp to see the latest juicy changes.',
            position: 'bottom',
            showCloseButton: true,
        });
        toast.present();
    }
});