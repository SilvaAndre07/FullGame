// Recupera os jogos do localStorage
const jogos = JSON.parse(localStorage.getItem("jogos")) || []

// Função para renderizar os jogos na página
function renderizarJogos(jogosList) {
  var gamesContainer = document.getElementById("gamesContainer")

  // Se não houver jogos, exibe o estado vazio (cria o markup dentro do container)
  if (!jogosList || jogosList.length === 0) {
    gamesContainer.innerHTML = `
      <div class="empty-state" id="emptyState">
        <div class="empty-icon">🎮</div>
        <h3>Nenhum jogo encontrado</h3>
        <p>Adicione seus jogos favoritos para começar!</p>
      </div>
    `
    return
  }

  // Se houver jogos, exibe os jogos
  gamesContainer.innerHTML = ""

  // Cria e adiciona os cards dos jogos
  for (let i = 0; i < jogosList.length; i++) {
    var card = criarCard(jogosList[i])
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
  // Renderiza todos os jogos inicialmente
  renderizarJogos(jogos)

  // Configura a busca/filter
  const searchInput = document.getElementById('searchInput')
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase()
      if (!q) {
        renderizarJogos(jogos)
      } else {
        const filtered = jogos.filter(j => {
          const nome = (j.jogo || "").toLowerCase()
          const modalidade = (j.modalidade || "").toLowerCase()
          return nome.includes(q) || modalidade.includes(q)
        })
        renderizarJogos(filtered)
      }
    })
  }

  window.addEventListener("resize", () => {
    if (typeof camera !== 'undefined' && typeof renderer !== 'undefined' && camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
  })

})

