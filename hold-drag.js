// Component that uses the gesture-detector and raycaster to drag and drop an object
//Global vars
let count = 0;
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
    const debug_text_dialog = document.getElementById('debug-text');
    const story_text_dialog = document.getElementById('dialog');
    story_text_dialog.innerHTML = chapter[count];
    debug_text_dialog.innerHTML = "You clicked on the screen " + count + "times";

    console.log("I was clicked!")
    count += 1;
    

    this.internalState.positionRaw = null

    this.internalState.dragging = false
  }
})
