import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Tourism } from "@/types/Tourism"
import Image from "next/image"
import styles from '@/styles/galery.module.css'

type GaleryProps = {
  tourism: Tourism[]
}

export default function Galery({tourism}: GaleryProps) {
  return (
    <>
      <h2 className={styles.subtitle}>Lugares próximos</h2>

      <div className={styles.content}>
        {tourism?.map((tourism) => {
          return (
            <div key={tourism.id} className={styles.card}>
              <Swiper
                pagination={true}
                modules={[Pagination]}
                style={{width: '286px', height: '180px' }}
              >
                {tourism.photos.map((file, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={`/turismo/${file}`}
                      alt={''}
                      fill
                      className={styles.image}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={styles.info}>
                <h3 className={styles.name}>{tourism.name}</h3>
                <p className={styles.description}>{tourism.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}