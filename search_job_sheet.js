var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

function search() {
	const firstName = document.getElementById("firstName");
	const lastName = document.getElementById("lastName");
	const customerCode = document.getElementById("customerCode");
	var dbRefCustomer = firebase.database().ref().child('customer_test').child(customerCode.value).child("property_code");
	dbRefCustomer.on('value', function (snapshot){
			var propertyList = snapshot.val();
			var urlString = "job_sheet_home.html?"
			for(i = 0; i < propertyList.length; i++) {
				// var button = document.createElement("button");
				// button.innerHTML = propertyList[i];
				// button.id = propertyList[i];
				// document.body.appendChild(button);
				urlString = urlString + propertyList[i] + "&";
			}	
			location.href = urlString;
	});


	// console.log(propertyList);
	
}