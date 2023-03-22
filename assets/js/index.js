'use strict'

const createBtn = document.querySelector('.create-button');
const contactInput = document.querySelector('.contact-input');
const errorInfo = document.querySelector('.error-info');
const bigCenter = document.querySelector('.big-center');
const unit = document.querySelector('.Unit');
const result = document.querySelector('.result');

let inputInfo = [];
const contactsArray = [];

class Contact {
    #name;
    #city;
    #email;

    constructor(name,city,email) {
        this.#name = name;
        this.#city = city;
        this.#email = email;
    }

    get getname() {
        return this.#name
    }

    get getcity() {
        return this.#city
    }

    get getemail() {
        return this.#email
    }
}

createBtn.addEventListener('click', () => {
    
    // Divide input information into an array by commas
    inputInfo = contactInput.value.trim().split(',');

    // Verify the format and create the object after it is correct. Push them 
    // into array.
    const verifyName = /^([A-Za-z]+\s?)*[A-Za-z]$/;
    const verifyCity = /^([A-Za-z]+\s?)*[A-Za-z]$/;
    const verifyEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if (verifyName.test(inputInfo[0]) && 
        verifyCity.test(inputInfo[1]) && 
        verifyEmail.test(inputInfo[2])) {
        const contact = new Contact(inputInfo[0],inputInfo[1],inputInfo[2]);
        errorInfo.style.visibility = 'hidden';
        contactsArray.push(contact);
    } else {
        errorInfo.style.visibility = 'visible';
    }

    // Clear all the already added tontacts, loop through the array to create a 
    // DIV of tontact, and add them.
    function listContact(array) {
        bigCenter.innerHTML = '';
        array.forEach(element => {
            const contactDiv = document.createElement("div");
            contactDiv.className = "Unit";
            contactDiv.innerHTML = `<div class="contact-name">Name: ${element.getname}</div>
                                    <div class="contact-city">City: ${element.getcity}</div>
                                    <div class="contact-email">Email: ${element.getemail}</div>`
            bigCenter.appendChild(contactDiv);
            result.innerHTML = `total: ${array.length}`;
        });

        // Get the divs for all contacts and add click delete events to them.
        const allUnit = document.querySelectorAll('.Unit');
        allUnit.forEach((element,index) => {
            element.addEventListener('click', () => {
                contactsArray.splice(index,1);
                element.remove();
                if(contactsArray.length === 0) {
                    result.innerHTML = `Let's create contact information`;
                } else {
                    result.innerHTML = `total: ${contactsArray.length}`;
                }
                // After deletion, call listContact() again to readd the div of 
                // all contacts
                listContact(contactsArray);
            });
        });
    }
    
    listContact(contactsArray);
});

