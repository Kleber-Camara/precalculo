class Topico{
    #id;
    #assunto;
    #autor;
    #texto;

    constructor(id,assunto,autor,texto){
        this.#id = id;
        this.#assunto = assunto;
        this.#autor = autor;
        this.#texto = texto;
    }

    setAssunto(assunto){
        this.#assunto = assunto;
    }

    setAutor(autor){
        this.#autor = autor;
    }

    setTexto(texto){
        this.#texto = texto;
    }

    getAssunto(){
        return this.#assunto;
    }

    getAutor(){
        return this.#autor;
    }

    getTexto(){
        return this.#texto;
    }

    getId(){
        return this.#id;
    }
}

export default Topico