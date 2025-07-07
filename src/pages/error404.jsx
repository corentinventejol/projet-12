import { Link } from 'react-router-dom'
import '../app.css'

function Error404() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Page non trouvée</h2>
        <p className="error-text">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="error-button">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}

export default Error404