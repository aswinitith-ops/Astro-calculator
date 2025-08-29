let scene, camera, renderer, stars, nebulas = [], controls, starGeometry, twinklingStars = [], moon;

function initThreeJS() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.z = 30;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const container = document.getElementById('threejs-container');
  if (!container) {
    console.error('ThreeJS container not found');
    return;
  }
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.minDistance = 5;
  controls.maxDistance = 150;
  controls.target.set(0, 0, 0);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  const moonRadius = 5;
  const moonGeometry = new THREE.SphereGeometry(moonRadius, 64, 64);
  const moonMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 1
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(0, 0, 0);
  scene.add(moon);

  starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const starPositions = [];
  const starColors = [];

  for (let i = 0; i < starCount; i++) {
    starPositions.push(
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000
    );

    const rand = Math.random();
    if (rand < 0.6) starColors.push(1, 1, 1);
    else if (rand < 0.85) starColors.push(0.6, 0.8, 1);
    else starColors.push(0.3, 0.6, 1);

    if (Math.random() < 0.1) twinklingStars.push(i);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.9
  });

  stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  updateCameraPosition();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  const colors = starGeometry.attributes.color.array;
  twinklingStars.forEach((i, idx) => {
    const intensity = 0.5 + Math.sin(Date.now() * 0.002 + idx) * 0.5;
    colors[i * 3] *= intensity;
    colors[i * 3 + 1] *= intensity;
    colors[i * 3 + 2] *= intensity;
  });
  starGeometry.attributes.color.needsUpdate = true;
  renderer.render(scene, camera);
}

function updateCameraPosition() {
  const moonScene = document.getElementById('moon-scene');
  if (moonScene.classList.contains('shifted')) {
    const targetDistance = controls.getDistance();
    camera.position.x = -150 + (targetDistance * 0.1);
    controls.target.set(-150, 0, 0);
  } else {
    camera.position.x = 0;
    controls.target.set(0, 0, 0);
  }
  camera.updateProjectionMatrix();
  controls.update();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThreeJS);
} else {
  initThreeJS();
}

animate();