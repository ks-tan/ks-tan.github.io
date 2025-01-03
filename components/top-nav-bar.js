'use strict';

(function () {
	class TopNavBar extends HTMLElement {
		constructor() {
			super();
			const shadow = this.attachShadow({ mode: 'open' });
			const container = document.createElement('div');
			const remoteUrl = "https://ks-tan.github.io";
			container.innerHTML = `
				<style>
					h1 {
						margin-top: 4rem;
						font-weight: 400;
						font-size: 2.5rem;
						line-height: 0.5;
					}
					a {
						font-size: 1.2rem;
					}
				</style>
				<main>
					<h1>Tan Kang Soon</h1>
					<a href="/">home</a> |
					<a href="/blog">blog</a> | 
					<a href="/">games</a> |
					<a href="/">cv</a> |
					<a href="/">socials</a>
				</main>
			`;
			shadow.appendChild(container);
		}
	}
	customElements.define('top-nav-bar', TopNavBar);
})();