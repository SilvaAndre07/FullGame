
//botão de navegação para home
document.getElementById("btnnav").addEventListener("click", function () {
  window.location.href = "home.html";
  //limparLocalStorage();
});

//botão de envio do formulário
document.getElementById("enviar").addEventListener("click", registerGame)

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
      imagem = " ";
      resolve(imagem);
    }
  });
}

//função para obter o próximo id disponível
function proximoId() {
  let id = localStorage.getItem("id")

  if (id === null) {
    id = 1
  } else {
    id = parseInt(id) + 1
  }
  localStorage.setItem("id", id);

  return id;
}

//função para registrar o jogo
async function registerGame() {
  var jogo = document.getElementById('jogo').value
  var horas = document.getElementById('horas').value
  var modalidade = document.getElementById('modalidade').value
  var imagem = await obterImagem();

  //criando o objeto registro
  var registro = {
    id: proximoId(),
    jogo: jogo,
    horas: horas,
    imagem: imagem,
    modalidade: modalidade
  };

  //chamando a função para adicionar o registro ao local storage
  adicionarJogoLocalStorage(registro)
}

//função para adicionar o registro ao local storage
function adicionarJogoLocalStorage(registro) {
  var jogos;
  if (localStorage.getItem('jogos') === null) {
    jogos = [];
  } else {
    jogos = JSON.parse(localStorage.getItem('jogos'));
  }

  //adicionando o novo registro ao array de jogos
  jogos.push(registro);
  localStorage.setItem('jogos', JSON.stringify(jogos));

  console.log(jogos)
  window.location.href = "home.html";
}

//função para limpar o local storage ( mudar nome da função caso queira usar )
function limparLocalStorage() {
  localStorage.clear();
  console.log("Local Storage limpo.");
}