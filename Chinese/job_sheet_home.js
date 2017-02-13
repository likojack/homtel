var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
firebase.initializeApp(config);
var query = window.location.search.substring(1).split("&");

var offset = 1; // url ends with a &, last query element is empty string, exclude it in for loop
function directUrl(base, property_code) {
	location.href = base +"?&"+ property_code;
}
for (var i = 0; i < query.length - offset; i++) {
	var button = document.createElement("button");
	button.innerHTML = query[i];
	button.onclick = (function(property_code) {
		location.href = "property_home.html"+"?" + property_code;
	}).bind(null, query[i]);
	document.body.appendChild(button);

}

// var dbRefJobSheetList = firebase.database().ref().child('job_sheet_test');
// for (var i = 0; i<query.length-offset; i++) {
// 	dbRefJobSheetList.child(query[i]).on('value', function(snapshot) {
// 		var button = document.createElement("button");
// 		button.id = query[i];
// 		button.innerHTML = query[i];
// 		console.log(query[i]);
// 		document.body.appendChild(button);
// 	});

// }