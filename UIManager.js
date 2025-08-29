class UIManager {
  constructor(config) {
    this.config = {
      sidebarId: 'sidebar',
      moonButtonId: 'moon-button',
      moonSceneId: 'moon-scene',
      closeButtonId: 'close-button',
      shiftDistance: 300,
      ...config
    };
    this.moonButton = null;
    this.sidebar = null;
    this.moonScene = null;
    this.closeButton = null;
    this.scene = null;
    this.calculator = null;
  }

  init(scene) {
    this.scene = scene;
    this.calculator = scene.getCalculator();
    this.moonButton = document.getElementById(this.config.moonButtonId);
    this.sidebar = document.getElementById(this.config.sidebarId);
    this.moonScene = document.getElementById(this.config.moonSceneId);
    this.closeButton = document.getElementById(this.config.closeButtonId);
    if (!this.moonButton || !this.sidebar || !this.closeButton) {
      console.error('Required UI elements not found');
      return;
    }

    this.renderButtons();
    this.setupEventListeners();
    return this;
  }

  renderButtons() {
    const navContainer = document.createElement('div');
    navContainer.className = 'nav-container';
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexWrap = 'wrap';
    buttonContainer.style.gap = '5px';
    buttonContainer.style.padding = '10px';
    buttonContainer.style.justifyContent = 'center';

    const calcContainers = {};
    this.scene.config.buttons.forEach((button, index) => {
      const btn = document.createElement('button');
      btn.className = 'nav-button';
      btn.textContent = button.text;
      btn.dataset.action = button.action;
      if (index === 0) btn.classList.add('active');
      buttonContainer.appendChild(btn);

      const calcContainer = document.createElement('div');
      calcContainer.className = `calc-container calc-${button.action}`;
      calcContainer.style.display = index === 0 ? 'block' : 'none';
      calcContainer.style.padding = '10px';
      calcContainer.style.background = '#2a2a2a';
      calcContainer.style.borderRadius = '6px';
      calcContainer.style.margin = '10px';
      calcContainer.style.color = 'white';
      calcContainer.style.fontFamily = '"Roboto", sans-serif';
      calcContainer.style.fontSize = '14px';

      const inputContainer = document.createElement('div');
      inputContainer.style.marginBottom = '10px';

      const needsTwoDates = ['calculator', 'synodic', 'perigee'].includes(button.action);
      if (needsTwoDates) {
        const date1Input = document.createElement('input');
        date1Input.type = 'date';
        date1Input.style.margin = '5px';
        date1Input.style.padding = '5px';
        date1Input.style.borderRadius = '4px';
        date1Input.style.width = '150px';
        inputContainer.appendChild(date1Input);

        const date2Input = document.createElement('input');
        date2Input.type = 'date';
        date2Input.style.margin = '5px';
        date2Input.style.padding = '5px';
        date2Input.style.borderRadius = '4px';
        date2Input.style.width = '150px';
        inputContainer.appendChild(date2Input);
      } else {
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.style.margin = '5px';
        dateInput.style.padding = '5px';
        dateInput.style.borderRadius = '4px';
        dateInput.style.width = '150px';
        inputContainer.appendChild(dateInput);
      }

      calcContainer.appendChild(inputContainer);

      const resultDiv = document.createElement('div');
      resultDiv.className = `result-${button.action}`;
      resultDiv.style.whiteSpace = 'pre-line';
      calcContainer.appendChild(resultDiv);

      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = `description-${button.action}`;
      descriptionDiv.style.marginTop = '10px';
      descriptionDiv.style.fontSize = '12px';
      descriptionDiv.style.opacity = '0.8';
      descriptionDiv.textContent = this.getDescription(button.action);
      calcContainer.appendChild(descriptionDiv);

      calcContainers[button.action] = calcContainer;
    });

    navContainer.appendChild(buttonContainer);

    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    resultContainer.style.margin = '10px';
    Object.values(calcContainers).forEach(container => {
      resultContainer.appendChild(container);
    });
    navContainer.appendChild(resultContainer);

    this.sidebar.insertBefore(navContainer, this.closeButton);
  }

  getDescription(action) {
    switch (action) {
      case 'calculator':
        return 'Рассчитывает разницу между двумя датами в годах, месяцах, неделях и днях с учётом сидерического периода Луны (около 27.32 дней).';
      case 'synodic':
        return 'Рассчитывает разницу между двумя датами в годах, месяцах, неделях и днях с учётом синодического периода Луны (около 29.53 дней).';
      case 'section3':
        return 'Определяет номер цикла Сарос для введённой даты и дату следующего затмения.';
      case 'perigee':
        return 'Рассчитывает разницу между двумя датами в годах, месяцах, неделях и днях с учётом аномалистического периода Луны (около 27.55 дней).';
      case 'section5':
        return 'Определяет текущую фазу Луны (например, новолуние, полнолуние) для введённой даты.';
      case 'section6':
        return 'Рассчитывает порядковый номер лунного месяца с начала 1923 года для введённой даты.';
      default:
        return '';
    }
  }

  setupEventListeners() {
    this.moonButton.addEventListener('click', () => {
      console.log('Клик по moon-button'); // Отладка
      const isOpen = !this.sidebar.classList.contains('closed');
      if (isOpen) {
        this.sidebar.classList.add('closed');
        this.moonScene.classList.remove('shifted');
        this.moonButton.style.left = '0px';
        this.moonButton.textContent = '>>';
      } else {
        this.sidebar.classList.remove('closed');
        this.moonScene.classList.add('shifted');
        this.moonButton.classList.add('hidden');
        requestAnimationFrame(() => {
          this.closeButton.focus();
        });
      }
      if (this.scene && this.scene.sceneManager) {
        this.scene.sceneManager.updateCameraPosition(!isOpen);
      }
    });

    this.closeButton.addEventListener('click', () => {
      this.sidebar.classList.add('closed');
      this.moonScene.classList.remove('shifted');
      this.moonButton.classList.remove('hidden');
      this.moonButton.style.left = '0px';
      this.moonButton.textContent = '>>';
      if (this.scene && this.scene.sceneManager) {
        this.scene.sceneManager.updateCameraPosition(false);
      }
    });

    this.sidebar.querySelectorAll('.nav-button').forEach((button, index) => {
      button.addEventListener('click', () => {
        this.sidebar.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.sidebar.querySelectorAll('.calc-container').forEach(container => container.style.display = 'none');
        const calcContainer = this.sidebar.querySelector(`.calc-${button.dataset.action}`);
        calcContainer.style.display = 'block';

        const action = button.dataset.action;
        const inputs = calcContainer.querySelectorAll('input[type="date"]');
        const resultDiv = calcContainer.querySelector(`.result-${action}`);

        const updateResult = () => {
          if (inputs.length === 2) {
            const [date1, date2] = inputs;
            if (date1.value && date2.value) {
              let result;
              switch (action) {
                case 'calculator':
                  result = this.calculator.calculatePeriod(date1.value, date2.value, 'sidereal');
                  break;
                case 'synodic':
                  result = this.calculator.calculatePeriod(date1.value, date2.value, 'synodic');
                  break;
                case 'perigee':
                  result = this.calculator.calculatePeriod(date1.value, date2.value, 'anomalistic');
                  break;
              }
              resultDiv.textContent = result.join('\n');
            }
          } else if (inputs.length === 1 && inputs[0].value) {
            switch (action) {
              case 'section3':
                resultDiv.textContent = this.calculator.calculateSaros(inputs[0].value);
                break;
              case 'section5':
                resultDiv.textContent = this.calculator.calculatePhase(inputs[0].value);
                break;
              case 'section6':
                resultDiv.textContent = this.calculator.calculateLunarMonth(inputs[0].value);
                break;
            }
          }
        };

        inputs.forEach(input => {
          input.removeEventListener('change', updateResult);
          input.addEventListener('change', updateResult);
        });
        updateResult();
      });
    });
  }
}

export default UIManager;