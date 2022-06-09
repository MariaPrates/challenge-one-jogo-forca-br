var charadas = [
  { charada: 'O que aumenta, mas nunca diminui?', resposta: "IDADE" },
  { charada: 'De que cor são as caixas pretas dos aviões?', resposta: "LARANJA" },
  { charada: 'Que objeto pode ter cara sem ter corpo?', resposta: "MOEDA" },
  { charada: 'O que é branco e preto e sai todos os dias?', resposta: "JORNAL" },
  { charada: 'Qual é a coisa que, quanto maior é, menos se vê?', resposta: "ESCURIDAO" },
  { charada: 'Quem é que vive em casamentos, mas nunca se casou?', resposta: "PADRE" },
  { charada: 'O que pode se quebrar sem nunca estar em nossas mãos?', resposta: "PROMESSA" },
  { charada: 'O que é completamente seu, no entanto, todo mundo usa?', resposta: "NOME" },
  { charada: 'Quantas maçãs crescem numa árvore?', resposta: "TODAS" },
  { charada: 'Do que se enche um barril para que pese menos?', resposta: "BURACOS" },
]

let enigma = {};
let toleranciaErros = 6;
let erros = 0;
let chutes = [];
let palavraEstado = null;
const desenhos = [
  'forca',
  'cabeca',
  'corpo',
  'bracoDieito',
  'bracoEsquerdo',
  'pernaDireita',
  'PernaEsquerda',
]

let Desenho = (part) => {
  switch (part) {
    case 'forca':
      context.strokeStyle = '#522604';
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(175, 225);
      context.lineTo(5, 225);
      context.moveTo(35, 225);
      context.lineTo(35, 5);
      context.lineTo(100, 5);
      context.lineTo(100, 25);
      context.stroke();
      break;

    case 'cabeca':
      context.strokeStyle = '#000';
      context.lineWidth = 5;
      context.beginPath();
      context.arc(100, 50, 25, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();
      break;

    case 'corpo':
      context.beginPath();
      context.moveTo(100, 75);
      context.lineTo(100, 140);
      context.stroke();
      break;

    case 'bracoDieito':
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(60, 100);
      context.stroke();
      break;

    case 'bracoEsquerdo':
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(140, 100);
      context.stroke();
      break;

    case 'pernaDireita':
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(80, 190);
      context.stroke();
      break;

    case 'PernaEsquerda':
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(125, 190);
      context.stroke();
      break;
  }
}

const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

recomecarForca = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

function escolherPalavra() {
  enigma = charadas[Math.floor(Math.random() * charadas.length)];
  document.getElementById('charada').innerHTML = enigma.charada;
  Desenho(desenhos[erros])
}

function verificarLetra(letra) {
  chutes.indexOf(letra) === -1 ? chutes.push(letra) : null;
  document.getElementById(letra).setAttribute('disabled', true);

  if (enigma.resposta.indexOf(letra) >= 0) {
    palavraCharada();
    verificarVitoria();
  } else if (enigma.resposta.indexOf(letra) === -1) {
    erros++;
    atualizarErros();
    verificarDerrota();
    atualizarDesenho();
  }
}

function atualizarDesenho() {
  Desenho(desenhos[erros])
}

function verificarVitoria() {
  if (palavraEstado === enigma.resposta) {
    document.getElementById('charada').innerHTML = 'Você venceu. Parabens!';
    recomecarForca()
  }

}

function verificarDerrota() {
  if (erros === toleranciaErros) {
    document.getElementById('marcacao').innerHTML = 'A resposta era: ' + enigma.resposta;
    document.getElementById('charada').innerHTML = 'Fim de jogo';
  }

}

function palavraCharada() {
  palavraEstado = enigma.resposta.split('').map(letter => (chutes.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('marcacao').innerHTML = palavraEstado;
}

function atualizarErros() {
  document.getElementById('erros').innerHTML = erros;
}

function reset() {
  erros = 0;
  chutes = [];

  let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < letras.length; i++) {
    document.getElementById(letras[i]).disabled = false
  }

  recomecarForca()
  escolherPalavra();
  palavraCharada();
  atualizarErros();
}

function generateButtons() {
  let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letra =>
    `
      <button
        class="button margin-2"
        id='` + letra + `'
        onClick="verificarLetra('` + letra + `')"
      >
        ` + letra + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

document.getElementById('toleranciaErros').innerHTML = toleranciaErros;

function iniciar() {
  generateButtons();
  escolherPalavra();
  palavraCharada();

}