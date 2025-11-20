import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import ContactModal from './ContactModal'

const Footer = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white mt-12">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Grid principal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        
                        {/* Columna 1: About */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-green-800 font-extrabold text-lg">A</span>
                                </div>
                                <h3 className="text-2xl font-extrabold">AgroMarket</h3>
                            </div>
                            <p className="text-green-100 text-sm leading-relaxed">
                                Trabajamos fuertemente para conectar al campo con los mejores precios, tecnología y servicios.
                            </p>
                            <div className="flex gap-3 pt-2">
                                <a 
                                    href="https://facebook.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-green-700 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a 
                                    href="https://instagram.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-green-700 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a 
                                    href="https://linkedin.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-green-700 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a 
                                    href="https://twitter.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-green-700 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Columna 2: Información */}
                        <div>
                            <h4 className="text-lg font-bold mb-4 border-b-2 border-green-600 pb-2 inline-block">Información</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link 
                                        to="/productos" 
                                        className="text-green-100 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-green-400 rounded-full group-hover:w-2 transition-all"></span>
                                        Productos
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/productos" 
                                        className="text-green-100 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-green-400 rounded-full group-hover:w-2 transition-all"></span>
                                        Mi Pedido
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Columna 3: Conoce Más */}
                        <div>
                            <h4 className="text-lg font-bold mb-4 border-b-2 border-green-600 pb-2 inline-block">Conoce Más</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a 
                                        href="https://facebook.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-green-100 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-green-400 rounded-full group-hover:w-2 transition-all"></span>
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="https://twitter.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-green-100 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-green-400 rounded-full group-hover:w-2 transition-all"></span>
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="https://instagram.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-green-100 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-green-400 rounded-full group-hover:w-2 transition-all"></span>
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Columna 4: Contáctanos */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold border-b-2 border-green-600 pb-2 inline-block">Contáctanos</h4>
                            <p className="text-green-100 text-sm leading-relaxed">
                                Si tienes algún problema no dudes en contactarnos
                            </p>
                            <button 
                                onClick={() => setOpen(true)}
                                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                Contactar →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-green-700 bg-green-950/50">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                            <p className="text-green-200">
                                © 2025 All Right Reserved by AgroMarket
                            </p>
                            <Link 
                                to="/privacidad" 
                                className="text-green-200 hover:text-white transition-colors underline underline-offset-4"
                            >
                                Política de privacidad de datos
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
            <ContactModal open={open} onClose={() => setOpen(false)} />
        </>
    )
}

export default Footer