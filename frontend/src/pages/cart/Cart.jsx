import React, { useMemo, useState } from 'react'

const initialItems = [
    { id: 'pala', name: 'Pala de Madera', price: 68000, qty: 1, img: 'https://placehold.co/64x64/065f46/FFFFFF?text=P' },
    { id: 'motos', name: 'Motosierra 20"', price: 250000, qty: 1, img: 'https://placehold.co/64x64/047857/FFFFFF?text=M' },
]

const shippingOptions = [
    { id: 'std', label: 'Servicio Estándar', cost: 15000, eta: '3-5 días' },
    { id: 'fast', label: 'Envío Rápido', cost: 23000, eta: '1-2 días' },
    { id: 'eco', label: 'Económico', cost: 9000, eta: '5-7 días' },
    { id: 'pickup', label: 'Recoger en Tienda', cost: 0, eta: 'Disponible mañana' },
]

const IVA_RATE = 0.19

function Cart() {
    const [items, setItems] = useState(initialItems)
    const [shipping, setShipping] = useState('std')
    const [coupon, setCoupon] = useState('')
    const [applied, setApplied] = useState(null)

    const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items])
    const iva = useMemo(() => Math.round(subtotal * IVA_RATE), [subtotal])
    const shippingCost = useMemo(() => shippingOptions.find(o => o.id === shipping)?.cost || 0, [shipping])
    const discount = applied?.amount || 0
    const total = Math.max(0, subtotal + iva + shippingCost - discount)
    const format = v => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v)

    const updateQty = (id, q) =>
        setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, q) } : i))

    const applyCoupon = () => {
        const code = coupon.trim().toUpperCase()
        const map = { CUPON10: 10000, AGRO5: 5000 }
        setApplied(map[code] ? { code, amount: map[code] } : null)
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Pasarela de Pago</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <section className="bg-white rounded-xl border p-6">
                        <h2 className="font-semibold mb-4">Opciones de Envío</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {shippingOptions.map(o => (
                                <label key={o.id} className={`border rounded-lg p-4 flex gap-3 cursor-pointer ${shipping === o.id ? 'border-green-600 ring-1 ring-green-300' : 'border-gray-200'}`}>
                                    <input
                                        type="radio"
                                        name="ship"
                                        className="mt-1 accent-green-600"
                                        checked={shipping === o.id}
                                        onChange={() => setShipping(o.id)}
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{o.label}</p>
                                        <p className="text-xs text-gray-500">Entrega: {o.eta}</p>
                                    </div>
                                    <p className={`text-sm font-semibold ${o.cost === 0 ? 'text-green-700' : ''}`}>
                                        {o.cost === 0 ? 'GRATIS' : format(o.cost)}
                                    </p>
                                </label>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-xl border p-6">
                        <h2 className="font-semibold mb-4">Información de Pago</h2>
                        <form className="grid gap-4">
                            <div>
                                <label className="text-sm font-medium">Nombre del Titular</label>
                                <input className="w-full border rounded-lg px-3 py-2" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Número de Tarjeta</label>
                                <input className="w-full border rounded-lg px-3 py-2" required pattern="[0-9\\s]{13,19}" />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-sm font-medium">Vencimiento</label>
                                    <input className="w-full border rounded-lg px-3 py-2" required placeholder="MM/AA" pattern="(0[1-9]|1[0-2])\\/\\d{2}" />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium">CVV</label>
                                    <input className="w-full border rounded-lg px-3 py-2" required pattern="\\d{3,4}" maxLength={4} />
                                </div>
                            </div>
                        </form>
                    </section>
                </div>

                <aside className="space-y-6">
                    <section className="bg-white rounded-xl border">
                        <h2 className="font-semibold p-6 pb-0">Orden</h2>
                        <ul className="p-6 space-y-4">
                            {items.map(i => (
                                <li key={i.id} className="flex items-center gap-3">
                                    <img src={i.img} alt={i.name} className="w-14 h-14 rounded border object-cover" />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold">{i.name}</p>
                                        <p className="text-xs text-gray-500">{format(i.price)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => updateQty(i.id, i.qty - 1)} className="px-2 py-1 border rounded">-</button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={i.qty}
                                            onChange={e => updateQty(i.id, parseInt(e.target.value || '1', 10))}
                                            className="w-14 border rounded text-center py-1"
                                        />
                                        <button onClick={() => updateQty(i.id, i.qty + 1)} className="px-2 py-1 border rounded">+</button>
                                    </div>
                                    <p className="w-20 text-right text-sm font-semibold">{format(i.price * i.qty)}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-white rounded-xl border p-6 space-y-4">
                        <h2 className="font-semibold">Total a Pagar</h2>
                        <div className="flex gap-2">
                            <input
                                value={coupon}
                                onChange={e => setCoupon(e.target.value)}
                                placeholder="Código cupón"
                                className="flex-1 border rounded-lg px-3 py-2"
                            />
                            <button
                                onClick={applyCoupon}
                                type="button"
                                className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold"
                            >
                                Aplicar
                            </button>
                        </div>
                        {applied && (
                            <p className="text-xs text-green-700">Cupón {applied.code} (-{format(applied.amount)})</p>
                        )}
                        <div className="text-sm space-y-1">
                            <div className="flex justify-between"><span>Suma de la Orden</span><span>{format(subtotal)}</span></div>
                            <div className="flex justify-between"><span>IVA (19%)</span><span>{format(iva)}</span></div>
                            <div className="flex justify-between"><span>Envío</span><span>{format(shippingCost)}</span></div>
                            <div className="flex justify-between"><span>Descuento</span><span className="text-red-600">- {format(discount)}</span></div>
                            <hr />
                            <div className="flex justify-between font-extrabold text-base">
                                <span>TOTAL</span><span>{format(total)}</span>
                            </div>
                        </div>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm">
                            Ordenar
                        </button>
                    </section>
                </aside>
            </div>
        </div>
    )
}

export default Cart