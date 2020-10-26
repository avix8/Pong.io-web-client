import * as THREE from 'three'

const CameraControls = function (camera) {
  let isMouseDown = false
  let angleX = 0
  let angleY = 0.2
  let radious = 5

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
    // var fovMAX = 110;
    // var fovMIN = 30;

    radious *= 1 - event.wheelDeltaY * 0.001
    updatePos()

    // camera.fov -= event.wheelDeltaY * 0.02;
    // camera.fov = Math.max(Math.min(camera.fov, fovMAX), fovMIN);
    // camera.updateProjectionMatrix();
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

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.up.set(0, 0, 1)

    this.cameraControls = new CameraControls(this.camera)
    // this.cameraControls.updatePos()

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
    // plane.rotation.x = Math.PI / 2
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

  // const fps = document.getElementById('fps')
  // let time = Date.now()
  // let nt
  render() {
    this.renderer.render(this.scene, this.camera)

    // nt = Date.now()
    // fps.innerHTML = Math.floor(1000 / (nt - time))
    // time = nt
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
