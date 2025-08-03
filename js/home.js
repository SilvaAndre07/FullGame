
const THREE = window.THREE


let scene, camera, renderer, particles

function initThreeJS() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bg-canvas"),
    alpha: true,
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)


  createParticleSystem()

  camera.position.z = 5


  animate()
}

function createParticleSystem() {
  const geometry = new THREE.BufferGeometry()
  const particleCount = 1000

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20
    positions[i + 1] = (Math.random() - 0.5) * 20
    positions[i + 2] = (Math.random() - 0.5) * 20

    const color = new THREE.Color()
    color.setHSL(Math.random() * 0.2 + 0.5, 1, 0.5)
    colors[i] = color.r
    colors[i + 1] = color.g
    colors[i + 2] = color.b
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)
}

function animate() {
  requestAnimationFrame(animate)

  // Rotate particles
  if (particles) {
    particles.rotation.x += 0.001
    particles.rotation.y += 0.002
  }

  renderer.render(scene, camera)
}

function createHTMLParticles() {
  const particlesContainer = document.getElementById("particles")

  setInterval(() => {
    if (Math.random() > 0.7) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDuration = Math.random() * 3 + 3 + "s"
      particle.style.background = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`

      particlesContainer.appendChild(particle)

      setTimeout(() => {
        particle.remove()
      }, 6000)
    }
  }, 300)
}

const jogos = JSON.parse(localStorage.getItem("jogos")) || []

function renderizarJogos(jogos) {
  var gamesContainer = document.getElementById("gamesContainer")
  var emptyState = document.getElementById("emptyState")

  if (!jogos || jogos.length === 0) {
    emptyState.style.display = "block"
    return
  }

  emptyState.style.display = "none"
  gamesContainer.innerHTML = ""

  for (let i = 0; i < jogos.length; i++) {
    var card = criarCard(jogos[i])
    gamesContainer.appendChild(card)
  }
}

function criarCard(jogo) {
  var card = document.createElement("div")
  card.classList.add("game-card")

  const imageUrl = jogo.imagem || `/placeholder.svg?height=200&width=300&query=game cover ${jogo.jogo}`

  card.innerHTML = `
        <img src="${imageUrl}" alt="${jogo.jogo}" class="game-image" onerror="this.src='/placeholder.svg?height=200&width=300'">
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
    `

  return card
}


document.addEventListener("DOMContentLoaded", () => {

  initThreeJS()


  createHTMLParticles()

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
