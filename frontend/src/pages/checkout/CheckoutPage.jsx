import React, { useState, useMemo } from 'react';
import { Table, Button, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const mockProducts = [
    { id: '1', name: 'Pala de Madera', brand: 'MarcaX', price: 68000, qty: 1 },
    { id: '2', name: 'Motosierra 20"', brand: 'MarcaY', price: 250000, qty: 1 },
];

const shippingOptions = [
    { id: 'standard', label: 'Estándar', cost: 15000, eta: '3-5 días' },
    { id: 'express', label: 'Express', cost: 35000, eta: '1-2 días' },
    { id: 'pickup', label: 'Recoger en Tienda', cost: 0, eta: 'Disponible mañana' },
];

const IVA_RATE = 0.19;

const CheckoutPage = () => {
    const [shipping, setShipping] = useState('standard');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    const subtotal = useMemo(() => mockProducts.reduce((total, item) => total + item.price * item.qty, 0), []);
    const shippingCost = shippingOptions.find(option => option.id === shipping)?.cost || 0;
    const iva = Math.round((subtotal + shippingCost) * IVA_RATE);
    const total = subtotal + shippingCost + iva - discount;

    const handleQtyChange = (id, qty) => {
        const product = mockProducts.find(p => p.id === id);
        if (product) {
            product.qty = qty;
        }
    };

    const applyCoupon = () => {
        // Aquí puedes agregar la lógica para validar el cupón
        if (coupon === 'DESCUENTO10') {
            setDiscount(0.1 * subtotal); // 10% de descuento
        } else {
            alert('Cupón inválido');
        }
    };

    const handlePayment = () => {
        // Lógica para procesar el pago
        alert('Pago procesado con éxito');
    };

    return (
        <div className="container mt-4">
            <h2>Pasarela de Pago</h2>

            {/* Sección de Orden */}
            <h3>Orden</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Precio Unitario</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {mockProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>${product.price}</td>
                            <td>
                                <Form.Control
                                    type="number"
                                    value={product.qty}
                                    min="1"
                                    onChange={(e) => handleQtyChange(product.id, parseInt(e.target.value))}
                                />
                            </td>
                            <td>${product.price * product.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Sección de Envío */}
            <h3>Opciones de Envío</h3>
            {shippingOptions.map(option => (
                <Form.Check
                    key={option.id}
                    type="radio"
                    label={`${option.label} - $${option.cost} (${option.eta})`}
                    name="shipping"
                    id={option.id}
                    checked={shipping === option.id}
                    onChange={() => setShipping(option.id)}
                />
            ))}

            {/* Sección de Información de Pago */}
            <h3>Información de Pago</h3>
            <Form>
                <Form.Group controlId="formCardName">
                    <Form.Label>Nombre del Titular</Form.Label>
                    <Form.Control type="text" placeholder="Nombre del Titular" required />
                </Form.Group>
                <Form.Group controlId="formCardNumber">
                    <Form.Label>Número de Tarjeta</Form.Label>
                    <Form.Control type="text" placeholder="Número de Tarjeta" required />
                </Form.Group>
                <Form.Group controlId="formCardExpiry">
                    <Form.Label>Fecha de Vencimiento</Form.Label>
                    <Form.Control type="text" placeholder="MM/AA" required />
                </Form.Group>
                <Form.Group controlId="formCardCVV">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control type="text" placeholder="CVV" required />
                </Form.Group>
            </Form>

            {/* Sección de Total a Pagar */}
            <Card className="mt-4">
                <Card.Body>
                    <h4>Total a Pagar</h4>
                    <p>Suma de la Orden: ${subtotal}</p>
                    <p>IVA: ${iva}</p>
                    <p>Costo de Envío: ${shippingCost}</p>
                    <p>Código Cupón: {coupon} (Descuento: ${discount})</p>
                    <h3>TOTAL: ${total}</h3>
                    <Form.Group controlId="formCoupon">
                        <Form.Label>Código Cupón</Form.Label>
                        <Form.Control
                            type="text"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                        />
                        <Button onClick={applyCoupon}>Aplicar</Button>
                    </Form.Group>
                    <Button variant="primary" onClick={handlePayment}>Ordenar</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CheckoutPage;