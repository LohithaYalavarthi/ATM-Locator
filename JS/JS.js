var map;
      var service;
      var place = [];
      var Address;
      var geocoder;
      var latitude;
      var longitude;
    function initMap() {
      if(latitude && longitude){
        var pyrmont = new google.maps.LatLng(latitude,longitude);
        map = new google.maps.Map(document.getElementById('map'), {
         center: pyrmont,
          zoom: 15
         });

         var request = {
          location: pyrmont,
          radius: '500',
           type: ['atm']
         };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);       
      }
    }
      function callback(results, status) {
       if (status == google.maps.places.PlacesServiceStatus.OK) {
       for (var i = 0; i < results.length; i++) {
        place.push(results[i].name);
    }
    MakeList(place.sort());
  }
}
function MakeList(array){
  var list = document.createElement('ul');
  list.className = "list-group";
  for (var i = 0; i < array.length; i++) {
    var ListItem = document.createElement('li');
    ListItem.className = "list-group-item";
    ListItem.appendChild(document.createTextNode(array[i]));
    list.appendChild(ListItem);
}
document.getElementById("atmlist").appendChild(list);
}


function ClickNearBy(){
  address= document.getElementById("address").value
  getLocation(address);
}

var getLocation =  function(address) {
  geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address}, function(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
     latitude = results[0].geometry.location.lat();
     longitude = results[0].geometry.location.lng();
     initMap()
      } 
  }); 
}