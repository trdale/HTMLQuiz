var quiz = [
  {
      "question" : "Who were your favorite kinds of teachers in school?",
      "choices" : [
        {"option": 1, "text" : "Fair teachers with clear expectations and a no-nonsense style"},
        {"option": 2, "text" : "Kind teachers who built strong, mentoring relationships with their students"},
        {"option": 3, "text" : "Interesting teachers who were skilled and passionate about their subject"},
        {"option": 4, "text" : "Lenient teachers who designed fun class activities"}
      ]
  },
  {
      "question" : "How would you most enjoy spending a vacation?",
      "choices" : [
        {"option": 1, "text" : "Recharging in a calm, relaxing place with lots of amenities"},
        {"option": 2, "text" : "Reconnecting with a trip to visit long-distance friends and family"},
        {"option": 3, "text" : "Touring a fascinating cultural landmark with a well-researched guide"},
        {"option": 4, "text" : "Finding spontaneous adventures while exploring a new place"}
      ]
  },
  {
      "question" : "What do you find most stressful?",
      "choices" : [
        {"option": 1, "text" : "Being late to an interview"},
        {"option": 2, "text" : "Getting into an argument"},
        {"option": 3, "text" : "Not knowing how to do something you need to do"},
        {"option": 4, "text" : "Following strict rules"}
      ]
  },
  {
      "question" : "When is it easiest for you to focus?",
      "choices" : [
        {"option": 1, "text" : "When I am following a schedule and pursuing my goals"},
        {"option": 2, "text" : "When I am engaged in conversation and working through problems with friends"},
        {"option": 3, "text" : "When I am curious about a topic and have time to spend hours researching it"},
        {"option": 4, "text" : "When I am building something or trying to get something to work"}
      ]
  },
  {
      "question" : "What do you like to read the most?",
      "choices" : [
        {"option": 1, "text" : "Classic books, realistic fiction, and how-to books"},
        {"option": 2, "text" : "Books with interesting characters, stories with rich, evocative language, and my text messages :)"},
        {"option": 3, "text" : "Non-fiction books, science fiction, and the news"},
        {"option": 4, "text" : "Books with lots of action, travel stories, and books about your favorite hobbies (video game manuals, birdwatching guides, etc.)"}
      ]
  },
  {
      "question" : "Which could be your motto?",
      "choices" : [
        {"option": 1, "text" : "\"Live according to your principles\""},
        {"option": 2, "text" : "\"Love moves the world\""},
        {"option": 3, "text" : "\"Question everything\""},
        {"option": 4, "text" : "\"Getting lost is half the fun\""}
      ]
  },
  {
      "question" : "How do you motivate yourself to exercise?",
      "choices" : [
        {"option": 1, "text" : "I plan my day to include a set time for exercise"},
        {"option": 2, "text" : "I work out with a friend"},
        {"option": 3, "text" : "I research the most effective ways to exercise and do it while listening to podcasts or audiobooks"},
        {"option": 4, "text" : "I try workouts and fitness classes that are interesting or trendy"}
      ]
  },
  {
      "question" : "What is the most important quality in a good friendship?",
      "choices" : [
        {"option": 1, "text" : "Keeping promises"},
        {"option": 2, "text" : "Listening to each other"},
        {"option": 3, "text" : "Learning things together"},
        {"option": 4, "text" : "Having fun"}
      ]
  },
  {
      "question" : "What kinds of clothes do you like to wear",
      "choices" : [
        {"option": 1, "text" : "Classic styles that show off my good taste"},
        {"option": 2, "text" : "Clothes that express my personality"},
        {"option": 3, "text" : "Whatever clothes are clean. I don't buy clothes I don't like to wear"},
        {"option": 4, "text" : "Comfortable clothes that are easy to move in"}
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
        }
      }
    }
    else {

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
  var picked = [];
  for (var i = 0; i < numChoices; i++) {
    picked[i] = i;
  }
  shuffle(picked);
  for (var i = 0; i < numChoices; i++) {
    choice = quiz[currentQuestion].choices[picked[i]].text;
    $('<li><input type="radio" value=' + quiz[currentQuestion].choices[picked[i]].option + ' name="dynradio" />' + choice + '</li>').appendTo(choiceDiv);
  }
}

function displayResults() {
  var results = [
    {type: "1", total: 0},
    {type: "2", total: 0},
    {type: "3", total: 0},
    {type: "4", total: 0}
  ]

  for (var i = 0; i < answers.length; i++) {
    if (answers[i] == "1") {
      results[0].total++;
    }
    else if (answers[i] == "2") {
      results[1].total++;
    }
    else if (answers[i] == "3") {
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

  if (type == "1") {
    $(document).find("#resultsHead").text("The Officer");
    $(document).find("#resultsDiv").text("You are The Officer! You value persistence, organization, and good judgment. You learn best by following clearly outlined procedures and committing to a study plan.");
  }
  else if (type == "2") {
    $(document).find("#resultsHead").text("The Communicator");
    $(document).find("#resultsDiv").text("You are The Communicator! You value relationships, compassion, and engaging conversation. You learn best by talking and writing about topics and collaborating with others.");
  }
  else if (type == "3") {
    $(document).find("#resultsHead").text("The Scientist");
    $(document).find("#resultsDiv").text("You are The Scientist! You value facts, fascination, and solving problems. You learn best by researching interesting ideas and testing yourself regularly.");
  }
  else {
    $(document).find("#resultsHead").text("The Adventurer");
    $(document).find("#resultsDiv").text("You are The Adventurer! You value excitement, intrigue, and new experiences. You learn best through hands-on projects and visualization.");
  }

  $(document).find("#subscribeMessage").text("Sign up to receive the Uncommon Learning Newsletter and we will send you your complete personality profile!");
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
