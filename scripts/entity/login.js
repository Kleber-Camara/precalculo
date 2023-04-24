class Login{

    #login;
    #senha;
    #id;

    constructor(login, senha, id){
        this.#login = login;
        this.#senha = senha;
        this.#id = id;
    }
    
    setLogin(login){
        this.#login = login;
    }

    setSenha(senha){
        this.#senha = senha;
    }

    getLogin(){
        return this.#login;
    }

    getSenha(){
        return this.#senha;
    }

    getId(){
        return this.#id;
    }
}

export default Login