mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZWdhbGF6IiwiYSI6ImNqbmRrd3cyajA0YTUzcHBnMWNrM3M5ZXkifQ.ZiavFKiPD__VnlEG3QLrFw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v10'
});


var mapStyle = {
    "version": 8,
    "name": "Nami",
    "sources": {
        "mapbox": {
            "type": "vector",
            "url": "mapbox://mapbox.mapbox-streets-v6"
        },
        "canvas": {
            "type": 'canvas',
            "canvas": 'canvas',
            "coordinates": [
                [-81.490, 46.437],
                [-72.582, 46.437],
                [-72.582, 38.907],
                [-81.490, 38.907]
            ],
            "dimensions": [0, 0, 400, 400]
        }
    },
    "sprite": "mapbox://sprites/mapbox/dark-v9",
    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "paint": {"background-color": "#111"}
        },
        {
            "id": "water",
            "source": "mapbox",
            "source-layer": "water",
            "type": "fill",
            "paint": {"fill-color": "#2c2c2c"}
        },
        {
            "id": "boundaries",
            "source": "mapbox",
            "source-layer": "admin",
            "type": "line",
            "paint": {"line-color": "#797979", "line-dasharray": [2, 2, 6, 2]},
            "filter": ["all", ["==", "maritime", 0]]
        },
        {
            "id": "canvas",
            "source": "canvas",
            "type": "raster",
            "paint": {"raster-opacity": 0.85}
        },
        {
            "id": "cities",
            "source": "mapbox",
            "source-layer": "place_label",
            "type": "symbol",
            "layout": {
                "text-field": "{name_en}",
                "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
                "text-size": {"stops": [[4, 9], [6, 12]]}
            },
            "paint": {
                "text-color": "#969696",
                "text-halo-width": 2,
                "text-halo-color": "rgba(0, 0, 0, 0.85)"
            }
        },
        {
            "id": "states",
            "source": "mapbox",
            "source-layer": "state_label",
            "type": "symbol",
            "layout": {
                "text-transform": "uppercase",
                "text-field": "{name_en}",
                "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
                "text-letter-spacing": 0.15,
                "text-max-width": 7,
                "text-size": {"stops": [[4, 10], [6, 14]]}
            },
            "filter": [">=", "area", 80000],
            "paint": {
                "text-color": "#969696",
                "text-halo-width": 2,
                "text-halo-color": "rgba(0, 0, 0, 0.85)"
            }
        }
    ]
};
