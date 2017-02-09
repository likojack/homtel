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
var num_img = 0;
myTable.innerHTML = "<b>"+roomType+"</b>";

var dbRefBedroom = firebase.database().ref("job_sheets/").child(query[0]).child(query[1]);
dbRefBedroom.on('value', (function (num_img,snapshot) {
    num_img = snapshot.val().number_image;
	var jobSheetContent = snapshot.val();
    var filterContent = jobSheetContent.filter(function(item){return !('number_image' in item)});
    console.log(num_img);
	var listRoom = Object.keys(jobSheetContent); //read service content
	for (i = 0; i < listRoom.length; i++) {
		document.getElementById(listRoom[i]).innerHTML = jobSheetContent[listRoom[i]];
	}
}).bind(null, num_img));

console.log(num_img);
 

for(i=0;i<num_img;i++) {
    var storageRef = firebase.storage();
    var imgRef = storageRef.ref(propertyCode + "/" + roomType + "/" + "image_" + i);
    console.log(i);
    imgRef.getDownloadURL().then((function(i,url) {
        console.log(i);
        var imgIndex = ["imgOne", "imgTwo", "imgThree"];
        var imgPopupIndex = ["imgPopupOne", "imgPopupTwo", "imgPopupThree"];
        var img = document.getElementById(imgIndex[i]);
        var imgPopup = document.getElementById(imgPopupIndex[i]);
        img.src = url;
        imgPopup.src = url;
    }).bind(null, i)).catch(function(error) {
        switch (error.code) {
            case 'storage/object_not_found':
            console.log("exceed the maximum");
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.log("11");
              break;

            case 'storage/canceled':
              // User canceled the upload
              console.log("22");
              break;
            case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            console.log("33");
            break;
        }
    });

}

function back() {

    var checkboxes_all = document.querySelectorAll("input[type='checkbox']");
    var checkboxes_checked = document.querySelectorAll("input[type='checkbox']:checked");
    //console.log(checkboxes_all.length);
    //console.log(checkboxes_checked.length + ' checkboxes checked');
    if (checkboxes_checked.length === checkboxes_all.length) {
        //all checkboxes are checked
        window.history.go(-1);
    } else {
        // there are some unchecked checkboxes
        alert("You have finishsh jobs in " + roomType+ "!");
    }
    
}