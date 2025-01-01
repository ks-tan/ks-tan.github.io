'use strict';

(function () {
	class TopNavBar extends HTMLElement {
		constructor() {
			super();
			console.log(window.location.hash);
			const shadow = this.attachShadow({ mode: 'open' });
			const container = document.createElement('div');
			const remoteUrl = "https://ks-tan.github.io"
			container.innerHTML = `
				<style>
					h1 {
						font-weight: 400;
						margin-top: 4rem;
						margin-bottom: 1.5rem;
						font-size: 3.2rem;
						line-height: 1;
					}
				</style>
				<main>
					<h1>Tan Kang Soon</h1>
					<a href="${remoteUrl}">home</a> |
					<a href="${remoteUrl}/svd">blog</a> | 
					<a href="${remoteUrl}/svd">games</a> |
					<a href="${remoteUrl}/svd">resume</a>
					<br>
				</main>
				<script>
					function displayHash() {
						var theHash = window.location.hash;
						console.log(theHash);
					}
					displayHash();
				</script>
			`;
			shadow.appendChild(container);
		}
	}
	customElements.define('top-nav-bar', TopNavBar);
})();