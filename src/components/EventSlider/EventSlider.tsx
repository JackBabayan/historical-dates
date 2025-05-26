import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Event } from '../../types';
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
  }, [events]);

  return (
    <div className="event-slider">
      <button ref={prevRef} className="event-slider__nav event-slider__nav--prev">
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
          <path d="M8.5 1L2 7L8.5 13" stroke="#3877EE" strokeWidth="2"/>
        </svg>
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
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 25
          }
        }}
        className="event-slider__swiper"
      >
        {events.map((event, index) => (
          <SwiperSlide key={index} className="event-slider__slide">
            <div className="event-slider__year">{event.year}</div>
            <div className="event-slider__description">{event.description}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <button ref={nextRef} className="event-slider__nav event-slider__nav--next">
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
          <path d="M1.5 1L8 7L1.5 13" stroke="#3877EE" strokeWidth="2"/>
        </svg>
      </button>
    </div>
  );
};

export default EventSlider;