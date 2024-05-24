// if we click on the start/reset button

var playing = false;
var score;
var action;
var timeremain;
var correctans;


document.getElementById("start").onclick = function(){
    //if we are playing
    if(playing == true){
        location.reload()  // reload our page
    }

    // if we were not playing
    else{
        score = 0;
        playing = true;
        document.getElementById("scorevalue").innerHTML = score;
        
        
        // show countdown box
        show("time");
        timeremain = 60;
        document.getElementById("timeremain").innerHTML = timeremain;

        // hide game over button
        hide("gameover");

        document.getElementById("start").innerHTML = "Reset Game";

        // start countdowm

        startCountdown();

        // generate multiple Q&A;
        generateQA();
    }
}

for(i = 1; i<=4; ++i){

    document.getElementById("box"+i).onclick = function(){
        if(playing == true){
            if(this.innerHTML == correctans){
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct"); 
                setTimeout(function(){
                    hide("correct");
                }, 1000)
    
                generateQA();
            }else{
                // wrong answer
                hide("correct");
                show("wrong"); 
                setTimeout(function(){
                    hide("wrong");
                }, 1000)
            }
        }
    }

}

    //if we are playing 
        // reload the page
    // else
        // show countdown box
        // reduce time by 1sec in loops
            // if time left
                // yes -> continue
            // else game over
        // change button text to reset   
        // generate new question and answers   
        
// if we click on answer box
    // if we are playing
        // correct
            // yes then increase the score and show the correct box and generate new Q&A
            // no the show the try again box



function startCountdown(){
    action = setInterval(() => {
        timeremain -= 1;
        document.getElementById("timeremain").innerHTML = timeremain;

        if(timeremain == 0){  // gameover
            stopCountdown();
            show("gameover");

            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";
            hide("time");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("start").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown(){
    clearInterval(action);
}

function hide(id){
    document.getElementById(id).style.display = "none";
}

function show(id){
    document.getElementById(id).style.display = "block";
}

function generateQA(){
    var x = 1+Math.round(9*Math.random());
    var y = 1+Math.round(9*Math.random());
    correctans = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var corrPos = 1+Math.round(3*Math.random());

    document.getElementById("box"+corrPos).innerHTML = correctans;    // fill the box with correct answer

    // fill the other boxes

    var answers = [correctans];
    for(i = 1; i<5; ++i){
        if(i != corrPos ){
            var wrongans;

            do{
                wrongans= (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }while(answers.indexOf(wrongans)>=0 );
            
            
            document.getElementById("box"+i).innerHTML = wrongans;
            answers.push(wrongans); 
        }
    }
}