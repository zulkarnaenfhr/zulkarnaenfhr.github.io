import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Zulkarnaenfhr from './Portofolio-Website-Fahri/Zulkarnaenfhr';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './Portofolio-Website-Fahri/LanguageContext';

const root = createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<LanguageProvider>
				<Zulkarnaenfhr />
			</LanguageProvider>
		</BrowserRouter>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
reportWebVitals();
