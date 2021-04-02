import Visitor from "../Objects/Visitor";
import SimulationView from "./SimulationView";

export default class SimulationController {

    _ticketScanners;
    _weatherAPIResponse;
    _gridController;
    _groupsOfVisitors;
    _visitorAmount;
    _SimulationView;
    _region;
    _simulating;

    constructor(gridController, region) {
        this._gridController = gridController;
        this._SimulationView = new SimulationView(this);
        this._region = region;
        this._ticketScanners = [];
        this._groupsOfVisitors = [];
        this._visitorAmount = 0;
    }

    runSimulation() {
        this._simulating = true;
        if (this._SimulationView._menu.querySelector('#stopButton') == null) {
            this._SimulationView.addStopButton();
        }
        if (this._ticketScanners.length!==0) {
            this.scanTickets();
        }

        let interval = window.setInterval(()=>{
            this.fillTrashcans();
            //beweeg mensen
            if (!this._simulating) {
                clearInterval(interval)
            }
        }, 1000);

        this.emptyTrashcans();
    }

    stopSimulation() {
        this._simulating = false;
        this._SimulationView.removeStopButton();
    }

    fillTrashcans() {
        for (const trashcan of this._region._trashcans) {
            trashcan._currentCapacity++;
            console.log(trashcan._currentCapacity);
        }
    }

    emptyTrashcans() {
        for (const trashcan of this._region._trashcans) {
            let interval = window.setInterval(()=>{
                if (trashcan._currentCapacity >= trashcan._capacity) {
                    trashcan._currentCapacity = 0;
                }
            }, trashcan._emptyingTime*1000);
        }
    }

    updateScanners(scannerAmount) {
        if (this._ticketScanners[0]!=null) {
            for (const ticketScanner of this._ticketScanners) {
                this._ticketScanners.splice(this._ticketScanners.indexOf(ticketScanner),1);
            }
        }
        for (let i = 0; i<scannerAmount;i++) {
            this._ticketScanners[i] = Math.floor(Math.random()*3)+1;
        }
        if (this._simulating) {
            this.scanTickets();
        }
    }

    scanTickets() {
        for (const ticketScannerTime of this._ticketScanners) {
            let interval = window.setInterval( ()=>{
                if (this._region._maxVisitors > this.countVisitors()) {
                    if (!this._simulating) {
                        clearInterval(interval);
                    }
                    let group = new VisitorGroup(Math.floor(Math.random() * 15), Math.floor(Math.random()*15));
                    for (let i = 0; i<Math.floor((Math.random()*4)+1);i++) {
                        let result = this.fetchRandomUser(group, i);
                    }
                    this._groupsOfVisitors[this._groupsOfVisitors.length] = group;
                }
                else {
                    clearInterval(interval);
                }
            }, ticketScannerTime*1000);
        }
    }

    countVisitors() {
        let count = 0;
        for (const groupOfVisitors of this._groupsOfVisitors) {
            count = count + groupOfVisitors._visitors.length;
        }
        return count;
    }

    async fetchRandomUser(group, index) {
        fetch('https://randomuser.me/api/?nat=nl')
            .then((response) => {
                return response.json();
            })
            .then((data)=>{
                this.setUser(data, group, index);
            })
            .catch(()=>{
                let VisitorObject = new Visitor("API error",404);
                this.setUser(VisitorObject, group, index);
            });
    }

    setUser(result, group, index) {
        let visitor = new Visitor(result.results[0].name.first + " " + result.results[0].name.last, result.results[0].dob.age);
        group._visitors[index] = visitor;
    }
}