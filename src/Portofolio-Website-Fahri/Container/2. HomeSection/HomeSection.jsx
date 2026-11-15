import React, { Component } from 'react';
import './HomeSection.css';
import SpaceScene from './SpaceScene';

class Homesection extends Component {
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
		return (
			<section id="homeSection">
				<SpaceScene />
				<div className="container-fluid hai">
					<div className="container hai-content">
						<div className="nama">
							{this.state.windowWidth > 768 ? (
								<h1
									className="penulisanNama"
									data-aos-delay="2500"
									data-aos="fade-up">
									Hi,{' '}
									<span
										id="fahri"
										style={{ color: 'cadetblue' }}>
										Your <span className="zulkarnaen">SpaceCapt</span>{' '}
									</span>{' '}
									Here :)
								</h1>
							) : (
								<h1
									className="penulisanNama"
									data-aos-delay="2500"
									data-aos="fade-up">
									Hi,{' '}
									<span
										id="fahri"
										style={{ color: 'cadetblue' }}>
										Fahri <span className="zulkarnaen">SpaceCapt</span>{' '}
									</span>{' '}
									Here :)
								</h1>
							)}

							<div
								data-aos-delay="2500"
								data-aos="fade-up"
								className="eye-container">
								{/* <div className="eye"></div>
                                <div className="eye2"></div> */}
								<div className="eye eye-left">
									<div className="eye-inner"></div>
								</div>
								<div className="eye eye2 eye-right">
									<div className="eye-inner"></div>
								</div>
							</div>
						</div>
						<h1
							className="bawahNama"
							data-aos-delay="2750"
							data-aos="fade-up">
							I build purposeful digital experiences for a changing world.
						</h1>
						<h2
							id="bawahnya"
							className="whoAmI"
							data-aos-delay="3000"
							data-aos="fade-up">
							I’m a confident, thoughtful Fullstack Software Developer who turns complex ideas into reliable, scalable products. I care about strong engineering, clear design, and creating technology that is ready for what comes next.
						</h2>
					</div>
				</div>
			</section>
		);
	}
}

export default Homesection;
