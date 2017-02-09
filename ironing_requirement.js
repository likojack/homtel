var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

var myTable = document.getElementById('myTable').createCaption();
myTable.innerHTML = "<b>"+"Ironing"+"</b>";
var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];
var washing = query[2];//"!" means not required
var ironing = query[3];//"!" means not required

var img_counter = 0;
var img_reference = [];

//check the browser supports the FILE API
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function displayFile(event) {
  //only read one image at once, because it is read from camera
  var file = event.target.files;
  var reader = new FileReader();
  reader.onload = function() {
    if (img_counter == 0) { // display the first iamge
      var img = document.getElementById("imgOne");
      var imgPopup = document.getElementById("imgPopupOne");
      img.src = reader.result;
      imgPopup.src=reader.result;

    }
    else if (img_counter == 1) { // display the second iamge
      var img = document.getElementById("imgTwo");
      var imgPopup = document.getElementById("imgPopupTwo");
      img.src = reader.result;
      imgPopup.src=reader.result;

    }
    else if (img_counter == 2){ // display the third image
      var img = document.getElementById("imgThree");
      var imgPopup = document.getElementById("imgPopupThree");
      img.src = reader.result;
      imgPopup.src=reader.result;
    }
    img_counter = img_counter + 1;
  }
  reader.readAsDataURL(file[0]);
  img_reference[img_counter] = file[0];

}

function discardImage() {
  //reset image counter, image referecne and clear the content of img tags
  img_counter = 0;
  img_reference = [];
  console.log(img_reference.length);
  document.getElementById("imgOne").src = "";
  document.getElementById("imgTwo").src = "";
  document.getElementById("imgThree").src = "";
}

function upload() {
  firebase.database().ref('job_sheets/'+propertyCode+'/'+ 'ironing').set({
    ironing_requirement: document.getElementById('ironing_requirement').value
  });
  if (img_reference.length > 0){
    for(i = 0; i<img_reference.length;i++) {
      var storageRef = firebase.storage().ref(propertyCode + "/ironing/" + "image_" + i);
      var task = storageRef.put(img_reference[i]);
    }
  }
}

function nextRoom() {
	window.location.href = 'final.html?'+propertyCode+"&"+"final"; 
}
