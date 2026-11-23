/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";
import "./GetInTouch.css";
import SpaceObject from "../SpaceObject";
import { LanguageContext } from "../../LanguageContext";

class Getintouch extends Component {
    static contextType = LanguageContext;
    render() {
        const { t } = this.context;
        return (
            <section id="getInTouch">
                <SpaceObject variant="contact" />
                <div className="container-fluid">
                    <div className="container">
                        <div className="getintouch-section1">
                            <h1 className="getintouchjudul" data-aos="fade-up" data-aos-offset="100">
                                {t.contact}
                            </h1>
                            <p className="getintouchjudul-bawah" data-aos="fade-up" data-aos-offset="100">
                                {t.contactSub}
                            </p>
                        </div>
                        <div className="getintouch-section2">
                            <p className="bymail" data-aos="fade-up">
                                {t.email}
                            </p>
                            <div className="email">
                                <p data-aos="fade-up">
                                    <a target="_blank" aria-label="linkToMail" href="mailto:fahrizulkarnaen1@gmail.com">
                                        fahrizulkarnaen1@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="getintouch-section3">
                            <p className="socialmedia" data-aos="fade-up">
                                {t.social}
                            </p>
                            <ul data-aos="fade-up">
                                <li>
                                    <a target="_blank" aria-label="linkToInstagram" href="https://www.instagram.com/zulkarnaenfhr/">
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" aria-label="linkToLinkedIn" href="https://www.linkedin.com/in/fahrizulkarnaen">
                                        Linked In
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" aria-label="linkToGithub" href="https://github.com/zulkarnaenfhr">
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
