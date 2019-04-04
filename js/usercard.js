import {Firebase} from '../build/firebase.js'
(function () {
  const template = document.createElement('template');
  template.innerHTML = `<link href="./stylesheets/style.css" type="text/css" rel="stylesheet">
    <template id="user-card-template">
    <div class='card-image'>
      <img src="" class='.card-img-top'>
    </div>
    <div class='card-content'>
      <div class=''>
        <div class="author"></div>
        <div class='date'></div>
      </div>
      <div class='posttitle'>
        <h4></h4>
      </div>
      <div class='desc'></div>
    </div>
  </template>
  `;
  class UserCard extends HTMLElement{
      constructor(){
          super();

      }
    connectedCallback() {
      this._shadowRoot = this.attachShadow({'mode': 'open'});
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      database.ref("technology/"+title).on("value", function(snapshot){
          console.log(snapshot.val());
          this.shadowRoot.querySelector('.card-img-top').setAttribute("src",data.imagepath);
          this.shadowRoot.querySelector('.author').innerHTML = data.postedBy;
          this.shadowRoot.querySelector('.date').innerHTML = data.postedDate
          this.shadowRoot.querySelector('posttitle h4').innerHTML = data.postTitle;
          this.shadowRoot.querySelector('.desc').innerHTML = data.description;
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      })
    }
  }
  
  customElements.define('user-card', UserCard);
})
