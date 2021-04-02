class SimulationView {

    _simulationController;
    _menu;

    constructor(simulationController) {
        this._simulationController = simulationController;
        this._menu = document.querySelector('.menuWrapper');
        this.addScannerInput();
        this.addStartButton();
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