import Usuario from "./usuario.js";

class Aluno extends Usuario{
    #curso;

    constructor(id,nome,login,senha,idLogin,email,curso){
        super(id,nome,login,senha,idLogin,email);
        this.#curso = curso;
    }

    setCurso(curso){
        this.#curso = curso;
    }

    getCurso(){
        return this.#curso;
    }

    buscarTopico(){
        history.pushState({},null, "/buscaTopico.html");
        location.reload();
    }

    realizarTeste(){
        history.pushState({},null, "/testeRealizar.html");
        location.reload();
    }
}

export default Aluno