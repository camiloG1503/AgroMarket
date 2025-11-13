import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
    return (
    <div style={{ textAlign: "center" }}>
        <h1>Bienvenido a la Página de Inicio</h1>
        <p>Esta es la página principal de la aplicación.</p>
        <Link to="/Login">
        <button>Ir a Login</button>
        </Link>
    </div>
    )
}

export default Home