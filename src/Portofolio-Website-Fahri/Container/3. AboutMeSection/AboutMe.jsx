import React, { Component } from "react";
import "./AboutMe.css";

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
                        <h1 className="sectionTitle" data-aos="fade-up" data-aos-offset="100">
                            / About me
                        </h1>
                        <div className="col-10 aboutMeContent" data-aos="fade-up">
                            <div className="row">
                                <div id="aboutMeLeft" className={this.state.innerWidth > 768 ? "col-3 aboutMeContentLeft" : "aboutMeContentLeft"} data-aos="fade-up" data-aos-delay="50">
                                    <img src="https://i.ibb.co/Wn5LmXB/Whats-App-Image-2022-03-22-at-8-23-20-PM.jpg" className="imgMe" alt="" />
                                </div>
                                <div id="aboutMeRight" className={this.state.innerWidth > 768 ? "col-9 aboutMeDescription" : "aboutMeDescription"}>
                                    <div className="paragraf paragraf1" data-aos="fade-up" data-aos-delay="100">
                                        Hiiii, my name is <b className="boldAboutMe">Fahri Izzuddin Zulkarnaen</b>. I am currently studying Informatics Engineering at <b className="boldAboutMe">UPN Veteran Jawa Timur</b> , with a focus in
                                        Front End Developer and Artificial Intelligence Engineer. I've also worked for <b className="boldAboutMe">Bunda Mia Catering</b> as a Front End Developer.
                                    </div>
                                    <div className="paragraf paragraf2" data-aos="fade-up" data-aos-delay="100">
                                        I am passionate about building excellent software that improves the lives of those around me. so, I'm doing deeper learning about
                                        <b className="boldAboutMe"> Front End Developer</b>. I’m doing in-depth learning about how to create and animate 3D computer graphics to display in a web browser. I'm also Well-organised person,
                                        problem solver, independent employee with high attention to detail. In my free time, i am also doing learning about <b className="boldAboutMe">Artificial Intelligence and Computer Vision</b>.
                                    </div>

                                    <div data-aos="fade-up" data-aos-delay="300" data-aos-offset="100">
                                        <div className="technology">Here are some technologies I have been working with:</div>
                                        <div className="row techlist-content" style={{ marginLeft: "-1.5rem" }}>
                                            <div className="col-6 technologylist">
                                                <ul>
                                                    <li>C, C#, C++</li>
                                                    <li>Python</li>
                                                    <li>HTML</li>
                                                    <li>CSS</li>
                                                </ul>
                                            </div>
                                            <div className="col-6 technologylist">
                                                <ul>
                                                    <li>Bootstrap 5</li>
                                                    <li>JavaScript Es6</li>
                                                    <li>React Js</li>
                                                    <li>MySql Database</li>
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
