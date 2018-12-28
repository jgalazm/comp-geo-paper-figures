let w = 501;
let h = 501;

let data = {
    xmin : -15,
    xmax :  15,
    ymin :  -15,
    ymax : 15,
    waveWidth: w,
    waveHeight: h,
    coordinates: 'spherical',
    bathymetry: 'bathymetry',
    initialSurface: {
        file:'initialSurface'
    }
}

let output = {
    displayWidth:  w,
    displayHeight: h,
    stopTime: 60*60*5,
    displayOption: 'heights',
    pois: {
        'p0': {'location': [-8, 10]},
        'p1': {'location': [0, 10]},
        'p10': {'location': [0, -5]},
        'p11': {'location': [8, -5]},
        'p12': {'location': [-8, -10]},
        'p13': {'location': [0, -10]},
        'p14': {'location': [8, -10]},
        'p2': {'location': [8, 10]},
        'p3': {'location': [-8, 5]},
        'p4': {'location': [0, 5]},
        'p5': {'location': [8, 5]},
        'p6': {'location': [-8, 0]},
        'p7': {'location': [0, 0]},
        'p8': {'location': [8, 0]},
        'p9': {'location': [-8, -5]}
    }
};

let expectedOutput = 300;

let lifeCycle = {
    
    modelSimulationWillStart : (model, controller) =>{
        controller.downloadCurrentGridHeights();
    },

    dataWasLoaded: (model)=>{
        document.body.appendChild(model.canvas);
    },
    controllerSimulationDidFinish : (model, controller) =>{
    //     controller.downloadMaximumHeights();
    //     controller.downloadArrivalTimes() 
        controller.downloadAllPois();    
    },

    modelStepDidFinish: (model, controller) =>{
        if(model.discretization.stepNumber % 10 === 0){
            console.log(model.discretization.stepNumber);
        }
        if(model.currentTime > expectedOutput ){

            // controller.downloadCurrentGridHeights();
            expectedOutput = expectedOutput +300;
        }
        if(model.discretization.stepNumber % 10 !== 0){
            return true;
        }
        else{
            console.log(model.discretization.stepNumber, model.currentTime/60/60, controller.stopTime/60/60);
            return false;
        }
    },

}

let thisApp = new NAMI.app(data, output, lifeCycle);
