import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
    render() {
        return (
            <section>
                <div data-aos="fade-left" data-aos-offset="100" id="fixedSideNavbar" data-aos-delay="2500" className="navbarfahri">
                    <div>
                        <ul className="ulmenu">
                            <li>
                                <a href="#homeSection">/ Home</a>
                            </li>
                            <li>
                                <a href="#aboutMeSection">/ About Me</a>
                            </li>
                            <li>
                                <a href="#experienceSection">/ Experience</a>
                            </li>
                            <li>
                                <a href="#projectSection">/ Project</a>
                            </li>
                            <li>
                                <a href="#getInTouch">/ Get In Touch</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}

export default Navbar;
