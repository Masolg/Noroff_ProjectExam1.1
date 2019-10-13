
var search_button = document.getElementById("searchButton");
var search_bar = document.getElementById("ingredients")
search_button.addEventListener("click", function(){
    var ingredient = search_bar.value;
    window.location.href = "../html/recipes.html?q=" + ingredient;
});
