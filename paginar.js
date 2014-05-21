var infopaginar;
var botonespaginar;

addEventListener('load', iniciar);

function iniciar()
{
	paginame(500, 30);
}

function paginame(todas=1, cantidad=1)
{
	var paginas = {total:todas, mostrar:cantidad, actual:1};
	infopaginar = document.getElementById('infpaginacion');
	botonespaginar = document.getElementById('paginacion');

	infopaginar.innerHTML += rango(paginas.actual, paginas.mostrar);
	botonespaginar.innerHTML += paginar(paginas);
}

function actualizarpaginacion(total, mostrar, actual)
{
	var paginas = {total:1, mostrar:1, actual:1};
	
	paginas.total = total;
	paginas.mostrar = mostrar;
	paginas.actual = actual;
	
	limpiar(infopaginar);
	limpiar(botonespaginar);

	var limite = paginas.mostrar*paginas.actual;
	var inicio = (limite-paginas.mostrar)+1;

	if(limite>paginas.total)
		limite=paginas.total;

	infopaginar.innerHTML += rango(inicio, limite);
	botonespaginar.innerHTML += paginar(paginas);
}

function paginar(paginas)
{
	var total = paginas.total;
	var mostrar = paginas.mostrar;
	var actual = paginas.actual;

	var totalpaginas = parseFloat(paginas.total)/parseFloat(paginas.mostrar);
	var actual = parseInt(paginas.actual);
	totalpaginas = parseInt(totalpaginas);

	if(totalpaginas < parseFloat(paginas.total)/parseFloat(paginas.mostrar))
		totalpaginas ++;

	var resultado = '';

	if(paginas.actual > 1)
		anterior = parseInt(paginas.actual) - 1;

	resultado += '<paginacion>';

	if(paginas.actual > 1)
		resultado += '<input type="button" value="Anterior" onClick = "actualizarpaginacion(' + total + ',' + mostrar + ',' + anterior + ')">';
	else
		resultado += '<input type="button" disabled="true" value="Anterior">';

	for(var i=1; i<=totalpaginas; i++)
	{
		if(i != paginas.actual)
			resultado += '<input type="button" value="' + i + '" onClick = "actualizarpaginacion(' + total + ',' + mostrar + ',' + i + ')">';
		else
			resultado += '<input type="button" disabled="true" value="' + i + '" onClick = "actualizarpaginacion(' + i + ')">';
	}

	if(paginas.actual < totalpaginas)
		siguiente = parseInt(paginas.actual) + 1;

	if(paginas.actual < totalpaginas)
		resultado += '<input type="button" value="Siguiente" onClick = "actualizarpaginacion(' + total + ',' + mostrar + ',' + siguiente + ')">';
	else
		resultado += '<input type="button" disabled="true" value="Siguiente">'
				  + '</paginacion>';

	return(resultado);
}

function rango(inicio, limite)
{
	texto = 'Se muestra los registros del "' + inicio + '" al "' + limite + '"';

	var data = new FormData();
	data.append('del', inicio);
	data.append('hasta', limite);

	return(texto);
}

function limpiar(elemento)
{
	if(elemento.hasChildNodes())
		while(elemento.childNodes.length>=1)
			elemento.removeChild(elemento.firstChild);
}
