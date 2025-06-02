import './sideBar.css'
import logo1 from '../../assets/img_sidebar1.png'
import logo2 from '../../assets/img_sidebar2.png'
import logo3 from '../../assets/img_sidebar3.png'
import logo4 from '../../assets/img_sidebar4.png'

const SideBar = () => {
    return (
        <header className='sideBar'>
            <ul className='sideNav'>
                <li>
                    <img src={logo1} alt="logo" />
                </li>
                <li>
                    <img src={logo2} alt="logo 2" />
                </li>
                <li>
                    <img src={logo3} alt="logo 3" />
                </li>
                <li>
                    <img src={logo4} alt="logo 4" />
                </li>
            </ul>
            <p className='copyright'>Copiryght, SportSee 2020</p>
        </header>
    )
}

export default SideBar;