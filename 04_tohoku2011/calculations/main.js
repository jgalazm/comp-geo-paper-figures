let w = parseInt(4000);
let h = parseInt(2800);

let cmin = -1.5;
let cmax = 1.5;
let colormap = {    
    thresholds: [0.0*(cmax-cmin) + cmin, 
                0.06666666666666667*(cmax-cmin) + cmin, 
                0.13333333333333333*(cmax-cmin) + cmin, 
                0.2*(cmax-cmin) + cmin, 
                0.26666666666666666*(cmax-cmin) + cmin, 
                0.3333333333333333*(cmax-cmin) + cmin, 
                0.4*(cmax-cmin) + cmin, 
                0.49*(cmax-cmin) + cmin, 
                0.5*(cmax-cmin) + cmin, 
                0.51*(cmax-cmin) + cmin, 
                0.6666666666666666*(cmax-cmin) + cmin, 
                0.7333333333333333*(cmax-cmin) + cmin, 
                0.8*(cmax-cmin) + cmin, 
                0.8666666666666667*(cmax-cmin) + cmin, 
                0.9333333333333333*(cmax-cmin) + cmin,
                1.0*(cmax - cmin) + cmin],
    
    rgba: [[ 0.001462,0.000466,0.013866,1],
         [ 0.046915,0.030324,0.150164,0.8 ],
         [ 0.142378,0.046242,0.308553,0.8 ],
         [ 0.258234,0.038571,0.406485,0.8 ],
         [ 0.366529,0.071579,0.431994,0.8 ],
         [ 0.472328,0.110547,0.428334, 0.9 ],
         [ 0.578304,0.148039,0.404411, 0.8 ],
         [ 0.682656,0.189501,0.360757, 0.4 ],
         [ 0.780517,0.243327,0.299523, 0 ],
         [ 0.865006,0.316822,0.226055, 0.4 ],
         [ 0.929644,0.411479,0.145367, 0.8 ],
         [ 0.970919,0.522853,0.058367, 0.9 ],
         [ 0.987622,0.64532,0.039886,0.8 ],
         [ 0.978806,0.774545,0.176037,0.8 ],
         [ 0.950018,0.903409,0.380271,0.8 ],
         [ 0.988362,0.998364,0.644924,1 ]]
}

let data = {
    xmin : 90,
    xmax :  290,
    ymin :  -70,
    ymax : 70,
    waveWidth: w,
    waveHeight: h,
    coordinates: 'spherical',
    equations: 'dispersive',
    bathymetry: '../../03_biobio2010/data/bathymetry3min',
    binaryBathymetry: true,
    earthquake: '../data/earthquake.csv'
}

let output = {
    colormap: colormap,
    displayWidth:  w/4,
    displayHeight: h/4,
    stopTime: 60*60*25,
    displayOption: 'heights',
    pois:{
        '21414': {location:[178.219,48.968]},
        '21419': {location:[155.717,44.435]},
        '21401': {location:[152.583,42.617]},
        '21418': {location:[148.645,38.727]},
        '21413': {location:[152.132,30.533]},
        '52403': {location:[145.52,4.02]},
        '52406': {location:[164.977,-5.307]},
        '55012': {location:[158.453,-15.664]},
        '51425': {location:[183.68,-9.517]},
        '51407': {location:[203.455,19.57]},
        '46404': {location:[231.267,45.853]},
        '46407': {location:[231.168,42.682]},
        '46411': {location:[232.933,39.333]},
        '46412': {location:[239.437,32.492]},
        '43412': {location:[253.03300000000002,16.045]},
        '43413': {location:[259.91700000000003,11.012]},
        '32411': {location:[269.12,4.953]},
        '32412': {location:[273.626,-17.984]},
        '32413': {location:[266.483,-7.406]},
        '32401': {location:[286.579,-20.474]},
    }
};

let lifeCycle = {
    controllerSimulationDidFinish : (model, controller) =>{
        // controller.5();
        
        controller.downloadMaximumHeights();
        controller.downloadArrivalTimes() 
        controller.downloadAllPois();    

        // let arrivalsBuffer = [ ... model.currentArrivalTimes ];

        // var i0 = d3.interpolateHsvLong(d3.hsv(120, 1, 0.65), d3.hsv(60, 1, 0.90)),
        // i1 = d3.interpolateHsvLong(d3.hsv(60, 1, 0.90), d3.hsv(0, 0, 0.95));
        // var interpolateTerrain = function(t) { return t < 0.5 ? i0(t * 2) : i1((t - 0.5) * 2); },
        // color = d3.scaleSequential(interpolateTerrain).domain([0, output.stopTime]);

        // let contours = d3.contours()
        //                 .size([data.waveWidth,data.waveHeight ])
        //                 .thresholds(d3.range(0, output.stopTime, 60*60))(arrivalsBuffer);
        // var svg = d3.select("svg"),
        //     width = +svg.attr("width"),
        //     height = +svg.attr("height");
                    
        // svg.selectAll("path")
        //     .data(contours)
        //     .enter().append("path")
        //     .attr("d", d3.geoPath(d3.geoIdentity() ))
            // .attr("fill", function(d) { return color(d.value); })

    },

    modelStepDidFinish: (model, controller) =>{
        if(model.discretization.stepNumber == 1){
            controller.downloadCurrentGridHeights();
        }
        if(model.discretization.stepNumber % 100 !== 0){
            return true;
        }
        else{
            console.log(model.discretization.stepNumber, model.currentTime/60/60, controller.stopTime/60/60);
            return false;
        }
    },

    dataWasLoaded: (model)=>{
        document.body.appendChild(model.canvas);
    }
}

let thisApp = new NAMI.app(data, output, lifeCycle);
