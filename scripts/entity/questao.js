class Questao{

    #assunto;
    #enunciado;
    #alternativaA;
    #alternativaB;
    #alternativaC;
    #resposta;

    constructor(assunto,enunciado,altA,altB,altC,res){
        this.#assunto = assunto;
        this.#enunciado = enunciado;
        this.#alternativaA = altA;
        this.#alternativaB = altB;
        this.#alternativaC = altC;
        this.#resposta = res;
    }

    getEnunciado(){
        return this.#enunciado;
    }

    getCorreta(){
        return this.#resposta;
    }

    getALtA(){
        return this.#alternativaA;
    }

    getALtB(){
        return this.#alternativaB;
    }
    
    getALtC(){
        return this.#alternativaC;
    }

    getALtCorreta(){
        return this.#resposta;
    }
}

export default Questao