var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

//var myTable = document.getElementById('myTable').createCaption();
document.getElementById('caption').innerHTML = "<b>"+"Dusting"+"</b>";
var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];
var washing = query[2];//"!" means not required
var ironing = query[3];//"!" means not required
//count how many images has been uploaded
var img_counter = 0;
var img_reference = []

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

function autofill(value){
    var autoString;
    if (value == ""){
        autoString = "Normal";
    } else {
        autoString = value;
    }   
    return autoString;
}

function upload() {
  var info_task = firebase.database().ref('job_sheets/'+propertyCode+'/'+ 'Dusting').set({
    switches: autofill(document.getElementById("switches").value),
    selves: autofill(document.getElementById("selves").value),
    handles: autofill(document.getElementById("handles").value),
    tables: autofill(document.getElementById("tables").value),
    frames: autofill(document.getElementById("frames").value),
    mirrors: autofill(document.getElementById("mirrors").value),
    windows: autofill(document.getElementById("windows").value),
    extra_iterm: document.getElementById('extra_iterm').value,
    extra_requirements: document.getElementById('extra_requirements').value
  });
  info_task.then(function() {
      if (img_reference.length > 0){
          for(i = 0; i<img_reference.length;i++) {
              var storageRef = firebase.storage().ref(propertyCode + "/" + "Dusting" + "/" + "image_" + i);
              var task = storageRef.put(img_reference[i]);
              if (i==img_reference.length-1) {
                  task.on('state_changed',function(){}, function(){}, function(){ //when complete
                      nextRoom();
                  });
              }
          }

      }
      else{
          nextRoom();
      }
        
  });
  
}

function nextRoom() {
	location.href = 'mop_requirement.html?'+propertyCode+"&"+'Mopping'+"&"+washing+"&"+ironing;
}
