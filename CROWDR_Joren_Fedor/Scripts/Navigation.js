function toggleNav() {
    let nav = document.querySelector(".navigation");
    let main = document.querySelector(".flex-container");
    if (nav.style.width === "0px") {
        nav.style.width = "330px";
        main.style.marginLeft = "330px";
        getAreas();
    } else {
        nav.style.width = "0px";
        main.style.marginLeft = "0px";
    }
}

function getAreas() {
    let areaList = document.querySelector("#areaList");
    for (const regionItem of areaList.querySelectorAll("li")) {
        areaList.removeChild(regionItem);
    }

    let regionArray = localStorage.getItem("regions");
    if (regionArray[0] == null) {
        return;
    } else {
        let areaList = document.querySelector("#areaList");
        let regions = JSON.parse(regionArray);
        for (const child of areaList.children) {
            areaList.removeChild(child);
        }
        if (regions != null) {
            for (const region of regions) {
                let newArea = document.createElement("li");
                newArea.innerText = region._name;
                newArea.className = "clickbleLi";

                let deleteArea = document.createElement("i");
                deleteArea.className = "fa fa-trash";
                deleteArea.addEventListener('click', function () {
                    deleteRegion(region._name);
                })
                newArea.appendChild(deleteArea);

                //newArea.onclick = viewRegion();
                newArea.addEventListener('click', (e) => viewRegion());
                document.querySelector("#areaList").appendChild(newArea);
            }
        }
    }
}

function deleteRegion(regionName) {
    debugger;
    let regions = localStorage.getItem("regions");
    regions = JSON.parse(regions);
    for (const region of regions) {
        if (region._name === regionName) {
            regions.splice(regions.indexOf(region),1);
            break;
        }
    }
    localStorage.setItem("regions",JSON.stringify(regions));

    let areaList = document.querySelector("#areaList");
    for (const regionItem of areaList.querySelectorAll("li")) {
        if (regionItem.innerText === regionName) {
            areaList.removeChild(regionItem);
            return;
        }
    }
}

function viewRegion()//dummy //TODO Fedor
{
    fetch('RegionView.html')
        .then(data => data.text())
        .then(html => document.getElementById('replaceDiv').innerHTML = html);
    return;
}




