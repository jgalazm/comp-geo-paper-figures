let canvas = document.createElement('canvas');
canvas.id = "canvas";
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);
let recordVideo = true;
/* 
Model setup
*/

let data = {
    bathymetry: 'bathymetry.png',
    bathymetryMetadata: {
        zmin: -6709,
        zmax: 10684
    },
    earthquake: [{
        depth: 22900,
        strike: 17,
        dip: 13.0,
        rake: 108.0,
        U3: 0.0,
        cn: -36.122, //centroid N coordinate, e
        ce: -72.898,
        Mw: 9,
        reference: 'center'
    }],
    coordinates: 'spherical',
    waveWidth: parseInt(2159 * 0.5),
    waveHeight: parseInt(960 * 0.5),
    xmin: -179.99166666666667,
    xmax: 179.67499999999998,
    ymin: -79.991666666666646,
    ymax: 79.841666666666654,
    isPeriodic: true,
    canvas: canvas,
}

let output = {
    displayWidth: parseInt(2159 * 0.5),
    displayHeight: parseInt(960 * 0.5),
    stopTime: 60 * 60 * 30,
    displayOption: 'heights',
};

let niterations = 0;
let lifeCycle = {
    dataWasLoaded: (model) => {
        document.body.appendChild(model.canvas);
    }
}


var mapStyle = {
    "version": 8,
    "name": "tsunamilab",
    "metadata": {
        "mapbox:origin": "basic-template-v1",
        "mapbox:autocomposite": true,
        "mapbox:type": "template",
        "mapbox:sdk-support": {
            "js": "0.46.0",
            "android": "6.0.0",
            "ios": "4.0.0"
        }
    },
    "center": [
        -72.898,
        -36.122
    ],
    "zoom": 1,
    "bearing": 0,
    "pitch": 0,
    "sources": {
        "composite": {
            "url": "mapbox://celbertin.cjlwegw2207op2vmr8obgv3zg-11dzn,mapbox.mapbox-streets-v7,celbertin.cjle7h2mn0gbm32s6nherqcgd-62fyu",
            "type": "vector"
        },
        "mapbox://mapbox.satellite": {
            "url": "mapbox://mapbox.satellite",
            "type": "raster",
            "tileSize": 256
        },
        "canvas": {
            "type": 'canvas',
            "canvas": 'canvas',
            "coordinates": [
                [-179.9, 69],
                [179.6, 69],
                [179.6, -69],
                [-179.9, -69]
            ],
            "dimensions": [0, 0, output.displayWidth, output.displayHeight]
        }
    },
    "sprite": "mapbox://sprites/celbertin/cjl86fxxp0epk2sqk9k2di6ip",
    "glyphs": "mapbox://fonts/celbertin/{fontstack}/{range}.pbf",
    "layers": [{
            "id": "background",
            "type": "background",
            "layout": {},
            "paint": {
                "background-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    1,
                    "hsl(38, 43%, 89%)",
                    16,
                    "hsl(38, 48%, 86%)"
                ]
            }
        },
        {
            "id": "mapbox-satellite",
            "type": "raster",
            "metadata": {},
            "source": "mapbox://mapbox.satellite",
            "layout": {},
            "paint": {}
        },
        {
            "id": "canvas",
            "source": "canvas",
            "type": "raster",
            "paint": {
                "raster-opacity": 0.9
            }
        },
        {
            "id": "country-label",
            "type": "symbol",
            "metadata": {},
            "source": "composite",
            "source-layer": "country_label",
            "minzoom": 1,
            "maxzoom": 16,
            "layout": {
                "text-field": [
                    "get",
                    "name_en"
                ],
                "text-max-width": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    0,
                    5,
                    3,
                    6
                ],
                "text-font": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            "Roboto Medium",
                            "Arial Unicode MS Regular"
                        ]
                    ],
                    4,
                    [
                        "literal",
                        [
                            "Roboto Bold",
                            "Arial Unicode MS Bold"
                        ]
                    ]
                ],
                "text-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    2,
                    [
                        "step",
                        [
                            "get",
                            "scalerank"
                        ],
                        13,
                        3,
                        11,
                        5,
                        9
                    ],
                    9,
                    [
                        "step",
                        [
                            "get",
                            "scalerank"
                        ],
                        35,
                        3,
                        27,
                        5,
                        22
                    ]
                ]
            },
            "paint": {
                "text-halo-width": 1.5,
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-color": "hsl(0, 0%, 0%)"
            }
        },
        {
            "id": "admin-country",
            "type": "line",
            "metadata": {},
            "source": "composite",
            "source-layer": "admin",
            "minzoom": 1,
            "filter": [
                "all",
                [
                    "<=",
                    "admin_level",
                    2
                ],
                [
                    "==",
                    "disputed",
                    0
                ],
                [
                    "==",
                    "maritime",
                    0
                ]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "hsl(0, 0%, 50%)",
                "line-width": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    3,
                    0.5,
                    10,
                    2
                ]
            }
        }
    ],
    "created": "2018-08-24T15:54:58.217Z",
    "id": "cjl86fxxp0epk2sqk9k2di6ip",
    "modified": "2018-09-10T16:09:41.531Z",
    "owner": "celbertin",
    "visibility": "public",
    "draft": false
};

mapboxgl.accessToken = 'pk.eyJ1IjoiY2VsYmVydGluIiwiYSI6ImNqbDg0N3o1ejBkMjAzdm84b2dyZTE5ZW4ifQ.WIFB9uoghXkhmueTJip_xg';
var map = new mapboxgl.Map({
    container: 'map',
    minZoom: 1,
    maxZoom: 24,
    zoom: 1,
    center: [-72.898, -36.122],
    style: mapStyle
});

thismodel = new NAMI.app(data, output, lifeCycle);