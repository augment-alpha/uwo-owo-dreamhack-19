// Component that uses the gesture-detector and raycaster to drag and drop an object
//Global vars
// let count = 0;

// let debug_text_dialog_id = "debug-text";
// let dialog_name_id = "dialog-name";
// let dialog_text_id = "dialog-text";
// let dialog_icon_id = "dialog-icon";
// Global helper methods

function isEmptyOrSpaces(str){
  return str === null || str.match(/^ *$/) !== null;
}

// Helper Methods for Dialogue

let debugText = function(text) {
  let debug_text_el = document.getElementById(debug_text_dialog_id);
  console.log(text);
  debug_text_el.innerHTML = text;
};

let initializeDialog = function(dialog) {
  let dialogue_el = document.getElementById('dialog-text');
  let dialogue_text = dialog.text;
  dialogue_el.innerHTML = dialogue_text;
  debugText("we initialized the dialog with" + "<br/>" + dialogue_text);
}

let changeDialogue = function(dialog) {
  let current_name = document.getElementById(dialog_name_id);
  current_name = current_name.textContent;
  debugText('text content is: ' + current_name.textContent);

  let dialogue_text_el = document.getElementById(dialog_text_id);
  dialogue_text_el.innerHTML = dialog.text;

  if( hasDifferentName(current_name, dialog.name) ) {
    changeName(dialog.name);
  }

  if( hasOption() ) {
    console.log('This dialog has an option');
    console.log('do something');
  }

  debugText('changed dialogue to ' + dialog.text);
}


let hasDifferentName = function(current, next) {
  console.log(' we are changing names of ' + current + ' and ' + next);
  if(current === next || isEmptyOrSpaces(next)) {
    
    return false;
  }
  return true;
}
let changeName = function(name) {
  let name_el = document.getElementById(dialog_name_id);
  name_el.innerHTML = name;
  debugText("changed name" + "<br/> " + name);
  
};

let hasIcon = function(icon) {
  if(icon != undefined && icon != "") {
    return true;
  }
  return false;
}

let changeIcon = function(icon) {
  let dialogIconEl = document.getElementById('dialog-icon');
  let icon_image_url = getIcon(icon);

  dialogIconEl.setAttribute('style', "background: url('./media/" +icon_image_url+"') no-repeat center center cover;");

}

let getIcon = function(iconName) {
  switch(iconName) {
    case 'UWUnormal.png':
      return 'uwu-icon-normal.png';
      break;
  }
  return iconName;
}

let getARImage = function(arimage) {
  switch(arimage) {
    case 'uwucoffee':
      return 'uwu-coffee';
      break;
    case 'owopc': 
      return 'owo-pc';
      break;
    case 'uwuneko':
      return 'uwu-neko';
      break;
    case 'owopewdiepie':
      return 'owo-pewdiepie';
      break;
  }
  return 'nothing';
}

let hasSound = function(dialog) {

}

let hasOption = function(option) {
  if(option) {
    return true;
  }
  return false;
}

let hasARImage = function(dialog) {
  if(dialog.ar_image != undefined) {
    console.log('ar image found ');
    console.log(dialog.ar_image);
    return true;
  }
  return false;
}

let hasEnding = function(dialog) {
  if(dialog.end === true && dialog.end != undefined ) {
    console.log('Reached end of story');
    return true;
  }
  return false;
}

let hasJump = function(dialog) {
  console.log('checking jump');
  console.log(dialog);
  console.log(dialog.jump);
  console.log(Number.isInteger(dialog.jump));
  if( Number.isInteger(dialog.jump) && dialog.jump != undefined ) {
    console.log('Reached a jump');
    goToChapter(dialog.jump);
    return true;
  }
  return false;
}

let hasTransition = function(dialog) {
  if( dialog.transition != "" && dialog.transition != undefined ) {
    console.log('Reached a transition');
    displayTransition(dialog.transition);
    return true;
  }
  return false;
}

let displayTransition = function() {
  document.getElementsByTagName('body')[0].setAttribute('style', 'display: none;');
  setTimeout(function() {
    document.getElementsByTagName('body')[0].removeAttribute('style');
  }, 2000);
}


let hasOptionDialog = function(action_dialog) {
  if(action_dialog === []) {
    return false;
  }
  return true;
}

let changeARImage = function(image) {
  let arImage = document.getElementById('uwu-plane');
  arImage.setAttribute('src', '#' + getARImage(image));
  console.log('swapped images');

}
let hasOptionsUI = function(dialog) {

}

let displayOptions = function(dialog) {

}

let getOptions = function(options) {

}

let addParticles = function() {
  let scene_el = document.getElementById('scene');
  let particle_el = document.createElement('a-entity');
  console.log('adding particles');
  particle_el.setAttribute('particles', 'texture: ./media/coffee; color: blue; velocity: 0 10 0; velocity-spread: 2 0 2; acceleration: 0 -10 0');

  let uwu_el = document.getElementById('uwu-plane');
  uwu_el.setAttribute('particles', 'texture: ./media/coffee.png; color: blue; velocity: 0 10 0; velocity-spread: 2 0 2; acceleration: 0 -10 0')
  scene_el.appendChild(particle_el);
}



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
    // const debug_text_dialog = document.getElementById(debug_text_dialog_id);
    // const story_text_dialog = document.getElementById(dialog_text_id);
    console.log('CHAPTER on key down is: ' );
    console.log(current_chapter);
    let dialogue = chapter[current_chapter];
    if(dialogue != undefined ) {
      debugText('dialogue requested');
      debugText(dialogue);
    } else if( hasEnding(chapter[current_chapter-1]) ) {
      console.log('previous chapter had ending');
      setTimeout(function() {
        console.log('redirecting to ending link');
        console.log(chapter[current_chapter-1].link_to);
        window.location.replace(chapter[current_chapter-1].link_to);
      },3000)
    }
    

    changeDialogue(dialogue);
    hasTransition(dialogue);
    hasJump(dialogue);
    
    if( hasARImage(dialogue) ) {
      console.log('swapping ar image');
      changeARImage(dialogue.ar_image);
    }
    if( hasIcon(dialogue.top_left_image) ) {
      changeIcon(dialogue.top_left_image);
      console.log("changed icon");
      console.log(dialogue.top_left_image);
    }
    
    if( !hasOption(chapter[current_chapter].action) ) {
      // addParticles();
      if( hasEnding(dialogue) ) {
        debugText('The End');
        setTimeout(function() {
          console.log('redirecting to ending link');
          console.log(dialogue.link_to);
        },3000)
      }
      // story_text_dialog.innerHTML = dialogue.text;
      // debug_text_dialog.innerHTML = "You clicked on the screen " + count + "times";
      debugText('Chapter ' + current_chapter);
      console.log("I was clicked!")
      
      current_chapter += 1;
    }
    
    

    this.internalState.positionRaw = null

    this.internalState.dragging = false
  }
})


