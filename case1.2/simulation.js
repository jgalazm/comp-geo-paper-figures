var data = {
    bathymetry: './bathymetry.png',
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
        cn: -36.122,   //centroid N coordinate, e
        ce: -72.898,
        Mw: 8.8,
        reference: 'mid bottom'
    }],
    coordinates: 'spherical',
    waveWidth: parseInt(2159*0.5),
    waveHeight: parseInt(960*0.5),
    xmin: -179.99166666666667,
    xmax: 179.67499999999998,
    ymin: -79.991666666666646,
    ymax: 79.841666666666654,
    isPeriodic: true,
}

let output = {
    stopTime: 60*60*60,
    displayWidth: parseInt(2159*0.5),
    displayHeight: parseInt(960*0.5),
};

lifeCycle = {
    dataWasLoaded: (model) => {
        document.body.appendChild(model.canvas);
    
    },
    modelStepDidFinish: (model, controller)=>{
        
        if(model.discretization.stepNumber% 20  == 0){
            return false;
        }
        return true;
    }
}

let thismodel;
setTimeout(function(){
    thismodel = new NAMI.app(data, output, lifeCycle);
}, 2000);