import { Firebase } from '../build/firebase.js';
(function () {
  const currentDocument = document.currentScript.ownerDocument;
  console.log(document.currentScript.ownerDocument);
  console.log(currentDocument);
  class UserCard extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      const template = currentDocument.querySelector('#user-card-template');
      const instance = template.content.cloneNode(true);
      console.log(instance);
      const title = this.getAttribute('post-id');
      shadowRoot.appendChild(instance);
      database.ref("technology/" + title).on("value", function (snapshot) {
        console.log(snapshot.val());
        this.render(snapshot.val());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }
    render(data) {
      console.log(data);
      this.shadowRoot.querySelector('.card-img-top').setAttribute("src", data.imagepath);
      this.shadowRoot.querySelector('.author').innerHTML = data.postedBy;
      this.shadowRoot.querySelector('.date').innerHTML = data.postedDate;
      this.shadowRoot.querySelector('posttitle h4').innerHTML = data.postTitle;
      this.shadowRoot.querySelector('.desc').innerHTML = data.description;
    }
  }

  customElements.define('user-card', UserCard);
});