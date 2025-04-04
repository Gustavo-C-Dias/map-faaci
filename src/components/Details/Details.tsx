import { useEffect, useState } from 'react';
import styles from '@/styles/details.module.css'
import { Route } from '@/types/Routes'
import Image from 'next/image';

type DetailsProps = {
  route: Route | null;
}

export default function Details({ route }: DetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!route);  
  }, [route]);

  if (!isOpen || !route) return null;

  return (
    <section className={styles.container}>
      <button onClick={() => setIsOpen(false)}>Fechar</button>

      <div>
        {route.photos.map((file, index) => (
          <Image
            key={index}
            src={`/lugares/${file}`}
            alt={`Foto ${index + 1}`}
            width={300}
            height={200}
          />
        ))}
      </div>

      <div>
        <h1>{route.route_name}</h1>
        <p>{route.description}</p>
      </div>

      <div>
        <h2>Informações Técnicas</h2>
        <p>Distância: {route.distance}</p>
        <p>Dificuldade: {route.difficulty}</p>
        <p>Altitude Máxima: {route.altitude_max}</p>
        <p>Altitude Mínima: {route.altitude_min}</p>
        <p>Elevação Total: {route.elevation_total}</p>
        <p>Perda Total: {route.loss_total}</p>
      </div>

      <div>
        <h2>Pontos próximos da rota</h2>
      </div>
    </section>
  );
}
