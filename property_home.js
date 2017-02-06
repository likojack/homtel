var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
firebase.initializeApp(config);

var query = window.location.search.substring(1).split("&");
console.log(query[0]);
var dbRefProperty = firebase.database().ref("job_sheet_test/").child(query[0]);
dbRefProperty.on("value", function (snapshot) {
	var property = snapshot.val();
	var listRoom = Object.keys(property);
	var numRoom = Object.keys(property).length;
	for (i = 0; i < numRoom; i++) {
		var button = document.createElement("button");
		button.innerHTML = listRoom[i];
		console.log(listRoom[i].slice(0,-2));
		button.onclick = (function (roomType) { //jump to room job sheet page
			location.href = roomType.slice(0,-2)+"_job_sheet.html?" + query[0] + "&" + roomType;
		}).bind(null, listRoom[i]);
		document.body.appendChild(button);

	}
});

