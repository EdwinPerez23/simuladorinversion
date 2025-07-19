// RESTRICCIONES DE CARACTERES EN: CAPITAL, TASA Y PLAZO

// Validar números positivos con hasta 2 decimales (CAPITAL y TASA)
function validarDecimal(input) 
{
    const valor = input.value;

    // Permitir solo números positivos y hasta 2 decimales
    if (!/^\d*(\.\d{0,2})?$/.test(valor)) 
    {
        // Si no cumple el formato, eliminar el último carácter ingresado
        input.value = valor.slice(0, -1);
    }
}

// Bloquear la letra "e", signos negativos y otros caracteres no deseados al escribir
document.querySelectorAll("#capital, #tasa").forEach(input => 
{
    input.addEventListener("keydown", function (event) 
    {
        // Bloquear letras e/E, signos negativos, etc.
        if (event.key === "e" || event.key === "E" || event.key === "-" || event.key === "+") 
        {
            event.preventDefault(); // Evitar que el carácter se ingrese
        }
    });
});

// Bloquear caracteres específicos como la coma en el campo de PLAZO
document.getElementById("plazo").addEventListener("keydown", function (event) 
{
    // Detectar si se presionó la coma (key: ,) o cualquier tecla no válida
    if (event.key === "," || event.key === "." || event.key === "e" || event.key === "-") 
    {
        event.preventDefault(); // Evitar que se ingrese el carácter
    }
});

// Validar que solo se permitan números enteros positivos durante la edición
function validarEntero(input) 
{
    const valor = input.value;
    // Eliminar cualquier carácter no numérico que pueda haberse ingresado
    input.value = valor.replace(/[^0-9]/g, "");
}