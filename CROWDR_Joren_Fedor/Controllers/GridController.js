
viewGrid();

function viewGrid()
{
    document.getElementById('replaceDiv').innerHTML = '';
    generateLayout();
}
function generateLayout()
{
    //get div
    let replaceDiv = document.getElementById('replaceDiv');

    //add new container
    let newContainer = document.createElement('div');
    newContainer.className = 'container';
    replaceDiv.appendChild(newContainer);

    //add options div
    let newOptionsview = document.createElement('div');
    newOptionsview.className = 'one';
    newContainer.appendChild(newOptionsview);

    //fill options div
    generateOptionsview();

    //add gridview div
    let newGridview = document.createElement('div');
    newGridview.className = 'two';
    newContainer.appendChild(newOptionsview);

    //fill gridview div
    generateGridview();
}

function generateOptionsview()
{
    //get optionsView
    let getOptionsView = document.getElementById('one');

    //DrinkStand
    let newDrinkStand = document.createElement('div');
    newDrinkStand.className = 'oneXone';
    let newDrinkStandImage = document.createElement('img');
    newDrinkStandImage.src = 'HogeBoom.png';
    newDrinkStand.appendChild(newDrinkStandImage);

    let get



    //newDrinkStand.ondrop = drop(event);
    //newDrinkStand.ondrag = allowDrop(event);





    //FoodStand

    //RegionStand

    //Tent

    //ToiletBuilding

    //Trashcan

    //Trees (3 different types, the pleb can deside which ever he wants)
}

function generateGridview()
{

}

