import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {
    return (
        <footer className="site-footer mt-5">
            <div className="container py-5">
                <div className="row align-items-start">
                    <div className="col-md-4 mb-4">
                        <div className="d-flex align-items-center mb-3 gap-3">
                            <svg width="110" height="28" viewBox="0 0 220 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <text x="0" y="40" fill="#fff" fontWeight="800" fontFamily="Inter, Arial, sans-serif" fontSize="32">AgroMarket</text>
                            </svg>
                        </div>
                        <p className="small text-muted">Trabajamos fuertemente para conectar al campo con los mejores precios, tecnología y servicios.</p>
                        <div className="d-flex gap-2 mt-3">
                            <a href="#" aria-label="facebook" className="social-circle">f</a>
                            <a href="#" aria-label="instagram" className="social-circle">i</a>
                            <a href="#" aria-label="linkedin" className="social-circle">in</a>
                            <a href="#" aria-label="twitter" className="social-circle">t</a>
                        </div>
                    </div>

                    <div className="col-md-2 mb-4">
                        <h6 className="footer-heading">Información</h6>
                        <ul className="list-unstyled small">
                            <li><Link to="/Productos" className="footer-link">Productos</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-3 mb-4">
                        <h6 className="footer-heading">Conoce Más</h6>
                        <ul className="list-unstyled small">
                            <li><a href="#" className="footer-link">Facebook</a></li>
                            <li><a href="#" className="footer-link">Twitter</a></li>
                            <li><a href="#" className="footer-link">Instagram</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3 mb-4 d-flex flex-column justify-content-between">
                        <div>
                            <h6 className="footer-heading">Contáctanos</h6>
                            <p className="small text-muted">Si tienes algún problema no dudes en contactarnos</p>
                        </div>
                        <div>
                            <button className="btn footer-contact">Contactar ›</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-footer-bottom py-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="text-white-50 small">2025 All Right Reserved by AgroMarket</div>
                    <div><Link to="#" className="footer-link small">Política de privacidad de datos</Link></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
