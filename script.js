$(document).ready(function () {

    var topics = ["Eric Cartman", "Stan Marsh", "Kyle Broflovski", "Kenny McCormick", "Butters Stotch",
        "Wendy Testaburger", "Bebe Stevens", "Craig Tucker", "Randy Marsh", "Sheila Broflovski"];

    //https://developers.giphy.com/docs/ | GET /v1/gifs/search
    const apiKey = "&api_key=d9OkXAN8QyxAaCPzIFjlHfNjxAKywCGy"

    function displayInfo() {
        $("#images").empty();
        var character = $(this).attr("data-name");
        //q: string | Explicit AND + OR boolean clauses in search queries are not supported.
        var api = "https://api.giphy.com/v1/gifs/search?q=" + character + apiKey;
        $.ajax({
            url: api,
            method: "GET"
        }).done(function (response) {
            console.log("URL= " + api);
            var results = response.data;
            for (var i = 0; i < 12; i++) {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var charImage = $("<img class='pause'>");
                charImage.attr({
                    src: results[i].images.fixed_height_still.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "still",
                });
                gifDiv.append(p);
                gifDiv.append(charImage);
                gifDiv.addClass("gifs");
                $("#images").prepend(gifDiv);
            }
            $(".pause").on("click", function () {
                var state = $(this).attr("data-state");
                if (state == "still") {
                    $(this).attr("src", $(this).data("animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).data("still"));
                    $(this).attr("data-state", "still");
                }
            })
        })
    }
    function renderButtons() {
        $("#topics").empty();
        $.each(topics, function (index, element) {
            var button = $("<button/>").addClass("character").attr("data-name", element).text(element);
            $("#topics").append(button);
        });
    };
    $("#submit").on("click", function () {
        var character = $("#newButton").val().trim();
        //Prevents user from making null string button
        if (character !== "") {
            topics.push(character);
            renderButtons();
        }
        console.log("character= " + character);
        $("#newButton").val("");
        return false;
    })
    $(document).on("click", ".character", displayInfo);
    renderButtons();
});