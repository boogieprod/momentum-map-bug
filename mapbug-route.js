Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'home'
});

Router.route('/map', {
  name: 'map'
});

if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.map.helpers({
    exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 8
        };
      }
    }
  });

  Template.map.onCreated(function() {
    GoogleMaps.ready('exampleMap', function(map) {
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });
  });
}
