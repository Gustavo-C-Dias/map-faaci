import styles from '@/styles/search.module.css'

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({
  value,
  onChange,
}: SearchProps) {
  return (
    <input
      type="text"
      placeholder="Buscar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className= {styles.container}
    />
  );
}
