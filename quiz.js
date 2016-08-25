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
        "Live according to your principles",
        "Love moves the world",
        "Question everything",
        "Getting lost is half the fun"
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
  $(this).find(".results").hide();

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
          $(document).find(".quizMessage").hide();
          $(document).find(".choiceList").hide();
          $(document).find(".question").hide();
          displayResults();
          $(document).find(".results").show();
          $(document).find(".nextButton").hide();

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
  $(choiceDiv).find("li").remove();

  var choice;
  for (var i = 0; i < numChoices; i++) {
    choice = quiz[currentQuestion].choices[i];
    $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceDiv);
  }
}

function displayResults() {
  var results = [
    {type: "a", total: 0},
    {type: "b", total: 0},
    {type: "c", total: 0},
    {type: "d", total: 0}
  ]

  for (var i = 0; i < answers.length; i++) {
    if (answers[i] == "0") {
      results[0].total++;
    }
    else if (answers[i] == "1") {
      results[1].total++;
    }
    else if (answers[i] == "2") {
      results[2].total++;
    }
    else {
      results[3].total++;
    }
  }

  var currentHigh = 0;
  var type = null;

  for (var i = 0; i < results.length; i++) {
    if (results[i].total > currentHigh) {
      type = results[i].type;
      currentHigh = results[i].total;
    }
    //if equal pick a random one
    else if (results[i].total == currentHigh) {
      if (Math.random() >= 0.5) {
        type = results[i].type;
      }
    }
  }

  if (type == "a") {
    $(document).find("#resultsHead").text("The Officer");
    $(document).find("#resultsDiv").text("You are The Officer! You value persistence, organization, and good judgment. You learn best by following clearly outlined procedures and committing to a study plan.");
  }
  else if (type == "b") {
    $(document).find("#resultsHead").text("The Communicator");
    $(document).find("#resultsDiv").text("You are The Communicator! You value relationships, compassion, and engaging conversation. You learn best by talking and writing about topics and collaborating with others.");
  }
  else if (type == "c") {
    $(document).find("#resultsHead").text("The Scientist");
    $(document).find("#resultsDiv").text("You are The Scientist! You value facts, fascination, and solving problems. You learn best by researching interesting ideas and testing yourself regularly.");
  }
  else {
    $(document).find("#resultsHead").text("The Adventurer");
    $(document).find("#resultsDiv").text("You are The Adventurer! You value excitement, intrigue, and new experiences. You learn best through hands­on projects and visualization.");
  }

  $(document).find("#subscribeMessage").text("Sign up to receive the Uncommon Learning Newsletter and we will send you your complete personality profile!");
}
