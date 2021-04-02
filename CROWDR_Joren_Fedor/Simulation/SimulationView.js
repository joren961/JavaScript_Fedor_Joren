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
        let values = ['Alkmaar','Amsterdam','Den Bosch','Groningen','Maastricht','Utrecht'];
        let label = document.createElement('label');
        label.innerText = "Select city:";
        let input = document.createElement('select');
        input.id = "cityInput";
        input.name = "cities";
        for (const value of values) {
            let option = document.createElement("option");
            option.value = value;
            option.text = value.charAt(0).toUpperCase() + value.slice(1);
            input.appendChild(option);
        }
        input.style.width = '80%';
        input.addEventListener('change',()=>this._simulationController.fetchWeather(input.value));
        this._menu.appendChild(label);
        this._menu.appendChild(input);
    }

    weatherError(errorMessage) {
        let errors = this._menu.querySelectorAll('.validationMessage');
        if (errors!=null) {
            for (const errorElement of errors) {
                errorElement.parentElement.removeChild(errorElement);
            }
        }
        let error = document.createElement('label');
        error.innerText = errorMessage;
        error.className = "validationMessage";
        this._menu.querySelector('#cityInput').appendChild(error);
    }

    addScannerInput() {
        let label = document.createElement('label');
        label.innerText = "Amount of ticketscanners: ";
        let input = document.createElement('input');
        input.setAttribute('type','number');
        input.setAttribute('min','0');
        input.setAttribute('value','0');
        input.addEventListener('change',() => this._simulationController.updateScanners(input.value));
        this._menu.appendChild(label);
        this._menu.appendChild(input);
    }

    addStartButton() {
        let link = document.createElement('a');
        link.className = "button";
        link.innerText = "Start"
        link.addEventListener('click',()=> this._simulationController.runSimulation());
        this._menu.appendChild(link);
    }

    addStopButton() {
        let link = document.createElement('a');
        link.className = "button";
        link.id="stopButton";
        link.innerText = "Stop"
        link.addEventListener('click',()=> this._simulationController.stopSimulation());
        this._menu.appendChild(link);
    }

    removeStopButton() {
        this._menu.removeChild(this._menu.querySelector('#stopButton'));
    }
}