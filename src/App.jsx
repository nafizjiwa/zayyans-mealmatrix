
import Header from "../components/Header";
import MainSec from '../components/MainSection';

function App() {

  return ( 
    <>
       
        <Header />
        {/* <div className="input-section">
            <input className="input-box" type="text" placeholder='e.g. oregano' />
            <button>+  Add Ingredient</button>
        </div> */}

        <MainSec />

         {/* <div className= 'ingredients-section'>
            <h2 className="ingredients-header">Ingredients on hand:</h2>
            <ul className="ingredients-list"> 
              <li>Chicken</li>
              <li>Most of the main spices</li>
              <li>Olive Oil</li>
              <li>Heavy cream</li>
              <li>Chicken broth</li>
              <li>Parmesan cheese</li>
              <li>Spinach</li>
            </ul>
         </div> */}

        
    </>
 
)
}

export default App
