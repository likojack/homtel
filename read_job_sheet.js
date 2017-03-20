var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
firebase.initializeApp(config);
//var myTable = document.getElementById('myTable').createCaption();
var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];
var roomType = query[1];

var num_img = 3; // maximum number of image is 3
document.getElementById('caption').innerHTML  = "<b>"+roomType+"</b>";

var dbRefBedroom = firebase.database().ref("job_sheets/").child(query[0]).child(query[1]);
dbRefBedroom.on('value', function (snapshot) {
    var jobSheetContent = snapshot.val();
    var listRoom = Object.keys(jobSheetContent); //read service content
    for (i = 0; i < listRoom.length; i++) {
        document.getElementById(listRoom[i]).innerHTML = jobSheetContent[listRoom[i]];
    }
});

var checkboxes_all = document.querySelectorAll("input[type='checkbox']");

var dbRefJobSheet = firebase.database().ref().child('job_sheets').child(propertyCode);
dbRefJobSheet.on('value', function (snapshot){
    var property = snapshot.val();
    var listRoom = Object.keys(property);
    var numRoom = Object.keys(property).length;
    var index_listRoom = listRoom.indexOf(query[1]);
    if (query[index_listRoom+2].slice(-1) == 0 ){// not done before, continue;
        console.log("not done");
    } else {//this room was done, auto check all the checkboxes and go back
        console.log("done");
        for(var i=0, n=checkboxes_all.length;i<n;i++) {
            checkboxes_all[i].checked = true;
        }
    }

});
 

for(i=0;i<num_img;i++) {
    var storageRef = firebase.storage();
    var imgRef = storageRef.ref(propertyCode + "/" + roomType + "/" + "image_" + i);
    imgRef.getDownloadURL().then((function(i,url) {
        console.log(i + " " + url);
        var imgIndex = ["imgOne", "imgTwo", "imgThree"];
        var imgPopupIndex = ["imgPopupOne", "imgPopupTwo", "imgPopupThree"];
        var img = document.getElementById(imgIndex[i]);
        var imgPopup = document.getElementById(imgPopupIndex[i]);
        img.src = url;
        imgPopup.src = url;
    }).bind(null, i)).catch(function(error) {
        
        switch (error.code) {
            case "stroage/object_not_found":
            alert("file doesn't exist");
        }
    });

}

function back() {
    var checkboxes_checked = document.querySelectorAll("input[type='checkbox']:checked");
    if (checkboxes_checked.length === checkboxes_all.length) {//all checkboxes are checked  
        var dbRefJobSheet = firebase.database().ref().child('job_sheets').child(propertyCode);
        dbRefJobSheet.on('value', function (snapshot){
            var property = snapshot.val();
            var listRoom = Object.keys(property);
            var numRoom = Object.keys(property).length;
            var index_listRoom = listRoom.indexOf(query[1]);
            var toggleDoneRoom = query[index_listRoom+2].slice(0,-1) + (parseInt(query[index_listRoom+2].slice(-1)) + 1);
            //console.log (toggleDoneRoom);
            var updateRoomDoneList = "";
            console.log (query.slice(2));
            for (i = 2; i < query.length; i++) {
                if (i<index_listRoom+2){
                    updateRoomDoneList = updateRoomDoneList +"&" + query[i];
                } else if (i==index_listRoom+2){
                    updateRoomDoneList = updateRoomDoneList +"&" + toggleDoneRoom;
                } else {
                    updateRoomDoneList = updateRoomDoneList +"&" + query[i];
                }
                
            };
            //console.log (query.slice(2));
            //console.log (updateRoomDoneList);
            location.href = 'property_home.html?'+ propertyCode + updateRoomDoneList;

        });
    } else {// there are some unchecked checkboxes
        alert("You have unfinished jobs in " + roomType+ "!");
    }
    
}