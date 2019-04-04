import { Firebase, database, storageRef } from '../build/firebase.js';
import { Header } from '../build/header.js';

const firebaseobj = new Firebase();
const headobj = new Header();
var imagepath;
const template = document.createElement('template');
template.innerHTML = `<link href="./stylesheets/style.css" type="text/css" rel="stylesheet">
        <div class="container">
            <div class="successmessage">
                <p id="successmsg"></p>
            </div>
        </div>
        <div class="Post">
            <button class="btn techpostbtn" id="newpost">New Post</button>
        </div>
        <div id="flex-container">
            <user-card post-id="postdemo"></user-card>
        </div>
        <div id="postmodal" class="modal">
        <div class="modal-content">
        <p id="posterrormsg" class="errormsg"></p>
            <span class="close closepostmodalbtn">&times;</span>
            <form id="technologyform">
                <div class="form-group">
                    <label for="titleforpost">Title For Post :
                        <span class="mandatory">*</span>
                    </label>
                    <input type="text" class="form-control" id="techposttitle">
                    <p id="inputinfo">should be between 3 and 20 characters</p>
                </div>
                <div class="form-group">
                    <label for="techdesc">Description :
                        <span class="mandatory">*</span>
                    </label>
                    <textarea rows="4" cols="50" id="techdesc"></textarea>
                </div>
                <div class="form-group" id="selectopt">
                    <label for="selectcategory">Category :
                        <span class="mandatory">*</span>
                    </label>
                    <select id="selectcategory">
                        <option value="">Select</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="techfiles">Upload Image :
                    </label>
                    <input type="file" id="files">
                    <p id="imageerrormsg" class="errormsg"></p>
                </div>
                <div class="btn-group">
                    <button class="btn" id="postbtn">Submit</button>
                    <button class="btn closepostmodalbtn">Close</button>
                    <!-- <button class="btn" id="edit" onclick="editingpost()">Edit</button> -->
                </div>
            </form>
        </div>
    </div>`;
class ContentComponent extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
        firebaseobj.checksession();
        var postmodal = this._shadowRoot.querySelector('#postmodal');
        var loggedin = sessionStorage.getItem("user");;
        if (loggedin) {
            this._shadowRoot.querySelector('#newpost').style.display = "block";
        } else {
            this._shadowRoot.querySelector('#newpost').style.display = "none";
        }
        var selecttag = this._shadowRoot.querySelector('#selectcategory');

        database.ref("category/").on("value", function (snapshot) {
            console.log(snapshot.val());
            var categoryArray = snapshot.val();
            Object.keys(categoryArray).forEach(function (item, index) {
                var optiontag = document.createElement('option');
                optiontag.innerText = item;
                optiontag.setAttribute("value", item);
                selecttag.appendChild(optiontag);
            });
        });
        this._shadowRoot.querySelector('#newpost').addEventListener('click', function () {
            postmodal.style.display = "block";
        }.bind(this));

        this._shadowRoot.querySelector('#postbtn').addEventListener('click', function () {
            var errormsgsection = this._shadowRoot.querySelector('#posterrormsg');
            var title = this._shadowRoot.querySelector('#techposttitle').value;
            var description = this._shadowRoot.querySelector('#techdesc').value;
            var file = this._shadowRoot.querySelector('#files').files[0];
            var category = this._shadowRoot.querySelector('#selectcategory').value;
            var postedBy = sessionStorage.getItem("user");
            var postedDate = contentobj.getCurrentDate();
            if (title == "" || title < 3 || title > 20) {
                errormsgsection.innerText = "Enter Valid Title";
            } else if (description == "") {
                errormsgsection.innerText = "Enter Valid Description";
            } else if (category == "") {
                errormsgsection.innerText = "choose Valid category";
            } else {
                var uploadTask = storageRef.child(category + file.name).put(file);
                uploadTask.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
                    imagepath = url;
                    firebaseobj.writeTechPostData(title, description, url, file.name, category, postedBy, postedDate);
                });
            }
            // this._shadowRoot.querySelector("successmsg").innerText = 'Posted successfully';
            // setTimeout(() => { this._shadowRoot.querySelector("successmsg").style.display = 'none'; }, 4000);
        }.bind(this));
        //close post modal
        var closeElements = this._shadowRoot.querySelectorAll('.closepostmodalbtn');
        Array.from(closeElements).forEach(function (element) {
            element.addEventListener('click', () => {
                postmodal.style.display = "none";
            });
        });
    }
    getCurrentDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }
}

window.customElements.define('content-component', ContentComponent);
var contentobj = new ContentComponent();
//  contentobj.close();