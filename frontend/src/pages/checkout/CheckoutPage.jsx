import React, { useState, useMemo } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

const mockProducts = [
    { id: '1', name: 'Pala de Madera', price: 68000, qty: 1 },
    { id: '2', name: 'Motosierra 20"', price: 250000, qty: 1 },
    { id: '3', name: 'Guadaña 1200W', price: 420000, qty: 1 },
];

const shippingOptions = [
    { id: 'standard', label: 'Estándar', cost: 15000 },
    { id: 'express', label: 'Express', cost: 35000 },
];

const IVA_RATE = 0.19;

const useCart = () => {
    const items = mockProducts;
    const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.qty, 0), [items]);
    return { items, subtotal };
};

const CheckoutPage = () => {
    const { items, subtotal } = useCart();
    const [shipping, setShipping] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [billingSameAsShipping, setBillingSameAsShipping] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Colombia',
        cardNumber: '',
        cardCVV: '',
        cardExpiry: '',
        cardName: '',
    });

    const shippingCost = shippingOptions.find(option => option.id === shipping)?.cost || 0;
    const iva = Math.round((subtotal + shippingCost) * IVA_RATE);
    const total = subtotal + shippingCost + iva;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = () => {
        alert('Pago simulado exitoso.');
    };

    return (
        <div className="container">
            <Row>
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            <h2>Contacto y Envío</h2>
                            <Form>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="text" placeholder="Teléfono" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formFullName">
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre Completo" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formAddress">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control type="text" placeholder="Dirección" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formCity">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control type="text" placeholder="Ciudad" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formPostalCode">
                                    <Form.Label>Código Postal</Form.Label>
                                    <Form.Control type="text" placeholder="Código Postal" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formCountry">
                                    <Form.Label>País</Form.Label>
                                    <Form.Control as="select" value={formData.country} onChange={handleChange}>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Chile">Chile</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Body>
                            <h2>Opciones de Envío</h2>
                            <Form>
                                {shippingOptions.map(option => (
                                    <Form.Check
                                        key={option.id}
                                        type="radio"
                                        label={`${option.label} - $${option.cost}`}
                                        value={option.id}
                                        checked={shipping === option.id}
                                        onChange={() => setShipping(option.id)}
                                    />
                                ))}
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Body>
                            <h2>Pago</h2>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Metodo de Pago</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Tarjeta de Crédito"
                                        value="creditCard"
                                        checked={paymentMethod === 'creditCard'}
                                        onChange={() => setPaymentMethod('creditCard')}
                                    />
                                    {paymentMethod === 'creditCard' && (
                                        <div>
                                            <Form.Group controlId="formCardNumber">
                                                <Form.Label>Número de Tarjeta</Form.Label>
                                                <Form.Control type="text" placeholder="Número de Tarjeta" onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group controlId="formCardCVV">
                                                <Form.Label>CVV</Form.Label>
                                                <Form.Control type="text" placeholder="CVV" onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group controlId="formCardExpiry">
                                                <Form.Label>Vencimiento (MM/AA)</Form.Label>
                                                <Form.Control type="text" placeholder="Vencimiento (MM/AA)" onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group controlId="formCardName">
                                                <Form.Label>Nombre en la Tarjeta</Form.Label>
                                                <Form.Control type="text" placeholder="Nombre en la Tarjeta" onChange={handleChange} />
                                            </Form.Group>
                                        </div>
                                    )}
                                    <Form.Check
                                        type="radio"
                                        label="PSE"
                                        value="pse"
                                        checked={paymentMethod === 'pse'}
                                        onChange={() => setPaymentMethod('pse')}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Efectivo"
                                        value="cash"
                                        checked={paymentMethod === 'cash'}
                                        onChange={() => setPaymentMethod('cash')}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        type="checkbox"
                                        label="Usar la misma dirección de envío para facturación."
                                        checked={billingSameAsShipping}
                                        onChange={() => setBillingSameAsShipping(!billingSameAsShipping)}
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <h2>Resumen del Pedido</h2>
                            <div>
                                <p>Subtotal: ${subtotal}</p>
                                <p>Envío: ${shippingCost}</p>
                                <p>IVA: ${iva}</p>
                                <p>Total: ${total}</p>
                            </div>
                            <Button onClick={handlePayment}>Pagar ${total}</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CheckoutPage;