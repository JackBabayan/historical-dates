import { Period } from '@/types';

export const historicalData: Period[] = [
  {
    id: 1,
    name: 'Наука',
    startYear: 2015,
    endYear: 2022,
    events: [
      { year: 2015, description: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды' },
      { year: 2016, description: 'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11' },
      { year: 2017, description: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi' },
      { year: 2018, description: 'Китайская станция «Чанъэ-4» совершила первую в истории мягкую посадку на обратной стороне Луны' },
      { year: 2019, description: 'Google объявил о достижении квантового превосходства' },
      { year: 2020, description: 'SpaceX запустила первую частную пилотируемую миссию к МКС' }
    ]
  },
  {
    id: 2,
    name: 'Кино',
    startYear: 1987,
    endYear: 1991,
    events: [
      { year: 1987, description: 'Премьера фильма «Робокоп» Пола Верховена' },
      { year: 1988, description: 'Премьера фильма «Человек дождя» с Дастином Хоффманом' },
      { year: 1989, description: 'Премьера фильма «Назад в будущее 2» Роберта Земекиса' },
      { year: 1990, description: 'Премьера фильма «Танцы с волками» Кевина Костнера' },
      { year: 1991, description: 'Премьера фильма «Молчание ягнят» Джонатана Демме' }
    ]
  },
  {
    id: 3,
    name: 'Литература',
    startYear: 1992,
    endYear: 1997,
    events: [
      { year: 1992, description: 'Публикация романа «Английский пациент» Майкла Ондатже' },
      { year: 1993, description: 'Нобелевская премия по литературе присуждена Тони Моррисон' },
      { year: 1994, description: 'Публикация романа «Форрест Гамп» Уинстона Грума' },
      { year: 1995, description: 'Публикация первой книги серии «Темные начала» Филипа Пулмана' },
      { year: 1996, description: 'Публикация романа «Игра престолов» Джорджа Мартина' },
      { year: 1997, description: 'Публикация первой книги о Гарри Поттере Дж. К. Роулинг' }
    ]
  },
  {
    id: 4,
    name: 'Технологии',
    startYear: 1999,
    endYear: 2004,
    events: [
      { year: 1999, description: 'Запуск сервиса Napster, революционизировавшего обмен музыкой' },
      { year: 2000, description: 'Пик пузыря доткомов на фондовом рынке' },
      { year: 2001, description: 'Выпуск первого iPod компанией Apple' },
      { year: 2002, description: 'Запуск LinkedIn - первой профессиональной социальной сети' },
      { year: 2003, description: 'Основание компании Tesla Motors' },
      { year: 2004, description: 'Запуск Facebook Марком Цукербергом' }
    ]
  },
  {
    id: 5,
    name: 'Спорт',
    startYear: 2006,
    endYear: 2014,
    events: [
      { year: 2006, description: 'Чемпионат мира по футболу в Германии, победа сборной Италии' },
      { year: 2008, description: 'Летние Олимпийские игры в Пекине' },
      { year: 2010, description: 'Зимние Олимпийские игры в Ванкувере' },
      { year: 2012, description: 'Летние Олимпийские игры в Лондоне' },
      { year: 2014, description: 'Зимние Олимпийские игры в Сочи' }
    ]
  },
  {
    id: 6,
    name: 'Музыка',
    startYear: 1980,
    endYear: 1986,
    events: [
      { year: 1980, description: 'Выход альбома "Back in Black" группы AC/DC' },
      { year: 1982, description: 'Выход альбома "Thriller" Майкла Джексона' },
      { year: 1984, description: 'Выход альбома "Purple Rain" Prince' },
      { year: 1985, description: 'Концерт Live Aid в Лондоне и Филадельфии' },
      { year: 1986, description: 'Выход альбома "Slippery When Wet" группы Bon Jovi' }
    ]
  }
];