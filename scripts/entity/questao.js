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

}

export default Questao