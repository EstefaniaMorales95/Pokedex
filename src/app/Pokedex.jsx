import { Link } from 'react-router-dom';
import Filters from '../components/pokedex/Filters';
import Search from '../components/pokedex/Search';
import { useEffect, useState } from 'react';
import PokemonCard from '../components/pokedex/PokemonCard';
import { useNameContext } from '../contexts/nameContext';
import '../styles/pokedex.css';
import PokemonList from '../components/pokedex/PokemonList';

function Pokedex() {
	const [name] = useNameContext();
	const [pokemons, setPokemons] = useState([]);
	const [filteredPokemons, setFilteredPokemons] = useState([]);
	const [pokemonUrl, setPokemonUrl] = useState(null);
	const [isFiltering, setIsFiltering] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const ITEMS_PER_PAGE = 5;

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
			.then((res) => res.json())
			.then((data) => setPokemons(data.results));
	}, []);

	const handleSearch = (value) => {
		if (!value) {
			setIsFiltering(false);
			setPokemonUrl(null);
		} else {
			value = value.toLowerCase().trim();
			setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${value}/`);
		}
	};

	const handleTypeFilter = async (type) => {
		if (!type) {
			setIsFiltering(false);
			setFilteredPokemons([]);
			setCurrentPage(1);
		} else {
			setIsFiltering(true);
			setCurrentPage(1);
			const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
			const data = await response.json();
			setFilteredPokemons(data.pokemon.map((p) => p.pokemon));
		}
	};

	const paginatePokemons = () => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		return filteredPokemons.slice(startIndex, endIndex);
	};

	const onPrev = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	const onNext = () => {
		if (currentPage * ITEMS_PER_PAGE < filteredPokemons.length) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const pokemonsToDisplay = isFiltering ? paginatePokemons() : pokemons;

	return (
		<div className="pokedex">
			<Link className="poke__v" to="/">
				{'⇽'} Volver
			</Link>

			<div className="pokedex__container">
				<div className="pokedex__header">
					<p>Bienvenido {name}, Aquí podrás encontrar tu Pokémon favorito</p>
				</div>

				<div className="pokedex__form">
					<Search handleSearch={handleSearch} />
					<Filters handleTypeFilter={handleTypeFilter} />
				</div>

				<div className="pokedex__cards">
					{pokemonUrl ? (
						<PokemonCard url={pokemonUrl} />
					) : (
						<PokemonList pokemons={pokemonsToDisplay} />
					)}
				</div>
			</div>

			<div className="pokedex__pagination-container">
				{isFiltering && (
					<>
						<button
							className="pokedex__pagination"
							onClick={onPrev}
							disabled={currentPage === 1}
						>
							Página Anterior
						</button>
						<button
							className="pokedex__pagination"
							onClick={onNext}
							disabled={currentPage * ITEMS_PER_PAGE >= filteredPokemons.length}
						>
							Página Siguiente
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export { Pokedex };
