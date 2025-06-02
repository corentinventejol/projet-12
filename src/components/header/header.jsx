import './header.css';
import logo from '../../assets/logo.png';


const header = () => {
    return (
        <header className='header'>
            <div className='logo'>
                <img src={logo} alt="Logo" />
            </div>
            <ul className='nav'>
                <li>
                    <a href="/">Acceuil</a>
                </li>
                <li>
                    <a href="/">Profil</a>
                </li>
                <li>
                    <a href="/">Règlage</a>
                </li>
                <li>
                    <a href="/">Communauté</a>
                </li>
            </ul>
        </header>
    )
}

export default header;