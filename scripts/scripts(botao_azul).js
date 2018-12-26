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

tamanho_botao_h = 200;
tamanho_botao_v = 50;
//mover para horizontal = x = (tamanho da tela/2) - (tamanho do botão/2), y = (tamanho da tela/2) - (tamanho do botão/2)
// desenhar linha horizontal do tamanho do botao
// desenhar linha vertical do tamanho do botao
// desenhar linha horizontal negativa do tamanho do botão
// Z
conta = "M" + ((width/2) - (tamanho_botao_h/2)) + " " + ((height/2) - (tamanho_botao_v/2)) + " L " + ((width/2) + (tamanho_botao_h/2)) + " " + ((height/2) - (tamanho_botao_v/2)) + " L " + ((width/2) + (tamanho_botao_h/2)) + " " + ((height/2) + (tamanho_botao_v/2)) + " L " + ((width/2) - (tamanho_botao_h/2)) + " " + ((height/2) + (tamanho_botao_v/2)) + " Z";

//console.log(conta);
document.getElementById('grupo_botao').getElementsByTagName("path")[0].setAttribute("d", conta);

draw = SVG('drawing').viewbox(0, 0, width, height)

// create path
var minhoca = draw.path('M0 0 H50 A20 20 0 1 0 100 50 v25 C50 125 0 85 0 85 z')
minhoca.fill('none').move(20, 20)
minhoca.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' })

var botao = draw.path(conta)
botao.fill('blue').move(20, 20)
//botao.stroke({ color: '#f06', width: 2, linecap: 'round', linejoin: 'round' })
botao.attr({"id":"botao", "onclick":"ocupa_tudo(true)"});

// animate path
minhoca.animate({ ease: '<', delay: '1.5s' }).plot('M100 100 c -10e-7,16.68469 6.452168,28.50488 -10.23252,28.50488 -16.684688,0 -30.210301,-13.52561 -30.210302,-30.2103 -4e-6,-16.68469 13.52561,-30.21031 30.210302,-30.21031 16.684692,0 10.232525,15.23104 10.23252,31.91573 z')
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