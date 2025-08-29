import SceneManager from './sceneManager.js';
import DateCalculator from './dateCalculator.js';

class PlanetScene {
  constructor(config) {
    this.config = {
      containerId: 'threejs-container',
      planetRadius: 5,
      planetColor: 0xffffff,
      initialCameraZ: 30,
      siderealPeriod: 27.32,
      synodicPeriod: 29.53,
      buttons: [
        { text: 'Сидерические', action: 'calculator' },
        { text: 'Синодические', action: 'synodic' },
        { text: 'Сарос', action: 'section3' },
        { text: 'Перигеи', action: 'perigee' },
        { text: 'Фаза', action: 'section5' },
        { text: 'Номер', action: 'section6' }
      ],
      ...config
    };
    this.sceneManager = null;
    this.calculator = null;
  }

  init() {
    this.sceneManager = new SceneManager({
      planetRadius: this.config.planetRadius,
      planetColor: this.config.planetColor,
      initialCameraZ: this.config.initialCameraZ,
      minDistance: 5,
      maxDistance: 150
    }).init(this.config.containerId);
    return this;
  }

  animate() {
    if (this.sceneManager) {
      this.sceneManager.animate();
    }
  }

  updateCameraPosition(isShifted) {
    if (this.sceneManager) {
      this.sceneManager.updateCameraPosition(isShifted);
    }
  }

  getCalculator() {
    if (!this.calculator) {
      this.calculator = new DateCalculator({
        siderealPeriod: this.config.siderealPeriod,
        synodicPeriod: this.config.synodicPeriod
      });
    }
    return this.calculator;
  }
}

export default PlanetScene;