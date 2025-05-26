# Historical Dates

Интерактивный компонент для отображения исторических периодов с круговой навигацией и анимированными переходами.

## 🚀 Особенности

- **Круговая навигация** - точки расположены по кругу с активной позицией в правом верхнем углу (30°)
- **Плавные анимации** - использует GSAP для smooth переходов между периодами
- **Адаптивный дизайн** - работает на всех устройствах
- **Ленивая загрузка** - EventSlider загружается только когда нужен
- **TypeScript** - полная типизация для лучшей разработки

## 🛠 Технологии

- **React 18** с хуками
- **TypeScript** для типизации
- **GSAP** для анимаций
- **SCSS** для стилизации
- **Webpack 5** для сборки
- **Swiper** для слайдера событий

## 📦 Установка

```bash
# Клонировать репозиторий
git clone https://github.com/JackBabayan/historical-dates.git

# Перейти в директорию
cd historical-dates

# Установить зависимости
npm install
```

## 🚦 Запуск

```bash
# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build

# Проверка типов TypeScript
npm run type-check
```

## 📁 Структура проекта

```
src/
├── components/
│   ├── HistoricalDates/
│   │   ├── HistoricalDates.tsx     # Основной компонент
│   │   └── HistoricalDates.scss    # Стили компонента
│   └── EventSlider/
│       ├── EventSlider.tsx         # Слайдер событий
│       └── EventSlider.scss        # Стили слайдера
├── styles/
│   └── _variables.scss             # SCSS переменные
├── types/
│   └── index.ts                    # TypeScript типы
└── utils/
    └── gsap.ts                     # Конфигурация GSAP
```

## 🎛 Конфигурация

### Настройка позиции активной точки

В файле `HistoricalDates.tsx`:

```typescript
// Угол для активной позиции (30° от горизонтали)
const ACTIVE_POSITION_ANGLE = 30;
```

### Настройка переменных стилей

В файле `_variables.scss`:

```scss
// Основные цвета
$primary-color: #42567A;
$blue-color: #5D5FEF;
$pink-color: #EF5DA8;
$accent-color: #3877EE;
$background-color: #F4F5F9;

// Размеры шрифтов
$h1: 200px;
$h2: 56px;
$h4: 20px;

// Отступы
$wrapperPaddingLeftRight: 80px;
$wrapperPaddingTop: 170px;
```

## 📊 Формат данных

Компонент ожидает массив объектов типа `Period`:

```typescript
interface Event {
  id: number;
  year: number;
  description: string;
}

interface Period {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  events: Event[];
}
```

### Пример данных:

```typescript
const data: Period[] = [
  {
    id: 1,
    name: "Наука",
    startYear: 2015,
    endYear: 2022,
    events: [
      { id: 1, year: 2015, description: "Открытие гравитационных волн" },
      { id: 2, year: 2020, description: "Первые снимки черной дыры" }
    ]
  },
  // ... другие периоды
];
```

## 🎨 Кастомизация

### Изменение анимаций

В `HistoricalDates.tsx` можно настроить параметры анимации:

```typescript
// Скорость поворота круга
gsap.to(circleRef.current, {
  rotation: targetRotation,
  duration: 0.8,        // Длительность анимации
  ease: "power2.inOut"  // Тип easing'а
});
```

### Настройка адаптивности

В `HistoricalDates.scss`:

```scss
@media (max-width: $desktop) {
  .historical-dates {
    &__circle-wrapper {
      width: 350px;  // Размер для мобильных
      height: 350px;
    }
  }
}
```

## 🔧 Webpack конфигурация

Проект использует кастомную Webpack конфигурацию с:

- **Hot Module Replacement** для быстрой разработки
- **Code Splitting** для оптимизации bundle'а
- **SCSS поддержка** с source maps
- **TypeScript компиляция** с ts-loader

## 📈 Оптимизация

- **Ленивая загрузка** EventSlider компонента
- **Tree shaking** для GSAP
- **Разделение vendor'ов** в отдельные chunks
- **CSS экстракция** в production

## 🤝 Разработка

### Добавление нового периода

1. Обновите массив данных
2. Убедитесь, что все поля заполнены корректно
3. Компонент автоматически пересчитает углы для новых точек

### Добавление новых анимаций

1. Импортируйте нужные GSAP плагины в `utils/gsap.ts`
2. Зарегистрируйте их с помощью `gsap.registerPlugin()`
3. Используйте в компонентах

## 📄 Лицензия

MIT License

## 👨‍💻 Автор

Jack Babayan - [@JackBabayan](https://github.com/JackBabayan)

---

**Создано с ❤️ для отображения исторических данных**