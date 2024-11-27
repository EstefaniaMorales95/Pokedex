import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Pokedex, Details } from '../app';
import { useDarkMode } from '../contexts/darkModeContext'; //
import '../styles/Home.css';

const AppRouter = () => {
	const [darkMode, toggleDarkMode] = useDarkMode();

	return (
		<div className={darkMode ? 'dark-mode' : 'light-mode'}>
			{' '}
			<header className="nabvar__h">
				<h1 className="nabvar"></h1>
				<button
					onClick={toggleDarkMode}
					style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
				>
					{darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'} {}
				</button>
			</header>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/pokedex" element={<Pokedex />} />
				<Route path="/pokedex/:name" element={<Details />} />
			</Routes>
		</div>
	);
};

export default AppRouter;
