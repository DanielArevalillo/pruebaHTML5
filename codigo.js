
//DECLARAMOS VARIABLES GLOBALES QUE UTILIZAREMOS

//Variables de "A"
var x=100; //eje x
var y=115; // eje y
var dy=0;

//Variables de "B"
var w=680; //eje x
var z=115; // eje y
var dz=0;

//Variables de pelota
var m=390; //eje x
var n=145; // eje y
var dm=10;
var dn=0;
var diago=0;


//Variables de puntaje
var puntajeA=2;
var puntajeB=2;


	
	function init() {
	//se inicia la funcion, llamamos el canvas del body y lo contextualizamos para usar 2d
	myCanvas = document.getElementById("stage");
	context= myCanvas.getContext('2d');
	//se ejecutaran las funciones drawA, drawB y pelota en intervalos de 100
	setInterval(drawA,100);
	setInterval(drawB,100);
	setInterval(pelota,100); 
	x=100; //eje x
	 y=115; // eje y
	 dy=0;
	//Variables de "B"
	 w=680; //eje x
	 z=115; // eje y
	 dz=0;
	//Variables de pelota
	 m=390; //eje x
	 n=145; // eje y
	 dm=10;
	 dn=0;
	 diago=0;
	 puntajeA=2;
	 puntajeB=2;
	 document.getElementById('puntajeA').innerText = puntajeA;
	 document.getElementById('puntajeB').innerText = puntajeB;
	}
function gameOver() {
	 x=100; //eje x
	 y=115; // eje y
	 dy=0;
	//Variables de "B"
	 w=680; //eje x
	 z=115; // eje y
	 dz=0;
	//Variables de pelota
	 m=390; //eje x
	 n=145; // eje y
	 dm=10;
	 dn=0;
	 diago=0;
}
	
//jugador "A" primera funcion llamada a ejecutarse
function drawA() {
	context.clearRect (0,0, 800,300);//limpiamos pantalla
	//dibujamos jugador A
	context.beginPath();
	context.fillRect(x,y,10,70);
	context.closePath();
	context.fill();
	//aumentamos dx y dy a los respectivos ejes segun las teclas de control de la funcion control() de esa manera simulamos movimiento
	y+=dy;
	//restricciones para los bordes
	if (y<=0 || y>=230) dy=-dy
	}

//jugador "B" segunda funcion llamada a ejecutarse
function drawB() { //notese que ya no es necesario limpiar pantalla la primera funcion se encargara de eso
	//dibujamos jugador B
	context.beginPath();
	context.fillRect(w,z,10,70);
	context.closePath();
	context.fill();
	//aumentamos dw y dz a los respectivos ejes segun las teclas de control de la funcion control() de esa manera simulamos movimiento
	z+=dz;
	//restricciones para los bordes
	if (z<=0 || z>=230) dz=-dz
	}

//pelota tercera funcion llamada
function pelota() {
	//dibujamos la pelota
	context.beginPath();
	context.fillStyle = "white";
	context.arc(m,n,7,0,(Math.PI/180)*360,true);
	context.closePath();
	context.fill();
	//aumentamos dw y dz a los respectivos ejes segun las condiciones declaradas a continuacion
	m+=dm;
	n+=dn;
	//relacionamos los valores de las coordenadas para que cambie de direccion cuando choque con un juagador
	if ((x+10==m && n<=y+70 && n+10>=y)||(w==m+10 && n<=z+70 && n+10>=z)) { 
		//adicionalmente relacionamos coordenadas y la variable "diago" para el movimiento en diagonal de rebote de la pelota
		//segun la direccion que en ese momento estaba teniendo el jugador
		if(diago==0){dm=-dm}
		if(diago==1){dm=-dm;dn=-10}
		if(diago==2){dm=-dm;dn=10}
	}
	//restricciones para los bordes superiores
	if (n<=0 || n>=290) {dn=-dn}

	//pierde A y lanzamos otra pelota
	if (m==0){
		puntajeA--;
		document.getElementById('puntajeA').innerText = puntajeA;
		n=145;
		m=110;
		dm=-dm;
	}
	//pierde B y lanzamos otra pelota
	if (m==800){
		puntajeB--;
		document.getElementById('puntajeB').innerText = puntajeB;
		n=145;
		m=670;
		dm=-dm;
	}
	if (puntajeB==0){
			
			context.textAlign="center";
			context.font=" bold 20px arial";
			context.fillStyle = 'cyan';
			context.fillText("<-- GANADOR A",400,155); 
			gameOver();
	}
	if (puntajeA==0){
			
			context.textAlign="center";
			context.font=" bold 20px arial";
			context.fillStyle = 'purple';
			context.fillText("GANADOR B -->",400,155); 
			gameOver();
	}
}

//funcion para capturar las teclas presionadas a travez del onkeydown del body y controlar los jugadores
function Control() {
	tecla=event.keyCode;
	//Controles "A"
	if (tecla==87) {dy=-10; diago=1;} //arriba W 
	if (tecla==83) {dy=10; diago=2;} //abajo S
	//Controles "B"
	if (tecla==38) {dz=-10; diago=1;} //arriba
	if (tecla==40) {dz=10; diago=2;} //abajo
}

