`use strict`
// alert('js linked');


    const url = `https://guttural-blushing-margin.glitch.me/movies`


// AJAX function for a GET
    function AJAX(url, method = "GET", data) {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        return fetch(url, options)
            .then(res => res.json())
            .then(responseData => responseData)
            .catch(err => err)
    }

// GET all movies
    AJAX(url)
        .then(function (data) {
            console.log(data);
        })

// GET single movie
    function getSingleMovie(movieId) {
        AJAX(`${url}/${movieId}`)
            .then(function (data) {
                console.log("Single movie", data);
            })
    }

// getSingleMovie(18);

// post a movie

//  AJAX(url, method = "POST").then(function (){
//      const reviewObj = {
//          title: 'once upon a time in hollywood',
//          rating: 5,
//          poster: `<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">`,
//          year: "This is a really good place for coding and eating",
//          actors: "Josh Hartnett, Ewan McGregor, Tom Sizemore, Eric Bana",
//          director: "Ridley Scott",
//          genre: "Drama, History, War",
//          plot: ''
//      };
//      const options = {
//          method: method,
//          headers: {
//              'Content-Type': 'application/json',
//          },
//          body: JSON.stringify(reviewObj),
//      };
//      return fetch(url, options)
//          .then(res => res.json())
//          .then(responseData => responseData)
//          .catch(err => err)
//  })

// delete a movie
    function deleteMovie(movieId) {
        fetch(url + "/" + movieId, {method: "DELETE"})
            .then(function (data) {
                console.log("Delete movie", data);
            })
    }


    // deleteMovie(5);


    // patch movie
    function patchMovie(movieId) {
        fetch(url + "/" + movieId, {
            method: "PATCH",
            body: JSON.stringify({
                year: 2021,

            })
        })
    }

     // patchMovie(5)

// const theDeleteBtn = `<button type="button" class="deleteBtn" id="${movie.id}">Delete</button>`

    function renderMovieCards() {
        $("#loadingArea").css("visibility", "visible");
        $("#movieCards").html("")
        AJAX(url).then(function (data) {
            data.forEach(function (movie) {
                let html = ""
                html += `<div class="col-4">`
                html += `<div class="card" style="width: 20rem;">`
                html += "<img src='" + movie.poster + "'> <br/>"
                html += `<button type="button" class="deleteBtn" id="${movie.id}">Delete</button>`
                html += "<div class=\"card-body\">"
                html += "<h1>" + movie.title.toLowerCase() + "</h1>"
                html += "<h3>(" + movie.year + ")</h3> <br/>"
                html += "<h3> Rating: " + movie.rating + "/5</h3> <br/>"
                html += "<hr>"
                html += "<p>" + movie.plot + "</p>"
                html += "</div>"
                html += "</div>"
                html += "</div>"
                $("#movieCards").append(html)
                $("#loadingArea").css("visibility", "hidden");

            })
        })
        editMovies();
    }


    function editMovies() {

    AJAX(url).then(function (data) {
        let formHTML =`<select name="editableMovies">`
        data.forEach(function (movie) {
            formHTML += `<option value="${movie.id}">${movie.title}</option>`
        })
        formHTML += `</select>`
        $("#moviesToEdit").html(formHTML)
    })
    }

    editMovies()

    function addMovie() {
        let newMovie = {}
        newMovie.title = $("#movieTitle").val()
        newMovie.rating = $("#movieRating").val()
        newMovie.poster = $("#moviePoster").val()
        newMovie.plot = $("#moviePlot").val()
        newMovie.year = $("#movieYear").val()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        };
        fetch(url, options).then(renderMovieCards);
    }

    renderMovieCards()


    $("#refreshDB").click(renderMovieCards)
    $("#submissionBtn").click(addMovie)
    $("#submissionBtn").click(function () {
        this.form.reset();
    })
$(document).on('click','.deleteBtn',function(){
    let selectedId = this.id
    alert("You have deleted this movie.")
    deleteMovie(selectedId)
    console.log(selectedId);
    setTimeout(renderMovieCards, 2000);
});


    // $(".deleteBtn").click(function (event) {
    //     event.preventDefault();
    //
    //     //
    //     //
    //     // renderMovieCards();
    // })


// loading -------------------------------------
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.visibility = "hidden";
        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "body").style.visibility = "visible";
    }
};