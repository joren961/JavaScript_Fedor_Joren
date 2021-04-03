class SimulationController {

    _ticketScanners;
    _gridController;
    _groupsOfVisitors;
    _visitorAmount;
    _SimulationView;
    _region;
    _simulating;
    _weather;

    constructor(gridController, region) {
        this._gridController = gridController;
        this._SimulationView = new SimulationView(this);
        this._region = region;
        this._ticketScanners = [];
        this._groupsOfVisitors = [];
        this._visitorAmount = 0;
        this._simulating = false;
    }

    runSimulation() {
        this._simulating = true;
        this._SimulationView.addHoverListener();
        if (this._SimulationView._menu.querySelector('#stopButton') == null) {
            this._SimulationView.addStopButton();
        }
        if (this._ticketScanners.length!==0) {
            this.scanTickets();
        }

        let interval = window.setInterval(()=>{
            this.fillAndEmptyTrashcans();
            this.moveCrowd();
            this._SimulationView.renderAllCrowds(this._groupsOfVisitors);
            if (!this._simulating) {
                clearInterval(interval)
            }
        }, 2000);
    }

    tileOnHover(gridCell) {
        if (this._simulating) {
            let coordinates = gridCell.id.split(" ");
            let x = coordinates[0];
            let y = coordinates[1];
            let crowdsOnTile = [];
            this._SimulationView.removeOldCrowdDetails();
            for (const groupOfVisitors of this._groupsOfVisitors) {
                if (groupOfVisitors._x === parseInt(x) && groupOfVisitors._y === parseInt(y)) {
                    crowdsOnTile[crowdsOnTile.length] = groupOfVisitors;
                }
            }
            this._SimulationView.tileOnHoverMenu(crowdsOnTile);
        }
    }

    moveCrowd() {
        for (const groupOfVisitors of this._groupsOfVisitors) {
            let newX = Math.floor(Math.random() * 15);
            let newY = Math.floor(Math.random() * 15);
            while (!this.checkEmptyTile(newX,newY)){
                newX = Math.floor(Math.random() * 15);
                newY = Math.floor(Math.random() * 15);
            }
            groupOfVisitors._x = newX;
            groupOfVisitors._y = newY;
        }
    }

    checkEmptyTile(x,y) {
        let totalPeopleOnTile = 0;
        for (const groupOfVisitors of this._groupsOfVisitors) {
            if (groupOfVisitors._x === x && groupOfVisitors._y === y) {
                totalPeopleOnTile += groupOfVisitors.length;
            }
        }
        if (totalPeopleOnTile >= 7) {
            return false;
        }
        // else if (totalPeopleOnTile >= ) {
        //     //TODO hoeveel mensen mogen in het festivalobject op coordinaten
        // }
        return true;
    }

    stopSimulation() {
        this._simulating = false;
        this._SimulationView.removeStopButton();
        this._SimulationView.removeOldCrowdDetails();
    }

    fillAndEmptyTrashcans() {
        for (const trashcan of this._region._trashcans) {
            if (trashcan._currentCapacity < trashcan._capacity) {
                trashcan._currentCapacity++;
            }
            if (trashcan._currentCapacity >= trashcan._capacity) {
                trashcan._currentCapacity = 0;
            }
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

    async fetchWeather(cityName) {
        fetch('https://api.openweathermap.org/data/2.5/weather?id='+cityName+'&appid=41c01a322b746bc2a2f64b04573cfa9b')
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                this.setWeather(data.weather[0]);
            }).catch(()=>{
                this._SimulationView.weatherError("Weather API error");
        });
    }

    setWeather(result) {
        this._weather = result;
        let icon = `https://openweathermap.org/img/wn/${result.icon}@2x.png`
        this._SimulationView.showWeather(icon);
    }
}