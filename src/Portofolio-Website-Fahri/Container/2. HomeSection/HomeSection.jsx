import React, { Component } from 'react';
import './HomeSection.css';
import { LanguageContext } from '../../LanguageContext';

class Homesection extends Component {
	static contextType = LanguageContext;
	constructor(props) {
		super(props);

		this.state = {
			windowWidth: 0,
		};
	}
	componentDidMount() {
		this.setState({
			windowWidth: window.innerWidth,
		});
	}
	render() {
		const { t } = this.context;
		return (
			<section id="homeSection">
				<div className="container-fluid hai">
					<div className="container hai-content">
						<div className="mission-label" data-aos="fade-up" data-aos-delay="1800">{t.homeEyebrow}</div>
						<div className="nama">
							<h1 className="penulisanNama" data-aos-delay="2000" data-aos="fade-up">
								{t.homeTitle} <span id="fahri">{t.homeName}</span>
							</h1>
						</div>
						<h1
							className="bawahNama"
							data-aos-delay="2750"
							data-aos="fade-up">
							{t.homeHeadline}
						</h1>
						<h2
							id="bawahnya"
							className="whoAmI"
							data-aos-delay="3000"
							data-aos="fade-up">
							{t.homeDescription}
						</h2>
						<div className="mission-status" data-aos="fade-up" data-aos-delay="3250">
							<span className="status-dot"></span> {t.status}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Homesection;
