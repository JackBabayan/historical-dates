import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Period } from '../../types';
import EventSlider from '../EventSlider';
import './HistoricalDates.scss';

interface Props {
  data: Period[];
}

const HistoricalDates: React.FC<Props> = ({ data }) => {
  const [activePeriod, setActivePeriod] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null); // Добавляем ref для подписи
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Угол между точками
  const angleStep = 360 / data.length;
  
  // Угол для активной позиции (30 градусов)
  const ACTIVE_POSITION_ANGLE = 30;

  // Анимация при смене активного периода
  useEffect(() => {
    animateYears();
    rotateCircleToActivePosition();
  }, [activePeriod]);

  // Анимация смены годов
  const animateYears = () => {
    if (!yearsRef.current) return;

    const startYear = yearsRef.current.querySelector('.historical-dates__start-year');
    const endYear = yearsRef.current.querySelector('.historical-dates__end-year');

    gsap.timeline()
      .to([startYear, endYear], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          if (startYear) startYear.textContent = String(data[activePeriod].startYear);
          if (endYear) endYear.textContent = String(data[activePeriod].endYear);
        }
      })
      .to([startYear, endYear], {
        opacity: 1,
        y: 0,
        duration: 0.3
      });
  };

  const rotateCircleToActivePosition = () => {
    if (!circleRef.current) return;

    const targetRotation = ACTIVE_POSITION_ANGLE - (activePeriod * angleStep);

    // Сначала скрываем подпись
    if (labelRef.current) {
      gsap.to(labelRef.current, {
        opacity: 0,
        duration: 0
      });
    }


    gsap.to(circleRef.current, {
      rotation: targetRotation,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        if (labelRef.current) {
          labelRef.current.textContent = data[activePeriod].name;
          gsap.to(labelRef.current, {
            opacity: 1,
            duration: 0.3
          });
        }
      }
    });

    pointsRef.current.forEach((pointEl) => {
      if (pointEl) {
        const numberEl = pointEl.querySelector('.historical-dates__point-number');
        if (numberEl) {
          gsap.to(numberEl, {
            rotation: -targetRotation,
            duration: 0.8,
            ease: "power2.inOut"
          });
        }
      }
    });
  };

  // Вычисление позиции точки на окружности
  const getPointPosition = (index: number) => {
    // Начинаем с верхней точки (-90°) и добавляем смещение для каждой точки
    const angle = (index * angleStep - 90) * (Math.PI / 180);
    const radius = 50; // 50% от центра
    
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    
    return { x, y };
  };

  // Обработчики событий
  const handlePointClick = (index: number) => {
    setActivePeriod(index);
  };

  const handlePrevClick = () => {
    setActivePeriod((prev) => (prev - 1 + data.length) % data.length);
  };

  const handleNextClick = () => {
    setActivePeriod((prev) => (prev + 1) % data.length);
  };

  return (
    <div className="historical-dates">
      <h2 className="historical-dates__title">Исторические даты</h2>
      
      <div className="historical-dates__container">
        <div className="historical-dates__circle-wrapper">
          <div className="historical-dates__circle-border" />
        
          <div 
            ref={circleRef}
            className="historical-dates__points-container"
          >
            {data.map((period, index) => {
              const { x, y } = getPointPosition(index);
              const isActive = index === activePeriod;
              
              return (
                <div
                  key={period.id}
                  ref={el => pointsRef.current[index] = el}
                  className={`historical-dates__point ${isActive ? 'active' : ''}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                  onClick={() => handlePointClick(index)}
                >
                  <div className="historical-dates__point-inner">
                    <span className="historical-dates__point-number">
                      {index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div 
            ref={labelRef}
            className="historical-dates__active-label"
          >
            {data[activePeriod].name}
          </div>
          
          <div className="historical-dates__years" ref={yearsRef}>
            <span className="historical-dates__start-year">
              {data[activePeriod].startYear}
            </span>
            <span className="historical-dates__end-year">
              {data[activePeriod].endYear}
            </span>
          </div>
        </div>
        
        <div className="historical-dates__controls">
          <div className="historical-dates__pagination">
            <span className="historical-dates__current">
              {String(activePeriod + 1).padStart(2, '0')}
            </span>
            <span className="historical-dates__total">
              /{String(data.length).padStart(2, '0')}
            </span>
          </div>
          
          <div className="historical-dates__nav">
            <button 
              className="historical-dates__nav-btn historical-dates__nav-btn--prev"
              onClick={handlePrevClick}
              aria-label="Предыдущий период"
            >
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                <path d="M8.5 1L2 7L8.5 13" stroke="#42567A" strokeWidth="2"/>
              </svg>
            </button>
            <button 
              className="historical-dates__nav-btn historical-dates__nav-btn--next"
              onClick={handleNextClick}
              aria-label="Следующий период"
            >
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                <path d="M1.5 1L8 7L1.5 13" stroke="#42567A" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <EventSlider events={data[activePeriod].events} />
    </div>
  );
};

export default HistoricalDates;