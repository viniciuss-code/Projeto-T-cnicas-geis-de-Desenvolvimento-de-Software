// lógica do cadastro

const form = document.querySelector('#formCadastro');
const mensagem = document.querySelector('#mensagem');

form.addEventListener('submit', (event) =>{
    event.preventDefault(); //Impede a página de recarregar

    const nome = document.querySelector('#nome').value;
    const telefone = document.querySelector('#telefone').value;
    const senha = document.querySelector('#senha').value
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioExiste = usuarios.find(user => user.telefone === telefone);

    if(usuarioExiste) {
        mensagem.innerText = "Eerro: Telefone já cadastrado!"
        mensagem.computedStyleMap.color = "#ff4d4d"
        return;
    }

    const novoUsuario = {
        nome: nome,
        telefone: telefone,
        senha: senha
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    mensagem.innerText = "Cadastro realizado com sucesso!! Redirecionando...";
    mensagem.computedStyleMap.color = "#2ecc71";
    
    setTimeout(() => {
        form.reset();
        mensagem.innerText = "";
    }, 2000);

});

//Lógica de Login

const formLogin = document.querySelector('formLogin');

if(formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const tel = document.querySelector('#loginTelefone').value;
        const senha = document.querySelector('#loginSenha').value;

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Busca o usuario com telefone e senha iguais

        const usuarioValido = usuarios.find(u => u.telefone === tel && u.senha === senha);

        if(usuarioValido) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido));
            window.location.href = 'agendamento.html'; 
        } else {
            const msg = document.querySelector('#mensagem');
            msg.innerText = "Telefone ou senha incorretos!";
            msg.style.color = "#ff4d4d";
        }
    })
}