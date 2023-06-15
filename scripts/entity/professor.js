import Usuario from "./usuario.js";

class Professor extends Usuario{

    constructor(id,nome,login,senha,idLogin,email){
        super(id,nome,login,senha,idLogin,email);
    }


    cadastrarQuestoes(){
        history.pushState({},null, "/html/cadastroQuestao.html");
        location.reload();
    }

    cadastrarTopico(){
        history.pushState({},null, "/html/cadTopico.html");
        location.reload();
    }

    verTopicosLancados(){
        history.pushState({},null, "/html/telaTopicosProf.html");
        location.reload();
    }

}

export default Professor