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
    let regionArray = localStorage.getItem("regions");
    if (regionArray[0] == null) {
        return;
    } else {
        let areaList = document.querySelector("#areaList")
        let regions = JSON.parse(regionArray);
        for (const child of areaList.children) {
            areaList.removeChild(child);
        }
        if (regions != null) {
            for (const region of regions) {
                let newArea = document.createElement("li");
                newArea.innerText = region._name;
                newArea.className = "clickbleLi";
                //newArea.onclick = viewRegion();
                newArea.addEventListener('click', (e) => viewRegion());
                document.querySelector("#areaList").appendChild(newArea);
            }
        }
    }
}

function viewRegion()
{
    fetch('RegionView.html')
        .then(data => data.text())
        .then(html => document.getElementById('replaceDiv').innerHTML = html);



    //<div class="child" ondrop="drop(event)" ondragover="allowDrop(event)"></div>

    let parentDiv = document.getElementById('parent');
    let newSlot = document.createElement("div");
    newSlot.innerText = "new Div";
    newSlot.className = "child";
    parentDiv.appendChild(newSlot);

    //get the navigation
    //let objectNav = document.getElementById("objectNav");
    //add drinkstands
    //let newObject = document.createElement(("Li"));
    //newObject.innerText = "drinkStands";
    //objectNav.appendChild(newObject);

    return;
}

function createNavObject(max, name)
{


}




