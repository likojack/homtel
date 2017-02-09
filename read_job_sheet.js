var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
firebase.initializeApp(config);
var myTable = document.getElementById('myTable').createCaption();
var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];
var roomType = query[1];
myTable.innerHTML = "<b>"+roomType+"</b>";

var dbRefBedroom = firebase.database().ref("job_sheets/").child(query[0]).child(query[1]);
dbRefBedroom.on('value', function (snapshot) {
	var jobSheetContent = snapshot.val()
	var listRoom = Object.keys(jobSheetContent); //read service content
	for (i = 0; i < listRoom.length; i++) {
		document.getElementById(listRoom[i]).innerHTML = jobSheetContent[listRoom[i]];
	}
});

function back() {
    window.history.go(-1);
}