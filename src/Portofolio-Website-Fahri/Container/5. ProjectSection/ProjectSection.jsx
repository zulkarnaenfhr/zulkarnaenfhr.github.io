import React, { Component } from 'react';
import './ProjectSection.css';
import SpaceObject from '../SpaceObject';
import { LanguageContext } from '../../LanguageContext';

const websiteProjects = [
	{
		title: 'Cakelana Company Profile',
		description: 'Make a company profile website for Cakelana that a startup software house',
		tech: ['Next.js', 'CSS', 'Node.js', 'Bootstrap', 'AOS', 'Axios', 'Sequelize'],
		links: [{ type: 'web', label: 'Cakelana Profile', href: 'https://cakelana.vercel.app/' }],
	},
	{
		title: 'Big Sight Company Profile Website',
		description: 'Make a company profile website on Big Sight products as one of the activities following as a developer in PT Telkom Indonesia',
		tech: ['Next.js', 'CSS', 'Node.js', 'Bootstrap', 'AOS', 'Axios', 'Sequelize'],
		links: [{ type: 'web', label: 'Bigsight', href: 'https://bigsight.id/en' }],
	},
	{
		title: 'Photography Portfolio',
		description: 'Create a website that can be used as a portfolio for photographers',
		tech: ['Next.js', 'CSS', 'Bootstrap', 'AOS', 'GSAP TweenMax'],
		links: [{ type: 'web', label: 'Photography Portfolio', href: 'https://prabudizulkarnaen.vercel.app/' }],
	},
	{
		title: 'Gericht Restaurant',
		description: 'Create a website that can be used to learn website animations.',
		tech: ['Next.js', 'CSS', 'Bootstrap', 'AOS', 'GSAP TweenMax'],
		links: [{ type: 'web', label: 'Gericht Restaurant', href: 'https://gericht-restaurant-teal.vercel.app/' }],
	},
	{
		title: 'Indonesian Covid Mapping',
		description: 'A website that can monitor and map covid cases in each province, monitor daily Indonesia growth cases and also Covid-19 Indonesia news updates',
		tech: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Covid-19 Gov API'],
		links: [
			{ type: 'github', label: 'GitHub Covid Mapping', href: 'https://github.com/zulkarnaenfhr/indonesia-covid-mapping-react' },
			{ type: 'web', label: 'Website Covid Mapping', href: 'https://indonesia-covid-mapping-react.vercel.app/' },
		],
	},
	{
		title: 'Little Dessert Landing Page',
		description: 'Make a landing page website for Little Dessert Sidoarjo',
		tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery', 'AOS'],
		links: [
			{ type: 'github', label: 'GitHub Little Dessert', href: 'https://github.com/zulkarnaenfhr/little-dessert.github.io' },
			{ type: 'web', label: 'Website Little Dessert', href: 'https://zulkarnaenfhr.github.io/little-dessert.github.io/' },
		],
	},
];

const aiProjects = [
	{
		title: 'Sentiment Analysis of Presidential and Vice Presidential Candidates',
		description: 'Categorized sentiments into four emotional classes (happy, love, sad, and angry), achieving an F1-score of 0.9510.',
		tech: ['Python', 'TensorFlow', 'Keras', 'FastText', 're'],
		links: [],
	},
	{
		title: 'Abusive Indonesian Tweet Classification using CNN',
		description: 'Abusive tweet classification using Convolutional Neural Network. Accuracy, precision, recall and F1-score of 0.8946 (89.46%).',
		tech: ['Python', 'TensorFlow', 'Pandas', 'PySastrawi', 're'],
		links: [
			{ type: 'github', label: 'GitHub CNN', href: 'https://github.com/zulkarnaenfhr/Abusive-Indonesian-Tweet-Using-Convolutional-Neural-Networks-Method' },
			{ type: 'colab', label: 'Colab CNN', href: 'https://colab.research.google.com/drive/1x1Io429fR7-a5QjX0-J9oSroOPCpzoLs?usp=sharing' },
		],
	},
	{
		title: 'Abusive Indonesian Tweet Classification using LSTM',
		description: 'Abusive tweet classification using Long Short Term Memory. Accuracy, precision, recall and F1-score of 0.8814 (88.14%).',
		tech: ['Python', 'TensorFlow', 'Pandas', 'PySastrawi', 're'],
		links: [
			{ type: 'github', label: 'GitHub LSTM', href: 'https://github.com/zulkarnaenfhr/Abusive-Indonesian-Tweet-Classification-using-Long-Short-Term-Memory-Method' },
			{ type: 'colab', label: 'Colab LSTM', href: 'https://colab.research.google.com/drive/1-8XYX22Ztd_1fxwUKD0QjtP9L5Y-5lDX?usp=sharing' },
		],
	},
];

const linkIcons = {
	github: 'fab fa-github',
	web: 'fas fa-external-link-alt',
	colab: 'fab fa-python',
};

const aosByColumn = ['fade-up-right', 'fade-up', 'fade-up-left'];

const ProjectCard = ({ project, index, variant }) => (
	<div
		className="project-grid__item"
		data-aos={aosByColumn[index % 3]}
		data-aos-offset="200">
		<article className={`project-card project-card--${variant}`}>
			<header className="project-card__header">
				<i
					className={`project-card__folder ${variant === 'ai' ? 'fas fa-brain' : 'far fa-folder'}`}
					aria-hidden="true"></i>
				<div className="project-card__links">
					{project.links.map((link) => (
						<a
							key={link.href}
							aria-label={link.label}
							title={link.label}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer">
							<i className={linkIcons[link.type]}></i>
						</a>
					))}
				</div>
			</header>
			<h3 className="project-card__title">{project.title}</h3>
			<p className="project-card__desc">{project.description}</p>
			<ul className="project-card__tech">
				{project.tech.map((tech) => (
					<li key={tech}>{tech}</li>
				))}
			</ul>
		</article>
	</div>
);

class Projectsection extends Component {
	static contextType = LanguageContext;
	render() {
		const { t } = this.context;
		return (
			<section
				id="projectSection"
				className="page-section">
				<SpaceObject variant="projects" />
				<div className="section-container">
					<h1
						className="sectionTitle"
						data-aos="fade-up"
						data-aos-offset="100">
						/ {t.projects}
					</h1>

					<div className="project-group">
						<h2
							className="section-subtitle"
							data-aos="fade-up"
							data-aos-offset="100">
							/ {t.websiteProjects}
						</h2>
						<div className="project-grid">
							{websiteProjects.map((project, i) => (
								<ProjectCard
									key={project.title}
									project={project}
									index={i}
									variant="web"
								/>
							))}
						</div>
					</div>

					<div className="project-group">
						<h2
							className="section-subtitle"
							data-aos="fade-up"
							data-aos-offset="100">
							/ Artificial Intelligence Project
						</h2>
						<div className="project-grid">
							{aiProjects.map((project, i) => (
								<ProjectCard
									key={project.title}
									project={project}
									index={i}
									variant="ai"
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Projectsection;
