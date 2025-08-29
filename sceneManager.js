class SceneManager {
  constructor(config) {
    this.config = {
      sidebarShift: window.innerWidth * 0.3,
      planetRadius: 7,
      initialCameraZ: 20,
      minDistance: 7,
      maxDistance: 100,
      ...config
    };
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.planet = null;
    this.stars = null;
    this.starGeometry = null;
    this.twinklingStars = [];
  }

  init(containerId) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    this.camera.position.z = this.config.initialCameraZ;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById(containerId).appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enablePan = false;
    this.controls.minDistance = this.config.planetRadius + 2; // Минимальное расстояние = радиус Луны + отступ
    this.controls.maxDistance = this.config.maxDistance;
    this.controls.target.set(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    this.scene.add(directionalLight);

    this.createPlanet();
    this.createStars();

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });

    this.updateCameraPosition();
    return this;
  }

  createPlanet() {
    const planetGeometry = new THREE.SphereGeometry(this.config.planetRadius, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load('assets/textures/moon_texture.jpg');
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
      metalness: 0,
      roughness: 1
    });
    this.planet = new THREE.Mesh(planetGeometry, planetMaterial);
    this.planet.position.set(0, 0, 0);
    this.scene.add(this.planet);
  }

  createStars() {
    this.starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const starPositions = [];
    const starColors = [];
    for (let i = 0; i < starCount; i++) {
      starPositions.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
      const rand = Math.random();
      if (rand < 0.6) starColors.push(1, 1, 1);
      else if (rand < 0.85) starColors.push(0.6, 0.8, 1);
      else starColors.push(0.3, 0.6, 1);
      if (Math.random() < 0.1) this.twinklingStars.push(i);
    }
    this.starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    this.starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.5, vertexColors: true, transparent: true, opacity: 0.9
    });
    this.stars = new THREE.Points(this.starGeometry, starMaterial);
    this.scene.add(this.stars);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    const colors = this.starGeometry.attributes.color.array;
    this.twinklingStars.forEach((i, idx) => {
      const intensity = 0.5 + Math.sin(Date.now() * 0.002 + idx) * 0.5;
      colors[i * 3] *= intensity;
      colors[i * 3 + 1] *= intensity;
      colors[i * 3 + 2] *= intensity;
    });
    this.starGeometry.attributes.color.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }

  updateCameraPosition(isShifted) {
    if (isShifted) {
      this.camera.position.x = -this.config.sidebarShift / 40;
      this.camera.position.z = Math.max(this.config.planetRadius + 2, this.config.planetRadius + 15); // Не ближе радиуса + 2
      this.controls.target.set(0, 0, 0);
    } else {
      this.camera.position.x = 0;
      this.camera.position.z = Math.max(this.config.planetRadius + 2, this.config.initialCameraZ); // Не ближе радиуса + 2
      this.controls.target.set(0, 0, 0);
    }
    this.controls.update();
  }
}

export default SceneManager;