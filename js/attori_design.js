///////////////////////////// map /////////////////////////////////////

L.mapbox.accessToken = 'pk.eyJ1IjoiZnJhbmNlc2NvbGVvbmkiLCJhIjoiTmFHRUZQSSJ9.JbWzjBi74MpgDpIIUEHHtQ';
var map = L.mapbox.map('map', 'francescoleoni.k8e0g5f0',{ zoomControl:false, maxZoom:15, attributionControl: false}).setView([34, -37], 3);

// new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

var markerGroup = new L.MarkerClusterGroup({showCoverageOnHover:false});
var geoJsonLayer = L.geoJson(geoJsonFeature, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.title,{
        closeButton: false,
    });
      layer.on("mouseover", function () {
        layer.openPopup();
      });
      layer.on("mouseout", function () {
        layer.closePopup();
      });
    }
});

markerGroup.addLayer(geoJsonLayer);
map.addLayer(markerGroup);

//// load description from data to div and zoom

// function getPage(marker) {
//         return marker.feature.properties.page;
// };

var svg = d3.select('#contenitore-icona')
  .append('svg')
  .attr({
    'id': 'contenitore-icona-svg',
    'width': 100,
    'height': 100
  });

svg.append('rect')
  .attr({
    'id': 'svg-public-sector',
    'width': 45,
    'height': 45,
    'x': 5,
    'y': 5,
    'fill': 'none',
    'stroke': 'black',
    'stroke-wdth': 1
  });

svg.append('rect')
  .attr({
    'id': 'svg-third-sector',
    'width': 45,
    'height': 45,
    'x': 50,
    'y': 5,
    'fill': 'none',
    'stroke': 'black',
    'stroke-wdth': 1
  });

svg.append('rect')
  .attr({
    'id': 'svg-university-sector',
    'width': 45,
    'height': 45,
    'x': 5,
    'y': 50,
    'fill': 'none',
    'stroke': 'black',
    'stroke-wdth': 1
  });

svg.append('rect')
  .attr({
    'id': 'svg-private-sector',
    'width': 45,
    'height': 45,
    'x': 50,
    'y': 50,
    'fill': 'none',
    'stroke': 'black',
    'stroke-wdth': 1
  });

markerGroup.on('click', function(ev) {
    var marker = ev.layer;

    marker.on('click', function(ev) {
        if(map.getZoom() > marker.feature.properties.zoom) {
            map.setView(ev.latlng, map.getZoom());   
        } else {
            map.setView(ev.latlng, marker.feature.properties.zoom);
        }

        var boxScale = d3.scale.ordinal()
          .domain(['Public Sector', 'Third Sector', 'Education', 'Private Sector'])
          .range(['#svg-public-sector', '#svg-third-sector', '#svg-university-sector', '#svg-private-sector']);

        svg.selectAll('rect').attr('fill', 'none');
        d3.select(boxScale(this.feature.properties.section))
          .attr('fill', 'black');

        d3.select("#titolo-sez").selectAll('p').remove();
        d3.select("#titolo-sez").append('p').append('text').text(this.feature.properties.section);

        $(function () {
            //$("#descrizione-attore").load("descrizioni/"+getPage(marker)).hide().fadeIn('slow');
            $("#title").empty();
            $("#title").append(marker.feature.properties.title);

            $("#cover").empty();
            for (var i=0; i < marker.feature.properties.images.length; i++){
                $("#cover").append(`<img src="${marker.feature.properties.images[i]}" />`);
            }

            $("#brief-description").empty();
            $("#brief-description").append(marker.feature.properties.descrizione);

            $("#link").empty();
            $("#link").attr("href","${marker.feature.properties.link").append(marker.feature.properties.link);
        });
    });
});

//// popup on cluster hover

markerGroup.on('clustermouseover', function (a) {
    a.layer.bindPopup("There are " + a.layer.getAllChildMarkers().length + " stakeholder in this cluster.",{closeButton: false,});
    a.layer.openPopup();
});

markerGroup.on('clustermouseout', function (a) {
    a.layer.closePopup();
});

//// list all markers and navigate through them

var markerList = document.getElementById('list');

markerGroup.eachLayer(function(marker) {
  var link = list.appendChild(document.createElement('a'));
  link.className = 'item';
  link.href = '#';

  // Populate content from each markers object.
  link.innerHTML = marker.feature.properties.title +'<br /><small>' + marker.feature.properties.location + '</small>';
  link.onclick = function() {
    if (/active/.test(this.className)) {
      this.className = this.className.replace(/active/, '').replace(/\s\s*$/, '');
    } else {
      var siblings = list.getElementsByTagName('a');
      for (var i = 0; i < siblings.length; i++) {
        siblings[i].className = siblings[i].className
          .replace(/active/, '').replace(/\s\s*$/, '');
      };
      this.className += ' active';

      // When a menu item is clicked, animate the map to center
      // its associated marker and open its popup.
      map.panTo(marker.getLatLng());
      map.zoomIn(10);
      marker.openPopup();
    }
    return false;
  };
});

/////////not working yet

// $('.menu-ui a').on('click', function() {
//     // For each filter link, get the 'data-filter' attribute value.
//     var filter = $(this).data('filter');

//     $(this).addClass('active').siblings().removeClass('active');
//     geoJsonLayer.setFilter(function(f) {
//         // If the data-filter attribute is set to "all", return
//         // all (true). Otherwise, filter on markers that have
//         // a value set to true based on the filter name.
//         return (filter === 'all') ? true : f.properties[filter] === true;
//     });
//     return false;
// });


