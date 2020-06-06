var http = new XMLHttpRequest;
var fechaSeteada;
var trClick;

window.onload = function()
{
    var fecha = new Date();
    fechaSeteada =  fecha.getFullYear() + "-" + (fecha.getMonth()+ 1) +  "-" + fecha.getDate();

    http.onreadystatechange = callbackGrilla;
    http.open("GET", "http://localhost:3000/autos", true);
    http.send();
    document.getElementById("idSpinner").hidden = false;

    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", Agregar);

    var btnCerrar = document.getElementById("btnCerrar");
    btnCerrar.addEventListener("click", Cerrar);

    var btnGuardar = document.getElementById("btnGuardar");
    btnGuardar.addEventListener("click", Guardar);

}

function callbackGrilla()
{
    if(http.readyState == 4 && http.status == 200)
    {
        armarGrilla(JSON.parse(http.responseText));
    }
}

var tCuerpo;

function armarGrilla(jsonObj)
{
    tCuerpo = document.getElementById("tCuerpo");

    for(var i = 0; i<jsonObj.length; i++)
    {
        var row = document.createElement("tr");
        
        var cel0 = document.createElement("td");
        var text0 = document.createTextNode(jsonObj[i].id);
        cel0.appendChild(text0);
        row.appendChild(cel0);
        cel0.hidden = true;

        var cel1 = document.createElement("td");
        var text1 = document.createTextNode(jsonObj[i].make);
        cel1.appendChild(text1);
        row.appendChild(cel1);

        var cel2 = document.createElement("td");
        var text2 = document.createTextNode(jsonObj[i].model);
        cel2.appendChild(text2);
        row.appendChild(cel2);
    
        var cel3 = document.createElement("select");
        cel3.setAttribute("year", "mySelect");
        var z = document.createElement("option");
        z.setAttribute("value", "ejemplo");
        text3 = document.createTextNode(jsonObj[i].year);
        z.appendChild(text3);
        cel3.appendChild(z);
        row.appendChild(cel3);

        tCuerpo.appendChild(row);
    }

    document.getElementById("idSpinner").hidden = true;
}

function Agregar(evento)
{
    var contenedorAgregar = document.getElementById("contenedorId");
    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.hidden = true;
    contenedorAgregar.hidden = false;
}

function Cerrar(evento)
{
    var contenedor = document.getElementById("contenedorId");
    contenedor.hidden = true;
    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.hidden = false;
}

function Guardar(evento)
{
    var data = {};
    document.getElementById("idMarca").className = "sinError";
    document.getElementById("idModelo").className = "sinError";
    var marca = document.getElementById("idMarca").value;
    var modelo = document.getElementById("idModelo").value;
    var fechaIngresada = document.getElementById("idAño").value;
    var contenedor = document.getElementById("contenedorId");
    var spinner = document.getElementById("idSpinner");
    var validacion = 0;

    if(marca.length < 3)
    {
        document.getElementById("idMarca").className = "error";
    }
    else if(modelo.length <3) 
    {
        document.getElementById("idModelo").className = "error";
    }
    else
    {
        data = {"make":marca , "model":modelo , "year":fechaIngresada};
        validacion = 1;
    }

    http.onreadystatechange = function()
    {
        if(http.readyState == 4 && http.status == 200)
        {
            if(validacion == 1)
            {
                spinner.hidden = true;
                var respuesta = JSON.parse(http.responseText);

                var row = row = document.createElement("tr");
                var cel0 = document.createElement("td");
                var text0 = document.createTextNode(respuesta.id);
                cel0.appendChild(text0);
                row.appendChild(cel0);
                cel0.hidden = true;
            
                var cel1 = document.createElement("td");
                var text1 = document.createTextNode(marca);
                cel1.appendChild(text1);
                row.appendChild(cel1);
            
                var cel2 = document.createElement("td");
                var text2 = document.createTextNode(modelo);
                cel2.appendChild(text2);
                row.appendChild(cel2);
                
                var cel3 = document.createElement("select");
                cel3.setAttribute("year", "mySelect");
                var z = document.createElement("option");
                z.setAttribute("value", "ejemplo");
                text3 = document.createTextNode(fechaIngresada);
                z.appendChild(text3);
                cel3.appendChild(z);
                row.appendChild(cel3);
                tCuerpo.appendChild(row);
                contenedor.hidden = true;
            }
            else
            {
                alert("Hubo un error en los datos ingresados");
                contenedor.hidden = false;
                spinner.hidden = true;
            }
        }
    }

    http.open("POST", "http://localhost:3000/nuevoAuto", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify(data));
    spinner.hidden = false;
    contenedor.hidden = true;
    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.hidden = false;
}
