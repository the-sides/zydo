console.log("*static* This is your captain speaking, executing operation searchAndDestroy with a limited scope for just the slide show start-button's and ignoring if 'button' is a class attached")

var participationStartButtons = document.getElementsByClassName("start-button");
// var speedControllers = document.getElementsByClassNames("speed-control").querySelectAll("LABEL");
// var speedControllers = document.getElementsByTagName("LABEL");
var i;
window.scrollTo(0,200);

for(i = 0; i < participationStartButtons.length; i++){
    // if(speedControllers[i].innerHTML == "2x speed"){
    //     window.alert( speedControllers.innerHTML)
    //     speedControllers.click();
    // }
    // speedControllers[i].children[0].childen[1].click();
    participationStartButtons[i].click();
}

// Loop for checking all of the next step play buttons.