var apiKey = "Ux0jqF5W1E5OscTjoh7SNXDjkppBAIAm";
var topics = ["cats", "dogs", "birds", "fish", "horses", "seals"];

//Function for setting search term, performing AJAX call and populating gifs
function callGifs() {
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+apiKey+"&q="+searchTerm+"&limit=10&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (var i=0; i<response.data.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.attr("class", "added-gif-div");
            $(gifDiv).append("<p> Rating: "+response.data[i].rating.toUpperCase()+"</p>");
            var gif = $("<img>");
            gif.attr("src", response.data[i].images.fixed_height.url);
            gif.attr("class", "added-gif");
            $(gifDiv).append(gif);
            $("#gif-space").append(gifDiv);
        }
    });
};

//Function for populating top area with the buttons
function populateButtons() {
    $("#button-panel").html("");
    for (var i=0; i<topics.length; i++) {
        topicBtn = $("<button>");
        topicBtn.addClass("topic-button");
        topicBtn.attr("animal", topics[i]);
        topicBtn.text(topics[i]);
        $("#button-panel").append(topicBtn);
    }
    //Start button click event listener
    $("button").on("click", function() {
        event.preventDefault();
        console.log($(this).attr("animal").trim());
        searchTerm = $(this).attr("animal").trim();
        callGifs();
    });

};

//Function for adding a new button
function newButton() {
        var newTopic = $("#search-box").val().trim();
        topics.push(newTopic);
        populateButtons();
};

//Document ready to stage all functions
$(document).ready(function() {
    populateButtons();
    $("#submit-button").on("click", function() {
        event.preventDefault();
        newButton();
    });
});