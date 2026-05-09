import React, { Component } from 'react';
import './AboutMe.css';

class Aboutme extends Component {
	constructor(props) {
		super(props);

		this.state = {
			innerWidth: 0,
		};
	}
	componentDidMount() {
		this.setState({
			innerWidth: window.innerWidth,
		});
	}
	render() {
		return (
			<section id="aboutMeSection">
				<div className="container-fluid aboutMe">
					<div className="container">
						<h1
							className="sectionTitle"
							data-aos="fade-up"
							data-aos-offset="100">
							/ About me
						</h1>
						<div
							className="col-10 aboutMeContent"
							data-aos="fade-up">
							<div>
								<div
									id="aboutMeLeft"
									className={this.state.innerWidth > 992 ? 'col-3 aboutMeContentLeft' : 'aboutMeContentLeft'}
									data-aos="fade-up"
									data-aos-delay="50"></div>
								<div
									id="aboutMeRight"
									className={this.state.innerWidth > 992 ? 'col-9 aboutMeDescription' : 'aboutMeDescription'}>
									<div
										className="paragraf paragraf1"
										data-aos="fade-up"
										data-aos-delay="100">
										Hi! I’m <b className="boldAboutMe">Fahri Izzuddin Zulkarnaen</b>, a Fullstack Software Developer with experience building scalable and user-focused web applications. I graduated from Informatics Engineering at
										UPN Veteran Jawa Timur with a GPA of 3.90 and currently work as an IT Specialist at <b className="boldAboutMe">PT Bank Central Indonesia(bca)</b>.
									</div>
									<div
										className="paragraf paragraf2"
										data-aos="fade-up"
										data-aos-delay="100">
										My experience includes developing high-impact applications used by thousands of users, maintaining microservices architectures, and supporting enterprise-scale system integrations. I mainly work with
										<b className="boldAboutMe"> Angular, Java Spring Boot, React, and Node.js across both frontend and backend development.</b>
										<br />
									</div>
									<div
										className="paragraf paragraf2"
										data-aos="fade-up"
										data-aos-delay="100">
										Outside of work, I actively explore advancements in Artificial Intelligence and software engineering to keep expanding my technical knowledge and perspective.
									</div>

									<div
										data-aos="fade-up"
										data-aos-delay="300"
										data-aos-offset="100">
										<div className="technology">Here are some technologies I have been working with:</div>
										<div
											className="row techlist-content"
											style={{ marginLeft: '-1.5rem' }}>
											<div className="col-6 technologylist">
												<ul>
													<li>Python</li>
													<li>Java Spring Boot</li>
													<li>Java Spring Batch</li>
													<li>Angular Js</li>
												</ul>
											</div>
											<div className="col-6 technologylist">
												<ul>
													<li>Next and React Js</li>
													<li>Node Js</li>
													<li>SQL Databases</li>
													<li>NoSQL Databases</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Aboutme;
