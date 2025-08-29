class DateCalculator {
  constructor(config) {
    this.config = {
      siderealPeriod: 27.321661,
      synodicPeriod: 29.530588,
      sarosPeriod: 6585.3211,
      anomalisticPeriod: 27.55455,
      ...config
    };
  }

  calculatePeriod(date1, date2, periodType) {
    const diffMs = Math.abs(new Date(date2) - new Date(date1));
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return this.formatPeriod(diffDays);
  }

  formatPeriod(diffDays) {
    const years = Math.floor(diffDays / 365.25);
    const months = Math.floor(diffDays / 30.42);
    const weeks = Math.floor(diffDays / 7);
    const days = Math.floor(diffDays);

    const pluralize = (num, singular, plural2to4, plural5plus) => {
      if (num % 10 === 1 && num % 100 !== 11) return singular;
      if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) return plural2to4;
      return plural5plus;
    };

    return [
      years > 0 ? `${years} ${pluralize(years, 'год', 'года', 'лет')} ${Math.floor((diffDays % 365.25) / 30.42)} ${pluralize(Math.floor((diffDays % 365.25) / 30.42), 'месяц', 'месяца', 'месяцев')} ${Math.floor(diffDays % 30.42)} ${pluralize(Math.floor(diffDays % 30.42), 'день', 'дня', 'дней')}` : '',
      years > 0 ? `${years} ${pluralize(years, 'год', 'года', 'лет')} ${Math.floor((diffDays % 365.25) / 7)} ${pluralize(Math.floor((diffDays % 365.25) / 7), 'неделя', 'недели', 'недель')} ${Math.floor(diffDays % 7)} ${pluralize(Math.floor(diffDays % 7), 'день', 'дня', 'дней')}` : '',
      years > 0 ? `${years} ${pluralize(years, 'год', 'года', 'лет')} ${Math.floor(diffDays % 365.25)} ${pluralize(Math.floor(diffDays % 365.25), 'день', 'дня', 'дней')}` : '',
      months > 0 ? `${months} ${pluralize(months, 'месяц', 'месяца', 'месяцев')} ${Math.floor(diffDays % 30.42)} ${pluralize(Math.floor(diffDays % 30.42), 'день', 'дня', 'дней')}` : '',
      weeks > 0 ? `${weeks} ${pluralize(weeks, 'неделя', 'недели', 'недель')} ${Math.floor(diffDays % 7)} ${pluralize(Math.floor(diffDays % 7), 'день', 'дня', 'дней')}` : '',
      `${days} ${pluralize(days, 'день', 'дня', 'дней')}`
    ].filter(line => line !== '');
  }

  calculateSaros(date) {
    const startDate = new Date('1923-01-01');
    const diffMs = new Date(date) - startDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const sarosCycles = Math.floor(diffDays / this.config.sarosPeriod);
    const nextSaros = new Date(startDate.getTime() + (sarosCycles + 1) * this.config.sarosPeriod * 24 * 60 * 60 * 1000);
    return `Сарос цикл №${sarosCycles + 1}, следующий: ${nextSaros.toLocaleDateString('ru-RU')}`;
  }

  calculatePhase(date) {
    const startDate = new Date('1923-01-01');
    const diffMs = new Date(date) - startDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const phaseCycle = diffDays % this.config.synodicPeriod;
    const phasePercent = phaseCycle / this.config.synodicPeriod;
    let phase;
    if (phasePercent < 0.125) phase = 'Новолуние';
    else if (phasePercent < 0.25) phase = 'Растущий серп';
    else if (phasePercent < 0.375) phase = 'Первая четверть';
    else if (phasePercent < 0.5) phase = 'Растущая Луна';
    else if (phasePercent < 0.625) phase = 'Полнолуние';
    else if (phasePercent < 0.75) phase = 'Убывающая Луна';
    else if (phasePercent < 0.875) phase = 'Последняя четверть';
    else phase = 'Убывающий серп';
    return `Фаза Луны: ${phase}`;
  }

  calculateLunarMonth(date) {
    const startDate = new Date('1923-01-01');
    const diffMs = new Date(date) - startDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const lunarMonths = Math.floor(diffDays / this.config.synodicPeriod);
    return `Порядковый номер лунного месяца: ${lunarMonths + 1}`;
  }
}

export default DateCalculator;