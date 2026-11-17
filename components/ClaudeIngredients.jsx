
import Footer from './Footer';

function ClaudeIngredients({ingredients, /*toggleRecipeShown*/ getRecipe}){
    return (
        <section>
            <h2>Ingredients on hand: </h2>
            <ul className='ingredients-list'>
                 {ingredients.map((i)=><li>{i}</li>)}
            </ul>
             {(ingredients.length > 3) && 
            //  <Footer getRecipe ={toggleRecipeShown} 
            // once AI set up to get recipes
             <Footer getRecipe={getRecipe}
             />} 
                        
        </section>
    )
}


export default ClaudeIngredients