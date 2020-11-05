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

class Game {
  constructor(canvas) {
    this.running = false
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

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    })
  }

  setTestScene() {
    // plane
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

  // light
  // let light = new THREE.PointLight(0xffffff, 1, 0);
  // light.position.set(10, 25, 0);
  // scene.add(light);

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  setScene(data) {
    this.WALLS = []
    this.BALLS = []
    data.worldInfo.walls.forEach((w) => {
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
      const points = []

      points.push(new THREE.Vector3(w.start.x, w.start.y, 0))
      points.push(new THREE.Vector3(w.end.x, w.end.y, 0))

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, material)
      this.WALLS.push(line)
      this.scene.add(line)
    })
    data.worldInfo.balls.forEach((b) => {
      const geometry = new THREE.SphereGeometry(b.r, 32, 32)
      const material = new THREE.MeshLambertMaterial({ color: 0xffff00 })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.z = b.r
      sphere.castShadow = true
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

    const helper = new THREE.CameraHelper(light.shadow.camera)
    this.scene.add(helper)
  }

  worldUpdate(data) {
    data.balls.forEach((b, index) => {
      this.BALLS[index].position.x = b.pos.x
      this.BALLS[index].position.y = b.pos.y
    })
  }

  animate() {
    this.render()
    window.requestAnimationFrame(() => {
      if (this.running) this.animate()
    })
  }

  start(data) {
    console.log(data)
    this.running = true
    this.animate()
  }

  finish() {
    this.running = false
  }
}
export default Game
