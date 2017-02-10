var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

var customerCode = window.location.search.substring(1);

var dbCustomerRef = firebase.database().ref("customers" +"/"+ customerCode);
dbCustomerRef.once('value').then(function (snapshot) {
	var customerInfo = snapshot.val();
	var infoTitle = Object.keys(snapshot.val());
	for(i=0;i<infoTitle.length;i++){
		if (infoTitle[i] != "properties") {
 		var content = document.getElementById(infoTitle[i]);
 		content.value = customerInfo[infoTitle[i]];
 		}
	}
});
 function update() {
 	dbCustomerRef.set({
 		first_name: document.getElementById("first_name").value,
		last_name: document.getElementById("last_name").value,
		mobile: document.getElementById("mobile").value,
		contact_number_2: document.getElementById("contact_number_2").value,
		email: document.getElementById("email").value,
		bill_street: document.getElementById("bill_street").value,
		bill_city: document.getElementById("bill_city").value,
		bill_state: document.getElementById("bill_state").value,
		bill_postcode: document.getElementById("bill_postcode").value,
		bill_country: document.getElementById("bill_country").value
 	});
 }

 