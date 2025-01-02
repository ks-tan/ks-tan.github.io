'use strict';

(function () {
	class SiteFooter extends HTMLElement {
		constructor() {
			super();
			const shadow = this.attachShadow({ mode: 'open' });
			const container = document.createElement('div');
			container.innerHTML = `
				<main>
                    <br>
                    &#xA9; Tan Kang Soon 2025, built using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">VanillaJS</a>
				</main>
			`;
			shadow.appendChild(container);
		}
	}
	customElements.define('site-footer', SiteFooter);
})();