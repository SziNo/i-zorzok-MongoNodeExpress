mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: iDrinkGeo.geometry.coordinates, // starting position [lng, lat]
  zoom: 12, // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(iDrinkGeo.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h5>${iDrinkGeo.title}</h5><p>${iDrinkGeo.location}</p>`
    )
  )
  .addTo(map);
