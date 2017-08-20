
// Initial array of random things
var randomArr = ["fox", "cat", "the office", "tiger", "lion",
                 "nicolas cage", "sloth", "skunk", "morty", "party",
                 "goat", "horse", "cow", "happy birthday", "kangaroo",
                 "panda", "koala", "deer", "elephant", "parks and recreation", 
                 "squirrel"];



// renderButtons will display the buttons for all inputs within the array.
function renderButtons() {
  // Empty the buttons panel before redrawing it
  $("#buttonPanel").empty();

  // Loop through the array of things
  for (var i = 0; i < randomArr.length; i++) {
    // Dynamicaly generate a button for each input in the array
    var button = $("<button>");
    button.addClass("randomButton");
    button.attr("data-random", randomArr[i]);
    button.text(randomArr[i]);

    // Add the button to the HTML
    $("#buttonPanel").append(button);
  }
}

// ----- Event Handlers ----- //

// An event handler for the user form to add additional inputs to the array
$("#add-random").on("click", function(event) {
  event.preventDefault();

  // Get the input from the textbox
  var random = $("#random-input").val().trim();

  // the textbox is then added to our array
  randomArr.push(random);
  $("#random-input").val("");

  // Redraw the buttons
  renderButtons();
});

// fetch Gifs will fetch  Gifs with the Giphy API
function fetchRandomGifs() {
  // Get the name from the button clicked
  var randomName = $(this).attr("data-random");
  var randomStr = randomName.split(" ").join("+");

  // Construct the Giphy URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + randomStr + 
                 "&rating=pg-13&limit=20&api_key=ad48e09e44164e1db10e45eec517e375";

  // Make the AJAX call to the Giphy API
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    // Get the results array
    var dataArray = result.data;

    // Create and display div elements for each of the returned Gifs
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("randomGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      // Append the new Gifs to the gifPanel
      $("#gifPanel").append(newDiv);
    }
  });
}

// Gif will animate a still Gif and stop a moving Gif
function animateRandomGif() {
  // The image state will be either "still" or "animated"
  var state = $(this).find("img").attr("data-state");

  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// Render the initial input buttons when the HTML has finished loading
$(document).ready(function() {
  renderButtons();
});

// An event handler for the buttons to fetch appropriate Gifs
$(document).on("click", ".randomButton", fetchRandomGifs);

// Add an event handler for the Gifs to make the image animate and stop
$(document).on("click", ".randomGif", animateRandomGif);
