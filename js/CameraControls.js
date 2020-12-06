class CameraControls {
  constructor(camera) {
    this.camera = camera
    this.isMouseDown = false
    this.angleX = 0
    this.angleY = 0.5
    this.radious = 15
    this.updatePos()
    document.addEventListener('mousewheel', (event) => this.zoom(event), false)
    document.addEventListener(
      'mousedown',
      () => (this.isMouseDown = true),
      false
    )
    document.addEventListener(
      'mouseup',
      () => (this.isMouseDown = false),
      false
    )
    document.addEventListener(
      'mousemove',
      (event) => this.onMouseMove(event),
      false
    )
  }

  updatePos() {
    this.camera.position.x =
      this.radious * Math.sin(this.angleX) * Math.cos(this.angleY)
    this.camera.position.y =
      this.radious * Math.cos(this.angleX) * Math.cos(this.angleY)
    this.camera.position.z = this.radious * Math.sin(this.angleY)
    this.camera.lookAt(0, 0, 0)
  }

  setAngleX(angle) {
    this.angleX = angle
    this.updatePos()
  }

  onMouseMove(event) {
    if (this.isMouseDown) {
      this.angleX += event.movementX * 0.004
      this.angleY += event.movementY * 0.004

      this.angleY = Math.min(Math.PI / 2, Math.max(0.01, this.angleY))

      this.updatePos()
    }
  }

  zoom(event) {
    this.radious *= 1 - event.wheelDeltaY * 0.001
    this.updatePos()
  }
}

module.exports = CameraControls
