var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);
console.log("print");
  //get property code
var propertyCode = window.location.search.substring(1);

  //read property info from database and put them on the page
var dbPropertyRef = firebase.database().ref("properties" + "/" + propertyCode);

dbPropertyRef.on('value', function(snapshot) {
	//get element by id for all the input field
	snapshot.forEach( function(childSnapshot) {
		console.log(childSnapshot.key);
		switch (childSnapshot.key) {
			case "cleaning":
			break;
			case "ironing":
			break;
			case "num_bathroom":
			break;
			case "num_bedroom":
			break;
			case "service_code":
			break;
			case "washing":
			break;
			case "property_type":
			var infoItem = document.getElementById(childSnapshot.val());
			infoItem.checked = "checked";
			break;
			case "front_door_lock_type":
			var infoItem = document.getElementById(childSnapshot.val());
			infoItem.checked = "checked";
			break;
			case "parking_provided":
			var infoItem = document.getElementById(childSnapshot.val());
			infoItem.checked = "checked";
			break;
			case "utility_lock_type":
			var infoItem = document.getElementById(childSnapshot.val());
			infoItem.checked = "checked";
			break;
			default:
			console.log(childSnapshot.key);
			var infoItem = document.getElementById(childSnapshot.key);
			infoItem.value = childSnapshot.val();

		}
	});
});

  //click button update, to re-write new info to database
function update() {
	//get the property reference
	var propertyType = null;
	if (document.getElementById('Unit').checked) {
  		propertyType = document.getElementById('Unit').value;
	} else if (document.getElementById('Apartment').checked) {
		propertyType = document.getElementById('Apartment').value;
	} else if (document.getElementById('Townhouse').checked) {
		propertyType = document.getElementById('Townhouse').value;
	} else if (document.getElementById('House').checked) {
		propertyType = document.getElementById('House').value;
	}
	var parking = null;
	if (document.getElementById('parkingYes').checked) {
  		parking = document.getElementById('parkingYes').value;
	} else if (document.getElementById('parkingNo').checked) {
		parking = document.getElementById('parkingNo').value;
	} 
	var frontDoorLockType = null;
	if (document.getElementById('doorKeyHole').checked) {
  		frontDoorLockType = document.getElementById('doorKeyHole').value;
	} else if (document.getElementById('doorPassCodeAndKeys').checked) {
		frontDoorLockType = document.getElementById('doorPassCodeAndKeys').value;
	} else if (document.getElementById('doorPassCode').checked) {
		frontDoorLockType = document.getElementById('doorPassCode').value;
	}
	var utilityLockType = null;
	if (document.getElementById('utilityKeyHole').checked) {
  		utilityLockType = document.getElementById('utilityKeyHole').value;
	} else if (document.getElementById('utilityPassCodeAndKeys').checked) {
		utilityLockType = document.getElementById('utilityPassCodeAndKeys').value;
	} else if (document.getElementById('utilityPassCode').checked) {
		utilityLockType = document.getElementById('utilityPassCode').value;
	}
	dbPropertyRef.update({
		property_type: propertyType,
		property_street: document.getElementById("property_street").value,
		property_city: document.getElementById("property_city").value,
		property_state: document.getElementById("property_state").value,
		property_postcode: document.getElementById("property_postcode").value,
		property_country: document.getElementById("property_country").value,
		parking_provided: parking,
		front_door_lock_type: frontDoorLockType,
		front_door_access: document.getElementById("front_door_access").value,
		utility_lock_type: utilityLockType,
		utility_access: document.getElementById("utility_access").value,

	});
	//update
}