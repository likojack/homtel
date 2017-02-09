var config = {
apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
authDomain: "homtel-63eec.firebaseapp.com",
databaseURL: "https://homtel-63eec.firebaseio.com",
storageBucket: "homtel-63eec.appspot.com",
messagingSenderId: "389458058945"
};
firebase.initializeApp(config);
  function newProperty() {
  	//get customer name or customerCode if known and property code
  	const customerCode = document.getElementById("customerCode");
  	const propertyCode = document.getElementById("propertyCode");
  	//add property code to the customer's properties
  	var dbRefCustomer = firebase.database().ref("customers/"+customerCode.value).child("properties");
  	dbRefCustomer.once('value').then(function (snapshot) {
  		//get the number of property
  		var propertyListLength = snapshot.numChildren();
      var propertyList = snapshot.val();
      //check if the property code exists
      for (i=1; i<=propertyListLength;i++) {
        if (propertyList[i] === propertyCode.value) {
          alert("property code exists, please check again");
          return;
        }
      }
  		// write length + 1: property code
  		var newIndex = propertyListLength + 1;
  		//write new key:value pair to the database
  		var newProperty = {};
  		newProperty[newIndex] = propertyCode.value;
  		dbRefCustomer.update(newProperty);
      location.href = "existing_customer_new_property_info.html?" + propertyCode.value;
  	});
}
function search() {
  const customerCode = document.getElementById("customerCode");
  var dbRefCustomer = firebase.database().ref("customers/"+customerCode.value).child("properties");
  dbRefCustomer.on('value', function(snapshot) {
    var display = document.createElement("p");
    console.log(snapshot.val());
    display.innerHTML = snapshot.val();
    document.body.appendChild(display);
  });
}