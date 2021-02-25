

function toggleNav() {
    let nav = document.querySelector(".navigation");
    let main = document.querySelector(".flex-container");
    if (nav.style.width === "0px") {
        nav.style.width = "330px";
        main.style.marginLeft = "330px";
    } else {
        nav.style.width = "0px";
        main.style.marginLeft = "0px";
    }
}


