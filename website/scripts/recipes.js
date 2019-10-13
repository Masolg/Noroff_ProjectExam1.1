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
        showNoResult();
    });
}


function addRecipesToPage(jsonObject){
    console.log(jsonObject);
    var recipes_list = jsonObject.hits;
    for (var i=0; i<recipes_list.length; i++){
        var recipe = recipes_list[i].recipe;
        var title = recipe.label;
        var img_url = recipe.image;
        var link = recipe.url;
        if(recipe.totalTime==0){
            var time = "Not defined"
        }
        else{
            var time = recipe.totalTime + " minutes";
        }
        addHtmlToPage(title, link, img_url, time);
    }
}

function showNoResult(){
    var recipesDiv = document.getElementById("recipe_container");
    recipesDiv.innerHTML = `<h2>No results found</h2>`;
}

// var menu = pmgroot.getElementsByTagName("ul")[0];
// var aEl  = document.createElement("a");
// aEl.innerHTML = "Hello";
// aEl.id = "123";
// menu.appendChild(aEl);


function addHtmlToPage(title, link, img_url, time){
    var recipesDiv = document.getElementById("recipe_container");

    recipesDiv.innerHTML += `
        <div class="recipe">
            <div class="recipe-text">
                <h4>${title}</h4>
                <p> Total Time: ${time} </p>
                <a href="${link}"> Link to recipe</a>
            </div>
            <div class="recipe-image">
                <img src="${img_url}" alt="Recipe image">
            </div>
        </div>
    `;
}


// ##### Main execution of program ##### //

var queryString = location.search; // Use one of these. Dont know which is best
// var queryString = decodeURIComponent(window.location.search); // Seems this has less browser-support (https://caniuse.com/)
var search_bar = document.getElementById("ingredients");

if (queryString != ""){
    var ingredient = queryString.substring(3);
    search_bar.value = ingredient;
    findRecipes( ingredient=ingredient );
}

var search_button = document.getElementById("searchButton");

var search_diets = document.getElementsByName("diet");
var search_health = document.getElementsByName("health");

search_button.addEventListener("click", function(){
    var recipesDiv = document.getElementById("recipe_container");
    recipesDiv.innerHTML = "";

    var ingredient = search_bar.value;

    var diet_label = null;
    for(var i=0; i<search_diets.length; i++){
        if(search_diets[i].checked==true){
            diet_label = search_diets[i].value;
            break;
        }
    }

    var counter = 0;
    var health_labels = [];
    for(var i=0; i<search_health.length; i++){
        if(search_health[i].checked==true){
            health_labels[counter] = search_health[i].value;
            counter++;
        }
    }
    if (health_labels.length==0){
        health_labels = null;
    }
    console.log(diet_label);
    console.log(health_labels);

    findRecipes(
        ingredient=ingredient,
        diet_label=diet_label,
        health_labels=health_labels);
});





var subscribeButton = document.getElementById("sign_up_btn");

subscribeButton.addEventListener("click", function(event){
  var emailField = document.getElementById("newsletter_email").value;

  var emailValidated = false;

  if(emailField === ""){
    document.getElementById("news_error").style.display = "block";
    document.getElementById("news_success").style.display = "none";
  }
  else{
    document.getElementById("news_error").style.display = "none";
    document.getElementById("news_success").style.display = "block";
  }

  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9._-]{2,24}$/;
  var emailTest = emailPattern.test(emailField);
  if(emailTest === false){
    document.getElementById("news_error").style.display = "block";
    document.getElementById("news_success").style.display = "none";
  }
  else{
    document.getElementById("news_error").style.display = "none";
    document.getElementById("news_success").style.display = "block";
    // var emailValidated = true;
  }

  // if (emailValidated){
  // }

});
