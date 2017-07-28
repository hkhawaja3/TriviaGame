/*  Pseudocode for trivia game


1. [x] Declare Global Variables & Counters: Time, Correct Answers, Wrong Answers, etc.
2. [x] Create Questions & Answers: Declare the following arrays: questionArray, answerArray, emptyArray
3. [x] Create timer function: setInterval
4. [] Set onclick functions for userGuess from answers array
5. [] Create conditions for answers or no answer (Time up game over)

6. [x] Add points for correct answers
7. [x] Add points for incorrect answers
8. [] Add points for incomplete answers (if timeout is reached)
9. [x] show score at the end of the game
10.[x] reset button to start quiz over

*/


//Run JS program when page is loaded
$(document).ready(function() {

    //Object for Michael Jordan Questions and Answers


    var nbaTrivia = [{
            question: "Who won the 2001 NBA Most Valuable Player?",
            options: ["Allen Iverson", "Kobe Bryant", "Tim Duncan", "Tracy McGrady"],
            answer: "Allen Iverson"

        }, {
            question: "How many NBA Championships has Michael Jordan won?",
            options: ['3', '6', '8', '10'],
            answer: '6'
        }, {
            question: "Which franchise has the most NBA championships?",
            options: ["New York Knicks", "Los Angeles Lakers", "Chicago Bulls", "Boston Celtics"],
            answer: "Boston Celtics"
        }, {
            question: "Which player made 400 3pt shots in a regular season?",
            options: ["Ray Allen", "Steve Nash", "Reggie Miller", "Stephen Curry"],
            answer: "Stephen Curry"
        },

    ];

    //image arrays

    var correctImageArray = ['assets/images/iverson.gif', 'assets/images/Correct1.gif',
        'assets/images/KG.gif', 'assets/images/stephcurry.gif'
    ];

    var incorrectImageArray = ['assets/images/wrong1.gif','assets/images/wrong2.gif',
    'assets/images/wrong3.gif','assets/images/wrong4.gif',]

    console.log(nbaTrivia);

    //Global Variables

    var time = 24; //Time to countdown per question
    var intervalID; //Interval
    var count = -1; //traverse through nbaTrivia object questions
    var correct = 0; //counter for correct responses
    var incorrect = 0; //counter for incorrect responses
    var unanswered = 0;
    var userSelections //empty var for user selection




    startGame();

    //Starts game

    function startGame() {

        var $game = $('.question');

        $game.html('<h1>Let\'s test your basketball IQ</h1>');

        var startButton = $(document.createElement('button'));
        startButton.addClass('btn-lg btn-block start-button');

        startButton = startButton.html('Start Quiz');

        $game.append(startButton);

        $('.start-button').on('click', function(event) {

            startButton.remove();
            nextQuestion();
            audio();
        })
    }

    //function for timer and call countdown function

    function countdown() {

        time--;

        $('.timer').html('<h2>Time</h2> <p><h3>' + time + '</h3></p>');

        if (time === 0) {
            unanswered++;
            clearInterval(intervalID);
            nextQuestion();

        }

    }


    //function for playing audio file "Basketball"

    function audio() {

        $('#basketball').get(0).play();

    }





    //Pulling questions and multiple choice answers

    function nextQuestion() {

        count++;
        time = 24;
        intervalID = setInterval(countdown, 1000);


        if (count < nbaTrivia.length) {


            $('.question').html(nbaTrivia[count].question);


            $('.answer').empty();
            answerButtons();

        }

        //End of questions, show score, restart game with button
        else if (count > (nbaTrivia.length - 1)) {

            $('.question').empty();
            $('.answer').empty();
            $('.timer').empty();
            clearInterval(intervalID);
            time = 0;

            function endGame() {


                var gameOver = "<h1> Game Over! Here are the results:</h1>"

                $('.question').html(gameOver);

                var result = "<p> Correct answers:" + correct + "</p> <p> Incorrect answers: " + incorrect + "</p>" + "<p> Unanswered: " + unanswered + "</p>"

                $('.answer').html(result);

            }

            endGame();
            createReset();


        }

    }




    //Creating buttons for multiple choice questions

    function answerButtons() {

        for (i = 0; i < nbaTrivia[count].options.length; i++) {

            var btn = $(document.createElement('button'));

            btn.addClass('btn-lg btn-block answer-buttons');

            var newButton = btn.html(nbaTrivia[count].options[i]);

            $('.answer').append(newButton);


        }

        //on click function for answer buttons and capturing user input
        $('.answer-buttons').on('click', function(event) {

            userSelections = $(this).text();
            if (userSelections === nbaTrivia[count].answer) {
                correct++;
                showCorrectImage();
                clearInterval(intervalID);
                nextQuestion();
            } else {
                incorrect++;
                showIncorrectImage();
                clearInterval(intervalID);
                nextQuestion();
            }

        })

    };



    function createReset() {


        var reset = $(document.createElement('button'));
        reset.addClass('btn-lg btn-block');
        reset.text('Try Again');
        reset.appendTo('.answer');

        reset.on('click', function() {


            count = -1;
            correct = 0;
            incorrect = 0;
            unanswered = 0;

            reset.remove();

            nextQuestion();


        })

    }

    function showCorrectImage() {

        $(".image-holder").html("<img src=" + correctImageArray[count] + " width='400px'><p><h4>Correct!!! The answer is  " + nbaTrivia[count].answer + "</h4></p>");
        setTimeout(removeImage, 4000);


    }

    function showIncorrectImage() {

        $(".image-holder").html("<img src=" + incorrectImageArray[count] + " width='400px'><p><h4> Incorrect: The answer is  " + nbaTrivia[count].answer + "</h4></p>");
        setTimeout(removeImage, 4000);
    }

    function removeImage () {
    	$('.image-holder').empty();
    }



});
