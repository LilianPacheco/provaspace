const canvas = document.getElementById('JogoCanvas')
const ctx = canvas.getContext('2d')

class Entidade {
    constructor(x, y, largura, altura, cor) {
        this.x = x,
        this.y = y,
        this.largura = largura,
        this.altura = altura,
        this.cor = cor
    }
    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Personagem extends Entidade {
    constructor(x, y, largura, altura, cor, velocidade) {
        super(x, y, largura, altura, cor)
        this.velocidade = velocidade
        this.imagem = new Image()
        this.imagem.src = './alien.png'
    }
    andar(lado) {
        if (lado === 'esquerda' && this.x > 0) {
            this.x -= this.velocidade
        } else if (lado === 'direita' && this.x + this.largura < canvas.width) {
            this.x += this.velocidade
        }
    }
    desenhar(){
        ctx.drawImage(this.image, this.x, this.y, this.largura, this.altura)
    }
}

class Tiro extends Entidade {
    constructor(x, y, largura, altura, cor, velocidade) {
        super(x, y, largura, altura, cor)
        this.velocidade = velocidade
    }
    atualizar() {
        this.y -= this.velocidade
    }
}

class Obstaculo extends Entidade {
    constructor(x, y, largura, altura, cor, velocidade) {
        super(x, y, largura, altura, cor)
        this.velocidade = velocidade
    }
    atualizar() {
        this.y += this.velocidade
    }
}

const jogador = new Personagem(canvas.width / 2 - 25, canvas.height - 60, 50, 50, 'white', 5)
const obstaculos = []
const tiros = []

function criarNovoObstaculo() {
    let nova_altura = Math.floor(Math.random() * (150 - 90)) + 90
    let nova_y = canvas.height - nova_altura
    obstaculos.push(new Obstaculo(canvas.width, nova_y, 50, 50, 'gray', 2))
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    jogador.desenhar()
    tiros.forEach((tiro, index) => {
        tiro.atualizar()
        tiro.desenhar()
        if (tiro.y < 0) {
            tiros.splice(index, 1)
        }
    })
    obstaculos.forEach((obstaculo, index) => {
        obstaculo.atualizar()
        obstaculo.desenhar()
        if (obstaculo.y + obstaculo.altura >= canvas.height) {
            alert('Game Over!')
        }
    })

    requestAnimationFrame(loop)
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        jogador.andar('esquerda')
    } else if (event.key === 'ArrowRight') {
        jogador.andar('direita')
    } else if (event.key === ' ') {
        tiros.push(new Tiro(jogador.x + jogador.largura / 2 - 5, jogador.y, 10, 20, 'pink', 7))
    }
})

loop()
