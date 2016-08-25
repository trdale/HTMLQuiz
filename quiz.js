var quiz = [
  {
      "question" : "Who were your favorite kinds of teachers in school?",
      "choices" : [
        "Fair teachers with clear expectations and a no­nonsense style",
        "Kind teachers who built strong, mentoring relationships with their students",
        "Interesting teachers who were skilled and passionate about their subject",
        "Lenient teachers who designed fun class activities"
      ]
  },
  {
      "question" : "How would you most enjoy spending a vacation?",
      "choices" : [
        "Recharging in a calm, relaxing place with lots of amenities",
        "Reconnecting with a trip to visit long­distance friends and family",
        "Touring a fascinating cultural landmark with a well­researched guide",
        "Finding spontaneous adventures while exploring a new place"
      ]
  },
  {
      "question" : "What do you find most stressful?",
      "choices" : [
        "Being late to an interview",
        "Getting into an argument",
        "Not knowing how to do something you need to do",
        "Following strict rules"
      ]
  },
  {
      "question" : "When is it easiest for you to focus?",
      "choices" : [
        "When I am following a schedule and pursuing my goals",
        "When I am engaged in conversation and working through problems with friends",
        "When I am curious about a topic and have time to spend hours researching it",
        "When I am building something or trying to get something to work"
      ]
  },
  {
      "question" : "What do you like to read the most?",
      "choices" : [
        "Classic books, realistic fiction, and how­to books",
        "Books with interesting characters, stories with rich, evocative language, and my text messages :)",
        "Non­fiction books, science fiction, and the news",
        "Books with lots of action, travel stories, and books about your favorite hobbies (video game manuals, birdwatching guides, etc.)"
      ]
  },
  {
      "question" : "Which could be your motto",
      "choices" : [
        "\“Live according to your principles\”",
        "\“Love moves the world\”",
        "\“Question everything\”",
        "\“Getting lost is half the fun\”"
      ]
  },
  {
      "question" : "How do you motivate yourself to exercise?",
      "choices" : [
        "I plan my day to include a set time for exercise",
        "I work out with a friend",
        "I research the most effective ways to exercise and do it while listening to podcasts or audiobooks",
        "I try workouts and fitness classes that are interesting or trendy"
      ]
  },
  {
      "question" : "What is the most important quality in a good friendship?",
      "choices" : [
        "Keeping promises",
        "Listening to each other",
        "Learning things together",
        "Having fun"
      ]
  },
  {
      "question" : "What kinds of clothes do you like to wear",
      "choices" : [
        "Classic styles that show off my good taste",
        "Clothes that express my personality",
        "Whatever clothes are clean. I don’t buy clothes I don’t like to wear",
        "Comfortable clothes that are easy to move in"
      ]
  }
];
var answers = [];
var currentQuestion = 0;
var quizOver = false;

$(document).ready(function () {
  displayQuestion();
  $(this).find(".quizMessage").hide();

  $(this).find(".nextButton").on("click", function () {
    if (!quizOver) {
      value = $("input[type = 'radio']:checked").val();

      if (value == undefined) {
        $(document).find(".quizMessage").text("Please select an answer");
        $(document).find(".quizMessage").show();
      }
      else {
        $(document).find(".quizMessage").hide();
        answers[currentQuestion] = value;
        currentQuestion++;
        if (currentQuestion < quiz.length) {
          displayQuestion();
        } else {
          quizOver = true;
          console.log(answers);
        }
      }
    }
    else {
      console.log("Send to sub");
    }
  });

});

function displayQuestion() {
  var question = quiz[currentQuestion].question;
  var questionDiv = $(document).find(".quizDiv > .question");
  var choiceDiv = $(document).find(".quizDiv > .choiceList");
  var numChoices = quiz[currentQuestion].choices.length;

  $(questionDiv).text(question);
  $(choiceDive).find("li").remove();

  var choice;
  for (var i = 0; i < numChoices; i++) {
    choice = quiz[currentQuestion].choices[i];
    $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceDiv);
  }
}
