"use client"

import LoadMoreButton from "./components/LoadMoreButton";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";

export default function Home() {
  const [allPokemonNames, setAllPokemonNames] = useState([]); // Tous les noms de Pokémon pour la recherche
  const [filteredPokemons, setFilteredPokemons] = useState([]); // Pokémon filtrés lors de la recherche
  const [pokemons, setPokemons] = useState([]); // Pokémon récupérés avec leurs images
  const [offset, setOffset] = useState(0); // Décale le chargement des Pokémon
  const [loading, setLoading] = useState(false); // Pour indiquer si on est en train de charger

  // Récupérer l'API du backend
  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokemon-backend-e00u.onrender.com/`);
      const data = await response.json();
      if (response.ok) {
        const pokemonImage = await Promise.all(data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          const types = pokemonData.types.map((type) => type.type.name);
          return {
            name: pokemon.name,
            image: pokemonData.sprites.front_default,
            types: types
          };
        }));
        setPokemons((prevPokemons) => {
          if (offset === 0) {
            return pokemonImage; // Remplacer les Pokémon si offset est 0
          } else {
            return [...prevPokemons, ...pokemonImage]; // Ajouter les nouveaux Pokémon
          }
        });
      } else {
        console.error('Erreur dans la réponse:', data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

// Charger tous les noms de Pokémon pour la recherche globale
const fetchAllPokemonNames = async () => {
  try {
    const response = await fetch(`https://pokemon-backend-e00u.onrender.com/api/pokemon?limit=1010`); // Récupère jusqu'à 10 000 Pokémon
    const data = await response.json();
    if (response.ok) {
      const pokemonImage = await Promise.all(data.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        const types = pokemonData.types.map((type) => type.type.name);
        return {
          name: pokemon.name,
          image: pokemonData.sprites.front_default,
          types: types
        };
      }));
      setAllPokemonNames(pokemonImage); // Enregistre tous les noms pour la recherche
    } else {
      console.error("Erreur lors de la récupération des noms de Pokémon:", data);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des noms de Pokémon:", error);
  }
};


  // Charger les Pokémon initiaux et tous les noms
  useEffect(() => {
    fetchPokemons();
    fetchAllPokemonNames();
  }, []);

  // Gérer la recherche parmi tous les Pokémon
  const handleSearch = (term) => {
    const filtered = allPokemonNames.filter(pokemon =>
      pokemon.name.toLowerCase().includes(term.toLowerCase())
    );
    console.log(term);
    setFilteredPokemons(filtered);
  };

  // Fonction appelée pour charger les 12 Pokémon suivants
  const loadMorePokemons = () => {
    setOffset((prevOffset) => prevOffset + 12); // Incrémente l'offset de limit
  };

  // Utiliser useEffect pour appeler fetchPokemons chaque fois que l'offset change
  useEffect(() => {
    if (offset > 0) {
      fetchPokemons();
    }
  }, [offset]);

  return (
    <>
      <div className="container mx-auto p-4">
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {/* Affiche soit les Pokémon filtrés, soit les Pokémon paginés */}
          {(filteredPokemons.length > 0 ? filteredPokemons : pokemons).length > 0 ? (
            (filteredPokemons.length > 0 ? filteredPokemons : pokemons).map((pokemon, index) => (
              <PokemonCard key={index} name={pokemon.name} image={pokemon.image} types={pokemon.types} />
            ))
          ) : (
            <p>Aucun Pokémon trouvé.</p> // Message si aucun Pokémon n'est trouvé
          )}
        </div>
        <div>
          <LoadMoreButton onLoadMore={loadMorePokemons} disabled={loading} />
          {loading && <p>Chargement...</p>} {/* Indicateur de chargement */}
        </div>
      </div>
    </>
  );
}
