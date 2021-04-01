class SimulationController {

    _ticketScanners;
    _weatherAPI;
    _gridController;

    constructor(gridController) {
        this._gridController = gridController;
    }

    runSimulation() {
        //haal API op en genereer de view daarvan
        // number input hoeveel scanners open zijn: random scantijd
        // over vakje hoveren geeft info over bezoekers
        let intervalId = window.setInterval(function(){
            // genereer mensen totdat maxvisitors is bereikt op basis van scanners
            // maak vuilnisbakken leeg
            // verplaats mensen naar nieuwe vakken
            //
        }, 1000);
    }

}