$(function initializeMap () {

  const fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  const styleArr = [
    {
      featureType: 'landscape',
      stylers: [{ saturation: -100 }, { lightness: 60 }]
    },
    {
      featureType: 'road.local',
      stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
    },
    {
      featureType: 'transit',
      stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
    },
    {
      featureType: 'administrative.province',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'water',
      stylers: [{ visibility: 'on' }, { lightness: 30 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
    }, 
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ visibility: 'off' }]
    }, 
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
    }
  ];

  const mapCanvas = document.getElementById('map-canvas');

  const currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  const iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    const latLng = new google.maps.LatLng(coords[0], coords[1]);
    const iconURL = iconURLs[type];
    const marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
  }

  //drawMarker('hotel', [40.705137, -74.007624]);
  //drawMarker('restaurant', [40.705137, -74.013940]);
  //drawMarker('activity', [40.716291, -73.995315]);
  
  ///populating options dropdowns
  
  var locationLookup = {};
function generateList(list){
  var res = "";
  for(var i=0; i < list.length; i++){
    res += '<option value=" '+ list[i].name +'">'+ list[i].name +'</option>'
    locationLookup[list[i].name.trim()] = list[i].place.location;
  }
  return res;
}

$('#hotel-choices').append(generateList(hotels));
$('#restaurant-choices').append(generateList(restaurants));
$('#activity-choices').append(generateList(activities));

//making add buttons work
$('#add-hotel').on('click', function(){
  var val = $('#hotel-choices').val().trim();
  createItem(val, 'hotel');
  var coord = locationLookup[val];
  drawMarker('hotel', [coord[0], coord[1]]);
})
$('#add-restaurant').on('click', function(){
  var val = $('#restaurant-choices').val().trim();
  createItem(val, 'restaurant');
  var coord = locationLookup[val];
  drawMarker('restaurant', [coord[0], coord[1]]);
})
$('#add-activity').on('click', function(){
  var val = $('#activity-choices').val().trim();
  createItem(val, 'activity');
  var coord = locationLookup[val];
  drawMarker('activity', [coord[0], coord[1]]);
})

function createItem(name, type){
  var str =  '<div class="itinerary-item"><span class="title">'+name+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>'
  $('#'+type+'-group ul').append(str);
}
  $('#itinerary').on('click', '.itinerary-item' , function(){
    this.remove();
  })
  
  $('#day-add').on('click', function(){
    
  })

});

