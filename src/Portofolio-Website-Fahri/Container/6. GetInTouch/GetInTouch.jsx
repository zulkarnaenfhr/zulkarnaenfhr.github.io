import React, { Component } from "react";
import "./GetInTouch.css";

class Getintouch extends Component {
    render() {
        return (
            <section id="getInTouch">
                <div className="container-fluid">
                    <div className="container">
                        <div className="getintouch-section1">
                            <h1 className="getintouchjudul" data-aos="fade-up" data-aos-offset="100">
                                Get In Touch With Me!
                            </h1>
                            <p className="getintouchjudul-bawah" data-aos="fade-up" data-aos-offset="100">
                                Lets Get Conversation Started!
                            </p>
                        </div>
                        <div className="getintouch-section2">
                            <p className="bymail" data-aos="fade-up">
                                By Email
                            </p>
                            <div className="email">
                                <p data-aos="fade-up">
                                    <a aria-label="linkToMail" href="mailto:fahrizulkarnaen1@gmail.com">
                                        fahrizulkarnaen1@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="getintouch-section3">
                            <p className="socialmedia" data-aos="fade-up">
                                Social Media
                            </p>
                            <ul data-aos="fade-up">
                                <li>
                                    <a aria-label="linkToInstagram" href="https://www.instagram.com/zulkarnaenfhr/">
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a aria-label="linkToLinkedIn" href="https://www.linkedin.com/in/fahrizulkarnaen">
                                        Linked In
                                    </a>
                                </li>
                                <li>
                                    <a aria-label="linkToGithub" href="https://github.com/zulkarnaenfhr">
                                        Github
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Getintouch;
