'use strict';

(function () {
	class TopNavBar extends HTMLElement {
		constructor() {
			super();
			console.log(window.location.hash);
			const shadow = this.attachShadow({ mode: 'open' });
			const container = document.createElement('div');
			const title = "Tan Kang Soon";
			const remoteUrl = "https://ks-tan.github.io"
			container.innerHTML = `
				<style>
					main {
						font-family: sans-serif;
						font-size: 2.5vw;
						line-height: 7.5vw;
						margin: 0 auto;
					}
					main a {
						float: left;
						text-decoration: none;
						text-align: center;
						color: black;
					}
					
					/* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */ 
					@media (min-width:1025px)  {
						main {
							font-size: 1.2vw;
							line-height: 2vw;
						}
					}
				</style>
				<main>
					<a href="${remoteUrl}">${title}</a>
					<a href="${remoteUrl}/svd">Blog</a>
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