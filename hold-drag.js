// Component that uses the gesture-detector and raycaster to drag and drop an object
AFRAME.registerComponent('hold-drag', {
  schema: {
    cameraId: {default: 'camera'},
    groundId: {default: 'ground'},
    dragDelay: {default: 300 },

  },
  init: function() {
    this.camera = document.getElementById(this.data.cameraId)
    this.threeCamera = this.camera.getObject3D('camera')
    this.ground = document.getElementById(this.data.groundId)

    this.internalState = {
      fingerDown: false,
      distance: 0,
      raycaster: new THREE.Raycaster(),
    }

    this.fingerDown = this.fingerDown.bind(this)
    this.fingerUp = this.fingerUp.bind(this)

    this.el.addEventListener('mousedown', this.fingerDown)
    this.el.sceneEl.addEventListener('onefingerend', this.fingerUp)
  },
  tick: function() {
  },
  remove: function() {
    this.el.removeEventListener('mousedown', fingerDown)
    this.el.scene.removeEventListener('onefingerend', fingerUp)
  },
  fingerDown: function(event) {
    this.internalState.fingerDown = true
    //this.internalState.positionRaw = event.detail.positionRaw
  },
  fingerUp: function(event) {
    this.internalState.fingerDown = false
    //this.internalState.positionRaw = event.detail.positionRaw

    console.log("I was clicked!")

    this.internalState.positionRaw = null

    this.internalState.dragging = false
  }
})
