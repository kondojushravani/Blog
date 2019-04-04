import { Firebase, database, storageRef } from '../build/firebase.js';

const firebaseobj = new Firebase();
const template = document.createElement('template');
template.innerHTML = `<link href="./stylesheets/style.css" type="text/css" rel="stylesheet">
     <div id="logmodal" class="modal">
        <div class="modal-content">
            <span class="logmodalclosebtn close">&times;</span>
            <span id="loginerrormsg"></span>
            <form id="loginform">
                <div class="form-group">
                    <label for="username">User Name :
                        <span class="mandatory">*</span>
                    </label>
                    <input type="text" class="form-control " id="uname">
                    <p id="nameerrormsg" class="errormsg"></p>
                </div>
                <div class="form-group">
                    <label for="password">Password :
                        <span class="mandatory">*</span>
                    </label>
                    <input type="password" class="form-control " id="pass">
                    <p id="passerrormsg" class="errormsg"></p>
                </div>
                <div class="btn-group">
                    <div class="registerdiv">New user?
                        <a id="registerhere">Resister here</a>
                    </div>
                    <div class="btndiv">
                        <button class="btn" id="login">Log In</button>
                        <button class="btn logmodalclosebtn">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>`;
class LoginModal extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
        var loginbtn = this._shadowRoot.querySelector('#login');
        loginbtn.addEventListener('click', function () {
            var loggedin = firebaseobj.checksession();
            if (loggedin) {
                console.log("loggedin");
            } else {
                console.log("not loggedin");
            }
        });
    }
}

window.customElements.define('login-modal', LoginModal);