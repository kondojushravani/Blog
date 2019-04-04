import { Firebase, database, storageRef } from '../build/firebase.js';

const firebaseobj = new Firebase();
const template = document.createElement('template');
template.innerHTML = `<link href="./stylesheets/style.css" type="text/css" rel="stylesheet">
     <footer>
     <div class="footercontent">
     <h4>&copy;Blog</h4>
     </div>
    </footer>`;
class Footer extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {}
}

window.customElements.define('footer-component', Footer);