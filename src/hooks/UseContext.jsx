import React from 'react';
import { Home } from '../app/Home';

function UseContext() {
	return (
		<DarkModeProvider>
			<Home />
		</DarkModeProvider>
	);
}

export default UseContext;
