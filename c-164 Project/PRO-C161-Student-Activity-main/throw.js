

//Compare

//Teacher Work
AFRAME.registerComponent("bowling-ball", {
    init: function () {
      this.throwBall();
    },
    throwBall: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var ball = document.createElement("a-entity");
  
          ball.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.05,
          });
  
          ball.setAttribute("material", "color", "black");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          ball.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          ball.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");
          
          ball.setAttribute("dynamic-body",{
            shape:"sphere",
            mass:"0"
          })
          ball.addEventListener("collide",this.removeBall)

          scene.appendChild(ball);
        }
      });
    },

    removeBall: function (e) {
      //Original entity (bullet)
      console.log(e.detail.target.el);
  
      //Other entity, which bullet touched.
      console.log(e.detail.body.el);
  
      //bullet element
      var element=e.detail.target.el
  
      //element which is hit
      var elementHit=e.detail.body.el
  
      if (elementHit.id.includes("pin")) 
        {
          //set material attribute
          elementHit.setAttribute("material",{
            opacity:0.6,
            transparent:true
          })
  
          //impulse and point vector
          var Impulse=new CANNON.Vec3(-2,2,1)
          var worldPoint=new CANNON.Vec3().copy(elementHit.getAttribute("position"))
          elementHit.body.applyImpulse(Impulse,worldPoint)
  
  
          //remove event listener
          element.removeEventListener("collide",this.shootBall)
          
          //remove the bullets from the scene
          var scene=document.querySelector("#scene")
          scene.removeChild("element")
      }
    },
  });