import { useState } from "react";
import "../styles/search.css";

interface SearchProps {
  points: any[];
  onKeyWords: (filteredPoints: any[]) => void;
}

export default function Search({ points, onKeyWords }: SearchProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    
    const filtered = points.filter(point =>
      point.name.toLowerCase().includes(value.toLowerCase())
    );
    onKeyWords(filtered);
  };

  return (
    <div
        className="container"
    >
        <button>
            Menu
        </button>
        <input
        type="text"
        placeholder="Buscar"
        value={search}
        onChange={handleSearch}
        className="p-2 border rounded-md w-full"
        />
    </div>
  );
}
