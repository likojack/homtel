var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

var myTable = document.getElementById('myTable').createCaption();
myTable.innerHTML = "<b>"+"Kitchen"+"</b>";
var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];

function upload() {
  firebase.database().ref('job_sheets/'+propertyCode+'/'+ 'kitchen').set({
    dishwasher: document.getElementById("dishwasher").value,
    fridge: document.getElementById("fridge").value,
    microwave: document.getElementById("microwave").value,
    appliances: document.getElementById("appliances").value,
    replace: document.getElementById("replace").value,
    supply: document.getElementById("supply").value,
    tea_towels: document.getElementById("tea_towels").value,
    bin: document.getElementById("bin").value,
    sink: document.getElementById("sink").value,
    extra_iterm: document.getElementById('extra_iterm').value,
    extra_requirements: document.getElementById('extra_requirements').value

  });
}

function nextRoom() {
	window.location.href = 'laundry_requirement.html?'+propertyCode+"&"+'laundry';
}
