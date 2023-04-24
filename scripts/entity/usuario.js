import Login from "./login.js";

class Usuario{
    
    _id;
    _nome;
    _login;
    _email;

    constructor(id,nome,login,senha,idLogin,email){
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._login = new Login(login,senha,idLogin);
    }

    setNome(nome){
        this.nome = nome;
    }

    setLogin(login){
        this._login = login;
    }

    setEmail(email){
        this._email = email;
    }

    getId(){
        return this._id;
    }

    getNome(){
        return this._nome;
    }

    getEmail(){
        return this._email;
    }

    getLogin(){
        return this._login;
    }
}

export default Usuario