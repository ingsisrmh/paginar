var caja;

addEventListener('load', iniciar);

function iniciar()
{
	caja = document.getElementById('paginacion');

	var paginas = {total:100, mostrar:15, actual:1};

	caja.innerHTML += enviar(0, 30);
	caja.innerHTML += paginar(paginas);
}

function actualizar(actual)
{
	a = actual;

	var paginas = {total:100, mostrar:15, actual:a};

	limpiar();

	var t = paginas.total; //Total de páginas
	var m = paginas.mostrar; //Cuantos registros se van a mostra
	var a = paginas.actual; //Cual es la página actual
	var l = m*a;
	var i = (l-m)+1;

	if(l>t)
		l=t;

	caja.innerHTML += enviar(i, l);
	caja.innerHTML += paginar(paginas);
}

function paginar(paginas)
{
	total = paginas.total;
	mostrar = paginas.mostrar;
	actual = paginas.actual;

	var paginas = parseFloat(total)/parseFloat(mostrar);
	var actual = parseInt(actual);
	paginas = parseInt(paginas);

	if(paginas < parseFloat(total)/parseFloat(mostrar))
		paginas ++;

	var resultado = '';

	if(actual > 1)
		anterior = parseInt(actual) - 1;

	resultado += '<paginacion>'
			  + '';
	if(actual > 1)
		resultado += '<input type="button" value="Anterior" onClick = "actualizar(' + anterior + ')">';
	else
		resultado += '<input type="button" disabled="true" value="Anterior">';

	for(var a=1; a<=paginas; a++)
	{
		if(a != actual)
			resultado += '<input type="button" value="' + a + '" onClick = "actualizar(' + a + ')">';
		else
			resultado += '<input type="button" disabled="true" value="' + a + '" onClick = "actualizar(' + a + ')">';
	}

	if(actual < paginas)
	siguiente = parseInt(actual) + 1;

	if(actual < paginas)
		resultado += '<input type="button" value="Siguiente" onClick = "actualizar(' + siguiente + ')">';
	else
		resultado += '<input type="button" disabled="true" value="Siguiente">';
		resultado += ''
				  + '</paginacion>';

	return(resultado);
}

function enviar(inicio, limite)
{
	texto = 'Se muestra los registros del "' + inicio + '" al "' + limite + '"';

	var data = new FormData();
	data.append('del', inicio);
	data.append('hasta', limite);

	return(texto);
}

function limpiar()
{
	if(caja.hasChildNodes())
		while(caja.childNodes.length>=1)
			caja.removeChild(caja.firstChild);
}
