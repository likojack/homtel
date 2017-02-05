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
	// const mobile = doc

	// firebase.database().ref('customer/' + customerCode.value).set({
	// 	customer_code: customerCode.value,
	// 	first_name: firstName.value,
	// 	last_name: lastName.value

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

	window.location.href = 'bedroom_requirement.html'+'#'+'3'+'4'+'bedroom'+'1';

}
