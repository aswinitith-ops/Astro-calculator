import SceneManager from './sceneManager.js';
import UIManager from './UIManager.js';
import PlanetScene from './planetSceneTemplate.js';

const Space = {
  init: function() {
    this.config = {
      perspective: 3,
      star_color: '255, 255, 255',
      speed: 0.5,
      stars_count: 1
    };
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    if (!this.context) {
      alert('Canvas context not available');
      return;
    }
    this.start();
    window.onresize = () => this.start();
    document.getElementById('enter').addEventListener('click', () => {
      const enterBtn = document.getElementById('enter');
      const moonScene = document.getElementById('moon-scene');
      const textOverlay = document.getElementById('text-overlay');
      const moonButton = document.getElementById('moon-button');
      const sidebar = document.getElementById('sidebar');
      enterBtn.style.opacity = '0';
      textOverlay.style.opacity = '0';
      setTimeout(() => {
        enterBtn.classList.add('hidden');
        textOverlay.classList.add('hidden');
        moonScene.classList.remove('hidden');
        moonScene.classList.add('visible');
        sidebar.classList.remove('hidden');
        this.moonScene = new PlanetScene({
          containerId: 'threejs-container',
          planetRadius: 10,
          planetColor: 0xffffff,
          initialCameraZ: 25,
          sidebarShift: window.innerWidth * 0.2
        }).init();
        this.uiManager = new UIManager().init(this.moonScene);
        this.moonScene.animate();
        // Показываем кнопку ">>" только после полной инициализации сцены
        setTimeout(() => {
          moonButton.classList.remove('hidden');
          moonButton.style.cssText = 'position: fixed; left: 0px;';
        }, 500); // Задержка для завершения перехода
      }, 200);
    });
  },

  start: function() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.canvas_center_x = this.canvas.width / 2;
    this.canvas_center_y = this.canvas.height / 2;

    this.stars_count = this.canvas.width / this.config.stars_count;
    this.focal_length = this.canvas.width / this.config.perspective;
    this.speed = this.config.speed * this.canvas.width / 2000;

    this.stars = [];
    for (let i = 0; i < this.stars_count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * this.canvas.width
      });
    }

    window.cancelAnimationFrame(this.animation_frame);
    this.canvas.style.opacity = 1;
    this.render();
  },

  render: function() {
    this.animation_frame = window.requestAnimationFrame(() => this.render());
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.z -= this.speed;
      if (star.z <= 0) {
        this.stars[i] = {
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          z: this.canvas.width
        };
      }

      const star_x = (star.x - this.canvas_center_x) * (this.focal_length / star.z) + this.canvas_center_x;
      const star_y = (star.y - this.canvas_center_y) * (this.focal_length / star.z) + this.canvas_center_y;
      const star_radius = Math.max(0.5, 1.4 * (this.focal_length / star.z) / 2);
      const star_opacity = 1.2 - star.z / this.canvas.width;

      this.context.fillStyle = `rgba(${this.config.star_color},${star_opacity})`;
      this.context.beginPath();
      this.context.arc(star_x, star_y, star_radius, 0, Math.PI * 2);
      this.context.fill();
    }
  },

  initializeModalControls: function() {},
  loadScene: function() {}
};

window.onload = () => Space.init();