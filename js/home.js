// Recupera os jogos do localStorage
const jogos = JSON.parse(localStorage.getItem("jogos")) || []

// Função para renderizar os jogos na página
function renderizarJogos(jogos) {
  var gamesContainer = document.getElementById("gamesContainer")
  var emptyState = document.getElementById("emptyState")

  // Se não houver jogos, exibe o estado vazio
  if (!jogos || jogos.length === 0) {
    emptyState.style.display = "block"
    return
  }

  // Se houver jogos, esconde o estado vazio e exibe os jogos
  emptyState.style.display = "none"
  gamesContainer.innerHTML = ""

  // Cria e adiciona os cards dos jogos
  for (let i = 0; i < jogos.length; i++) {
    var card = criarCard(jogos[i])
    gamesContainer.appendChild(card)
  }
}

// Função para criar um card de jogo
function criarCard(jogo) {
  var card = document.createElement("div")
  card.classList.add("game-card")

  // Define a URL da imagem, usando uma imagem padrão se não houver
  const imageUrl = jogo.imagem || `../images/SysIcons/NoGameImage.jpg cover ${jogo.jogo}`

  // Preenche o conteúdo do card
  card.innerHTML = `
        <img src="${imageUrl}" alt="${jogo.jogo}" class="game-image" onerror="this.src='../images/SysIcons/NoGameImage.jpg'">
        <h3 class="game-title">${jogo.jogo || "Jogo Sem Nome"}</h3>
        <div class="game-info">
            <div class="game-stat">
                <span class="stat-label">⏱️ Horas Jogadas:</span>
                <span class="stat-value">${jogo.horas || "0"}h</span>
            </div>
            <div class="game-stat">
                <span class="stat-label">🎮 Modalidade:</span>
                <span class="stat-value">${jogo.modalidade || "N/A"}</span>
            </div>
            ${
              jogo.plataforma
                ? `
            <div class="game-stat">
                <span class="stat-label">📱 Plataforma:</span>
                <span class="stat-value">${jogo.plataforma}</span>
            </div>
            `
                : ""
            }
            ${
              jogo.genero
                ? `
            <div class="game-stat">
                <span class="stat-label">🏷️ Gênero:</span>
                <span class="stat-value">${jogo.genero}</span>
            </div>
            `
                : ""
            }
        </div>
    `;

    // Adiciona o evento de clique para redirecionar à página de edição
    card.addEventListener("click", function(){
      //console.log("id do jogo clicado:", jogo.id)
      window.location.href = `../html/edit.html?id=${jogo.id}`
    })

  return card;
}


// Inicializa a renderização quando o conteúdo da página estiver carregado
document.addEventListener("DOMContentLoaded", () => {

  renderizarJogos(jogos)


  window.addEventListener("resize", () => {
    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
  })

  }
)

