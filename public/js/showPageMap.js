mapboxgl.accessToken = mapToken;
const gymground = JSON.parse(gymgroundJson)

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: gymground.geometry.coordinates, // starting position [lng, lat]
    zoom: 8 // starting zoom
});

new mapboxgl.Marker({ color: 'red' })
    .setLngLat(gymground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${gymground.title}</h3><p>${gymground.location}</p>`
            )
    )
    .addTo(map);
map.addControl(new mapboxgl.NavigationControl());
