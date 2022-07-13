//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variáveis da raquete
let xRaquete = 5
let yRaquete = 150
let comprimentoRaquete = 10
let alturaRaquete = 90

//variáveis do oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 500
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//erro do oponente
let chanceDeErrar = 0;

function preload (){
  trilha = loadSound ("trilha.mp3")
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaqueteOponente();
  placarDoJogo();
  marcaPontos();
  calculaChanceDeErrar();
  
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){ 
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height ||
     yBolinha - raio< 0){
    velocidadeYBolinha *= -1;
  }
 } 

function mostraRaquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaMinhaRaquete (){
  if (keyIsDown(UP_ARROW)) {
   yRaquete -= 10; 
  }
  
  if (keyIsDown(DOWN_ARROW)) {
   yRaquete += 10; 
  }
}

function verificaColisaoRaquete (){
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaqueteOponente (){
  if (xBolinha + raio > xRaqueteOponente + comprimentoRaquete && yBolinha - raio < yRaqueteOponente + alturaRaquete && yBolinha + raio > yRaqueteOponente){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete /2 - 80
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar
}

function placarDoJogo (){
  stroke(255);
  textAlign (CENTER);
  textSize (16);
  fill (color(255,140, 0));
  rect(150, 10, 40, 20);
  fill (255);
  text(meusPontos, 170, 26);
  fill (color(255,140, 0));
  rect(450, 10, 40, 20);
  fill (255);
  text(pontosDoOponente, 470, 26);
}

function marcaPontos(){
  if (xBolinha > 585){
    meusPontos += 1;
    ponto.play();
 }
  if (xBolinha < 12){
    pontosDoOponente += 1;
    ponto.play();
 }
} 

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 89){
    chanceDeErrar = 100
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 85){
    chanceDeErrar = 85
    }
  }
}