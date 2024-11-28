import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import '../styles/Details.css';

function Details() {
	const params = useParams();
	const navigate = useNavigate();
	const [pokemon, setPokemon] = useFetch();

	useEffect(() => {
		if (params.name) getPokemon();
	}, [params.name]);

	const getPokemon = () => {
		setPokemon(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
	};

	const types = pokemon?.types.map((type) => type.type.name);

	const handleGoBack = () => {
		navigate('/pokedex');
	};

	return (
		<div className="details">
			<button className="poke__v" onClick={handleGoBack}>
				{'⇽'} Volver
			</button>

			<div className="details__content">
				<div className="details__image-container">
					<img
						className="details__image"
						src={pokemon?.sprites?.other?.dream_world?.front_default}
						alt={pokemon?.name}
					/>
				</div>

				<div className="details__info">
					<span className="details__id">
						#{pokemon?.id.toString().padStart(3, '0')}
					</span>
					<h2 className="details__name">{pokemon?.name}</h2>

					<div className="details__stats">
						<div className="details__stat">
							<span className="details__stat-label">Peso</span>
							<span>{pokemon?.weight}</span>
						</div>
						<div className="details__stat">
							<span className="details__stat-label">Altura</span>
							<span>{pokemon?.height}</span>
						</div>
					</div>

					<div className="details__attributes">
						<div className="details__types">
							<h3 className="details__section-title">Tipo</h3>
							<div className="details__type-list">
								{types?.map((type) => (
									<span className={`details__type type--${type}`} key={type}>
										{type}
									</span>
								))}
							</div>
						</div>

						<div className="details__abilities">
							<h3 className="details__section-title">Habilidad</h3>
							<div className="details__ability-list">
								{pokemon?.abilities?.map((ability) => (
									<span className="details__ability" key={ability.ability.name}>
										{ability.ability.name}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { Details };
