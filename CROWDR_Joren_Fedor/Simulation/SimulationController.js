class SimulationController {

    _ticketScanners;
    _weatherAPIResponse;
    _gridController;
    _groupsOfVisitors;
    _visitorAmount;
    _SimulationView;
    _region;

    constructor(gridController, region) {
        this._gridController = gridController;
        this._SimulationView = new SimulationView(this);
        this._region = region;
        this._ticketScanners = [];
        this._groupsOfVisitors = [];
        this._visitorAmount = 0;
    }

    runSimulation() {
        //haal weather API op en genereer de view daarvan

        // over vakje hoveren geeft info over bezoekers

        let intervalId = window.setInterval(function(){
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
            this._ticketScanners[i] = Math.floor(Math.random()*3)+1;
        }
        this.scanTickets();
    }

    scanTickets() {
            for (const ticketScannerTime of this._ticketScanners) {
                let interval = window.setInterval(()=>{
                    if (this._region._maxVisitors > this._groupsOfVisitors.length) {
                        for (let i = 0; i<Math.floor((Math.random()*4)+1);i++) {
                            let newVisitorJSON = this.fetchRandomUser();
                            console.log(newVisitorJSON);
                            newVisitorJSON.map((visitor)=>{
                                console.log(visitor);
                                let VisitorObject = new Visitor(visitor.name.first + " " + visitor.name.last, visitor.dob.age);
                            })
                        }
                    }
                    else {
                        return false;
                    }
                }, ticketScannerTime*1000);
            }
        }


    async fetchRandomUser() {
        const data = await fetch('https://randomuser.me/api/?nat=nl')
            .then((response) => {
                return response.json();
            })
            .then((data)=>{
                let newPerson = data.results;
                return newPerson;
            })
            .catch(()=>{
                alert("The random user generator does not work");
            });
    }

}