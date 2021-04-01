class SimulationController {

    _ticketScanners;
    _weatherAPIResponse;
    _userAPIResponse;
    _gridController;
    _groupsOfVisitors;

    constructor(gridController) {
        this._gridController = gridController;
        this._ticketScanners = [];
        this._groupsOfVisitors = [];
        this._userAPIResponse = this.fetchRandomUser();
    }

    runSimulation() {
        //haal API op en genereer de view daarvan

        // number input hoeveel scanners open zijn: random scantijd

        // over vakje hoveren geeft info over bezoekers

        let intervalId = window.setInterval(function(){
            // genereer mensen totdat maxvisitors is bereikt op basis van scanners

            // maak vuilnisbakken leeg

            // verplaats mensen naar nieuwe vakken

        }, 1000);
    }

    updateScanners(scannerAmount) {
        if (this._ticketScanners[0]!=null) {
            for (const ticketScanner of this._ticketScanners) {
                this._ticketScanners.removeItem(ticketScanner);
            }
        }
        for (let i = 0; i<scannerAmount;i++) {
            this._ticketScanners[i] = Math.floor(Math.random()*3);
        }
    }

    async fetchRandomUser() {
        const data = await fetch('https://randomuser.me/api/');
        if (data != null) {
            console.log(data);
            return data.json();
        }
        else {
            alert("Something went wrong with loading a user generator!");
        }
    }

}