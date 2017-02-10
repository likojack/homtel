var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

  var customerCode = window.location.search.substring(1);

  var dbPropertyRef = firebase.database().ref("customers" + "/" + customerCode + "/" + "properties");
  dbPropertyRef.on('value', function(snapshot) {
  	//get the property code list
  	var propertyList = snapshot.val();  	
  	snapshot.forEach(function(childSnapshot) {
  		//create buttons for each property code
  		var button = document.createElement("button");
  		console.log(button);
  		button.innerHTML = childSnapshot.val();
  		button.onclick = (function(childPropertyCode) {
  			//go to the corresponding property info page
  			location.href = "edit_property_info.html?" + "&" + childPropertyCode;
  		}).bind(null, childSnapshot.val());
  		document.body.appendChild(button);
  	});
  	
  	// var buttondocument.createElement("button");

  	
  	//button onclick goes to the property information page



  });
