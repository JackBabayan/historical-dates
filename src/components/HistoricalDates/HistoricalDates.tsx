import React, { useState, useRef, useEffect, Suspense } from 'react';
import { gsap } from 'gsap';
import { Period } from '@/types';
import { ArrowLeftIcon, ArrowRightIcon } from "@/styles/icons/icon"

import './HistoricalDates.scss';

const EventSlider = React.lazy(() => import('@/components/EventSlider'));

interface Props {
  data: Period[];
}

const HistoricalDates: React.FC<Props> = ({ data }) => {
  const [activePeriod, setActivePeriod] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [currentStartYear, setCurrentStartYear] = useState(data[0].startYear);
  const [currentEndYear, setCurrentEndYear] = useState(data[0].endYear);

  const angleStep = 360 / data.length;
  const ACTIVE_POSITION_ANGLE = 30;

  useEffect(() => {
    animateYears();
    rotateCircleToActivePosition();
  }, [activePeriod]);

  const animateYears = () => {
    if (!yearsRef.current) return;

    const startYearEl = yearsRef.current.querySelector('.historical-dates__start-year');
    const endYearEl = yearsRef.current.querySelector('.historical-dates__end-year');

    const targetStartYear = data[activePeriod].startYear;
    const targetEndYear = data[activePeriod].endYear;

    if (startYearEl) {
      gsap.to({ value: currentStartYear }, {
        value: targetStartYear,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: function () {
          const animatedValue = Math.round(this.targets()[0].value);
          setCurrentStartYear(animatedValue);
          startYearEl.textContent = String(animatedValue);
        }
      });
    }

    if (endYearEl) {
      gsap.to({ value: currentEndYear }, {
        value: targetEndYear,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: function () {
          const animatedValue = Math.round(this.targets()[0].value);
          setCurrentEndYear(animatedValue);
          endYearEl.textContent = String(animatedValue);
        }
      });
    }
  };

  const rotateCircleToActivePosition = () => {
    if (!circleRef.current) return;

    const targetRotation = ACTIVE_POSITION_ANGLE - (activePeriod * angleStep);

    gsap.to(circleRef.current, {
      rotation: targetRotation,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Поворачиваем каждую точку, чтобы номера и лейблы оставались горизонтальными
    pointsRef.current.forEach((pointEl) => {
      if (pointEl) {
        gsap.to(pointEl, {
          rotation: -targetRotation,
          duration: 0.8,
          ease: "power2.inOut"
        });
      }
    });
  };

  const getPointPosition = (index: number) => {
    const angle = (index * angleStep - 90) * (Math.PI / 180);
    const radius = 50;

    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);

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
          {window.innerWidth >= 768 && (
            <>
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
                      <div className="historical-dates__point-label">
                        {period.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="historical-dates__years" ref={yearsRef}>
            <span className="historical-dates__start-year">
              {currentStartYear}
            </span>
            <span className="historical-dates__end-year">
              {currentEndYear}
            </span>
          </div>
        </div>

        {window.innerWidth >= 768 && (
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
                className={`historical-dates__nav-btn historical-dates__nav-btn--prev${activePeriod === 0 ? ' historical-dates__nav-btn--disable' : ''}`}
                onClick={handlePrevClick}
                aria-label="Предыдущий период"
              >
                <ArrowLeftIcon />
              </button>
              <button
                className={`historical-dates__nav-btn historical-dates__nav-btn--next${activePeriod === data.length - 1 ? ' historical-dates__nav-btn--disable' : ''}`}
                onClick={handleNextClick}
                aria-label="Следующий период"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        )}
      </div>

      <Suspense fallback={
        <div className="historical-dates__slider-loading">
          <div className="historical-dates__loading-spinner"></div>
        </div>
      }>
        <EventSlider events={data[activePeriod].events} />
      </Suspense>

      {window.innerWidth < 768 && (
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
              <ArrowLeftIcon />
            </button>
            <button
              className="historical-dates__nav-btn historical-dates__nav-btn--next"
              onClick={handleNextClick}
              aria-label="Следующий период"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalDates;