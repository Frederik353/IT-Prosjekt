
let scene, camera, render, renderer, stars, starGeometry;


function init() {
  // setter opp scene
    scene = new THREE.Scene()
  // setter oppkamera
    camera = new THREE.PerspectiveCamera(50, 600/400,1,1000)
    camera.position.x = 0
    camera.position.y = 0 // 40
    camera.position.z = 60


    hlight = new THREE.AmbientLight(0x101010, 100)
    scene.add(hlight)

     // setter lys på midten under rakketen for at det skal se ut som flammer står ut av raketten
    directionalLight = new THREE.DirectionalLight(0xff4500,50)
    directionalLight.position.set(0,-10,0)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // legger til lys på forskjellige steder point
    light = new THREE.PointLight(0xc4c4cc4, 10)
    light.position.set(0, 300, 500)
    scene.add(light)
 
    light2 = new THREE.PointLight(0xc4c4c4, 10)
    light.position.set(500000, 500, 100)
    scene.add(light2)

    light3 = new THREE.PointLight(0xc4c4c4, 10)
    light.position.set(0, 100, -500)
    scene.add(light3)

    light4 = new THREE.PointLight(0xc4c4cc4, 10)
    light.position.set(-5000, 300, 0)
    scene.add(light4)

    container = document.getElementById( 'canvas' );
    document.body.appendChild( container );

    // setter opp renderer
    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(600,400)
    

    container.appendChild( renderer.domElement );
    // var controls = new THREE.OrbitControls( camera );

    let loader = new THREE.GLTFLoader()
    loader.load('../3d-obj-loader/assets/scene.gltf', function(gltf){
        rocket = gltf.scene.children[0]
        // flytter modellen nermere midten av skjermen
        rocket.position.y = -17
        rocket.position.z = 10
        // legger til modellen på scenen
        scene.add(gltf.scene)
        animate();
    })

    // lager geometri og materiale felles for alle stjerner 
    starGeometry = new THREE.Geometry();
      // lager tildeldige kordinater for stjernene
      for(let i=0;i<6000;i++) {
        star = new THREE.Vector3(
          Math.random() * 600 - 300,
          Math.random() * 600 - 300,
          Math.random() * 600 - 300
        );
        star.velocity = 0;
        star.acceleration = 0.02;
        starGeometry.vertices.push(star);
      }
      // legger til bilde over stjerne geometrien i steden for å lage tusenvis av kuleformer som ville brukt alt for mye prossesor kraft
      let sprite = new THREE.TextureLoader().load( './Pictures/dot.png' );
      let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
      });

      stars = new THREE.Points(starGeometry,starMaterial);
      scene.add(stars);
      animate(); 
}


function animate() {
    starGeometry.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.y -= p.velocity;
        
        if (p.y < -200) {
          p.y = 200;
          p.velocity = 0;
        }
      });
      starGeometry.verticesNeedUpdate = true;
      stars.rotation.y +=0.002;
    rocket.rotateZ(0.01);
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
  }
init()
