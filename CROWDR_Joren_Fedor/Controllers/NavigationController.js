class NavigationController {

    _StorageController;
    _gridController;
    _formPage;

    constructor(storageController, gridController) {
        this._StorageController = storageController;
        this._gridController = gridController;
        this._formPage = [document.querySelector('.hamburgerLink'),document.querySelector('.navigation'),document.querySelector('#space'),document.querySelector('#header'),document.querySelector('.regionForm'),document.querySelector('.nextInput'),document.querySelector('#reset')];
        document.querySelector('.hamburgerLink').addEventListener('click',()=>navigationController.toggleNav());
    }

    toggleNav() {
        let nav = document.querySelector(".navigation");
        let main = document.querySelector(".flex-container");
        if (nav.style.width === "0px") {
            nav.style.width = "330px";
            main.style.marginLeft = "330px";
            this.getRegions();
        } else {
            nav.style.width = "0px";
            main.style.marginLeft = "0px";
        }
    }

    deleteRegion(regionName) {
        this._StorageController.deleteRegion(regionName);
        let areaList = document.querySelector("#areaList");
        for (const regionItem of areaList.querySelectorAll("li")) {
            if (regionItem.innerText === regionName) {
                areaList.removeChild(regionItem);
                return;
            }
        }
    }

    getRegions() {
        let areaList = document.querySelector("#areaList");
        for (const regionItem of areaList.querySelectorAll("li")) {
            areaList.removeChild(regionItem);
        }
        let addRegion = document.createElement('li');
        addRegion.className="clickbleLi";
        addRegion.innerText = "Create new region ";
        let icon = document.createElement('i');
        icon.className = "fa fa-plus"
        addRegion.appendChild(icon);
        addRegion.addEventListener('click',() => this.rebuildForm());
        areaList.appendChild(addRegion);
        let regions = this._StorageController.getRegions();
        if (regions[0] == null) {
            return;
        } else {
            for (const region of regions) {
                let newArea = document.createElement("li");
                newArea.innerText = region._name + "  ";
                newArea.className = "clickbleLi";

                let deleteArea = document.createElement("i");
                deleteArea.className = "fa fa-trash";
                deleteArea.addEventListener('click', () => {this.deleteRegion(region._name)})
                newArea.appendChild(deleteArea);

                //newArea.onclick = viewRegion();
                newArea.addEventListener('click', (e) => this._gridController.render(region._name));
                areaList.appendChild(newArea);
            }
        }
    }

    rebuildForm() {
        let content = document.querySelector('#replaceDiv');

        for (const contentElement of content.children) {
            content.removeChild(contentElement);
        }
        document.body.appendChild(this._formPage[0]);
        document.body.appendChild(this._formPage[1]);

        for (let i = 2;i<this._formPage.length;i++) {
            content.appendChild(this._formPage[i]);
        }
    }
}