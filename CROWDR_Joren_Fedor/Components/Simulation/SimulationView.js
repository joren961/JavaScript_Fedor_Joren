class SimulationView {

    _simulationController;
    _menu;

    constructor(simulationController) {
        this._simulationController = simulationController;
        this._menu = document.querySelector('.menuWrapper');

        this.addCityInput();
        this.addScannerInput();
        this.addStartButton();
    }

    addCityInput() {
        let values = ['2759899', '2759794', '2755251', '2751283', '2745912', '3530597', '715429', '1261481', '357994'];
        let label = document.createElement('label');
        label.innerText = "Select city:";
        let input = document.createElement('select');
        input.id = "cityInput";
        input.name = "cities";
        for (const value of values) {
            let option = document.createElement("option");
            option.value = value;
            switch (value) {
                case '2759899':
                    option.text = "Alkmaar";
                    break;
                case '2759794':
                    option.text = "Amsterdam";
                    break;
                case '2755251':
                    option.text = "Groningen";
                    break;
                case '2751283':
                    option.text = "Maastricht";
                    break;
                case '2745912':
                    option.text = "Utrecht";
                    break;
                case '3530597':
                    option.text = "Mexico City";
                    break;
                case '715429':
                    option.text = "Szeged";
                    break;
                case '1261481':
                    option.text = "New Delhi";
                    break;
                case '357994':
                    option.text = "Egypt";
                    break;
            }
            input.appendChild(option);
        }
        input.style.width = '80%';
        input.addEventListener('change', () => this._simulationController.fetchWeather(input.value));
        this._menu.appendChild(label);
        this._menu.appendChild(input);
    }

    showWeather(icon) {
        let weatherIcon = this._menu.querySelector('#weatherIcon');
        let placement = this._menu.querySelector('#scannerLabel');
        if (weatherIcon != null) {
            weatherIcon.parentElement.removeChild(weatherIcon);
        }
        let iconImg = document.createElement('img');
        iconImg.id = "weatherIcon";
        iconImg.src = icon;
        this._menu.insertBefore(iconImg, placement);
    }

    weatherError(errorMessage) {
        let errors = this._menu.querySelectorAll('.validationMessage');
        if (errors != null) {
            for (const errorElement of errors) {
                errorElement.parentElement.removeChild(errorElement);
            }
        }
        let error = document.createElement('label');
        error.innerText = errorMessage;
        error.className = "validationMessage";
        this._menu.insertBefore(error, this._menu.querySelector('#cityInput'));
    }

    addHoverListener() {
        let grid = document.querySelector('.gridView');
        for (const gridCell of grid.querySelectorAll('.gridCell')) {
            gridCell.addEventListener('mouseenter', (e) => {
                this._simulationController.tileOnHover(gridCell)
            });
        }
    }


    tileOnHoverMenu(crowds) {
        if (crowds[0] != null) {
            this.removeOldCrowdDetails();
            let details = document.createElement('div');
            details.style.width = '95%';
            details.className = "detailsBox";
            let counter = 1;
            for (const crowd of crowds) {
                if (crowd._visitors[0] != null) {
                    let label = document.createElement('label');
                    label.innerText = "Group: " + counter;
                    counter++;
                    details.appendChild(label);
                    for (const visitor of crowd._visitors) {
                        let p = document.createElement('p');
                        p.innerText = visitor._fullName + ", " + visitor._age;
                        details.appendChild(p);
                    }
                }
            }
            this._menu.appendChild(details);
        }
    }

    removeOldCrowdDetails() {
        let oldDetails = this._menu.querySelector('.detailsBox');
        if (oldDetails != null) {
            if (oldDetails.querySelectorAll('label')[0] != null) {
                for (const label of oldDetails.querySelectorAll('label')) {
                    oldDetails.removeChild(label);
                }
            }
            this._menu.removeChild(oldDetails);
        }
    }

    addScannerInput() {
        let label = document.createElement('label');
        label.innerText = "Amount of ticketscanners: ";
        label.id = "scannerLabel";
        let input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('min', '0');
        input.setAttribute('value', '0');
        input.addEventListener('change', () => this._simulationController.updateScanners(input.value));
        this._menu.appendChild(label);
        this._menu.appendChild(input);
    }

    addStartButton() {
        let link = document.createElement('a');
        link.className = "button";
        link.id = "startSimulation";
        link.innerText = "Start"
        link.addEventListener('click', () => this._simulationController.runSimulation());
        this._menu.appendChild(link);
    }

    removeStartButton() {
        let start = this._menu.querySelector('#startSimulation');
        start.parentNode.removeChild(start);
    }

    addStopButton() {
        let link = document.createElement('a');
        link.className = "button";
        link.id = "stopButton";
        link.innerText = "Stop"
        link.addEventListener('click', () => this._simulationController.stopSimulation());
        this._menu.appendChild(link);
    }

    removeStopButton() {
        this._menu.removeChild(this._menu.querySelector('#stopButton'));
    }

    renderAllCrowds(groupsOfVisitors) {
        this.clearCrowdedTiles();
        for (let x = 0; x < 15; x++) {
            for (let y = 0; y < 15; y++) {
                let peopleCounter = 0;
                let parentCellCords = x + " " + y;
                for (let i = 0; i < groupsOfVisitors.length; i++) {
                    if (groupsOfVisitors[i]._x === x && groupsOfVisitors[i]._y === y) {
                        peopleCounter += groupsOfVisitors[i]._visitors.length;
                    }
                    if (i === groupsOfVisitors.length - 1) {
                        this.renderCrowd(parentCellCords, peopleCounter)
                    }
                }
            }
        }
    }

    renderCrowd(parentCellCords, peopleCounter) {
        let parentCell = document.getElementById(parentCellCords);
        switch (peopleCounter) {
            case 0:
                break;
            case 1:
                this.renderCrowdedTile(parentCell, "dist/Resources/1person.png");
                break;
            case 2:
                this.renderCrowdedTile(parentCell, "dist/Resources/2person.png");

                break;
            case 3:
                this.renderCrowdedTile(parentCell, "dist/Resources/3person.png");

                break;
            case 4:
                this.renderCrowdedTile(parentCell, "dist/Resources/4person.png");

                break;
            case 5:
                this.renderCrowdedTile(parentCell, "dist/Resources/5person.png");

                break;
            case 6:
                this.renderCrowdedTile(parentCell, "dist/Resources/6person.png");

                break;
            case 7:
                this.renderCrowdedTile(parentCell, "dist/Resources/7person.png");

                break;
            default:
                this.renderCrowdedTile(parentCell, "dist/Resources/7person.png");
                break;
        }
    }

    renderCrowdedTile(parentCell, src) {
        let newCrowd = document.createElement('img');
        newCrowd.src = src;
        newCrowd.className = "crowd";
        parentCell.appendChild(newCrowd);
    }

    clearCrowdedTiles() {
        let wholeCrowd = document.querySelectorAll('[class=crowd]');
        for (let i = 0; i < wholeCrowd.length; i++) {
            wholeCrowd[i].parentNode.removeChild(wholeCrowd[i]);
        }
    }
}