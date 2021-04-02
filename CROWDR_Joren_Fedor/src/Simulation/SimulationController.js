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
                this._ticketScanners.splice(this._ticketScanners.indexOf(ticketScanner),1);
            }
        }
        for (let i = 0; i<scannerAmount;i++) {
            this._ticketScanners[i] = Math.floor(Math.random()*3)+1;
        }

        this.scanTickets();
    }

    scanTickets() {
        for (const ticketScannerTime of this._ticketScanners) {
            let interval = window.setInterval( ()=>{
                if (this._region._maxVisitors > this.countVisitors()) {
                    let group = [];
                    for (let i = 0; i<Math.floor((Math.random()*4)+1);i++) {
                        let result = this.fetchRandomUser(group, i);
                    }
                    this._groupsOfVisitors[this._groupsOfVisitors.length] = group;
                }
                else {
                    return false;
                }
            }, ticketScannerTime*1000);
        }
    }

    countVisitors() {
        let count = 0;
        for (const groupOfVisitors of this._groupsOfVisitors) {
            count = count + groupOfVisitors.length;
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
        console.log(result);
        let visitor = new Visitor(result.results[0].name.first + " " + result.results[0].name.last, result.results[0].dob.age);
        console.log(visitor);
        group[index] = visitor;
    }
}