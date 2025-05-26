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
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevPeriodRef = useRef(activePeriod);
  const currentRotation = useRef(0);

  const angleStep = 360 / data.length;
  const activePositionAngle = 45; // 45 градусов - правый верхний угол

  useEffect(() => {
    // Анимация при смене периода
    const timeline = gsap.timeline();
    
    // Анимация годов
    if (yearsRef.current) {
      const startYear = yearsRef.current.querySelector('.historical-dates__start-year');
      const endYear = yearsRef.current.querySelector('.historical-dates__end-year');
      
      timeline.to([startYear, endYear], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          if (startYear) startYear.textContent = String(data[activePeriod].startYear);
          if (endYear) endYear.textContent = String(data[activePeriod].endYear);
        }
      }).to([startYear, endYear], {
        opacity: 1,
        y: 0,
        duration: 0.3
      });
    }

    // Вычисляем угол поворота, чтобы активная точка была в правом верхнем углу
    const targetRotation = activePositionAngle - (activePeriod * angleStep);
    const rotationDiff = targetRotation - currentRotation.current;
    
    // Выбираем кратчайший путь поворота
    let shortestRotation = rotationDiff;
    if (Math.abs(rotationDiff) > 180) {
      shortestRotation = rotationDiff > 0 ? rotationDiff - 360 : rotationDiff + 360;
    }
    
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotation: `+=${shortestRotation}`,
        duration: 0.8,
        ease: "power2.inOut"
      });
    }
    
    // Применяем обратное вращение к точкам, чтобы числа оставались горизонтальными
    pointsRef.current.forEach((pointEl) => {
      if (pointEl) {
        const inner = pointEl.querySelector('.historical-dates__point-inner');
        if (inner) {
          gsap.to(inner, {
            rotation: `-=${shortestRotation}`,
            duration: 0.8,
            ease: "power2.inOut"
          });
        }
      }
    });
    
    currentRotation.current = targetRotation;
    prevPeriodRef.current = activePeriod;
  }, [activePeriod, data, angleStep]);

  const getPointPosition = (index: number) => {
    const angle = (index * angleStep - 90) * (Math.PI / 180);
    const x = 50 + 50 * Math.cos(angle);
    const y = 50 + 50 * Math.sin(angle);
    return { x, y };
  };

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
                  {isActive && (
                    <span className="historical-dates__point-label">
                      {period.name}
                    </span>
                  )}
                </div>
              );
            })}
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
            <span className="historical-dates__current">{String(activePeriod + 1).padStart(2, '0')}</span>
            <span className="historical-dates__total">/{String(data.length).padStart(2, '0')}</span>
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