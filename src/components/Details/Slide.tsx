import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Route } from '@/types/Routes';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

type SlideProps = {
  route: Route | null;
}


export default function Slide({route}: SlideProps) {
  if (!route) return null;

  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      style={{width: '100%', height: '300px' }}
    >
      {route.photos.map((file, index) => (
        <SwiperSlide key={index}>
          <Image
            src={`/lugares/${file}`}
            alt={`Foto ${index + 1}`}
            fill
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}