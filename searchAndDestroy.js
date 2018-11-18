console.log("*static* This is your captain speaking, executing operation searchAndDestroy with a limited scope for just the slide show start-button's and ignoring if 'button' is a class attached")

// var participationStartButtons = document.getElementsByClassName("start-button");
// var speedControllers = document.getElementsByClassNames("speed-control");
// // var speedControllers = document.getElementsByTagName("LABEL");
// var i;
// window.scrollTo(0,200);

// for(i = 0; i < participationStartButtons.length; i++){
//     // if(speedControllers[i].innerHTML == "2x speed"){
//     //     window.alert( speedControllers.innerHTML)
//         // speedControllers[i].click();
//     // }
//     // speedControllers[i].children[0].childen[1].click();
//     participationStartButtons[i].click();
// }

// // Loop for checking all of the next step play buttons.

// Here You can type your custom JavaScript...
$(document).ready(function(){
  if(checkZybookUrl()){
    displayChoices()
    $('body').on('click', '.start', onStart)
    $('body').on('click', '.stop', onStop)
  }
})
////
//  checkZybookUrl just checks if the given URL is actually a zybook
////
function checkZybookUrl(){
  return window.location.href.includes("learn.zybooks.com/zybook/")
}

////
//  displayChoices displays different menu options for zybook
//  lets you start and stop the bot
//  just incase you want to actually learn material
////
function displayChoices(){
  $('body').append(
    '<div style="position: fixed; top: 56px; width:100%;"><button class="stop" style="float:right;">Stop</button><button class="start" style="float:right;">Start</button></div>'
    )
}
////
//  This runs different functions when start is clicked
////
function onStart(){
  solveMultipleChoiceActivity()
  shortAnswerSolver()
  completeCustomResource()
  playPresentations()
}
////
//  This stops the script from executing
////
function onStop(){
  alert("stopped")
}

////
//  solveMultipleChoiceActivity Brute Forces all multiple choice questions until the correct answer is chosen
////
function solveMultipleChoiceActivity(){
  //MC refers to MultipleChoice
  let MCContainer = $('.multiple-choice-content-resource')
  var i = 0
  var len = MCContainer.length
  parseActivity(MCContainer, i, len)
}
//parseActivity runs parseQuestions for all activities
function parseActivity(MCActivities, i, len){
  setTimeout(function(){
    var questions = $(MCActivities[i]).find('.question-set-question')
    var j = 0
    var qlen = questions.length
    console.log("Activity ", i+1)
    parseQuestions(questions, j, qlen)
    if(i<len){
      i++
      parseActivity(MCActivities, i, len)
    }
  }, 250)
}
//parseQuestions runs clickAnswer on all questions within an Activity
function parseQuestions(questions, i, len){
  setTimeout(function(){
    var answers = $(questions[i]).find('.zb-radio-button')
    var j=0
    var alen = answers.length
    clickAnswer(answers, j, alen)
    if(i<len){
      i++
      parseQuestions(questions,i,len)
    }
  }, 250)
}
//clickAnswer clicks answers for each question within an activity
//the function stops when the correct answer is clicked
function clickAnswer(answers, i, len){
  setTimeout(function(){
  var message = ''
  $(answers[i]).on('click', 'input', function(){
    message = $(this).parent().parent().parent().parent().find('.message').html()
    //console.log(message)
  })
  $(answers[i]).find('input').click()

  if(message.includes("Correct")){
    console.log("Correct Answer")
    i = len
  }
  if(message.includes("Incorrect")){
    console.log("Incorrect Answer")
  }
  if(i<len){
    i++
    clickAnswer(answers, i, len)
  }
  
  }, 500)
}

////
//  playPresentations clicks the play button on all content at 2x speed
////
function playPresentations(){
  var presentations = $('.animation-player-content-resource')
  presentations.on('click', '.start-button', function(){
    
  })
  var presentationStartButtons = presentations.find('.start-button')
  var speedButtons = presentations.find('.zb-checkbox').find('input')
  var i;
  //After we click .start-button and 2x button, the new button to click is .play-button
  for(i = 0; i < presentationStartButtons.length; i++){
    speedButtons[i].click()
    presentationStartButtons[i].click()
  }
  
  pauseButtonLength(presentations)
  
}
//Counts how many pause buttons there are, so the js function knows when to click play
function pauseButtonLength(presentations){
  setTimeout(function(){
    var len = presentations.find('.pause-button').length
    if(len > 0){
      pauseButtonLength(presentations)
    }else{
      clickPlayButtons(presentations)
    }
  }, 1000)
}
//clicks the play button and waits for the pause button to disappear
function clickPlayButtons(presentations){
  var playBtnArray = presentations.find('.play-button')
  for(var i=0;i<playBtnArray.length;i++){
    $(playBtnArray[i]).click()
  }
  pauseButtonLength(presentations)
}

////
//  shortAnswerSolver solves short answer questions
////
function shortAnswerSolver(){
  var SA = $('.short-answer-payload')
  var showAnswer = SA.find('.show-answer-button')
  for(var i = 0; i<showAnswer.length;i++){
    $(showAnswer[i]).click()
  }
  for(var i = 0; i<showAnswer.length;i++){
    $(showAnswer[i]).click()
  }
  var answers = SA.find('.forfeit-answer')
  var inputBoxes = SA.find('textarea')
  for(var i=0;i<answers.length;i++){
    var answer = $(answers[i]).html()
    $(inputBoxes[i]).val(answer)
  }
  var checkButtons = SA.find('.check-button')
  
  
}


////
//  Custom Resource Payload Modules 
//  These modules just have one button to click
////
function completeCustomResource(){
  var buttonToClick = $('.custom-resource-payload').find('.render-webpage')
  for(var i = 0; i<buttonToClick.length; i++){
    $(buttonToClick[i]).click()
  }
 
}
@the-sides

Attach files by dragging & dropping,

, or pasting from the clipboard.
Styling with Markdown is supported

    © 2018 GitHub, Inc.
    Terms
    Privacy
    Security
    Status
    Help

    Contact GitHub
    Pricing
    API
    Training
    Blog
    About

Press h to open a hovercard with more details.
