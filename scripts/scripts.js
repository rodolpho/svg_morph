var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var botao;
var draw;
var conta;

function inicia_svg(){
//alert(width + ' x ' + height);
document.getElementsByTagName('svg')[0].setAttribute("width",width);
document.getElementsByTagName('svg')[0].setAttribute("height",height);

draw = SVG('drawing').viewbox(0, 0, width, height)

// faz um triângulo aleatório
// sorteia e junta as linhas de 3 pontos
// os pontos x e y tem que ser menores que width e height
// será melhor fazer isso em Php?
num_triangulos = 1;
alcance_bezier_x = 0,1 * width; //distância em relação ao tamanho da tela dos pontos de controle das curvas de bezier
alcance_bezier_y = 0,1 * height;

	for (triangulo = 0; triangulo < num_triangulos; triangulo++) {
	pontos_x_triangulo = [];
	pontos_y_triangulo = [];
		for (ponto_x = 0; ponto_x < 3; ponto_x++) {
		ponto = Math.floor(Math.random() * width);
		pontos_x_triangulo.push(ponto);
		}

		for (ponto_y = 0; ponto_y < 3; ponto_y++) {
		ponto = Math.floor(Math.random() * height);
		pontos_y_triangulo.push(ponto);
		}

	d_triangulo = "M" + pontos_x_triangulo[0] + " " + pontos_y_triangulo[0] + " L " + pontos_x_triangulo[1] + " " + pontos_y_triangulo[1] + " L " + pontos_x_triangulo[2] + " " + pontos_y_triangulo[2] + " Z";

	var desenho_triangulo = draw.path(d_triangulo)
	desenho_triangulo.fill('yellow').move(200, 200);
	desenho_triangulo.attr({"id":"triangulo_" + triangulo});
	}


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
	//preciso considerar a referência dos pontos de bezier positivas & negativas...
	//por isso vou multiplicar por 2 o numero aleatório e tirar seu máximo.
	//considerarei o máximo a altura. tanto para a referência x e y do ponto bezier.
	//o numero de pontos de bezier para cada ponto da imagem é 2. cada um precisa de 2 referências.
	//portanto, 4 numeros por ponto. como temos um triângulo, vamos de 12.
	ponto = Math.floor((Math.random() * height * 2) - height);
	//ponto = Math.floor((Math.random() * alcance_bezier_y * 2) - alcance_bezier_y);
	pontos_bezier_suave.push(ponto);
	}
//d_suave = "m 23 20 c 17 -3 26 2 30 15 c 4 12 14 19 29 21 c 14 1 -33 27 -51 10 c -18 -17 -17 -34 -7 -46 z";
//d_suave = "m 23 20 c 0 0 0 0 30 15 c 0 0 0 0 29 21 c 0 0 0 0 -51 10 c 0 0 0 0 -7 -46 z";
//d_suave = "M" + pontos_x_triangulo[0] + " " + pontos_y_triangulo[0] + " L " + pontos_x_triangulo[1] + " " + pontos_y_triangulo[1] + " L " + pontos_x_triangulo[2] + " " + pontos_y_triangulo[2] + " Z";
d_suave = "m " + pontos_x_suave[0] + " " + pontos_y_suave[0] + " ";
num_pontos_suave = 3;
ponto_bezier = 0;
	for (pontos_suave = 0; pontos_suave < num_pontos_suave; pontos_suave++){
	ponto_suave = "c " + pontos_x_suave[pontos_suave] + " " + pontos_y_suave[pontos_suave] + " " + pontos_bezier_suave[ponto_bezier++] + " " + pontos_bezier_suave[ponto_bezier++] + " " + pontos_bezier_suave[ponto_bezier++] + " " + pontos_bezier_suave[ponto_bezier++] + " ";
	d_suave = d_suave + " " + ponto_suave;
	}

//alert(d_suave);

var desenho_suave = draw.path(d_suave);
desenho_suave.fill('green').move(100, 100);
//desenho_triangulo.attr({"id":"triangulo_" + triangulo});

tamanho_botao_h = 200;
tamanho_botao_v = 50;

conta = "M" + ((width/2) - (tamanho_botao_h/2)) + " " + ((height/2) - (tamanho_botao_v/2)) + " L " + ((width/2) + (tamanho_botao_h/2)) + " " + ((height/2) - (tamanho_botao_v/2)) + " L " + ((width/2) + (tamanho_botao_h/2)) + " " + ((height/2) + (tamanho_botao_v/2)) + " L " + ((width/2) - (tamanho_botao_h/2)) + " " + ((height/2) + (tamanho_botao_v/2)) + " Z";

//console.log(conta);
//document.getElementById('grupo_botao').getElementsByTagName("path")[0].setAttribute("d", conta);

var botao = draw.path(conta)
//botao.fill('blue').move(20, 20)
botao.fill('blue');
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