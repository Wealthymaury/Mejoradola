var tablero, direccion;//global para poderlo usar en todos lados
var velocidad = 50;
var tifiDibujo;
//objetos JSON que tienen las imagenes
var obstaculos = [
	{x: 0,y: 200},
	{x: 50,y: 200},
	{x: 100,y: 200},
	{x: 200,y: 0},
	{x: 200,y: 50},
	{x: 200,y: 100},
	{x: 200,y: 150},
	{x: 200,y: 200},
	{x: 150,y: 350},
	{x: 200,y: 350},
	{x: 250,y: 350},
	{x: 300,y: 350},
	{x: 350,y: 350},
	{x: 400,y: 350},
	{x: 450,y: 350}
]

var teclas = {
	up: 38,
	down: 40,
	left: 37,
	right: 39
}
var fondo = {
	imagenURL: "fondo.png",
	imagenOK: false
};
var tifis = {
	posX: 0,
	posY: 0,
	frenteURL: "diana-frente.png",
	atrasURL: "diana-atras.png",
	izqURL: "diana-izq.png",
	derURL: "diana-der.png",
	muertaURL: "diana-muerta.png",
	frenteOK: false,
	atrasOK: false,
	izqOK: false,
	derOK: false,
	muertaOK: false
};
var liz = {
	posX: 150,
	posY: 200,
	frenteURL: "liz.png",
	frenteOK: false
}
function inicio(){
	var canvas = document.getElementById('campo');
	tablero = canvas.getContext("2d");
	fondo.imagen = new Image(); //con esto tengo una variable imagen dentro del objeto fondo,
	fondo.imagen.src = fondo.imagenURL; // al atributo src de la imagen le pone la url de la foto
	//como saber cuando esta cargada la imagen para continuar?
	fondo.imagen.onload = confirmarFondo;//la funcion no la invoco con (), porque quiero que se dispare cuando la imagen cargue

	tifis.frente = new Image(); 
	tifis.frente.src = tifis.frenteURL;
	tifis.frente.onload = confirmarFrente;

	tifis.atras = new Image(); 
	tifis.atras.src = tifis.atrasURL;
	tifis.atras.onload = confirmarAtras;

	tifis.izq = new Image(); 
	tifis.izq.src = tifis.izqURL;
	tifis.izq.onload = confirmarIzq;

	tifis.der = new Image(); 
	tifis.der.src = tifis.derURL;
	tifis.der.onload = confirmarDer;

	tifis.muerta = new Image(); 
	tifis.muerta.src = tifis.muertaURL;
	tifis.muerta.onload = confirmarMuerta;

	liz.frente = new Image(); 
	liz.frente.src = liz.frenteURL;
	liz.frente.onload = confirmarLiz;

	document.addEventListener("keydown", teclado)
}
function teclado(datos){
	if(datos.keyCode == teclas.up && tifis.posY > 0 && noPared(tifis.posX ,tifis.posY - velocidad)){
			tifis.posY -= velocidad;
	}
	if(datos.keyCode == teclas.down && tifis.posY < 450 && noPared(tifis.posX ,tifis.posY + velocidad)){
			tifis.posY += velocidad;
	}
	if(datos.keyCode == teclas.left && tifis.posX > 0 && noPared(tifis.posX - velocidad,tifis.posY)){
			tifis.posX -= velocidad;
	}
	if(datos.keyCode == teclas.right && tifis.posX < 450 && noPared(tifis.posX + velocidad,tifis.posY)){
		tifis.posX += velocidad;
	}
	if(teclas.up != 0){
		moverLiz();
	}
	
	direccion = datos.keyCode;
	dibujar();
}
function noPared(x, y){
	for(i=0; i<obstaculos.length;i++){
		if(obstaculos[i].x == x && obstaculos[i].y == y){
			return false;
		}
	}
	return true;
}
function confirmarFondo(){
	fondo.imagenOK = true;
	dibujar();
}
function confirmarFrente(){
	tifis.frenteOK = true;
	dibujar();
	tifiDibujo = tifis.frente;
}
function confirmarAtras(){
	tifis.atrasOK = true;
	dibujar();
}
function confirmarDer(){
	tifis.derOK = true;
	dibujar();
}
function confirmarIzq(){
	tifis.izqOK = true;
	dibujar();
}
function confirmarLiz(){
	liz.frenteOK = true;
	dibujar();
}
function confirmarMuerta(){
	tifis.muertaOK = true;
	dibujar();
}
function dibujar(){
	if(fondo.imagenOK == true){
		tablero.drawImage(fondo.imagen, 0, 0);
	}
	tablero.fillRect(450,450,50,50);
	tablero.fillStyle="#f00";
	if(tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK && tifis.muertaOK){
		if(direccion == teclas.up){
			tifiDibujo = tifis.atras;
		}
		if(direccion == teclas.down){
			tifiDibujo = tifis.frente;
		}
		if(direccion == teclas.left){
			tifiDibujo = tifis.izq;
		}
		if(direccion == teclas.right){
			tifiDibujo = tifis.der;
		}
		if(tifis.posX == liz.posX && tifis.posY == liz.posY){
			tifiDibujo = tifis.muerta;
			var texto = document.getElementById('texto');
			texto.innerHTML = "La malvada de liz te ha matado";
			teclas.up = 0;
			teclas.down = 0;
			teclas.left = 0;
			teclas.right = 0;
			var boton = document.getElementById('boton');
			boton.style.visibility = 'visible'
		}
		if(tifis.posX == 450 && tifis.posY == 450){
			var texto = document.getElementById('texto');
			texto.innerHTML = "Ganaste...!!!";
			teclas.up = 0;
			teclas.down = 0;
			teclas.left = 0;
			teclas.right = 0;
			var boton = document.getElementById('boton');
			boton.style.visibility = 'visible'
		}
		tablero.drawImage(tifiDibujo, tifis.posX, tifis.posY);
	}
	if(liz.frenteOK){
		tablero.drawImage(liz.frente, liz.posX, liz.posY);
	}
	
}
var aleatorio = function(minimo, maximo){
	var numero = Math.floor(Math.random() * (maximo - minimo +1) + minimo);
	return numero;
}
function moverLiz(){
	var op = aleatorio(1,4);

	if(op == 1 && liz.posY > 0 && noPared(liz.posX ,liz.posY - velocidad)){
			liz.posY -= velocidad;
	}
	if(op == 2 && liz.posY < 450 && noPared(liz.posX ,liz.posY + velocidad)){
			liz.posY += velocidad;
	}
	if(op == 3 && liz.posX > 0 && noPared(liz.posX - velocidad,liz.posY)){
			liz.posX -= velocidad;
	}
	if(op == 4 && liz.posX < 450 && noPared(liz.posX + velocidad,liz.posY)){
		liz.posX += velocidad;
	}
}