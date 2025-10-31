//botão de navegação para home
document.getElementById("btnnav").addEventListener("click", function () {
    window.location.href = "home.html";
    //limparLocalStorage();
});

//Cria uma variável que recebe o id da Url
const url = new URLSearchParams(window.location.search);
const idURL = url.get("id");


const jogos = JSON.parse(localStorage.getItem("jogos"));
let jogo;

//Laço que coleta as informações do jogo de acordo com ID dele
for (let i = 0; i < jogos.length; i++) {
    if (jogos[i].id == idURL) {
        jogo = jogos[i]
    }
}

console.log(jogo)

//Carrega as informações anteriores nos inputs
document.getElementById("jogo-lista").value = jogo.jogo
document.getElementById("horas").value = jogo.horas
document.getElementById("modalidade").value = jogo.modalidade
document.getElementById("imgForm").src = jogo.imagem

//botão de envio do formulário
document.getElementById("alterar").addEventListener("click", editGame)

//botão de excluir card
document.getElementById("excluir").addEventListener("click", deleteGame)

//função para abrir o seletor de arquivos
function openFileInput() {
    document.getElementById("fileInput").click();
}

//função para pré-visualizar a imagem selecionada
const imgForm = document.getElementById("imgForm");
const btnImg = document.getElementById("btnImg");
const fileInput = document.getElementById("fileInput");

function previewImage(event) {
    const arquivo = event.target.files[0];

    if (arquivo) {
        const urlImagem = URL.createObjectURL(arquivo);
        imgForm.src = urlImagem;
        imgForm.classList.remove("hiddenImg");
    } else {
        imgForm.src = "";
        imgForm.classList.add("hiddenImg");
    }
}

fileInput.addEventListener("change", previewImage);
btnImg.addEventListener("click", openFileInput);

//função para obter a imagem em base64
function obterImagem() {
    return new Promise((resolve, reject) => {
        var fileInput = document.getElementById('fileInput');
        var imagem;

        if (fileInput.files.length > 0) {
            var reader = new FileReader();
            reader.onload = function () {
                imagem = reader.result;
                resolve(imagem);
            }
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            imagem = jogo.imagem;
            resolve(imagem);
        }
    });
}

//função para registrar o jogo
async function editGame() {
    var jogo = document.getElementById('jogo-lista').value
    var horas = document.getElementById('horas').value
    var modalidade = document.getElementById('modalidade').value
    var imagem = await obterImagem();

    //criando o objeto registro
    var registroNovo = {
        id: idURL,
        jogo: jogo,
        horas: horas,
        imagem: imagem,
        modalidade: modalidade
    };

    //chamando a função para adicionar o registro ao local storage
    alterarJogoLocalStorage(registroNovo)
    console.log(registroNovo)
}

//Função que coloca o Jogo alterado no localStorage
function alterarJogoLocalStorage(registroNovo) {
    const jogos = JSON.parse(localStorage.getItem("jogos"))
    for (let i = 0; i < jogos.length; i++) {
        if (jogos[i].id == registroNovo.id) {
            jogos[i] = registroNovo
            console.log("jogos atualizado")
        }
    }

    localStorage.setItem("jogos", JSON.stringify(jogos));
    window.location.href = "home.html";
}

//função de Excluir o carro
function deleteGame() {
    const jogos = JSON.parse(localStorage.getItem("jogos"))
    for (let i = 0; i < jogos.length; i++) {
        if (jogos[i].id == idURL) {
            jogos.splice(i, 1)
            console.log("carro excluido")
        }
    }

    localStorage.setItem("jogos", JSON.stringify(jogos));
    window.location.href = "home.html";
}