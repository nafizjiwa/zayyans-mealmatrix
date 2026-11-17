import { useState } from 'react';
import ClaudeRecipe from './ClaudeRecipe';
import ClaudeIngredients from './ClaudeIngredients';
import { getRecipeFromMistral } from '../src/ai';

function MainSection(){

    // const [state, setState] = useState(initialValue);
    // const [ ingredients, setIngredients ] = useState(
    //     ['all the main spices', 'pasta', 
    //     'ground beef', 'pasta sauce' ]
    // );
    // When we are done testing we us empty array. we didn't want to have keep entering indredient for every test so set
    // hard code as the indredients are entered and button to get recipe always shows.
    const [ ingredients, setIngredients ] = useState([]);

    const [recipeShown, setRecipeShown ] = useState(false);
    //we created a new state once the AI generates the recipe
    //and sends it back to us.
    const [ recipe, setRecipe ] =  useState('');

    //prevent form data default like refresh page
        // get form element from the currentTarget of the event 
        // Create form data
        // then get information from form data
        // formData.get("input element name value")
        // reset the formElement
    function handleSubmit(e){
        e.preventDefault();
        const formEl = e.currentTarget;
        const formData = new FormData(formEl);
        const newIngredient = formData.get('ingredient');
        formEl.reset();
        setIngredients((prev)=>[...prev, newIngredient]);
    }

    // if we use the form ACTION attribute we can pass a
    // function to it. The function will automatically receive
    // the formData and not the event because not waiting for a 
    // click anymore
    // onSubmit can be removed and the Action function will
    // perform the default so no need for e.preventDefault()
    // Since we have access to the formData object we don't need
    // to go and get it using formData = new Formdata(e.currentTarget)
    // Finally we don't need method 
    // action does reset automatically so no need for formel.reset()
    function addIngredient(formData){
        //from the formData object get the indgredient
        const newIngredient = formData.get('ingredient');
        setIngredients((prev)=>[...prev, newIngredient]);
    }

    // function toggleRecipeShown(){
    //    setRecipeShown(prevRecipeShown => !prevRecipeShown)
    // }
    //ONCE WE SET UP THE API TO GET A RECIPE FROM AI CHANGE FUNCTiON NAME as no more hardcoded recipe
    async function getRecipe(){
        console.log('Retrieving recipe');
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        console.log(recipeMarkdown);
        setRecipe(recipeMarkdown);
    }


    return(
        <main>
            <form 
            //   action="this attribute sends info to a php file
            //   and save to a data base"
              // listen to form event submit which
              // triggers a function
            //   onSubmit={handleSubmit}
            //   method="POST"
              className="add-ingredient-form"
              action={addIngredient}
              >
                <input 
                    type="text" 
                    aria-label="Add ingredient"
                    placeholder="e.g. oregano"
                    name="ingredient"
                />
                {/* LABEL INPUT PAIR EXAMPLE
                    <label htmlFor="email"></label>
                    <input id="email" type="email" 
                       name="email" 
                       placeholder="joe#schmoe.com"
                    /> 
                */}
                <button>Add ingredient</button>
            </form>  
            {(ingredients.length > 0) && 
            <ClaudeIngredients
             ingredients={ingredients}
            //  toggleRecipeShown={toggleRecipeShown}
            //once AI set up to get recipe once UI chooses
            // ingredients then change in ClaudeIngredients.jsx
            getRecipe={getRecipe}
             /> }
            
            {/* { recipeShown &&  <ClaudeRecipe /> } */}
            {/* once AI setup and new state created use new state */}
            { recipe && <ClaudeRecipe recipe={recipe}/>}

        </main>
    )
}


export default MainSection;

