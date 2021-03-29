class NavigationController {

    _StorageController;
    _gridController;

    constructor(storageController, gridController) {
        this._StorageController = storageController;
        this._gridController = gridController;
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

    viewRegion(regionName)
    {
        this._gridController.render(regionName);
    }

    getRegions() {
        let areaList = document.querySelector("#areaList");
        for (const regionItem of areaList.querySelectorAll("li")) {
            areaList.removeChild(regionItem);
        }
        let regions = this._StorageController.getRegions();
        if (regions[0] == null) {
            return;
        } else {
            let areaList = document.querySelector("#areaList");
            for (const child of areaList.children) {
                areaList.removeChild(child);
            }
            for (const region of regions) {
                let newArea = document.createElement("li");
                newArea.innerText = region._name;
                newArea.className = "clickbleLi";

                let deleteArea = document.createElement("i");
                deleteArea.className = "fa fa-trash";
                deleteArea.addEventListener('click', () => {this.deleteRegion(region._name)})
                newArea.appendChild(deleteArea);

                //newArea.onclick = viewRegion();
                newArea.addEventListener('click', (e) => this._gridController.render(region._name));
                document.querySelector("#areaList").appendChild(newArea);
            }
        }
    }
}