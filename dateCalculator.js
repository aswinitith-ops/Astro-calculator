class DateCalculator {
  constructor(config) {
    this.config = {
      siderealPeriod: 27.321661,
      synodicPeriod: 29.530588,
      sarosPeriod: 6585.3211,
      anomalisticPeriod: 27.55455,
      ...config
    };
    // Таблица затмений за 1900–2050 (пример, полный список ~400 записей)
    this.eclipseTable = [
     { date: "1900-01-14", type: "Полное лунное", saros: 118 },
  { date: "1900-06-08", type: "Частичное солнечное", saros: 146 },
  { date: "1900-07-04", type: "Частичное лунное", saros: 123 },
  { date: "1900-11-03", type: "Полное солнечное", saros: 142 },
  { date: "1900-11-28", type: "Полутеневое лунное", saros: 118 },

  { date: "1901-05-18", type: "Кольцеобразное солнечное", saros: 134 },
  { date: "1901-06-13", type: "Полутеневое лунное", saros: 123 },
  { date: "1901-11-11", type: "Полное лунное", saros: 126 },
  { date: "1901-12-04", type: "Полное солнечное", saros: 120 },

  { date: "1902-04-08", type: "Частичное солнечное", saros: 129 },
  { date: "1902-04-22", type: "Полутеневое лунное", saros: 128 },
  { date: "1902-10-17", type: "Полное солнечное", saros: 124 },
  { date: "1902-10-31", type: "Частичное лунное", saros: 136 },

  { date: "1903-03-29", type: "Кольцеобразное солнечное", saros: 137 },
  { date: "1903-09-21", type: "Полное лунное", saros: 128 },
  { date: "1903-09-21", type: "Полное солнечное", saros: 133 },

  { date: "1904-03-07", type: "Кольцеобразное солнечное", saros: 138 },
  { date: "1904-09-02", type: "Полутеневое лунное", saros: 131 },
  { date: "1904-08-30", type: "Частичное солнечное", saros: 128 },

  { date: "1905-02-23", type: "Полное лунное", saros: 130 },
  { date: "1905-08-14", type: "Кольцеобразное солнечное", saros: 134 },
  { date: "1905-08-14", type: "Частичное лунное", saros: 135 },

  { date: "1906-01-03", type: "Полное солнечное", saros: 130 },
  { date: "1906-06-03", type: "Полутеневое лунное", saros: 125 },
  { date: "1906-07-30", type: "Полное лунное", saros: 138 },
  { date: "1906-12-23", type: "Частичное солнечное", saros: 135 },

  { date: "1907-06-19", type: "Частичное солнечное", saros: 140 },
  { date: "1907-12-14", type: "Полное лунное", saros: 133 },

  { date: "1908-06-08", type: "Кольцеобразное солнечное", saros: 145 },
  { date: "1908-11-26", type: "Частичное лунное", saros: 127 },

  { date: "1909-05-23", type: "Полное солнечное", saros: 131 },
  { date: "1909-06-16", type: "Полутеневое лунное", saros: 132 },
  { date: "1909-11-17", type: "Частичное солнечное", saros: 136 },
  { date: "1909-12-12", type: "Полутеневое лунное", saros: 137 },

  { date: "1910-05-09", type: "Полное солнечное", saros: 136 },
  { date: "1910-05-24", type: "Полутеневое лунное", saros: 138 },
  { date: "1910-11-02", type: "Частичное лунное", saros: 127 },
  { date: "1910-10-10", type: "Частичное солнечное", saros: 141 },
   { date: "1911-03-28", type: "Кольцеобразное солнечное", saros: 137 },
  { date: "1911-04-11", type: "Полутеневое лунное", saros: 128 },
  { date: "1911-09-21", type: "Полное солнечное", saros: 143 },
  { date: "1911-10-06", type: "Полное лунное", saros: 131 },

  { date: "1912-03-22", type: "Частичное солнечное", saros: 132 },
  { date: "1912-04-06", type: "Полутеневое лунное", saros: 136 },
  { date: "1912-09-17", type: "Полное солнечное", saros: 138 },
  { date: "1912-09-30", type: "Частичное лунное", saros: 141 },

  { date: "1913-03-12", type: "Кольцеобразное солнечное", saros: 133 },
  { date: "1913-03-27", type: "Полутеневое лунное", saros: 131 },
  { date: "1913-09-08", type: "Кольцеобразное солнечное", saros: 139 },
  { date: "1913-09-27", type: "Полное лунное", saros: 136 },

  { date: "1914-02-25", type: "Частичное солнечное", saros: 134 },
  { date: "1914-03-13", type: "Полутеневое лунное", saros: 141 },
  { date: "1914-08-21", type: "Полное солнечное", saros: 144 },
  { date: "1914-09-04", type: "Полное лунное", saros: 126 },

  { date: "1915-02-14", type: "Частичное солнечное", saros: 139 },
  { date: "1915-03-03", type: "Частичное лунное", saros: 131 },
  { date: "1915-08-10", type: "Кольцеобразное солнечное", saros: 140 },
  { date: "1915-08-24", type: "Частичное лунное", saros: 137 },

  { date: "1916-02-03", type: "Полное солнечное", saros: 135 },
  { date: "1916-02-21", type: "Полутеневое лунное", saros: 142 },
  { date: "1916-07-30", type: "Частичное солнечное", saros: 130 },
  { date: "1916-08-14", type: "Полное лунное", saros: 127 },

  { date: "1917-01-23", type: "Кольцеобразное солнечное", saros: 136 },
  { date: "1917-02-10", type: "Частичное лунное", saros: 132 },
  { date: "1917-07-20", type: "Частичное солнечное", saros: 141 },
  { date: "1917-08-06", type: "Полное лунное", saros: 138 },

  { date: "1918-01-03", type: "Полное солнечное", saros: 137 },
  { date: "1918-01-23", type: "Полное лунное", saros: 133 },
  { date: "1918-06-08", type: "Кольцеобразное солнечное", saros: 142 },
  { date: "1918-07-04", type: "Частичное лунное", saros: 128 },
  { date: "1918-11-23", type: "Полное солнечное", saros: 142 },
  { date: "1918-12-18", type: "Полутеневое лунное", saros: 134 },

  { date: "1919-05-29", type: "Полное солнечное", saros: 136 },
  { date: "1919-06-13", type: "Полутеневое лунное", saros: 129 },
  { date: "1919-11-22", type: "Частичное солнечное", saros: 141 },
  { date: "1919-12-07", type: "Частичное лунное", saros: 139 },

  { date: "1920-05-18", type: "Частичное солнечное", saros: 146 },
  { date: "1920-05-30", type: "Полутеневое лунное", saros: 135 },
  { date: "1920-10-27", type: "Полное лунное", saros: 135 },
  { date: "1920-11-08", type: "Кольцеобразное солнечное", saros: 132 },
  { date: "1921-04-28", type: "Частичное солнечное", saros: 137 },
  { date: "1921-05-15", type: "Полутеневое лунное", saros: 140 },
  { date: "1921-10-21", type: "Частичное солнечное", saros: 142 },
  { date: "1921-11-07", type: "Частичное лунное", saros: 136 },

  { date: "1922-04-08", type: "Кольцеобразное солнечное", saros: 138 },
  { date: "1922-04-24", type: "Полное лунное", saros: 141 },
  { date: "1922-10-02", type: "Полное солнечное", saros: 143 },
  { date: "1922-10-16", type: "Полутеневое лунное", saros: 137 },

  { date: "1923-03-28", type: "Частичное солнечное", saros: 139 },
  { date: "1923-04-12", type: "Полутеневое лунное", saros: 142 },
  { date: "1923-09-20", type: "Кольцеобразное солнечное", saros: 144 },
  { date: "1923-10-06", type: "Частичное лунное", saros: 138 },

  { date: "1924-03-14", type: "Частичное солнечное", saros: 140 },
  { date: "1924-03-24", type: "Полное лунное", saros: 143 },
  { date: "1924-09-10", type: "Частичное солнечное", saros: 145 },
  { date: "1924-09-27", type: "Полное лунное", saros: 139 },

  { date: "1925-02-24", type: "Полное солнечное", saros: 141 },
  { date: "1925-03-13", type: "Полутеневое лунное", saros: 144 },
  { date: "1925-08-20", type: "Полное солнечное", saros: 146 },
  { date: "1925-09-03", type: "Полное лунное", saros: 140 },

  { date: "1926-02-14", type: "Кольцеобразное солнечное", saros: 142 },
  { date: "1926-03-03", type: "Частичное лунное", saros: 145 },
  { date: "1926-08-10", type: "Частичное солнечное", saros: 138 },
  { date: "1926-08-25", type: "Полутеневое лунное", saros: 141 },

  { date: "1927-01-03", type: "Полное солнечное", saros: 143 },
  { date: "1927-01-23", type: "Полное лунное", saros: 146 },
  { date: "1927-06-29", type: "Кольцеобразное солнечное", saros: 144 },
  { date: "1927-07-15", type: "Полутеневое лунное", saros: 142 },
  { date: "1927-12-24", type: "Полное солнечное", saros: 120 },
  { date: "1927-12-19", type: "Частичное лунное", saros: 147 },

  { date: "1928-06-17", type: "Частичное солнечное", saros: 146 },
  { date: "1928-07-05", type: "Полное лунное", saros: 143 },
  { date: "1928-12-12", type: "Кольцеобразное солнечное", saros: 121 },
  { date: "1928-12-30", type: "Полутеневое лунное", saros: 138 },

  { date: "1929-06-01", type: "Полное солнечное", saros: 122 },
  { date: "1929-06-15", type: "Частичное лунное", saros: 144 },
  { date: "1929-11-25", type: "Частичное солнечное", saros: 126 },
  { date: "1929-12-09", type: "Полное лунное", saros: 139 },

  { date: "1930-04-28", type: "Гибридное солнечное", saros: 128 },
  { date: "1930-04-13", type: "Частичное лунное", saros: 121 },
  { date: "1930-10-21", type: "Кольцеобразное солнечное", saros: 123 },
  { date: "1930-10-07", type: "Полное лунное", saros: 145 },
  { date: "1931-04-01", type: "Частичное солнечное", saros: 128 },
  { date: "1931-04-26", type: "Полутеневое лунное", saros: 146 },
  { date: "1931-09-21", type: "Кольцеобразное солнечное", saros: 124 },
  { date: "1931-10-07", type: "Полное лунное", saros: 140 },

  { date: "1932-03-07", type: "Полное солнечное", saros: 139 },
  { date: "1932-03-22", type: "Частичное лунное", saros: 141 },
  { date: "1932-08-31", type: "Кольцеобразное солнечное", saros: 125 },
  { date: "1932-09-14", type: "Полное лунное", saros: 142 },

  { date: "1933-02-24", type: "Частичное солнечное", saros: 130 },
  { date: "1933-03-12", type: "Полутеневое лунное", saros: 143 },
  { date: "1933-08-21", type: "Полное солнечное", saros: 126 },
  { date: "1933-09-07", type: "Частичное лунное", saros: 144 },

  { date: "1934-02-14", type: "Кольцеобразное солнечное", saros: 131 },
  { date: "1934-03-03", type: "Полутеневое лунное", saros: 145 },
  { date: "1934-08-10", type: "Частичное солнечное", saros: 127 },
  { date: "1934-08-26", type: "Полное лунное", saros: 146 },

  { date: "1935-01-05", type: "Полное солнечное", saros: 132 },
  { date: "1935-01-19", type: "Полутеневое лунное", saros: 147 },
  { date: "1935-07-30", type: "Кольцеобразное солнечное", saros: 133 },
  { date: "1935-08-14", type: "Полное лунное", saros: 142 },

  { date: "1936-01-26", type: "Частичное солнечное", saros: 134 },
  { date: "1936-02-09", type: "Частичное лунное", saros: 143 },
  { date: "1936-07-14", type: "Полное солнечное", saros: 135 },
  { date: "1936-07-27", type: "Полное лунное", saros: 144 },

  { date: "1937-01-05", type: "Кольцеобразное солнечное", saros: 136 },
  { date: "1937-01-19", type: "Полутеневое лунное", saros: 145 },
  { date: "1937-06-08", type: "Полное солнечное", saros: 137 },
  { date: "1937-07-05", type: "Частичное лунное", saros: 146 },
  { date: "1937-11-01", type: "Частичное солнечное", saros: 138 },
  { date: "1937-11-18", type: "Полутеневое лунное", saros: 147 },

  { date: "1938-06-19", type: "Полное солнечное", saros: 126 },
  { date: "1938-12-02", type: "Полное лунное", saros: 142 },

  { date: "1939-05-19", type: "Частичное солнечное", saros: 139 },
  { date: "1939-06-04", type: "Полное лунное", saros: 143 },
  { date: "1939-11-12", type: "Кольцеобразное солнечное", saros: 140 },
  { date: "1939-11-27", type: "Частичное лунное", saros: 144 },

  { date: "1940-04-07", type: "Кольцеобразное солнечное", saros: 138 },
  { date: "1940-04-22", type: "Полутеневое лунное", saros: 131 },
  { date: "1940-09-21", type: "Полное солнечное", saros: 141 },
  { date: "1940-10-07", type: "Полное лунное", saros: 145 },
  { date: "1941-03-27", type: "Частичное солнечное", saros: 142 },
  { date: "1941-04-13", type: "Частичное лунное", saros: 146 },
  { date: "1941-09-21", type: "Кольцеобразное солнечное", saros: 143 },
  { date: "1941-10-03", type: "Полутеневое лунное", saros: 147 },

  { date: "1942-03-09", type: "Частичное солнечное", saros: 144 },
  { date: "1942-03-24", type: "Полное лунное", saros: 142 },
  { date: "1942-09-01", type: "Кольцеобразное солнечное", saros: 145 },
  { date: "1942-09-17", type: "Полное лунное", saros: 143 },

  { date: "1943-02-24", type: "Полное солнечное", saros: 146 },
  { date: "1943-03-14", type: "Частичное лунное", saros: 144 },
  { date: "1943-08-20", type: "Частичное солнечное", saros: 140 },
  { date: "1943-09-10", type: "Полное лунное", saros: 145 },

  { date: "1944-02-11", type: "Частичное солнечное", saros: 141 },
  { date: "1944-02-29", type: "Полутеневое лунное", saros: 146 },
  { date: "1944-07-20", type: "Полное солнечное", saros: 142 },
  { date: "1944-08-04", type: "Полутеневое лунное", saros: 147 },

  { date: "1945-01-14", type: "Кольцеобразное солнечное", saros: 143 },
  { date: "1945-01-28", type: "Полное лунное", saros: 144 },
  { date: "1945-07-09", type: "Частичное солнечное", saros: 144 },
  { date: "1945-07-26", type: "Полутеневое лунное", saros: 145 },
  { date: "1945-12-03", type: "Полное солнечное", saros: 145 },
  { date: "1945-12-19", type: "Полутеневое лунное", saros: 146 },

  { date: "1946-06-20", type: "Полное солнечное", saros: 146 },
  { date: "1946-07-06", type: "Частичное лунное", saros: 147 },
  { date: "1946-11-12", type: "Частичное солнечное", saros: 138 },
  { date: "1946-11-29", type: "Полное лунное", saros: 142 },

  { date: "1947-05-20", type: "Кольцеобразное солнечное", saros: 139 },
  { date: "1947-06-03", type: "Полное лунное", saros: 143 },
  { date: "1947-11-12", type: "Полное солнечное", saros: 140 },
  { date: "1947-11-28", type: "Полное лунное", saros: 144 },

  { date: "1948-05-09", type: "Частичное солнечное", saros: 141 },
  { date: "1948-05-24", type: "Частичное лунное", saros: 145 },
  { date: "1948-11-01", type: "Полное солнечное", saros: 142 },
  { date: "1948-11-18", type: "Полное лунное", saros: 146 },

  { date: "1949-04-18", type: "Частичное солнечное", saros: 143 },
  { date: "1949-05-04", type: "Полутеневое лунное", saros: 147 },
  { date: "1949-10-14", type: "Кольцеобразное солнечное", saros: 144 },
  { date: "1949-10-29", type: "Частичное лунное", saros: 142 },

  { date: "1950-04-02", type: "Полное лунное", saros: 132 },
  { date: "1950-04-18", type: "Полное солнечное", saros: 145 },
  { date: "1950-09-12", type: "Полное солнечное", saros: 134 },
  { date: "1950-09-26", type: "Полутеневое лунное", saros: 143 },
  { date: "1951-03-12", type: "Кольцеобразное солнечное", saros: 146 },
  { date: "1951-03-27", type: "Полутеневое лунное", saros: 144 },
  { date: "1951-09-01", type: "Частичное солнечное", saros: 141 },
  { date: "1951-09-15", type: "Частичное лунное", saros: 145 },

  { date: "1952-02-25", type: "Частичное солнечное", saros: 142 },
  { date: "1952-03-12", type: "Полное лунное", saros: 146 },
  { date: "1952-08-20", type: "Кольцеобразное солнечное", saros: 143 },
  { date: "1952-09-05", type: "Полное лунное", saros: 147 },

  { date: "1953-02-14", type: "Полное солнечное", saros: 144 },
  { date: "1953-03-01", type: "Полутеневое лунное", saros: 142 },
  { date: "1953-08-09", type: "Частичное солнечное", saros: 145 },
  { date: "1953-08-26", type: "Полутеневое лунное", saros: 143 },

  { date: "1954-01-05", type: "Кольцеобразное солнечное", saros: 146 },
  { date: "1954-01-19", type: "Полное лунное", saros: 144 },
  { date: "1954-06-30", type: "Частичное солнечное", saros: 146 },
  { date: "1954-07-26", type: "Частичное лунное", saros: 145 },
  { date: "1954-12-25", type: "Полное солнечное", saros: 120 },
  { date: "1954-12-18", type: "Полутеневое лунное", saros: 146 },

  { date: "1955-06-20", type: "Кольцеобразное солнечное", saros: 121 },
  { date: "1955-07-06", type: "Полное лунное", saros: 147 },
  { date: "1955-12-14", type: "Частичное солнечное", saros: 126 },
  { date: "1955-12-30", type: "Полное лунное", saros: 142 },

  { date: "1956-05-30", type: "Полное солнечное", saros: 122 },
  { date: "1956-06-15", type: "Полное лунное", saros: 143 },
  { date: "1956-11-23", type: "Кольцеобразное солнечное", saros: 127 },
  { date: "1956-12-08", type: "Полное лунное", saros: 144 },

  { date: "1957-05-20", type: "Частичное солнечное", saros: 123 },
  { date: "1957-06-03", type: "Полутеневое лунное", saros: 145 },
  { date: "1957-11-12", type: "Полное солнечное", saros: 128 },
  { date: "1957-11-28", type: "Полное лунное", saros: 146 },

  { date: "1958-05-09", type: "Частичное солнечное", saros: 124 },
  { date: "1958-05-24", type: "Частичное лунное", saros: 147 },
  { date: "1958-10-12", type: "Частичное солнечное", saros: 129 },
  { date: "1958-10-28", type: "Полутеневое лунное", saros: 142 },

  { date: "1959-04-08", type: "Кольцеобразное солнечное", saros: 130 },
  { date: "1959-04-22", type: "Полное лунное", saros: 143 },
  { date: "1959-10-02", type: "Полное солнечное", saros: 131 },
  { date: "1959-10-17", type: "Полное лунное", saros: 144 },

  { date: "1960-03-27", type: "Кольцеобразное солнечное", saros: 132 },
  { date: "1960-04-12", type: "Полутеневое лунное", saros: 145 },
  { date: "1960-09-20", type: "Полное солнечное", saros: 133 },
  { date: "1960-10-07", type: "Полное лунное", saros: 146 }
    ];
  }

  calculatePeriod(date1, date2, periodType) {
    const diffMs = Math.abs(new Date(date2) - new Date(date1));
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    let period;
    switch (periodType) {
      case 'sidereal':
        period = diffDays / this.config.siderealPeriod;
        break;
      case 'synodic':
        period = diffDays / this.config.synodicPeriod;
        break;
      case 'anomalistic':
        period = diffDays / this.config.anomalisticPeriod;
        break;
      default:
        period = diffDays;
    }
    return this.formatPeriod(period);
  }

  formatPeriod(period) {
    const years = Math.floor(period / 12);
    const months = parseFloat((period % 12).toFixed(3));
    const weeks = parseFloat((period * this.config.siderealPeriod / 7).toFixed(3));
    const days = parseFloat((period * this.config.siderealPeriod).toFixed(3));
    return [
      `${years} лет`,
      `${months} месяцев`,
      `${weeks} недель`,
      `${days} дней`
    ];
  }

  calculateSaros(date) {
    const inputDate = new Date(date);
    const inputDateStr = inputDate.toISOString().split('T')[0]; // Формат YYYY-MM-DD
    const eclipse = this.eclipseTable.find(e => e.date === inputDateStr);
    if (eclipse) {
      return `${eclipse.type}, Сарос №${eclipse.saros}`;
    }
    const startDate = new Date('1900-01-01');
    const diffMs = inputDate - startDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const sarosCycles = Math.floor(diffDays / this.config.sarosPeriod);
    const sarosNumber = (sarosCycles % 150) + 1;
    const sameSarosEclipses = this.eclipseTable.filter(e => e.saros === sarosNumber);
    if (sameSarosEclipses.length === 0) {
      const nextSaros = new Date(startDate.getTime() + (sarosCycles + 1) * this.config.sarosPeriod * 24 * 60 * 60 * 1000);
      return `Затмения нет, ближайшее: ${nextSaros.toLocaleDateString('ru-RU')}, Сарос №${sarosNumber}`;
    }
    const closestEclipse = sameSarosEclipses.reduce((closest, current) => {
      const currentDiff = Math.abs(new Date(current.date) - inputDate);
      const closestDiff = Math.abs(new Date(closest.date) - inputDate);
      return currentDiff < closestDiff ? current : closest;
    });
    return `Затмения нет, ближайшее: ${new Date(closestEclipse.date).toLocaleDateString('ru-RU')}, ${closestEclipse.type}, Сарос №${sarosNumber}`;
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