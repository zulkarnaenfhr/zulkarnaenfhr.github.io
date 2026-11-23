import React, { createContext, useContext, useMemo, useState } from 'react';

const translations = {
	en: {
		nav: ['Home', 'About Me', 'Experience', 'Project', 'Get In Touch'],
		download: 'Download CV',
		homeEyebrow: '/ SPACE CAPT - SOFTWARE DEVELOPER',
		homeTitle: 'Fahri',
		homeName: 'Izzuddin',
		homeHeadline: 'I build things for the web.',
		homeDescription: 'I am a fullstack developer who enjoys turning ideas into useful, reliable software. I work from Indonesia and I am always open to a good project.',
		status: 'OPEN TO NEW WORK',
		about: 'About me',
		experience: 'Experience',
		working: 'Working Experience',
		organization: 'Organization Experience',
		projects: 'Project',
		websiteProjects: 'Website Project',
		contact: 'Let\'s talk.',
		contactSub: 'Have a project in mind? Send me a message.',
		email: 'By Email',
		social: 'Social Media',
		technologies: 'Here are some technologies I have been working with:',
		footer: 'Built by Fahri Izzuddin Zulkarnaen.',
	},
	id: {
		nav: ['Beranda', 'Tentang Saya', 'Pengalaman', 'Proyek', 'Hubungi Saya'],
		download: 'Unduh CV',
		homeEyebrow: '/ SPACE CAPT - SOFTWARE DEVELOPER',
		homeTitle: 'Fahri',
		homeName: 'Izzuddin',
		homeHeadline: 'Saya membuat sesuatu untuk web.',
		homeDescription: 'Saya seorang fullstack developer yang suka mengubah ide menjadi software yang berguna dan bisa diandalkan. Saya bekerja dari Indonesia dan selalu terbuka untuk project yang menarik.',
		status: 'TERBUKA UNTUK PROJECT BARU',
		about: 'Tentang saya',
		experience: 'Pengalaman',
		working: 'Pengalaman Kerja',
		organization: 'Pengalaman Organisasi',
		projects: 'Proyek',
		websiteProjects: 'Proyek Website',
		contact: 'Mari ngobrol.',
		contactSub: 'Punya project? Kirim pesan ke saya.',
		email: 'Email',
		social: 'Media Sosial',
		technologies: 'Teknologi yang saya gunakan:',
		footer: 'Dibuat oleh Fahri Izzuddin Zulkarnaen.',
	},
};

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
	const [language, setLanguage] = useState(() => localStorage.getItem('spacecapt-language') || 'en');
	const value = useMemo(() => ({
		language,
		t: translations[language],
		toggleLanguage: () => setLanguage((current) => {
			const next = current === 'en' ? 'id' : 'en';
			localStorage.setItem('spacecapt-language', next);
			return next;
		}),
	}), [language]);
	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
