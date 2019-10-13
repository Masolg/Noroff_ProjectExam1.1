var queryString = location.search; // Use one of these. Dont know which is best
// var queryString = decodeURIComponent(window.location.search); // Seems this has less browser-support (https://caniuse.com/)
if (queryString != ""){
    var ingredient = queryString.substring(3);
    console.log(ingredient);
    findRecipes( ingredient=ingredient )
}

// findRecipes(
//     ingredient=ingredient,
//     diet_label="balanced",
//     health_labels=["peanut-free", "tree-nut-free"]
// )


function findRecipes(ingredient, diet_label=null, health_labels=null){
    var app_id = "bd9d399a";
    var app_key = "266fdd9b0f15247475e0fc73aca2667e";

    // var recipes_url ="https://api.edamam.com/search?q=${ingredient}&app_id=${app_id}&app_key=${app_key}";
    var recipes_url ="https://api.edamam.com/search?";
    recipes_url += `app_id=${app_id}`;
    recipes_url += `&app_key=${app_key}`;
    recipes_url +=`&q=${ingredient.toLowerCase()}`;
    if (diet_label != null){
        recipes_url += `&diet=${diet_label}`;
    }
    if (health_labels != null){
        for(var i = 0; i<health_labels.length; i++){
            recipes_url += `&health=${health_labels[i]}`;
        }
    }
    console.log(recipes_url);

    fetch(recipes_url)
    .then(function(result){
        return result.json();
    })
    .then(function(jsonObject){
        addRecipesToPage(jsonObject);
    })
    .catch(function(error){
        console.error(error);
    });
}


function addRecipesToPage(jsonObject){
    recipes_list = jsonObject.hits
    for (var i=0; i<recipes_list.length; i++){
        var recipe = recipes_list[i].recipe;
        var title = recipe.label;
        var img_url = recipe.image;
        var link = recipe.url;

        addHtmlToPage(title, link, img_url)
    }

}

function addHtmlToPage(title, link, img_url){
    recipesDiv = document.getElementById("recipe_container");
    recipesDiv.innerHTML += `
        <div class="recipe">
            <div class="recipe-left">
                <h4>${title}</h4>
                <p>Cool recipe</p>
                <a href="${link}">Link to recipe: <br>${link}</a>
            </div>
            <div class="recipe-right">
                <div class="recipe-image"> <img src="${img_url}" alt="Recipe image"> </div>
            </div>
        </div>
    `
}
