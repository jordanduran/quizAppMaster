const myQuestions = [
	{
	 'question':	'How many muscles do you have in total in all your fingers combined?',
	 'answers': ["None", "Ten", "Twenty-two","Twenty"],
	 'correct': 0
	},
	{
	 'question': 'Which of the following characters are rabbits?',
	 'answers': ["Easter Bunny", "Bugs Bunny", "Brer Rabbit", "None, they are hares"],
	 'correct':  3
	},
	{
	 'question': "How many toes does a two toed sloth have?",
	 'answers': ["Two", "Ten","Six or Eight", "None"],
	 'correct':  2
	},
	{
	'question': "How many man made artifacts on Earth can be seen from space?",
	'answers': ["Six on a clear day", "Thousands","None", "Only the Great Wall"],
	'correct':  1
	},
	{
	'question': "What was Billy the Kid's real first name?",
  'answers': ["William", "Bill", "Kidd" , "Henry"],
	'correct': 3
	},
	{
	 'question':	"What kind of animal is the longest in the world?",
	 'answers': ["Jellyfish", "Bill", "Worm", "Whale"],
	 'correct': 2
	},
	{
	 'question':"Why is a marathon race distance 26 miles and 385 yards?",
	 'answers': ["No one knows", "Completely by accident", "For the convenience of the British royal family", "It is the distance from Marathon, Greece, to Athens"],
	 'correct': 2
	},
	{
	 'question':"Which eye did Lord Nelson wear his eye-patch on?",
	 'answers': ["It depended on his mood", "He never wore an eye-patch", "His left", "His right"],
	 'correct':  1
	},
	{
	 'question':"Which of these species are the most murderous mammals?",
	 'answers': ["Chimpanzees", "Meerkats", "Dogs", "Elk"],
	 'correct': 1  
	},
	{
	 'question': "How many actors played Harry Potter in the Harry Potter movies?",
	 'answers': ["Two", "One", "Eight", "Five"],
	 'correct': 3
	}
	];

let score = 0;
let current = 0;

$(document).ready(function(){
  // Create an event listener to listen for a click on the Start Quiz button
  $(".start-button").click(function(){
     $('.start-quiz').hide();
     $('.next').hide();
     $('.questions').show();
     displayQuestion();
      $('.score').text('Current Score: '+score);
    console.log("Start Quiz button clicked");
  });
  
  // Create an event listener to listen for a click on the Next button
  $(".next-button").click(function(event){
    console.log("Next button clicked");
    displayQuestion();
    $('.next').hide();
    $('.submit').show();
  });
  
  $("ul.list").on("submit", ".submit-button", function(event){
    event.preventDefault();
    console.log("Form submitted");
    let userAnswer = $('input[name=answer]:checked', '.submit-button').val();
    console.log(userAnswer);
    if($('li.selected').length){
      var answer = $('li.selected').attr('id');
      checkAnswer(answer);
      $('.next').show();
      $('.submit').hide();
    } else {
      alert('Please select an answer');
    }
  });
  
  // Create an event listener to listen for a click on the Retake button and refresh the page
  $(".retake-button").click(function(){
  location.reload();
    console.log("Retake button clicked");
  });
  
  //Click listener when clicking on a list item to change the color of the background
  $('ul.list').on('click', 'li', function(event) {
    $('.selected').removeClass();
    $(this).addClass('selected');
  });
  
});

//***************FUNCTIONS**************
function displayQuestion(){
  $('.question-number').text('Question Number: '+(current + 1)+"/10" );
  if(current < myQuestions.length){
    var listQuestion = myQuestions[current];
    $('h2').text(listQuestion.question);
    $('ul.list').html('');
    $('ul.list').append('<form class="submit-button">')
    for (var i = 0; i < listQuestion.answers.length; i++) {
      $('ul.list').append('<div><label id = "'+i+'">'+listQuestion.answers[i] +`</label><input type="radio" name="answer" value="${listQuestion.answers[i]}" checked></div>`);
    }
    $('ul.list').append('<input type="submit" value="Check Answer"/>');

    $('ul.list').append('</form>')
  } else {
    // show summary that says how many you got correct
    displayScore();
  }
}

// Checks answer from the array to see if the one chosen is the one that is correct
function checkAnswer(answer){
  var listQuestion = myQuestions[current];
  if(listQuestion.correct == answer){
    score++;
    $('li.selected').addClass('correct');
  } else {
    $('li.selected').addClass('incorrect');
    $('listQuestion.correct').addClass('correct');
  }
  $('.score').text('Current Score: '+score);
  current++;
}

//Display score
function displayScore(){
  $('.questions').hide();
  $('.end-quiz').show();
  $('.end-score').text("Your score is: " +score + '/10');
  if(score >= 8){
    $('.comment').text('GREAT JOB!');
  }
}