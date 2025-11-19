import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
    return (
    <div style={{ textAlign: "center" }}>
        <h1>Bienvenido a la Página de Inicio</h1>
        <p>Esta es la página principal de la aplicación.</p>
                <div style={{display: 'flex', gap: 8, justifyContent: 'center'}}>
                <Link to="/Login">
                    <button>Ir a Login</button>
                </Link>
                <Link to="/Profile">
                    <button>Ir a Perfil</button>
                </Link>
                <Link to="/dashboard">
                    <button>Ir al Dashboard</button>
                </Link>
                </div>
    </div>
    )
}

export default Home