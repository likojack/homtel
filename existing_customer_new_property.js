var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);
  function search() {
  	//get customer name or customerCode if known and property code
  	const customerCode = document.getElementById("customerCode");
  	const propertyCode = document.getElementById("propertyCode");
  	//add property code to the customer's properties
  	var dbRefCustomer = firebase.database().ref("customer_test/"+customerCode.value).child("property_code");


  	dbRefCustomer.once('value').then(function (snapshot) {
  		//get the number of property
  		var propertyListLength = snapshot.numChildren();

  		// write length + 1: property code
  		var newIndex = propertyListLength + 1
  		//write new key:value pair to the database
  		var newProperty = {};
  		newProperty[newIndex] = propertyCode.value;
  		dbRefCustomer.update(newProperty);
  	}
  	//TODO: 
  	//add property info to property node

  	//go to job sheet generation stream
  }