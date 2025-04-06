import Image from "next/image"
import styles from '@/styles/info.module.css'

type InfoProps = {
    icon: string
    info: string
}

export default function Info({info, icon}: InfoProps) {
    return (
        <div className={styles.container}>
            <Image
                src={`/icons/${icon}`}
                alt={''}
                width={32}
                height={32}
            />
            <p className={styles.text}>{info}</p>
        </div>
    )
}