let recipeBox = document.querySelector('#recipeBox');
let submit = document.querySelector('#submit');
let search = document.getElementById("search");
let logo = document.getElementById('logo');

//requesting data from API and building a framework
function api(event) { 
    let search = document.getElementById("search").value;
    let word = search;
    //relay search to API
    axios.get('api/'+word).then((response)=>{
        console.log(search);
        console.log(response.data);                
        
        // reset contents of apod container
        recipeBox.innerHTML = ""; 
        document.getElementById("recipes").style.display="none";
        document.getElementById("default").style.display="none";
        document.querySelector('footer').style.display = 'block';
        document.getElementById("recipeBox").style.display="flex";
        
        //for all the results, display the image and title in a flexbox
            for (let i=0; i < response.data.results.length; i++) {
                //create a div to hold both image and title
                let parentDiv = document.createElement('div');
                parentDiv.className='parent';
                let img = document.createElement('img');
                img.src = response.data.results[i].image;
                parentDiv.appendChild(img);

                let name = document.createElement("p");
                name.appendChild(document.createTextNode(response.data.results[i].title));
                parentDiv.appendChild(name);
                recipeBox.appendChild(parentDiv);
                
                //fetch data for selected recipe
                img.addEventListener('click', (event)=>{ 
                    console.log(response.data.results[i]);
                    //declare variables
                    let recipeId = response.data.results[i].id;
                    let instructions = response.data.results[i].analyzedInstructions[0].steps;

                    //reset contents
                    ol.innerHTML = "";
                    recipeImg.innerHTML = "";
                    ingredientList.innerHTML = "";
                    
                    //display selected image and title
                    //code from https://sebhastian.com/javascript-change-text-on-page/
                    document.getElementById("name").textContent = response.data.results[i].title;
                    recipeImg.appendChild(img);

                    //create an ordered list out of the instructions
                    for (let i=0; i < instructions.length; i++) {                       
                        var li = document.createElement('li');
                        li.appendChild(document.createTextNode(instructions[i].step));
                        document.querySelector('ol').appendChild(li);
                    }

                    //Use axios to make a request for the ingredients based on the selected recipe's ID
                    axios.get('ingredients/'+recipeId).then((response)=>{
                        console.log(response.data.ingredients);
                        let ingredients = response.data.ingredients;

                        //for all the ingredients, display the image and title in a flexbox
                        for (let i=0; i < ingredients.length; i++) {
                            let ingredientDiv = document.createElement('div');
                            ingredientDiv.className='ingredientDiv';
                            let ingredientImg = document.createElement('img');
                            ingredientImg.src = 'https://spoonacular.com/cdn/ingredients_100x100/'+ingredients[i].image;
                            ingredientDiv.appendChild(ingredientImg);

                            let ingredientName = document.createElement("p");
                            ingredientName.appendChild(document.createTextNode(ingredients[i].name));
                            ingredientDiv.appendChild(ingredientName);
                            ingredientList.appendChild(ingredientDiv);
                        }

                        //display requested page
                        document.getElementById("recipes").style.display="grid";
                        document.getElementById("recipeBox").style.display="none";
                        document.querySelector('footer').style.display = 'block';

                    }).catch((error)=>{
                        console.log(error);
                    })

                })
            }
            
    }).catch((error)=>{
        console.log(error);
    })
}

//search using button
submit.addEventListener('click', api);

//search using enter key
//code from https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
search.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submit").click();
    }
  });

  //return to home page when the logo is clicked
  logo.addEventListener('click', ()=>{ 
    document.getElementById("recipes").style.display="none";
    document.getElementById("default").style.display="block";
    document.getElementById("recipeBox").style.display="none";
    document.querySelector('footer').style.display = 'none';
  })
 
