import { useEffect, useState } from 'react';
import { Route } from '@/types/Routes'
import { Tourism } from '@/types/Tourism';

import styles from '@/styles/details.module.css'

import Info from './Info';
import Slide from './Slide';
import Image from 'next/image';
import Galery from './Galery';

type DetailsProps = {
  route: Route | null;
  tourism: Tourism[];
}

export default function Details({
  route,
  tourism,
}: DetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!route);  
  }, [route]);

  if (!isOpen || !route) return null;

  return (
    <section className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setIsOpen(false)}
      >
        <Image
          src={'/icons/close.png'}
          alt={'Fechar'}
          width={20}
          height={20}
        />
      </button>

      <Slide route={route} />

      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{route.route_name}</h1>
          <p className={styles.description}>{route.description}</p>
          <a href={route.link}>
            <Image
              src={'/icons/google-maps.png'}
              alt={'Acessar Google Maps'}
              height={33}
              width={170}
            />
          </a>
        </div>

        <hr className={styles.divider}/>

        <div>
          <h2 className={styles.subtitle}>Informações Técnicas</h2>
          <div>
            <Info icon='difficulty.png' info={`Dificuldade: ${route.difficulty}`} />
            <Info icon='distance.png' info={`Distância: ${route.distance}km`} />
            <Info icon='loss.png' info={`Tempo: ${route.time}m`} />
            <Info icon='altitude_max.png' info={`Altitude máx: ${route.altitude_max}m`} />
            <Info icon='altitude_min.png' info={`Altitude min: ${route.altitude_min}m`} />
            <Info icon='elevation.png' info={`Elevação total ${route.elevation_total}m`} />
            <Info icon='loss.png' info={`Descida total: ${route.loss_total}m`} />
          </div>
        </div>

        <hr className={styles.divider}/>

        <Galery tourism={tourism}/>
      </div>
    </section>
  );
}
