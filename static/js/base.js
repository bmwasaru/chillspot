var MARKER_COLORS = [ 'blue', 'red', 'green', 'orange', 'pink', 'purple', 'yellow' ];

$(document).ready(function() {
  init();
  update_spots();
  add_static_markers();
  register_clicks();
});

init = function() {
  var mapOptions = {
    center: new google.maps.LatLng(-4.0435, 39.6682),
    zoom: 15,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{
      stylers: [
        { invert_lightness: true },
        { hue: "#0091ff" }
      ]
    }]
  };
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
};

random_choice = function(lst) {
  return lst[Math.floor(Math.random() * lst.length)];
};

add_marker = function(name, description, lat, lng) {
  var marker = new google.maps.Marker({
    title: name,
    position: new google.maps.LatLng(lat, lng),
    draggable: false,
    map: map
  });

  var contentString = '<h1>' + name + '</h1>'+
      '<div id="bodyContent">'+
      '<p>' + description + '</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });


  google.maps.event.addListener(marker, 'click', function() {
    if (!description) {
      description = 'No description';
    }

    infowindow.open(map, marker);
  });
};

update_spots = function() {
  $.get('/spots', function(res) {
    console.log(res);
    $.each(res['spots'], function(index, val) {
      var lat = val['lat'];
      var lng = val['lng'];
      var name = val['name'];
      var description = val['description'];
      add_marker(name, description, lat, lng);
    });
  });
};

add_static_markers = function() {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(32.2, 34.4),
    draggable: false,
    map: map
  });
};

register_clicks = function() {
  google.maps.event.addListener(map, 'click', function(event) {
    $('#add-spot-lat').val(event.latLng.lat());
    $('#add-spot-lng').val(event.latLng.lng());
    $('#add-spot-modal').modal('show');
  });
};
