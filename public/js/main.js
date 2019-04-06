// const myForm = document.querySelector('#myform');
// const nameInput = document.querySelector('#name');
// const emailInput = document.querySelector('#email');
// const subjectInput = document.querySelector('#subject');
// const messageInput = document.querySelector('#message');
// const list = document.querySelector('#list');

// myForm.addEventListener('submit', onSubmit);

// function onSubmit(e){
//     e.preventDefault();
//     const row = document.createElement('tr');

//     const subject = document.createTextNode(`${subjectInput.value}`);
//     const name = document.createTextNode(`${nameInput.value}`);
//     const email = document.createTextNode(`${emailInput.value}`);
//     const messages = document.createTextNode(`${messageInput.value}`);
    
    

//     row.innerHTML = `<td>${nameInput.value}</td><td>${emailInput.value}</td><td>${subjectInput.value}</td><td>${messageInput.value}</td><td><a onclick="deleteitem()" class="btn btn-danger" href="#">Delete</a></td>`;
//     list.appendChild(row);

//     nameInput.value = '';
//     emailInput.value = '';
//     subjectInput.value = '';
//     messageInput.value = '';

    
// }



//     function deleteitem(e1) {
//       e1.preventDefault();
//       el.parentElement.parentElement.remove();
//       list.innerHTML = '';
//     }
    
class Contact {
	constructor(subject, name, email, message) {
		this.subject = subject;
		this.name = name;
		this.email = email;
		this.message = message;
	}
}
class UI {
	static displayContact() {
		const contacts = Store.getcontact();
	}
	static addContactToList(contact){
	const list = document.querySelector('#list')
	const row = document.createElement('tr');
	row.innerHTML = `
		<td>${contact.subject}</td>
		<td>${contact.name}</td>
		<td>${contact.email}</td>
		<td>${contact.message}</td>
		<td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>`;
	list.appendChild(row);
	}
	static deleteContact(el){
		if(el.classList.contains('delete')){
			el.parentElement.parentElement.remove();
		}
	
	}
	static clearFields() {
		document.querySelector('#subject').value = '';
		document.querySelector('#name').value = '';
		document.querySelector('#email').value = '';
		document.querySelector('#message').value = '';
	  }
}

document.addEventListener('DOMContentLoaded',UI.displayContact);

document.querySelector('#contact')

class Store {
	static getcontact() {
		let contacts;
		if(localStorage.getItem('contacts') === null) {
			contacts = [];
		}else{
			contacts = JSON.parse(localStorage.getItem('contacts'));
		}
		return contacts;
	}
	static addContact(contact) {
		const contacts = Store.getcontact();
		contacts.push(contact);
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}
	static removeContact(name) {
		const contacts = Store.getcontact();
		contacts.forEach((contact,index) => {
			if(contact.subject === subject ){
				contacts.splice(index,1);
			}
		});
		localStorage.setItem('contacts',JSON.stringify(contacts));
	}
}
document.querySelector('#myform').addEventListener('submit', (e) => {

e.preventDefault();

const subject = document.querySelector('#subject').value;
const name = document.querySelector('#name').value;
const email = document.querySelector('#email').value;
const message = document.querySelector('#message').value;

if(subject === '' || name === '' || email === '' || message === '') {
	alert("Please fill in the form")
	
  } else {
    const contact =new Contact(subject,name,email,message);
    UI.addContactToList(contact);
    Store.addContact(contact);
	UI.clearFields();
	
  }

});

document.querySelector('#list').addEventListener('click', (e) => {

	UI.deleteContact(e.target);
	// Remove book from store
	Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
	//UI.showAlert('Contact Removed', 'success');
  });