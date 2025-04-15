const canvas = document.getElementById('JogoCanvas')
const ctx = canvas.getContext('2d')

document.addEventListener('keypress', (e) => {
    if (e.code === "Space"){
        jogo.Personagem.andar()
    }
})

class Entidade{
    constructor(x,y,largura,altura,cor){
        this.x = x,
        this.y = y,
        this.largura = largura,
        this.altura = altura,
        this.cor = cor
    }
    desenhar(){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Personagem extends Entidade{
    constructor(x, y, largura, altura, cor){
    super(x,y, largura, altura)
    this.velocidade_y = 0
    this.atirando = false
    this.imagem = new this.imagem()
    this.imagem.src = './personagem.jpg'
    }
    atirar(){
        if (!this.atirando){
            this.velocidade_x = 15
            this.atirando = true
        }
    }
    atualizar(){

    }
    verificarTiro(item){

    }
    desenhar(){

    }
}

class Obstaculo extends Entidade{
    constructor(x,y, largura, altura, cor){
        super(x, y, largura, altura, cor)
        this.velocidadeTiro = 5
        this.imagem = new image()
        this.imagem.src = './obstaculp.png'
        this.time_to_next = Math.floor(Math.random()*200) + 300
        this.criou_novo = false
    }
    atualizar(){
        this.y -= this.velocidade_y
        if(this.x <= 0 - this.largura){
            jogo.obstaculos = jogo.obstaculos.filter(obs => obs !== this)
        }
        if (this.y < this.time_to_next && !this.criou_novo){
            jogo.criarNovoObstaculo(
                this.criou_novo = true
            )
        }
    }
    desenhar(){

    }
}

class Jogo{
    static gravidade = 0.5
    static gameOver = false
    constructor(){
        this.loop = this.loop.bind(this)
        this.Personagem = new Personagem
    }
}

const objeto_na_tela = new Entidade(400,350,50,50,'green')

function loop(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    objeto_na_tela.desenhar()
    //inserir as funções de desenhar, atualizar, colisão aqui
    requestAnimationFrame(loop)
}
loop()
