// Notas/Lembretes/

const notasContainer = document.getElementById('notasContainer');

if (notasContainer) {
    const adicionarBtt = document.createElement('button');
    adicionarBtt.className = 'adicionar-btt';
    adicionarBtt.innerHTML = '+';
    adicionarBtt.id = 'adicionarBtt';
    notasContainer.appendChild(adicionarBtt);

    let contadorNotas = 0;

    adicionarBtt.addEventListener('click', criarNota);

    function criarNota() {
        contadorNotas++;

        const nota = document.createElement('div');
        nota.className = 'nota';

        const areaTexto = document.createElement('textarea');
        areaTexto.placeholder = `Nota ${contadorNotas}`;

        const deletarX = document.createElement('button');
        deletarX.className = 'deletar-x';
        deletarX.innerHTML = '×';

        deletarX.onclick = function () {
            deletarNota(nota);
        };

        nota.appendChild(areaTexto);
        nota.appendChild(deletarX);
        notasContainer.insertBefore(nota, adicionarBtt);
    }

    function deletarNota(nota) {
        notasContainer.removeChild(nota);
    }
}



// login/cadastro toggle

const botaoAbrirCadastro = document.getElementById('abrirCadastro');
const botaoVoltarLogin = document.getElementById('voltarLogin');
const formLogin = document.querySelector('.forms-login');
const formCadastro = document.querySelector('.forms-cadastro');

if (botaoAbrirCadastro && botaoVoltarLogin && formLogin && formCadastro) {
    botaoAbrirCadastro.addEventListener('click', () => {
        formLogin.classList.remove('active');
        formCadastro.classList.add('active');
    });

    botaoVoltarLogin.addEventListener('click', () => {
        formCadastro.classList.remove('active');
        formLogin.classList.add('active');
    });
}



// Admin

if (document.getElementById('listaUsuarios')) {
    const formAdmin = document.getElementById('formAdmin');
    const listaUsuarios = document.getElementById('listaUsuarios');
    const btnLimpar = document.getElementById('btnLimpar');
    const btnExcluirTudo = document.getElementById('btnExcluirTudo');
    const campoPesquisa = document.getElementById('campoPesquisa');

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    function salvarLocalStorage() {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    function renderizarLista(filtro = "") {
        listaUsuarios.innerHTML = "";

        usuarios
            .filter(u =>
                u.nome.toLowerCase().includes(filtro.toLowerCase()) ||
                u.email.toLowerCase().includes(filtro.toLowerCase()) ||
                u.telefone.toLowerCase().includes(filtro.toLowerCase())
            )
            .forEach((usuario, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>
                        <strong>${usuario.nome}</strong> - ${usuario.email}
                        <br><span>${usuario.telefone} | ${usuario.dataNasc}</span>
                        <br><span>${usuario.data}</span>
                    </div>
                    <button class="btn-excluir" data-index="${index}">×</button>
                `;
                listaUsuarios.appendChild(li);
            });

        document.querySelectorAll('.btn-excluir').forEach(btn => {
            btn.addEventListener('click', function () {
                const i = this.getAttribute('data-index');
                usuarios.splice(i, 1);
                salvarLocalStorage();
                renderizarLista(campoPesquisa.value);
            });
        });
    }

    formAdmin.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const dataNasc = document.getElementById('dataNasc').value;

        if (nome && email && senha && telefone && dataNasc) {
            const dataAtual = new Date().toLocaleString();
            usuarios.push({ nome, email, senha, telefone, dataNasc, data: dataAtual });
            salvarLocalStorage();
            renderizarLista();
            formAdmin.reset();
        }
    });

    btnLimpar?.addEventListener('click', () => formAdmin.reset());
    btnExcluirTudo?.addEventListener('click', () => {
        if (confirm("Excluir todos os cadastros?")) {
            usuarios = [];
            salvarLocalStorage();
            renderizarLista();
        }
    });
    campoPesquisa?.addEventListener('input', () => renderizarLista(campoPesquisa.value));
    renderizarLista();
}



// Cadastro -> login

if (document.body.contains(document.getElementById('abrirCadastro'))) {
    const formCadastroLogin = document.getElementById('formAdmin');

    formCadastroLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const dataNasc = document.getElementById('dataNasc').value;

        if (!nome || !email || !senha || !telefone || !dataNasc) {
            alert("Preencha todos os campos.");
            return;
        }

        const novoUsuario = {
            nome,
            email,
            senha,
            telefone,
            dataNasc,
            data: new Date().toLocaleString()
        };

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        if (usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            alert("Este e-mail já está sendo usado.");
            return;
        }

        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso!");

        formCadastroLogin.reset();
        formCadastro.classList.remove('active');
        formLogin.classList.add('active');
    });
}



// Login

const botaoLogin = document.querySelector('.btt-login');

if (botaoLogin) {
    botaoLogin.addEventListener('click', (e) => {
        e.preventDefault();

        const usuarioInput = document.querySelector('.forms-login input[type="text"]');
        const senhaInput = document.querySelector('.forms-login input[type="password"]');

        const usuario = usuarioInput.value.trim();
        const senha = senhaInput.value.trim();

        if (!usuario || !senha) {
            alert("Preencha os campos de usuário e senha.");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuarios.find(u =>
            (u.nome.toLowerCase() === usuario.toLowerCase() || u.email.toLowerCase() === usuario.toLowerCase()) &&
            u.senha === senha
        );

        if (usuarioEncontrado) {
            alert(`Usuário logado: ${usuarioEncontrado.nome}.`);
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            window.location.href = "index.html"; 
        } else {
            alert("Usuário ou senha incorretos.");
        }
    });
}



// Manter o login entre as páginas

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuarioLogado) {
        const header = document.querySelector('header ul');
        if (header) {
            const liUser = document.createElement('li');
            liUser.textContent = `Usuário: ${usuarioLogado.nome}`;
            header.appendChild(liUser);

            const liLogout = document.createElement('li');
            liLogout.innerHTML = `<a href="#" id="logout">Sair</a>`;
            header.appendChild(liLogout);

            document.getElementById('logout').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('usuarioLogado');
                window.location.href = 'login.html';
            });
        }
    }
});
