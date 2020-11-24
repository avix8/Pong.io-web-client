import * as THREE from 'three'

const CameraControls = function (camera) {
  let isMouseDown = false
  let angleX = 0
  let angleY = 0.2
  let radious = 15

  const updatePos = function () {
    camera.position.x = radious * Math.sin(angleX) * Math.cos(angleY)
    camera.position.y = radious * Math.cos(angleX) * Math.cos(angleY)
    camera.position.z = radious * Math.sin(angleY)
    camera.lookAt(0, 0, 0)
  }

  updatePos()

  const onMouseMove = function (event) {
    if (isMouseDown) {
      angleX += event.movementX * 0.004
      angleY += event.movementY * 0.004

      angleY = Math.min(Math.PI / 2, Math.max(0.01, angleY))

      updatePos()
    }
  }

  const zoom = function (event) {
    radious *= 1 - event.wheelDeltaY * 0.001
    updatePos()
  }

  document.addEventListener('mousewheel', (event) => zoom(event), false)
  document.addEventListener('mousedown', () => (isMouseDown = true), false)
  document.addEventListener('mouseup', () => (isMouseDown = false), false)
  document.addEventListener('mousemove', onMouseMove, false)
}

const Controls = function (socket) {
  document.addEventListener(
    'keydown',
    (e) => socket.emit('keydown', e.key),
    false
  )
  document.addEventListener('keyup', (e) => socket.emit('keyup', e.key), false)
}

class Game {
  constructor(canvas, socket) {
    this.running = false
    this.socket = socket
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    this.renderer.setClearColor('#aaaaaa')
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMapSoft = true

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    )
    this.camera.up.set(0, 0, 1)

    this.cameraControls = new CameraControls(this.camera)
    this.controls = new Controls(this.socket)

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    })
  }

  setTestScene() {
    // Plane
    const geometry = new THREE.PlaneGeometry(5, 5)
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    })
    const plane = new THREE.Mesh(geometry, material)
    plane.position.set(0, 0, 0)
    this.scene.add(plane)

    // Box
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const boxMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
    })
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    box.position.set(0, 0, 0.5)
    this.scene.add(box)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  setScene(data) {
    this.PLAYERS = []
    this.BALLS = []
    data.worldInfo.players.forEach((p) => {
      const geometry = new THREE.BoxGeometry(
        this.paddleSize,
        this.ballRadius * 2,
        this.ballRadius * 2
      )
      const material = new THREE.MeshLambertMaterial({ color: p.color })
      const cube = new THREE.Mesh(geometry, material)
      cube.castShadow = true

      cube.position.set(p.pos.x, p.pos.y, this.ballRadius)
      cube.rotation.set(0, 0, -Math.atan(p.pos.x / p.pos.y))
      cube.offset = {
        x: p.unitFromCenter.x * this.ballRadius,
        y: p.unitFromCenter.y * this.ballRadius,
      }

      this.PLAYERS.push(cube)
      this.scene.add(cube)
    })
    data.worldInfo.balls.forEach((b) => {
      const geometry = new THREE.SphereGeometry(b.r, 32, 32)
      const material = new THREE.MeshLambertMaterial({ color: 0xffff00 })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.castShadow = true

      sphere.position.z = b.r

      this.BALLS.push(sphere)
      this.scene.add(sphere)
    })

    // plane
    const geometry = new THREE.CircleGeometry(10, 64)
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    })
    const plane = new THREE.Mesh(geometry, material)
    plane.receiveShadow = true
    this.scene.add(plane)

    const light = new THREE.DirectionalLight(0xffffff, 1, 100)
    light.position.set(5, 10, 20)
    light.shadow.camera.top = 10
    light.shadow.camera.bottom = -10
    light.shadow.camera.left = -10
    light.shadow.camera.right = 10
    light.castShadow = true

    this.scene.add(light)

    // const helper = new THREE.CameraHelper(light.shadow.camera)
    // this.scene.add(helper)
  }

  worldUpdate(data) {
    data.balls.forEach((b, index) => {
      this.BALLS[index].position.x = b.pos.x
      this.BALLS[index].position.y = b.pos.y
    })
    data.players.forEach((p, index) => {
      this.PLAYERS[index].position.x = this.PLAYERS[index].offset.x + p.pos.x
      this.PLAYERS[index].position.y = this.PLAYERS[index].offset.y + p.pos.y
    })
  }

  animate() {
    this.render()
    window.requestAnimationFrame(() => {
      if (this.running) this.animate()
    })
  }

  start(data) {
    this.ballRadius = data.worldInfo.ballRadius
    this.paddleSize = data.worldInfo.paddleSize
    this.setScene(data)
    this.running = true
    this.animate()
  }

  finish() {
    this.running = false
  }
}
export default Game
