import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { gsap } from 'gsap';
import { Event } from '@/types';
import { ArrowLeftIcon, ArrowRightIcon } from "@/styles/icons/icon"

import 'swiper/css';
import 'swiper/css/navigation';
import './EventSlider.scss';

interface Props {
  events: Event[];
}

const EventSlider: React.FC<Props> = ({ events }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [currentEvents, setCurrentEvents] = useState<Event[]>(events);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setCurrentEvents(events);
  }, []);

  useEffect(() => {
    if (!swiperRef.current?.wrapperEl || isAnimating) return;

    const eventsChanged = JSON.stringify(events) !== JSON.stringify(currentEvents);

    if (eventsChanged && currentEvents.length > 0) {
      setIsAnimating(true);

      gsap.to(swiperRef.current.wrapperEl, {
        opacity: 0,
        y: 2,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          setCurrentEvents(events);

          setTimeout(() => {
            if (swiperRef.current) {
              swiperRef.current.slideTo(0, 0);
            }

            if (swiperRef.current?.wrapperEl) {
              gsap.to(swiperRef.current.wrapperEl, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => {
                  setIsAnimating(false);
                }
              });
            }
          }, 50);
        }
      });
    }
  }, [events, currentEvents, isAnimating]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.params && swiperRef.current.params.navigation) {
      const navigation = swiperRef.current.params.navigation;
      if (typeof navigation !== 'boolean') {
        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;
      }

      if (swiperRef.current.navigation) {
        swiperRef.current.navigation.destroy();
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }
    }
  }, [currentEvents]);

  return (
    <div className="event-slider">
      <button
        ref={prevRef}
        className="event-slider__nav event-slider__nav--prev"
        disabled={isAnimating}
      >
        <ArrowLeftIcon />
      </button>

      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        modules={[Navigation]}
        spaceBetween={25}
        slidesPerView={3}
        navigation={{
          prevEl: '.event-slider__nav--prev',
          nextEl: '.event-slider__nav--next',
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 25
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 60
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 80
          }
        }}
        className="event-slider__swiper"
      >
        {currentEvents.map((event, index) => (
          <SwiperSlide key={index} className="event-slider__slide">
            <div className="event-slider__year">{event.year}</div>
            <div className="event-slider__description">{event.description}</div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={nextRef}
        className="event-slider__nav event-slider__nav--next"
        disabled={isAnimating}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default EventSlider;