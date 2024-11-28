import { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

const initialState = window.localStorage.getItem('darkMode') || false;

const DarkModeProvider = ({ children }) => {
	console.log(typeof initialState);
	console.log(initialState);
	const [darkMode, setDarkMode] = useState(initialState);

	const toggleDarkMode = () => {
		setDarkMode((prevMode) => {
			const state = !prevMode;
			if (window.localStorage.getItem('darkMode')) {
				window.localStorage.removeItem('darkMode', state);
			} else {
				window.localStorage.setItem('darkMode', state);
			}
			return state;
		});
	};

	return (
		<DarkModeContext.Provider value={[darkMode, toggleDarkMode]}>
			{children}
		</DarkModeContext.Provider>
	);
};

const useDarkMode = () => useContext(DarkModeContext);

export { DarkModeProvider, useDarkMode };
