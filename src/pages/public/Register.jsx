import React from 'react';
import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

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

const validarRutChileno = (rutCompleto) => {
    const limpio = rutCompleto.replace(/[^0-9kK]/g, '').toUpperCase();
    if (!/^\d{7,8}[0-9K]$/.test(limpio)) return false;

    const cuerpo = limpio.slice(0, -1);
    const dvIngresado = limpio.slice(-1);

    let suma = 0; 
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) { 
        suma += cuerpo.charCodeAt(i) - 48 * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1; 
    }

    const resto = 11 - (suma % 11);
    const dvCalculado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);

    return dvIngresado === dvCalculado;
}

export const Register = ({ showToast }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '', 
        apellido: '',
        email: '', 
        rut: '',
        password: '',
        confirmPassword: '',
        region: '', 
        comuna: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'region') { 
            setFormData({ ...formData, region: value, comuna: '' }); 
        } else { 
            setFormData({ ...formData, [name]: value }); 
        }

        if (errors[name]) { 
            setErrors({ ...errors, [name]: '' }); 
        }
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        // 1. Nombre obligatorio
        if (!formData.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio.';
        }
        if (!formData.apellido.trim()) {
            nuevosErrores.apellido = 'El apellido es obligatorio.';
        }

        // 2. Correo electrónico válido
        if (!formData.email.trim()) {
            nuevosErrores.email = 'El correo electrónico es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            nuevosErrores.email = 'Ingrese un formato de correo válido (ej: usuario@gmail.cl).';
        }

        // Validación de RUN con algoritmo Módulo 11
        if (!formData.rut.trim()) { 
            nuevosErrores.rut = 'El RUN es obligatorio.'; 
        } else if (!validarRutChileno(formData.rut)) { 
            nuevosErrores.rut = 'RUN no válido o dígito verificador incorrecto (ej: 12345678K).'; 
        }

        // Contraseña (4-10 caracteres)
        if (!formData.password) { 
            nuevosErrores.password = 'La contraseña es obligatoria.'; 
        } else if (formData.password.length < 4 || formData.password.length > 10) { 
            nuevosErrores.password = 'Debe tener entre 4 y 10 caracteres.'; 
        }

        // Confirmación de Contraseña
        if (formData.password !== formData.confirmPassword) { 
            nuevosErrores.confirmPassword = 'Las contraseñas no coinciden.'; 
        }

        if (!formData.region) nuevosErrores.region = 'Seleccione una región.';
        if (!formData.comuna) nuevosErrores.comuna = 'Seleccione una comuna.';

        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            if (showToast) showToast('Por favor, corrige los errores en el formulario', 'error');
            return;
        }

        setEnviado(true);
        if (showToast) showToast('¡Cuenta creada exitosamente! Inicia sesión ahora.', 'success');
        navigate('/login');
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-7">
                    <div className="card shadow-sm border-0 bg-white p-4 p-md-5">
                        
                        <div className="text-center mb-4">
                            <h2 className="fw-extrabold text-dark">
                                Registro de Nuevo usuario
                            </h2>
                            <p className="text-muted small">
                                Crea tu cuenta para comprar y gestionar tus pedidos
                            </p>
                        </div>
                    
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="row g-3">

                                <div div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        Nombre (*) 
                                    </label>
                                    <input
                                        type="text" 
                                        name="nombre" 
                                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} 
                                        placeholder="Ej. Juan" 
                                        value={formData.nombre} 
                                        onChange={handleChange}
                                    />
                                    {errors.nombre && <div className="invalid-feedback fw-bold">{errors.nombre}</div>}
                                </div>

                                <div div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        Apellido (*) 
                                    </label>
                                    <input
                                        type="text" 
                                        name="apellido" 
                                        className={`form-control ${errors.apellido ? 'is-invalid' : ''}`} 
                                        placeholder="Ej. Pérez" 
                                        value={formData.apellido} 
                                        onChange={handleChange}
                                    />
                                    {errors.apellido && <div className="invalid-feedback fw-bold">{errors.apellido}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        Correo Electrónico (*) 
                                    </label>
                                    <input
                                        type="email" 
                                        name="email" 
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                        placeholder="ejemplo@gmail.cl" 
                                        value={formData.email} 
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="invalid-feedback fw-bold">{errors.email}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        RUT (*) 
                                    </label>
                                    <input
                                        type="text" 
                                        name="rut" 
                                        className={`form-control ${errors.rut ? 'is-invalid' : ''}`} 
                                        placeholder="12345678K (Sin puntos ni guión)" 
                                        value={formData.rut} 
                                        onChange={handleChange}
                                    />
                                    {errors.rut && <div className="invalid-feedback fw-bold">{errors.rut}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        Contraseña (*) 
                                    </label>
                                    <input
                                        type="password" 
                                        name="password" 
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                        placeholder="4 a 10 caracteres" 
                                        value={formData.password} 
                                        onChange={handleChange}
                                    />
                                    {errors.password && <div className="invalid-feedback fw-bold">{errors.password}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        Confirmar Contraseña (*) 
                                    </label>
                                    <input
                                        type="password" 
                                        name="confirmPassword" 
                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} 
                                        placeholder="Repite tu contraseña" 
                                        value={formData.confirmPassword} 
                                        onChange={handleChange}
                                    />
                                    {errors.confirmPassword && <div className="invalid-feedback fw-bold">{errors.confirmPassword}</div>}
                                </div>
                                
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        Región (*) 
                                    </label>
                                    <select
                                        name="region"
                                        className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                                        value={formData.region}
                                        onChange={handleChange}
                                    >
                                        <option value="">-- Seleccionar --</option>
                                        {Object.keys(REGIONES_COMUNAS).map((reg) => (
                                            <option key={reg} value="{reg}">{reg}</option>
                                        ))}
                                    </select>
                                    {errors.region && <div className="invalid-feedback fw-bold">{errors.region}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">
                                        Comuna (*) 
                                    </label>
                                    <select
                                        name="comuna"
                                        className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                                        value={formData.comuna}
                                        onChange={handleChange}
                                        disabled={!formData.region}
                                    >
                                        <option value="">-- Seleccionar --</option>
                                        {formData.region && REGIONES_COMUNAS[formData.region].map((com) => (
                                            <option key={com} value="{com}">{com}</option>
                                        ))}
                                    </select>
                                    {errors.comuna && <div className="invalid-feedback fw-bold">{errors.comuna}</div>}
                                </div>

                                <div className="col-12 pt-3">
                                    <button
                                        type="submit" 
                                        className="btn btn-warning btn-lg w-100 rounded-pill fw-bold text-dark shadow-sm hover-amber"
                                    >
                                        Registrar Cuenta
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="text-center border-top pt-3 mt-4">
                            <span className="text-muted small">¿Ya tienes una cuenta?</span>
                            <Link to="/login" className="fw-bold text-dark text-decoration-none small">
                                Inicia sesión aquí
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;