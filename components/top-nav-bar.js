'use strict';

(function () {
	class TopNavBar extends HTMLElement {
		constructor() {
			super();
			const shadow = this.attachShadow({ mode: 'open' });
			const container = document.createElement('div');
			const remoteUrl = "https://ks-tan.github.io"
			container.innerHTML = `
				<style>
					main {
						margin-bottom: 8rem;
					}
					h1 {
						font-weight: 400;
						margin-top: 10rem;
						margin-bottom: 1.5rem;
						font-size: 6.5rem;
						line-height: 1;
					}
					a {
						font-size: 2.5rem;
					}
					/* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */ 
					@media (min-width:1025px)  {
						main {
							margin-bottom: 0;
						}
						h1 {
							margin-top: 4rem;
							font-size: 3.2rem;
						}
						a {
							font-size: 1.4rem;
						}
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
			`;
			shadow.appendChild(container);
		}
	}
	customElements.define('top-nav-bar', TopNavBar);
})();