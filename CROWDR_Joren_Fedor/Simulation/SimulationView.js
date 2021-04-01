class SimulationView {

    _simulationController;

    constructor(simulationController) {
        this._simulationController = simulationController;
        this.addScannerInput();
    }

    addScannerInput() {
        let menu = document.querySelector('.menuWrapper');
        let label = document.createElement('label');
        label.innerText = "Amount of ticketscanners: ";
        let input = document.createElement('input');
        input.setAttribute('type','number');
        input.setAttribute('min','0');
        input.setAttribute('value','0');
        input.addEventListener('change',() => this._simulationController.updateScanners(input.value));
        menu.appendChild(label);
        menu.appendChild(input);
    }

}