;
// Registro de Características de PWA'S
((d, w, n, c) => {
	// Registro de SW
	if ('serviceWorker' in navigator) {
		w.addEventListener('load', () => {
			n.serviceWorker.register('./sw.js')
				.then(registration => {
					c(registration)
					c(
						'Service Worker registrado con éxito',
						registration.scope
					)
				})
        .catch(err => c(`Registro de Service Worker fallido`, err))
		})
	}

  // Activar Notificaciones
	if (window.Notification && Notification.permission !== 'denied') {
		Notification.requestPermission(status => {
			c(status)
			let n = new Notification('Título', {
				body: 'Soy una notificación :)',
        icon: './img/icon_192x192.png'
			})
		})
	}
})(document, window, navigator, console.log);


// Detección del Estado de la Conexión
((d, w, n, c) => {
	const header = d.querySelector('.Header'),
    megaTagTheme = d.querySelector('meta[name=theme-color]')

	function networkStatus (e) {
		c(e, e.type)

    if (n.onLine) {
			megaTagTheme.setAttribute('content', '#F7DF1E')
      header.classList.remove('u-offline')
			alert('Conexión Recuperada :)')
		} else {
			megaTagTheme.setAttribute('content', '#666')
			header.classList.add('u-offline')
			alert('Conexión Perdida')
		}
	}

	d.addEventListener('DOMContentLoaded', e => {
		if (!n.onLine) {
			networkStatus(this)
		}
		w.addEventListener('online', networkStatus)
		w.addEventListener('offline', networkStatus)
	})
})(document, window, navigator, console.log);



((d, w, n, c) => {

})(document, window, navigator, console.log);
((d, w, n, c) => {

})(document, window, navigator, console.log);
((d, w, n, c) => {

})(document, window, navigator, console.log);
((d, w, n, c) => {

})(document, window, navigator, console.log);