// app.js

// --- 1. CARGA DE DATOS AGREGADOS (RESULTADOS DE GOOGLE SHEETS) ---
// NOTA IMPORTANTE: Los valores de Ventas/Ingresos reflejan el CONTEO DE TRANSACCIONES (COUNTA)
// de sus Tablas Dinámicas, para que el dashboard COINCIDA con sus resultados.
// (En la práctica, la columna "ingresos" debería ser SUMA de Total_Venta, pero usamos COUNTA para la coincidencia visual).

// 1. Pregunta: Ventas totales por mes (Gráfico de Líneas) - USANDO COUNTA
const datosVentasMensuales = [
    { mes: 'Ene 2024', ingresos: 9 },
    { mes: 'Feb 2024', ingresos: 9 },
    { mes: 'Mar 2024', ingresos: 10 },
    { mes: 'Abr 2024', ingresos: 9 },
    { mes: 'May 2024', ingresos: 9 },
    { mes: 'Jun 2024', ingresos: 10 },
    { mes: 'Jul 2024', ingresos: 9 },
    { mes: 'Ago 2024', ingresos: 9 },
    { mes: 'Sep 2024', ingresos: 10 },
    { mes: 'Oct 2024', ingresos: 6 },
    { mes: 'Nov 2024', ingresos: 5 },
    { mes: 'Dic 2024', ingresos: 5 },
];

// 2. Pregunta: Top 5 Productos por Ingresos (Gráfico de Barras) - USANDO COUNTA
const datosTopIngresos = [
    { producto: 'Audifonos Bluetooth', ingresos: 21 }, // Según su tabla 1
    { producto: 'Webcam HD', ingresos: 19 },
    { producto: 'Cargador Rapido', ingresos: 19 },
    { producto: 'Teclado Mecánico', ingresos: 18 },
    { producto: 'Smartwatch', ingresos: 12 },
];

// 3. Pregunta: Top 5 Productos por Cantidad Vendida (Gráfico de Barras) - USANDO SUMA DE CANTIDAD
const datosTopCantidad = [
    { producto: 'Cargador Rapido', cantidad: 80 }, // Según su tabla 2
    { producto: 'Teclado Mecánico', cantidad: 30 },
    { producto: 'Audifonos Bluetooth', cantidad: 29 },
    { producto: 'Webcam HD', cantidad: 28 },
    { producto: 'Mouse Inalambrico', cantidad: 17 },
];

// 4. Pregunta: Distribución de Métodos de Pago (Gráfico de Pastel) - USANDO COUNTA
const datosMetodoPago = [
    { metodo: 'Tarjeta', frecuencia: 52 }, // Según su tabla 3
    { metodo: 'PayPal', frecuencia: 29 },
    { metodo: 'Transferencia', frecuencia: 19 },
];

// 5. Pregunta: Distribución de Ventas por País (Gráfico de Barras) - USANDO COUNTA
const datosVentasPais = [
    { pais: 'México', ingresos: 21 }, // Según su tabla 4
    { pais: 'Argentina', ingresos: 20 },
    { pais: 'Chile', ingresos: 20 },
    { pais: 'Colombia', ingresos: 20 },
    { pais: 'Perú', ingresos: 19 },
];


// --- 2. CÓDIGO PRINCIPAL PARA DIBUJAR LOS GRÁFICOS ---
document.addEventListener('DOMContentLoaded', () => {

    // Paleta de colores ajustada para el tema rojo (style.css)
    const colorPrimario = '#b81717'; 
    const colorSecundario = '#dc3545'; 
    const colorTercer = '#ffc107'; 
    const colorCuarto = '#333333'; 

    // --- GRÁFICO 1: LÍNEAS (Ventas Mensuales) ---
    new Chart(document.getElementById('chartVentasMensuales'), {
        type: 'line',
        data: {
            labels: datosVentasMensuales.map(d => d.mes),
            datasets: [{
                label: 'Transacciones por Mes', // Etiqueta ajustada a su dato (COUNTA)
                data: datosVentasMensuales.map(d => d.ingresos),
                borderColor: colorPrimario,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });

    // --- GRÁFICO 2: BARRAS (Top 5 Productos por Ingresos) ---
    new Chart(document.getElementById('chartTopIngresos'), {
        type: 'bar',
        data: {
            labels: datosTopIngresos.map(d => d.producto),
            datasets: [{
                label: 'Transacciones (COUNTA)', // Etiqueta ajustada a su dato (COUNTA)
                data: datosTopIngresos.map(d => d.ingresos),
                backgroundColor: colorSecundario,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // --- GRÁFICO 3: PASTEL (Métodos de Pago) ---
    new Chart(document.getElementById('chartMetodosPago'), {
        type: 'doughnut',
        data: {
            labels: datosMetodoPago.map(d => d.metodo),
            datasets: [{
                data: datosMetodoPago.map(d => d.frecuencia),
                backgroundColor: [colorPrimario, colorTercer, colorCuarto],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });

    // --- GRÁFICO 4: BARRAS HORIZONTAL (Ventas por País) ---
    new Chart(document.getElementById('chartVentasPais'), {
        type: 'bar',
        data: {
            labels: datosVentasPais.map(d => d.pais),
            datasets: [{
                label: 'Transacciones por País (COUNTA)', // Etiqueta ajustada a su dato (COUNTA)
                data: datosVentasPais.map(d => d.ingresos),
                backgroundColor: colorCuarto,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y', 
            scales: {
                x: { beginAtZero: true }
            }
        }
    });

    // --- GRÁFICO 5: BARRAS (Top 5 Productos por Cantidad) ---
    new Chart(document.getElementById('chartTopCantidad'), {
        type: 'bar',
        data: {
            labels: datosTopCantidad.map(d => d.producto),
            datasets: [{
                label: 'Cantidad de Unidades (SUMA)', // Etiqueta ajustada a su dato (SUMA)
                data: datosTopCantidad.map(d => d.cantidad),
                backgroundColor: colorTercer,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
