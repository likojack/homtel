var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
firebase.initializeApp(config);
var query = window.location.search.substring(1).split("&");

var dbRefBedroom = firebase.database().ref("job_sheet_test/").child(query[0]).child(query[1]);
dbRefBedroom.on('value', function (snapshot) {
	var jobSheetContent = snapshot.val()
	var listRoom = Object.keys(jobSheetContent);
	for (i = 0; i < listRoom.length; i++) {
		document.getElementById(listRoom[i]).innerHTML = jobSheetContent[listRoom[i]];
	}
});