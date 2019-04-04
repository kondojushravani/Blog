import {Firebase , database , storageRef} from '../build/firebase.js'
export {Header};
const firebaseobj = new Firebase();
const template = document.createElement('template');
template.innerHTML = `<link href="./stylesheets/style.css" type="text/css" rel="stylesheet">
    <header>
        <div class="loghead">
            <a href="#" id="loginbtn"></a>
            <a href="#" id="logout"></a>
            <p id="currentuser"></p>
        </div>
        <nav id="navbar">
        </nav>
    </header> 
    <div class="loaderparent">  <div class="loader"></div></div>   
  
    <div id="logmodal" class="modal">
        <div class="modal-content">
            <span class="logmodalclosebtn close">&times;</span>
            <span id="loginerrormsg"></span>
            <form id="loginform" name = "loginForm">
                <div class="form-group">
                    <label for="username">Email :
                        <span class="mandatory">*</span>
                    </label>
                    <input type="text" class="form-control " id="uname" name="username">
                    <p id="nameerrormsg" class="errormsg"></p>
                </div>
                <div class="form-group">
                    <label for="password">Password :
                        <span class="mandatory">*</span>
                    </label>
                    <input type="password" class="form-control " id="pass" name="password">
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

    </div>
    <div id="registermodal" class="modal">
        <div class="modal-content">
            <span class="close closeregistermodalbtn">&times;</span>
            <span id="registererrormsg" class="errormsg"></span>
            <form id="registerform">
                <div class="form-group">
                    <label for="displayname">Display Name :
                        <span class="mandatory">*</span>
                    </label>
                    <input type="text" class="form-control " id="displayname">
                    <!-- <p id="regnameerrormsg" class="errormsg"></p> -->
                </div>
                <div class="form-group">
                    <label for="username">Email :
                        <span class="mandatory">*</span>
                    </label>
                    <input type="text" class="form-control " id="name">
                    <!-- <p id="regnameerrormsg" class="errormsg"></p> -->
                </div>
                <div class="form-group">
                    <label for="password">Password :
                        <span class="mandatory">*</span>
                    </label>
                    <input type="password" class="form-control " id="userpass">
                    <!-- <p id="passerrormsg" class="errormsg"></p> -->
                </div>
                <div class="form-group">
                    <label for="confirmpassword">confirm Password :
                        <span class="mandatory">*</span>
                    </label>
                    <input type="password" class="form-control " id="confirmpass">
                    <!-- <p id="confirmpasserrormsg" class="errormsg"></p> -->
                </div>
                <div class="btn-group">
                    <button class="btn" id="signup" onclick="signup()">SIGN UP</button>
                    <button class="btn closeregistermodalbtn">Close</button>
                </div>
            </form>
        </div>

    </div>`;
    var categoryArray;
    var logoutbtn;
    var loginbtn;
//  const currentDocument = document.currentScript.ownerDocument;
  class Header extends HTMLElement{
      constructor(){
          super();
        var categoryArray = firebaseobj.categoryArray;
        this._shadowRoot = this.attachShadow({'mode': 'open'});
    //   const template = currentDocument.querySelector('#header-template');
         this._shadowRoot.appendChild(template.content.cloneNode(true));
      }
    connectedCallback() {
        var loader = this._shadowRoot.querySelector(".loader")
        loader.style.display = "block";
        logoutbtn = this._shadowRoot.querySelector('#logout');
        loginbtn = this._shadowRoot.querySelector('#loginbtn');
        // this.checkIsLoggedIn();
        firebaseobj.checksession();
        var navbar = this._shadowRoot.querySelector('#navbar');
        var atag = document.createElement('a')
            atag.innerText = "Home" ;
            atag.setAttribute("href","index.html") 
            navbar.appendChild(atag);
        database.ref("category/").on("value", function(snapshot){
            console.log(snapshot.val());
            categoryArray = snapshot.val();
            if(categoryArray){loader.style.display = "none";}
            Object.keys(categoryArray).forEach(function (item, index) {
            var atag = document.createElement('a')
            atag.innerText = item ; 
            atag.setAttribute("href",categoryArray[item])
            navbar.appendChild(atag);
        }.bind(this));
        })
        // this._shadowRoot.querySelector('#navbar a').addEventListener('click',function(){
        //     this._shadowRoot.querySelector('#navbar a').style.textDecoration = "underline";
        // }.bind(this))
        var logmodal = this._shadowRoot.querySelector('#logmodal')
        loginbtn.addEventListener('click',function(){
           logmodal.style.display = "block";
        }.bind(this))
        var regmodal = this._shadowRoot.querySelector('#registermodal')
        this._shadowRoot.querySelector('#registerhere').addEventListener('click',function(){
           regmodal.style.display = "block";
           logmodal.style.display = "none";
        }.bind(this))

         this._shadowRoot.querySelector('#login').addEventListener('click',function(){
            var username = this._shadowRoot.querySelector('#uname').value;
            var password = this._shadowRoot.querySelector('#pass').value;
            if(username == "" || username <3 || username >20){
                this._shadowRoot.querySelector('#loginerrormsg').innerText = "Enter Valid UserName"
            }else if(password == ""){
                this._shadowRoot.querySelector('#loginerrormsg').innerText = "enter Valid Password"
            }else{
                firebaseobj.loginfunction(username,password);
            }
        }.bind(this)) 


        this._shadowRoot.querySelector('#logout').addEventListener('click',function(){
            firebaseobj.logoutfunction();
        }.bind(this))

        
        // close Login Modal
        var closeElements = this._shadowRoot.querySelectorAll('.logmodalclosebtn');
        console.log(closeElements)
        Array.from(closeElements).forEach(function(element) {
            element.addEventListener('click',() => {logmodal.style.display = "none";});
        });

        //close register modal
        var closeElements = this._shadowRoot.querySelectorAll('.closeregistermodalbtn');
        Array.from(closeElements).forEach(function(element) {
            element.addEventListener('click',() => {regmodal.style.display = "none";});
        });
    }
  }
  
  window.customElements.define('header-component', Header);
 



