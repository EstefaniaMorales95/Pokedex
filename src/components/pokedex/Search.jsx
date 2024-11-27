import { useRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import '../../styles/Search.css';
function Search({ handleSearch }) {
	const inputRef = useRef();

	const onSearch = () => {
		handleSearch(inputRef.current.value.toLowerCase().trim());
		inputRef.current.value = '';
	};

	return (
		<div className="search">
			<div className="search__input">
				<IoSearchOutline />
				<input type="text" placeholder="Buscar un Pokemón" ref={inputRef} />
			</div>
			<button onClick={onSearch} className="search__btn">
				Buscar
			</button>
		</div>
	);
}

export default Search;
