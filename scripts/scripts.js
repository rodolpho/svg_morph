var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var botao;
var draw;
var conta;

function desenha_triangulo() {
// faz um triângulo aleatório
// sorteia e junta as linhas de 3 pontos
// os pontos x e y tem que ser menores que width e height
var num_triangulos = 1;
var alcance_bezier_x = 0.1 * width; //distância em relação ao tamanho da tela dos pontos de controle das curvas de bezier
var alcance_bezier_y = 0.1 * height;
var d_suave;

	//fazer x curvas
	// primeiro gerar as strings das curvas
	strings_curvas = [];
	for(curva = 0; curva < 8; curva++){
	pontos_x_suave = [];
	pontos_y_suave = [];
	pontos_bezier_suave = [];
		for (ponto_x = 0; ponto_x < 3; ponto_x++) {
		ponto = Math.floor(Math.random() * width);
		pontos_x_suave.push(ponto);
		}

		for (ponto_y = 0; ponto_y < 3; ponto_y++) {
		ponto = Math.floor(Math.random() * height);
		pontos_y_suave.push(ponto);
		}

		for (ponto_bezier = 0; ponto_bezier < 12; ponto_bezier++) {
		//ponto = Math.floor((Math.random() * height * 2) - height);
		ponto = Math.floor((Math.random() * alcance_bezier_y * 2) - alcance_bezier_y);
		pontos_bezier_suave.push(ponto);
		}

	d_suave = "m " + pontos_x_suave[0] + " " + pontos_y_suave[0] + " ";
	num_pontos_suave = 3;
	ponto_bezier = 0;
		for (pontos_suave = 0; pontos_suave < num_pontos_suave; pontos_suave++){
		ponto_suave = "c " + pontos_x_suave[pontos_suave] + " " + pontos_y_suave[pontos_suave] + " " + pontos_bezier_suave[ponto_bezier++] + " " + pontos_bezier_suave[ponto_bezier++] + " " + pontos_bezier_suave[ponto_bezier++] + " " + pontos_bezier_suave[ponto_bezier++] + " ";
		d_suave = d_suave + " " + ponto_suave;
		}
	
	strings_curvas[curva] = d_suave;
	}

	num_curva = 1;
	var desenho_suave = draw.path(d_suave);
	desenho_suave.fill('green').move(100, 100);
	desenho_suave.attr({"id":"curva", "onclick":"alert(strings_curvas[num_curva]); muda_curva(strings_curvas[num_curva]);num_curva = num_curva + 1;"});
}

function muda_curva(dados){
SVG.get('curva').animate({ ease: '<'}).plot(dados);
}

function inicia_svg(){
//alert(width + ' x ' + height);
document.getElementsByTagName('svg')[0].setAttribute("width",width);
document.getElementsByTagName('svg')[0].setAttribute("height",height);

draw = SVG('drawing').viewbox(0, 0, width, height)

desenha_triangulo();

////////////////////////////////////


// fazendo um grupo de formas de mesma cor para dar a impressão de soldadas
// inserindo aleatoriedade no número de formas, tamanho e posição
var cor = '#f06';

//quadrados
var num_max_formas = 5;
quantos = Math.floor(Math.random() * num_max_formas);
onde_aproximado_x = 100;
onde_aproximado_y = 100;
tamanho_aproximado_x = 100;
tamanho_aproximado_y = 100;
	for(n = 0; n <= quantos; n++){
	onde_x = Math.floor(Math.random() * onde_aproximado_x);
	onde_y = Math.floor(Math.random() * onde_aproximado_y);
	tamanho_x = Math.floor(Math.random() * tamanho_aproximado_x);
	tamanho_y = Math.floor(Math.random() * tamanho_aproximado_y);
	var rect = draw.rect(tamanho_x, tamanho_y).attr({ fill: cor }).move(onde_x, onde_y).stroke('#000');
	}

//triângulos
var num_max_formas = 5;
quantos = Math.floor(Math.random() * num_max_formas);
onde_aproximado_x = 100;
onde_aproximado_y = 100;
tamanho_aproximado_x = 100;
tamanho_aproximado_y = 100;
	for(n = 0; n <= quantos; n++){
	pontos_x_triangulo = [];
	pontos_y_triangulo = [];

		for (ponto_x = 0; ponto_x < 3; ponto_x++) {
		ponto = Math.floor(Math.random() * tamanho_aproximado_x);
		pontos_x_triangulo.push(ponto);
		}

		for (ponto_y = 0; ponto_y < 3; ponto_y++) {
		ponto = Math.floor(Math.random() * onde_aproximado_y);
		pontos_y_triangulo.push(ponto);
		}

	d_triangulo = "M" + pontos_x_triangulo[0] + " " + pontos_y_triangulo[0] + " L " + pontos_x_triangulo[1] + " " + pontos_y_triangulo[1] + " L " + pontos_x_triangulo[2] + " " + pontos_y_triangulo[2] + " Z";

	onde_x = Math.floor(Math.random() * onde_aproximado_x);
	onde_y = Math.floor(Math.random() * onde_aproximado_y);
	var desenho_triangulo = draw.path(d_triangulo).attr({ fill: cor }).move(onde_x, onde_y).stroke('#000');
	}

// circulos	
var num_max_formas = 5;
quantos = Math.floor(Math.random() * num_max_formas);
onde_aproximado_x = 100;
onde_aproximado_y = 100;
tamanho_aproximado_x = 100;
	for(n = 0; n <= quantos; n++){
	onde_x = Math.floor(Math.random() * onde_aproximado_x);
	onde_y = Math.floor(Math.random() * onde_aproximado_y);
	tamanho_x = Math.floor(Math.random() * tamanho_aproximado_x);
	var circle = draw.circle(tamanho_x).attr({ fill: cor }).move(100 + onde_x, 100 + onde_y).stroke('#000');
	}	

// retângulos de cantos arredondados
var num_max_formas = 5;
quantos = Math.floor(Math.random() * num_max_formas);
onde_aproximado_x = 100;
onde_aproximado_y = 100;
tamanho_aproximado_x = 100;
tamanho_aproximado_y = 100;
raio_maximo = 30;
	for(n = 0; n <= quantos; n++){
	onde_x = Math.floor(Math.random() * onde_aproximado_x);
	onde_y = Math.floor(Math.random() * onde_aproximado_y);
	tamanho_x = Math.floor(Math.random() * tamanho_aproximado_x);
	tamanho_y = Math.floor(Math.random() * tamanho_aproximado_y);
	raio = Math.floor(Math.random() * raio_maximo);
	var rect = draw.rect(tamanho_x, tamanho_y).attr({ fill: cor }).move(200 + onde_x , 400 + onde_y).radius(raio_maximo, raio_maximo).stroke('#000');
	}

// meia-lua
var num_max_formas = 5;
quantos = Math.floor(Math.random() * num_max_formas);
onde_aproximado_x = 100;
onde_aproximado_y = 100;
tamanho_aproximado = 1;
	for(n = 0; n <= quantos; n++){
	onde_x = Math.floor(Math.random() * onde_aproximado_x);
	onde_y = Math.floor(Math.random() * onde_aproximado_y);
	tamanho_x = Math.floor(Math.random() * tamanho_aproximado_x);
	tamanho_y = Math.floor(Math.random() * tamanho_aproximado_y);
	tamanho_aproximado = Math.floor(Math.random() * tamanho_aproximado);
	var meiaLua = draw.path('m 345,353 a 222,214 0 0 0 -201,124 197,190 0 0 1 61,-9 197,190 0 0 1 197,190 197,190 0 0 1 -47,123 222,214 0 0 0 213,-213 222,214 0 0 0 -222,-214 z').style({ fill: cor }).move(onde_aproximado_x, onde_aproximado_y).transform({scale: .15}).stroke('#000');
	}	


////////////////////////////////////

tamanho_botao_h = 200;
tamanho_botao_v = 50;

conta = "M" + ((width/2) - (tamanho_botao_h/2)) + " " + ((height/2) - (tamanho_botao_v/2)) + " L " + ((width/2) + (tamanho_botao_h/2)) + " " + ((height/2) - (tamanho_botao_v/2)) + " L " + ((width/2) + (tamanho_botao_h/2)) + " " + ((height/2) + (tamanho_botao_v/2)) + " L " + ((width/2) - (tamanho_botao_h/2)) + " " + ((height/2) + (tamanho_botao_v/2)) + " Z";

var botao = draw.path(conta)
botao.fill('lightblue');
botao.attr({"id":"botao", "onclick":"ocupa_tudo(true)"});
}

function ocupa_tudo(como){
	if(como) {
	SVG.get('botao').animate({ ease: '<'}).plot('M0 0 L ' + width + ' 0 L ' + width + ' ' + height + ' L 0 ' + height + ' z');
	SVG.get('botao').attr({"onclick":"ocupa_tudo(false)"});
	} else {
	SVG.get('botao').animate({ ease: '>'}).plot(conta);
	SVG.get('botao').attr({"onclick":"ocupa_tudo(true)"});
	};
}