import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const REGIONES_COMUNAS = {
  'Región de Arica y Parinacota': [
    'Arica', 'Camarones', 'Putre', 'General Lagos'
  ],
  'Región de Tarapacá': [
    'Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane',
    'Huara', 'Pica'
  ],
  'Región de Antofagasta': [
    'Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama',
    'Ollagüe', 'San Pedro de Atacama', 'Tocopilla', 'María Elena'
  ],
  'Región de Atacama': [
    'Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro',
    'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco'
  ],
  'Región de Coquimbo': [
    'La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paihuano',
    'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca',
    'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado'
  ],
  'Región de Valparaíso': [
    'Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví',
    'Quintero', 'Viña del Mar', 'Isla de Pascua', 'Los Andes', 'Calle Larga',
    'Rinconada', 'San Esteban', 'La Ligua', 'Cabildo', 'Papudo',
    'Petorca', 'Zapallar', 'Quillota', 'Calera', 'Hijuelas',
    'La Cruz', 'Nogales', 'San Antonio', 'Algarrobo', 'El Quisco',
    'El Tabo', 'Santo Domingo', 'San Felipe', 'Catemu', 'Llaillay',
    'Panquehue', 'Putaendo', 'Santa María', 'Quilpué', 'Limache',
    'Olmué', 'Villa Alemana'
  ],
  'Región Metropolitana de Santiago': [
    'Santiago', 'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque',
    'Estación Central', 'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida',
    'La Granja', 'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea',
    'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa',
    'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura',
    'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín', 'San Miguel',
    'San Ramón', 'Vitacura', 'Puente Alto', 'Pirque', 'San José de Maipo',
    'Colina', 'Lampa', 'Tiltil', 'San Bernardo', 'Buin',
    'Calera de Tango', 'Paine', 'Melipilla', 'Alhué', 'Curacaví',
    'María Pinto', 'San Pedro', 'Talagante', 'El Monte', 'Isla de Maipo',
    'Padre Hurtado', 'Peñaflor'
  ],
  'Región del Libertador General Bernardo O\'Higgins': [
    'Rancagua', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue',
    'Graneros', 'Las Cabras', 'Machalí', 'Malloa', 'Mostazal',
    'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Rengo',
    'Requínoa', 'San Vicente', 'Pichilemu', 'La Estrella', 'Litueche',
    'Marchihue', 'Navidad', 'Paredones', 'San Fernando', 'Chépica',
    'Chimbarongo', 'Lolol', 'Nancagua', 'Palmilla', 'Peralillo',
    'Placilla', 'Pumanque', 'Santa Cruz'
  ],
  'Región del Maule': [
    'Talca', 'Constitución', 'Curepto', 'Empedrado', 'Maule',
    'Pelarco', 'Pencahue', 'Río Claro', 'San Clemente', 'San Rafael',
    'Cauquenes', 'Chanco', 'Pelluhue', 'Curicó', 'Hualañé',
    'Licantén', 'Molina', 'Rauco', 'Romeral', 'Sagrada Familia',
    'Teno', 'Vichuquén', 'Linares', 'Colbún', 'Longaví',
    'Parral', 'San Javier', 'Villa Alegre', 'Yerbas Buenas'
  ],
  'Región de Ñuble': [
    'Chillán', 'Bulnes', 'Chillán Viejo', 'El Carmen', 'Pemuco',
    'Pinto', 'Quillón', 'San Ignacio', 'Yungay', 'Quirihue',
    'Cobquecura', 'Coelemu', 'Ninhue', 'Portezuelo', 'Ranquil',
    'Treguaco', 'San Carlos', 'Coihueco', 'San Fabián', 'San Nicolás'
  ],
  'Región del Biobío': [
    'Concepción', 'Coronel', 'Chiguayante', 'Florida', 'San Pedro de la Paz',
    'Santa Juana', 'Talcahuano', 'Tomé', 'Hualpén', 'Hualqui',
    'Lota', 'Penco', 'Lebu', 'Arauco', 'Cañete',
    'Contulmo', 'Curanilahue', 'Los Álamos', 'Tirúa', 'Los Ángeles',
    'Antuco', 'Cabrero', 'Laja', 'Mulchén', 'Nacimiento',
    'Negrete', 'Quilaco', 'Quilleco', 'San Rosendo', 'Santa Bárbara',
    'Tucapel', 'Yumbel', 'Alto Biobío'
  ],
  'Región de La Araucanía': [
    'Temuco', 'Carahue', 'Cunco', 'Curarrehue', 'Freire',
    'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Melipeuco',
    'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón',
    'Saavedra', 'Teodoro Schmidt', 'Toltén', 'Vilcún', 'Villarrica',
    'Cholchol', 'Angol', 'Collipulli', 'Curacautín', 'Ercilla',
    'Lonquimay', 'Los Sauces', 'Lumacón', 'Purén', 'Renaico',
    'Traiguén', 'Victoria'
  ],
  'Región de Los Ríos': [
    'Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil',
    'Mariquina', 'Paillaco', 'Panguipulli', 'La Unión', 'Futrono',
    'Lago Ranco', 'Río Bueno'
  ],
  'Región de Los Lagos': [
    'Puerto Montt', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar',
    'Los Muermos', 'Llanquihue', 'Maullín', 'Puerto Varas', 'Castro',
    'Ancud', 'Chonchi', 'Curaco de Vélez', 'Dalcahue', 'Puqueldón',
    'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Osorno',
    'Puerto Octay', 'Purranque', 'Puyehue', 'Río Negro', 'San Juan de la Costa',
    'San Pablo', 'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena'
  ],
  'Región Aysén del General Carlos Ibáñez del Campo': [
    'Coyhaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas',
    'Cochrane', 'O\'Higgins', 'Tortel', 'Chile Chico', 'Río Ibáñez'
  ],
  'Región de Magallanes y de la Antártica Chilena': [
    'Punta Arenas', 'Laguna Blanca', 'Río Verde', 'San Gregorio', 'Cabo de Hornos',
    'Antártica', 'Porvenir', 'Primavera', 'Timaukel', 'Natales',
    'Torres del Paine'
  ]
};

export const Checkout = ({ showToast }) => {
    const { cart, getcart, clearCart } = useCart;
    const navigate = useNavigate();

    // Estado del formulario de Despacho y Pago
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        rut: '',
        telefono: '',
        region: '',
        comuna: '',
        direccion: '',
        depto: '',
        metodoPago: 'webpay',
        notas: ''
    });

    // Estado de errores de validación
    const [errors, setErrors] = useState({});

    const formatCLP = (amount) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

    // Cambio en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Si cambia la región, reiniciamos la comuna seleccionada
        if (name === 'region') {
            setFormData({ ...formData, region: value, comuna: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        // Limpiar error del campo modificado
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // Validaciones del Formulario de Despacho
    const validarFormulario = () => {
        const nuevosErrores = {};

        // Validación de nombre y apellido
        if(!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
        if(!formData.apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio.';

        // Validación de correo
        if (!formData.email.trim()) {
            nuevosErrores.email = 'El correo electrónico es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            nuevosErrores.email = 'El correo electrónico no es válido.';
        }

        // Validación de RUT
        if (!formData.rut.trim()) {
            nuevosErrores.rut = 'El RUT es obligatorio.';
        } else if (!/^[0-9]{7,8}[0-9kK]{1}$/.test(formData.rut.replace(/[\.\-]/g, ''))) {
            nuevosErrores.rut = 'RUT inválido (ej: 12345678K, sin puntos ni guión).';
        }

        if (!formData.telefono.trim()) nuevosErrores.telefono = 'El teléfono es obligatorio.';
        if (!formData.region) nuevosErrores.region = 'Seleccione una región.';
        if (!formData.comuna) nuevosErrores.comuna = 'Seleccione una comuna.';
        if (!formData.direccion.trim()) nuevosErrores.direccion = 'La dirección de entrega es obligatoria.';

        setErrors(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    };

    // Procesar Compra / Generar Orden
    const handleSubmitOrder = (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            if (showToast) {
                showToast('Por favor, corrige los errores en el formulario.', 'error');
            }
            return;
        }

        // Generar número de orden aleatorio (Ej: ORD-84920)
        const orderNum = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
        const orderData = {
            numeroOrden: orderNum,
            fecha: new Date().toLocaleDateString('es-CL'),
            cliente: `${formData.nombre} ${formData.apellido}`,
            email: formData.email,
            rut: formData.rut,
            despacho: `${formData.direccion}, ${formData.comuna}, ${formData.region}`,
            metodoPago: formData.metodoPago === 'webpay' ? 'Webpay Plus / Débito' : 'Transferencia Bancaria',
            items: [...cart],
            total: getCartTotal()
        };

        // Vaciar el carrito y redirigir a la vista de éxito con los datos de la orden
        clearCart();
        if (showToast) showToast(`¡Compra realizada con éxito! Número de orden: ${orderNum}`, 'success');

        navigate('/exito', { state: { order: orderData } });
    };

    // Si el carrito está vacío, redirigir al catálogo
    if (cart.length === 0) {
        return (
            <div className="container py-5 text-center">
                <div className="card shadow-sm p-5 border-0 max-w-600 mx-auto">
                <div className="fs-1 mb-2">🛍️</div>
                <h3 className="fw-bold">No hay productos para procesar el pago</h3>
                <p className="text-muted mb-4">Agrega algunos tomos de manga a tu carrito primero.</p>
                <Link to="/productos" className="btn btn-warning rounded-pill fw-bold px-4">
                    Ir al Catálogo
                </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h1 className="fw-extrabold text-dark mb-4">💳 Finalizar Compra (Checkout)</h1>

            <form onSubmit={handleSubmitOrder} novalidate>
                <div className="row g-4">
                
                    {/* Columna Izquierda: Formulario de Datos de Envío y Pago (7 cols) */}
                    <div className="col-12 col-lg-7">
                        
                        {/* 1. Datos Personales */}
                        <div className="card shadow-sm border-0 p-4 mb-4 bg-white">
                            <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">1. Datos del Comprador</h5>
                            
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Nombre (*)</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                        placeholder="Ej. Javiera"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                    />
                                    {errors.nombre && <div className="invalid-feedback fw-bold">{errors.nombre}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Apellido (*)</label>
                                    <input
                                        type="text"
                                        name="apellido"
                                        className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                                        placeholder="Ej. Contreras"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                    />
                                    {errors.apellido && <div className="invalid-feedback fw-bold">{errors.apellido}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Correo Electrónico (*)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder="ejemplo@duoc.cl"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="invalid-feedback fw-bold">{errors.email}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">RUT / RUN (*)</label>
                                    <input
                                        type="text"
                                        name="rut"
                                        className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
                                        placeholder="12345678K"
                                        value={formData.rut}
                                        onChange={handleChange}
                                    />
                                    {errors.rut && <div className="invalid-feedback fw-bold">{errors.rut}</div>}
                                </div>

                                <div className="col-md-12">
                                    <label className="form-label fw-semibold">Teléfono de Contacto (*)</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                                        placeholder="+56 9 1234 5678"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                    />
                                    {errors.telefono && <div className="invalid-feedback fw-bold">{errors.telefono}</div>}
                                </div>
                            </div>
                        </div>

                        {/* 2. Dirección de Despacho */}
                        <div className="card shadow-sm border-0 p-4 mb-4 bg-white">
                            <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">2. Dirección de Despacho</h5>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Región (*)</label>
                                    <select
                                        name="region"
                                        className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                                        value={formData.region}
                                        onChange={handleChange}
                                    >
                                        <option value="">-- Seleccionar Región --</option>
                                        {Object.keys(REGIONES_COMUNAS).map((reg) => (
                                        <option key={reg} value={reg}>{reg}</option>
                                        ))}
                                    </select>
                                    {errors.region && <div className="invalid-feedback fw-bold">{errors.region}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Comuna (*)</label>
                                    <select
                                        name="comuna"
                                        className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                                        value={formData.comuna}
                                        onChange={handleChange}
                                        disabled={!formData.region}
                                    >
                                        <option value="">-- Seleccionar Comuna --</option>
                                        {formData.region &&
                                        REGIONES_COMUNAS[formData.region].map((com) => (
                                            <option key={com} value={com}>{com}</option>
                                        ))}
                                    </select>
                                    {errors.comuna && <div className="invalid-feedback fw-bold">{errors.comuna}</div>}
                                </div>

                                <div className="col-md-8">
                                    <label className="form-label fw-semibold">Calle y Número (*)</label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                                        placeholder="Av. Providencia 1234"
                                        value={formData.direccion}
                                        onChange={handleChange}
                                    />
                                    {errors.direccion && <div className="invalid-feedback fw-bold">{errors.direccion}</div>}
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">Depto / Casa (Opcional)</label>
                                    <input
                                        type="text"
                                        name="depto"
                                        className="form-control"
                                        placeholder="Depto 502"
                                        value={formData.depto}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Método de Pago */}
                        <div className="card shadow-sm border-0 p-4 bg-white">
                            <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">3. Medio de Pago</h5>

                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="metodoPago"
                                    id="webpay"
                                    value="webpay"
                                    checked={formData.metodoPago === 'webpay'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label fw-semibold" htmlFor="webpay">
                                    💳 Webpay Plus (Redcompra / Tarjetas de Débito o Crédito)
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="metodoPago"
                                    id="transferencia"
                                    value="transferencia"
                                    checked={formData.metodoPago === 'transferencia'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label fw-semibold" htmlFor="transferencia">
                                    🏦 Transferencia Bancaria Directa
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* Columna Derecha: Resumen de la Orden (5 cols) */}
                    <div className="col-12 col-lg-5">
                        <div className="card shadow-sm border-0 p-4 sticky-top bg-white" style={{ top: '90px' }}>
                            <h4 className="fw-bold border-bottom pb-3 mb-3 text-dark">Detalle del Pedido</h4>

                            {/* Lista compacta de items */}
                            <div className="order-items-scroll mb-3" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                {cart.map((item) => (
                                <div key={item.id} className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                                    <div className="d-flex align-items-center gap-2">
                                        <img
                                            src={item.imagen || '[suspicious link removed]'}
                                            alt={item.nombre}
                                            style={{ width: '40px', height: '55px', objectFit: 'contain' }}
                                            className="rounded bg-light"
                                        />
                                        <div>
                                            <span className="fw-bold d-block text-truncate" style={{ maxWidth: '160px' }}>
                                                {item.nombre}
                                            </span>
                                            <small className="text-muted">Cant: {item.cantidad}</small>
                                        </div>
                                    </div>
                                    <span className="fw-semibold">{formatCLP(item.precio * item.cantidad)}</span>
                                </div>
                                ))}
                            </div>

                            {/* Totales */}
                            <div className="d-flex justify-content-between mb-2 text-muted">
                                <span>Subtotal:</span>
                                <span className="fw-semibold text-dark">{formatCLP(getCartTotal())}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 text-muted">
                                <span>Costo de Envío:</span>
                                <span className="text-success fw-bold">GRATIS</span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between mb-4 fs-4 fw-extrabold text-dark">
                                <span>Total a Pagar:</span>
                                <span className="text-warning bg-dark px-2 rounded">{formatCLP(getCartTotal())}</span>
                            </div>

                            {/* Botón Confirmar Compra */}
                            <button
                                type="submit"
                                className="btn btn-warning btn-lg w-100 rounded-pill fw-bold text-dark shadow-sm"
                            >
                                🔒 Pagar y Finalizar Orden
                            </button>

                            <small className="text-muted text-center d-block mt-3">
                                Transacción 100% segura y cifrada.
                            </small>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;