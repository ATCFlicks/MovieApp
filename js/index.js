`use strict`;
// alert('js linked');
const url = `https://guttural-blushing-margin.glitch.me/movies`

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
// all movies --------------------------
AJAX(url)
.then(function (data){
    console.log(data);
})
// a single movie --------------------------
function getSingleMovie (movieId) {
    AJAX(`${url}/${movieId}`)
        .then(function (data){
            console.log("Single movie",data);
        })
}
getSingleMovie(18);
// post a movie -------------------------

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

// delete a movie -------------------------
function deleteMovie(movieId) {
    AJAX(getSingleMovie(20), method = 'DELETE')
        .then(function (data){
            console.log("Delete movie",data);
        })
}
deleteMovie(20);

// loading -------------------------------------
document.onreadystatechange = function() {
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