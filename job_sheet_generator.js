//initialize Firebase
var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);
function writePropertyInfo() {
	//test reading from input field in html:
	// var p = document.createElement("p");
	// var textp = document.createTextNode(customerCode.value);
	// p.appendChild(textp);
	// document.body.appendChild(p);
	
	//write customer info to database
	const customerCode = document.getElementById("customerCode");
	const firstName = document.getElementById("fName");
	const lastName = document.getElementById("lName");
	const numBed = document.getElementById("numBed");
	const numBath = document.getElementById("numBath");
	const tKitchen = document.getElementById("tKitchen");
	const fKitchen = document.getElementById("fKitchen");
	const Email = document.getElementById("email");
	// const mobile = doc
	console.log(customerCode.value, firstName.value, lastName.value);
	firebase.database().ref('customer/' + customerCode.value).set({
		customer_code: customerCode.value,
		first_name: firstName.value,
		last_name: lastName.value,
		email: Eamil.value
	});
		// TODO: set id in HTML input field, read it to this js file,
		//and then write them to database.
    // First Name: name,
    // Last Name: email,
    // Mobile: 
    // billingStreet:
    // billingCity:
    // billlingState:
    // billingPostCode:
    // billingCoutry:
	// });

	//generate corresponding HTML pages according to property setting,
	// and then write service requirement to database
	//assume the number of bedroom is 2

	
}
function nextRoom() {
	window.location.href = 'bedroom_requirement.html'+'#'+numBed.value+numBath.value+'bedroom'+'1';
}