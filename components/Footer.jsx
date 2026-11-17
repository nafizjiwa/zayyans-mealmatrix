
// I am testing if this commits
function Footer({getRecipe}){
    
    return (
        <div className="footer-box">
            <div className='footer-section1'>
                <h3>Ready for a recipe?</h3>
                <p>Gernerate a recipe from your list of ingredients</p>
            </div>
            
            <div className="footer-section2">
                <button onClick={getRecipe} >Get a recipe</button>
            </div>
        </div>
    )
}


export default Footer;
