import React, { useState } from 'react'

export default function ContactModal({ open, onClose }) {
    const [form, setForm] = useState({ nombre: '', apellido: '', correo: '', mensaje: '' })
    if (!open) return null
    const change = e => setForm({ ...form, [e.target.name]: e.target.value })
    const submit = e => { e.preventDefault(); console.log('Contacto:', form); onClose() }

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contáctanos</h3>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Nombre</label>
                            <input name="nombre" value={form.nombre} onChange={change} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none" placeholder="Ingrese su nombre" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Apellido</label>
                            <input name="apellido" value={form.apellido} onChange={change} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none" placeholder="Ingrese su apellido" required />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input type="email" name="correo" value={form.correo} onChange={change} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none" placeholder="Ingrese su correo" required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Mensaje</label>
                        <textarea name="mensaje" rows={4} value={form.mensaje} onChange={change} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none" placeholder="Ingrese su mensaje" required />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">Cancelar</button>
                        <button type="submit" className="px-5 py-2 rounded-lg bg-green-700 text-white font-semibold">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}