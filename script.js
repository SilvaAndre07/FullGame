document.getElementById("btnnav").addEventListener("click", function () {
    window.location.href = "home.html";
    //limparLocalStorage();
});

document.getElementById("enviar").addEventListener("click", registerGame)

function openFileInput() {
    document.getElementById("fileInput").click();
}

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

function obterImagem() {
    return new Promise((resolve, reject) => {
      var fileInput = document.getElementById('fileInput');
      var imagem;
  
      if (fileInput.files.length > 0) {
        var reader = new FileReader();
        reader.onload = function() {
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

  async function registerGame() {
    var jogo = document.getElementById('jogo').value
    var horas = document.getElementById('horas').value
    var modalidade = document.getElementById('modalidade').value
    var imagem = await obterImagem();

    var registro = {
        jogo: jogo,
        horas: horas,
        imagem: imagem,
        modalidade: modalidade
    };

    adicionarJogoLocalStorage(registro)
  }

  function adicionarJogoLocalStorage(registro) {
    var jogos;
    if (localStorage.getItem('jogos') === null) {
        jogos = [];
    } else {
        jogos = JSON.parse(localStorage.getItem('jogos'));
    }

    jogos.push(registro);
    localStorage.setItem('jogos', JSON.stringify(jogos));

    console.log(jogos)
    window.location.href = "home.html";
  }

  function limparLocalStorage() {
    localStorage.clear();
    console.log("Local Storage limpo.");
  }