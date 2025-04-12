import Image from "next/image"
import { Tourism } from "@/types/Tourism"
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
              <Image
                src={`/turismo/${tourism.photo}`}
                alt={''}
                width={220}
                height={150}
                className={styles.image}
              />

              <div className={styles.info}>
                <p>{tourism.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}