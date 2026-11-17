
import chefLogo from '../src/assets/chef.png';



function Header(){
    return (
        <div className="header-section">
            <img src={chefLogo}      alt="chef-icon" 
            className="header-icon"
            />
            <h1 className='header-title'>Zayyan's Ingredients To Recipe</h1>
            {/* <h1 className='header-title'>To Plate</h1> */}

        </div>
    );
}

export default Header;