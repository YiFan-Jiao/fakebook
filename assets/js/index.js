'use strict'

const postBtn = document.querySelector('.rel-post');
const textareaInput = document.querySelector('textarea');
const errorInfo = document.querySelector('.error-info');
const jsBox = document.querySelector('.js-box');
const whiteBox = document.querySelector('.white-box');
const postImg = document.querySelector('.post-img');
const showImg = document.querySelector('.showImg');




let inputInfo = [];
const contactsArray = [];

class User {
    #id;
    #name;
    #username;
    #email;

    #date;
    #text;
    #img;

    constructor(id,name,username,email,date,text,img) {
        this.#id = id;
        this.#name = name;
        this.#username = username;
        this.#email = email;

        this.#date = date;
        this.#text = text;
        this.#img = img;
        
        
    }

    get getid() {
        return this.#id
    }

    get getname() {
        return this.#name
    }

    get getusername() {
        return this.#username
    }

    get getemail() {
        return this.#email
    }

    get getdate() {
        return this.#date
    }

    get gettext() {
        return this.#text
    }

    get getimg() {
        return this.#img
    }

    getInfo () {
        return `${this.getid} ${this.getname} ${this.getusername} ${this.getemail} ${this.getdate} ${this.gettext} ${this.getimg}`
    }
}

const reader = new FileReader();
let imgSrc = '';

postImg.onchange = function() {
    const imgFile = this.files[0];
    reader.readAsDataURL(imgFile);
}

reader.onload = function () {
    //console.log(this.result);
    //const img = new Image();
    //img.src = this.result;
    imgSrc = this.result
    //showImg.appendChild(img)
}

function makediv(array) {
    jsBox.innerHTML = '';
    console.log(array)

    array.forEach(element => {
        const contactDiv = document.createElement("div");
        contactDiv.className = "white-box";
        contactDiv.innerHTML = `<div class="box-head">
                                    <div class="head-name">
                                        <img src="./assets/image/my-img.jpg" alt="">${element.getusername}
                                    </div>
                                    <div class="head-date">
                                        ${element.getdate}
                                    </div>
                                </div>
                                <div class="box-content">
                                    <div class="text-content">
                                        ${element.gettext}
                                    </div>
                                    <div class="img-content">
                                        <img src="${element.getimg}" alt="">
                                    </div>
                                </div>`
        jsBox.appendChild(contactDiv);
    });


}

postBtn.addEventListener('click', () => {
    console.log(textareaInput.value.trim());
    const dates = `${(new Date()).getDate().toString().padStart(2, '0')} ${((new Date()).getMonth()+1).toString().padStart(2, '0')}, ${(new Date()).getFullYear()}`

    if(textareaInput.value.trim()) {
        const user = new User('001','Yifan Jiao','Yifan','jiao1995cn@gmail.com',dates,textareaInput.value.trim(),imgSrc);
        //console.log(user)
        contactsArray.unshift(user);
    }

    makediv(contactsArray);
});

