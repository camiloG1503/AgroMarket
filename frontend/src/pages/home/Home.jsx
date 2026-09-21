import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
  return (
    <main className="am-home">
      <section className="am-hero">
        <div className="am-hero-copy">
          <span className="am-eyebrow">Mercado agrícola, más simple</span>
          <h1>Todo lo que tu campo necesita, en un solo lugar.</h1>
          <p>Conecta productos, pedidos y herramientas para tomar mejores decisiones y comprar con confianza.</p>
          <div className="am-hero-actions">
            <Link to="/Register" className="btn btn-success btn-lg">Crear cuenta</Link>
            <Link to="/Login" className="btn btn-outline-success btn-lg">Iniciar sesión</Link>
          </div>
        </div>
        <div className="am-hero-art" aria-hidden="true"><span>Agro<br />Market</span></div>
      </section>
      <section className="am-feature-grid" aria-label="Beneficios">
        <article><strong>Compra segura</strong><span>Autenticación y pedidos bajo tu control.</span></article>
        <article><strong>Catálogo conectado</strong><span>Encuentra productos y gestiona tus favoritos.</span></article>
        <article><strong>Seguimiento claro</strong><span>Consulta carrito, compras y estados.</span></article>
      </section>
    </main>
  )
}

export default Home
