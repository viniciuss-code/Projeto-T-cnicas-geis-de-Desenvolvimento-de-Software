document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if(!usuarioLogado) {
        window.location.href = 'index.html';
        return;
    }

    document.querySelector('#boasVindas').innerTExt = `Olá, ${usuarioLogado.nome}!`;

    const formAgendamento = document.querySelector('#formAgendamento');

    formAgendamento.addEventListener('submit', (e) => {
        e.preventDefault();

        const servico = document.querySelector('#servico').value;
        const data = document.querySelector('#data').value;
        const hora = document.querySelector('#hora').value;
        const msg = document.querySelector('#mensagem');

        const novoAgendamento = {
            clienteTel: usuarioLogado.telefone,
            clienteNome: usuarioLogado.nome,
            servico: servico,
            data: data,
            hora: hora
        };

        let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

        const conflito = agendamentos.find(a => a.data === data && a.hora === hora);

        if (conflito) {
            msg.innerText = "Agendamento realizado com sucesso!";
            msg.style.color = "green";
            formAgendamento.reset();
        } else {
            agendamentos.push(novoAgendamento);
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        }
    })

});

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}