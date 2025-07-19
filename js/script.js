var capital;
var tasa;
var plazo;
var frecuencia;

var interes;
var retencion;
var total;

var diasFrecuencia;
var totalCuotas;
var filaDiasPagados;
var ultFilaDiasPagados;
var filaInteres;
var ultFilaInteres;
var filaRetencion;
var ultFilaRetencion;
var filaRecibir
var ultFilaRecibir;

function calcular()
{
    // Obtengo datos ingresados por el usuario
    capital = parseFloat(document.getElementById("capital").value);
    tasa = parseFloat(document.getElementById("tasa").value);
    plazo = parseInt(document.getElementById("plazo").value);
    frecuencia = document.getElementById("frecuencia").value;

    // Verificar si los campos están vacíos o inválidos
    if (isNaN(capital) || isNaN(tasa) || isNaN(plazo) || frecuencia === "vacio") 
    {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Verificar si los campos están lleno de 0
    if (capital === 0 || tasa === 0 || plazo === 0) 
    {
        alert("Capital, tasa y plazo deben ser mayores a cero.");
        return;
    }

    interes = parseFloat(((capital*(tasa/100)*plazo)/360).toFixed(2));

    retencion = (plazo >= 180) ? 0 : parseFloat((interes*0.02).toFixed(2));

    total = capital + interes - retencion;

    generarTabla();  

    // Mostrar la tabla de inversión
    document.querySelector(".tabla-inversion").style.display = "flex";

    // Imprimir totales en <section class="datos-salida">
    imprimirTotales();
}

function imprimirTotales()
{
    document.getElementById("resultado-capital").innerHTML = "Capital: <span>$" + capital.toFixed(2) + "</span>";
    document.getElementById("resultado-interes").innerHTML = "Interés: <span>$" + interes.toFixed(2) + "</span>";
    document.getElementById("resultado-retencion").innerHTML = "Retención: <span>$" + retencion.toFixed(2) + "</span>";
    document.getElementById("resultado-total").innerHTML = "TOTAL A RECIBIR: <span>$" + total.toFixed(2) + "</span>";
}

function limpiar() 
{
    // Limpieza datos ingresados en Inputs
    document.getElementById("capital").value = "";
    document.getElementById("tasa").value = "";
    document.getElementById("plazo").value = "";
    document.getElementById("frecuencia").value = "vacio";

    // Muestra $0 en la pantalla de salida para el usuario
    document.getElementById("resultado-capital").innerHTML = "Capital: <span>$ 0</span>";
    document.getElementById("resultado-interes").innerHTML = "Interés: <span>$ 0</span>";
    document.getElementById("resultado-retencion").innerHTML = "Retención: <span>$ 0</span>";
    document.getElementById("resultado-total").innerHTML = "TOTAL A RECIBIR: <span>$ 0</span>";

    // Limpiar Tabla inversión
    document.getElementById("tabla-body").innerHTML = "";

    //Lo que tu me recomendaste como: OPCIONAL: Ocultar la tabla también al hacer clic en "LIMPIAR"!!
    document.querySelector(".tabla-inversion").style.display = "none";

    // Reiniciar las variables internas a 0
    capital = 0;
    interes = 0;
    retencion = 0;
    total = 0;
}

// Función para calcular los días según la frecuencia elegida (se utilizará en tabla)
function calcularDiasFrecuencia (frecuencia)
{
    switch (frecuencia)
    {
        case "mensual": return 30;
        case "trimestral": return 90;
        case "semestral": return 180;
        case "anual": return 360;
        case "vencimiento": return plazo;
        default: return 0;
    }
}

// Función para calcular Tabla inversión
function generarTabla ()
{
    let cuerpoTabla = document.querySelector("#tabla-dinamica tbody");
    cuerpoTabla.innerHTML = ""; // Limpiar el contenido anterior

    //Cálculo y asignación de valor en la variable "diasFrecuencia"
    diasFrecuencia = calcularDiasFrecuencia(frecuencia);
    totalCuotas = Math.ceil(plazo/diasFrecuencia);
    
    //Variables columna "Número días"
    filaDiasPagados = diasFrecuencia;
    ultFilaDiasPagados = plazo-(filaDiasPagados*(totalCuotas-1));

    // Variables columna "Interés"
    filaInteres = parseFloat(((interes/plazo)*diasFrecuencia).toFixed(2));
    ultFilaInteres = parseFloat((interes-(filaInteres*(totalCuotas-1))).toFixed(2));

    // Variables columna "Retención"
    filaRetencion = parseFloat(((retencion/plazo)*diasFrecuencia).toFixed(2));
    ultFilaRetencion = parseFloat((retencion-(filaRetencion*(totalCuotas-1))).toFixed(2));

    // Variables columna "A recibir"
    filaRecibir = parseFloat((filaInteres - filaRetencion).toFixed(2));
    ultFilaRecibir = parseFloat((ultFilaInteres-ultFilaRetencion).toFixed(2));

    for(let numeroCuota = 1; numeroCuota <= totalCuotas; numeroCuota++)
    {
        if(numeroCuota < totalCuotas)
        {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${numeroCuota}</td>
                <td>${filaDiasPagados}</td>
                <td>$${filaInteres.toFixed(2)}</td>
                <td>$${filaRetencion.toFixed(2)}</td>
                <td>$${filaRecibir.toFixed(2)}</td>
            `;
            cuerpoTabla.appendChild(fila); //Esta línea imprime
        }
        else
        {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${numeroCuota}</td>
                <td>${ultFilaDiasPagados}</td>
                <td>$${ultFilaInteres.toFixed(2)}</td>
                <td>$${ultFilaRetencion.toFixed(2)}</td>
                <td>$${ultFilaRecibir.toFixed(2)}</td>
            `;
            cuerpoTabla.appendChild(fila); //Esta línea imprime
        }
    }
    // Imprimir fila de Total
    let fila = document.createElement("tr");
    fila.classList.add("fila-total");  // Agregar clase para personalizar en CSS
    fila.innerHTML = `
        <td>Total</td>
        <td>${plazo}</td>
        <td>$${interes.toFixed(2)}</td>
        <td>$${retencion.toFixed(2)}</td>
        <td>$${(interes - retencion).toFixed(2)}</td>
    `;
    cuerpoTabla.appendChild(fila); //Esta línea imprime
}