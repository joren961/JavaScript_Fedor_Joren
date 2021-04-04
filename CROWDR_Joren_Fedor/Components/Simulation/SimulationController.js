class SimulationController {

    _ticketScanners;
    _gridController;
    _groupsOfVisitors;
    _visitorAmount;
    _SimulationView;
    _region;
    _simulating;
    _weather;
    _APICaller;

    constructor(gridController, region) {
        this._gridController = gridController;
        this._SimulationView = new SimulationView(this);
        this._APICaller = new APICaller(this);
        this._region = region;
        this._ticketScanners = [];
        this._groupsOfVisitors = [];
        this._visitorAmount = 0;
        this._simulating = false;
    }

    runSimulation() {
        this._simulating = true;
        this._SimulationView.addHoverListener();
        this._SimulationView.removeStartButton();
        if (this._SimulationView._menu.querySelector('#stopButton') == null) {
            this._SimulationView.addStopButton();
        }
        if (this._ticketScanners.length!==0) {
            this.scanTickets();
        }

        console.log(this._weather)
        console.log(this._region)
        let interval = window.setInterval(()=>{
            this.fillAndEmptyTrashcans();
            this.moveCrowd();
            this._SimulationView.renderAllCrowds(this._groupsOfVisitors);
            if (!this._simulating) {
                clearInterval(interval)
            }
        }, 3500);
    }
    moveCrowd() {
        for (const groupOfVisitors of this._groupsOfVisitors) {
            //console.log(this._groupsOfVisitors);
            if(this._weather == null)
            {
                let newX = Math.floor(Math.random() * 15);
                let newY = Math.floor(Math.random() * 15);
                while (!this.checkEmptyTile(newX, newY)) {
                    newX = Math.floor(Math.random() * 15);
                    newY = Math.floor(Math.random() * 15);
                }
                groupOfVisitors._x = newX;
                groupOfVisitors._y = newY;
            }
            else
            {
                switch (this._weather.main) {
                    case 'Clouds':
                        for(const tent of this._region._tents)
                        {
                           if(this.enterTent(tent, groupOfVisitors))
                           {
                               break;
                           }
                           else
                           {
                               continue;
                           }
                        }

                    case 'Sunni':
                        //todo add logic for scortching hot weather
                        break;
                    default:
                        let newX = Math.floor(Math.random() * 15);
                        let newY = Math.floor(Math.random() * 15);
                        while (!this.checkEmptyTile(newX, newY)) {
                            newX = Math.floor(Math.random() * 15);
                            newY = Math.floor(Math.random() * 15);
                        }
                        groupOfVisitors._x = newX;
                        groupOfVisitors._y = newY;

                }
            }
        }

    }
    enterTent(tent, crowd)
    {
        //loop through all tiles and return cords
        for(let x = 0; x < 3; x++)
        {
            for(let y = 0; y < 3; y++)
            {
                //console.log(this.checkEmptyTile(tent._x + x,tent._y + y) +"   "+ tent._x + x + "  " + tent._y + y);
                if(this.checkEmptyTile(tent._x + x,tent._y + y))
                {
                    crowd._x = tent._x + x;
                    crowd._y = tent._y + y;
                    //console.log(crowd._x);
                    //console.log(crowd._y);
                    //console.log(tent._x);
                    //console.log(tent._y);
                    return true;
                }
            }
        }
        return false;
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

    checkEmptyTile(x,y) {
        let totalPeopleOnTile = 0;
        for (const groupOfVisitors of this._groupsOfVisitors) {
            if (groupOfVisitors._x === x && groupOfVisitors._y === y) {
                totalPeopleOnTile += groupOfVisitors._visitors.length;
            }
        }
        if (totalPeopleOnTile >= 7) {
            return false;
        }
        // else if (totalPeopleOnTile >= ) {
        //     //TODO hoeveel mensen mogen in het festivalobject op coordinaten
        // }
        if(this.getObjectOnCords(x, y) != -1) {
            if (this.getObjectOnCords(x, y)._maxVisitors > totalPeopleOnTile) {
                return false;
            }
        }
        return true;
    }

    //returns object based on coordinates
    getObjectOnCords(xCord, yCord)
    {
        for(const object of this._region._tents)
        {
            for(let x = 0; x < 3; x++)
            {
                for(let y = 0; y < 3; y++)
                {
                    if(object._x + x == xCord && object._y + y == yCord)
                    {
                       return object;
                    }
                }
            }
        }
        return -1;
    }

    stopSimulation() {
        this._simulating = false;
        this._SimulationView.removeStopButton();
        this._SimulationView.removeOldCrowdDetails();
        if (this._groupsOfVisitors[0]!=null) {
            this._groupsOfVisitors = [];
        }
        if (document.querySelector('#scannerLabel')!=null) {
            this._SimulationView.addStartButton();
        }
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
                        let result = this._APICaller.fetchRandomUser(group, i);
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

    setUser(result, group, index) {
        try {
            let visitor = new Visitor(result.results[0].name.first + " " + result.results[0].name.last, result.results[0].dob.age);
            group._visitors[index] = visitor;
        } catch (e) {
            let visitor = new Visitor("API error", 404);
            group._visitors[index] = visitor;
        }
    }

    fetchWeather(input) {
        this._APICaller.fetchWeather(input);
    }

    setWeather(result) {
        try {
            this._weather = result;
            let icon = `https://openweathermap.org/img/wn/${result.icon}@2x.png`;
            this._SimulationView.showWeather(icon);
        } catch (e) {
            this.weatherError("Weather API error");
        }
    }

    weatherError(errormessage) {
        this._SimulationView.weatherError(errormessage);
    }
}