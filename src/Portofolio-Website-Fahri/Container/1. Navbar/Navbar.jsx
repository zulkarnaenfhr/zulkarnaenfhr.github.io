import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <section>
                <div data-aos="fade-left" data-aos-offset="100" id="fixedSideNavbar" data-aos-delay="2500" className="navbarfahri">
                    <div>
                        <ul className="ulmenu">
                            <li>
                                <a aria-label="navbarHomeSection" href="#homeSection">
                                    / Home
                                </a>
                            </li>
                            <li>
                                <a aria-label="navbarAboutMeSection" href="#aboutMeSection">
                                    / About Me
                                </a>
                            </li>
                            <li>
                                <a aria-label="navbarExperienceSection" href="#experienceSection">
                                    / Experience
                                </a>
                            </li>
                            <li>
                                <a aria-label="navbarProjectSection" href="#projectSection">
                                    / Project
                                </a>
                            </li>
                            <li>
                                <a aria-label="navbarGetInTouch" href="#getInTouch">
                                    / Get In Touch
                                </a>
                            </li>
                            <li>
                                <Link to="/files/CV_Fahri Izzuddin Zulkarnaen_Website Developer.pdf" target="_blank" download="CV_Fahri izzuddin Zulkarnaen_Website Developer">
                                    <p className="navbarDownloadCV">/ Download CV</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}

export default Navbar;
