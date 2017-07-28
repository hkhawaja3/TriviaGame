$(document).ready(function(){
  console.log("Ready!");
  //question array starts at zero/beginning
  var currentQuestion = 0;
  //score starts at zero
  var score = 0;
  index = 0
  
  //reveals intro text on click event, calls function for running game, fill value of button with 'start game'
  $("#startGame").on("click", beginGame); {
    $("#startGame").val("Start Game");
  }
  //function for event listener, shows intro text, starts game
  function beginGame() {
    console.log("do it!");
    $("#trivia .totalScore").remove();
    $(".intro").fadeIn("slow");
    if (currentQuestion < triviaQuestions.length) {
      $("#startGame").val("Next Question")
      $("#questionBox").remove();
      $(".optionsList").remove();
      $("p.questions").append('<p id="questionBox">' + triviaQuestions[currentQuestion].question + '</p>');
      $("p.options").append("<p id='quizBox'>");
      var selections = triviaQuestions[currentQuestion].selection;
      console.log(triviaQuestions[currentQuestion])
      console.log(selections);
      for (var i = 0; i < selections.length; i++) {
        $("#quizBox").append("<label><div class='optionsList'><input class='selectRadio' type='radio' name='" + selections[i] +"'/>" + selections[i] + '<br /></div></label>');
      }
      $("#startGame").prepend("</p>");

      $("div.optionsList").on("click",".selectRadio", function() {
        console.log("optionsList click event");
        console.log($(this).attr("name"));
        console.log(currentQuestion);
        console.log(triviaQuestions[currentQuestion-1])
        console.log(triviaQuestions[currentQuestion-1].correctSelection );
        if ($(this).attr("name") === triviaQuestions[currentQuestion-1].correctSelection) {
          score++;
          console.log(score);
        }
      });
      currentQuestion++;
    }
    else {
      //$("p.questions").remove();
      //$("p.options").remove();
      $("#questionBox").remove();
      $(".optionsList").remove();
      $("#startGame").before('<h2 class="totalScore"> Final score: ' + score + ' / 8 questions correct!</h2>');
      $("#startGame").val("Play Again");
      //$("#startGame").remove();
      //$("#playAgain").show();
      //resets to play again
      currentQuestion = 0;
      score = 0;
    }
  }





  //question/answer array of an array stored in a variable
  var triviaQuestions = [
    {
      question: "Who won the 2001 NBA Most Valuable Player?",
      selection: ["Allen Iverson", "Kobe Bryant", "Tim Duncan", "Tracy McGrady" ],
      correctSelection: "Allen Iverson"
    },
    {
      question: "Which team made the largest NBA comeback in a game?",
      selection: ["Utah Jazz", "Sacramento Kings", "Chicago Bulls", "Los Angeles Lakers"],
      correctSelection: "Utah Jazz"
    },
    {
      question: "Who scored the most points in an NBA game?",
      selection: ["Kobe Bryant", "Wilt Chamberlain", "Michael Jordan", "LeBron James"],
      correctSelection: "Wilt Chamberlain"
    },
    {
      question: "Which player has the most NBA championships?",
      selection: ["Sam Jones", "Tom Sanders", "Bill Russell", "Robert Horry"],
      correctSelection: "Bill Russell"
    },
    {
      question: "Which player has the most recorded triple doubles?",
      selection: ["Magic Johnson", "Jason Kidd", "Oscar Roberston", "Russell Westbrook"],
      correctSelection: "Oscar Roberston"
    },
    {
      question: "What team name did the Kansas City NBA team have? ",
      selection: ["Rockets", "Kings", "Stars", "Warriors"],
      correctSelection: "Kings"
    },
    {
      question: "Which player made 400 3pt shots in a regular season?",
      selection: ["Ray Allen", "Steve Nash", "Reggie Miller", "Stephen Curry"],
      correctSelection: "Stephen Curry"
    },
    {
      question: "Which franchise has the most NBA championships?",
      selection: ["New York Knicks", "Los Angeles Lakers", "Chicago Bulls", "Boston Celtics"],
      correctSelection: "Boston Celtics"
    },
  ];
});
