
mapboxgl.accessToken=mapToken;
const map=new mapboxgl.Map({
  container:"map",
  style:"mapbox://styles/mapbox/streets-v11",
  center:soldier.geometry.coordinates,
  zoom:9
});
new mapboxgl.Marker()
  .setLngLat(soldier.geometry.coordinates)
  .setPopup(
        new mapboxgl.Popup({offset:25})
        .setHTML(
            `<h3>${soldier.name}</h3><p>${soldier.place}`
        )
  )
  .addTo(map)
