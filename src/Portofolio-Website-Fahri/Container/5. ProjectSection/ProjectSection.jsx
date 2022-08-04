import React, { Component } from "react";
import "./ProjectSection.css";

class Projectsection extends Component {
    render() {
        return (
            <section id="projectSection">
                <div className="container-fluid">
                    <div className="container project-content">
                        <h1 className="sectionTitle" data-aos="fade-up" data-aos-offset="100">
                            / Project{" "}
                        </h1>
                        <div className="projectSection-AI">
                            <h1 style={{ color: "#87CEEB" }} className="judulSection" data-aos="fade-up" data-aos-offset="100">
                                / Artificial Intelligent Project
                            </h1>
                            <div className="barispertama row">
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up-right" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>Abusive Indonesian Tweet Classification using CNN Algorithm</h2>
                                                <p> Abusive Tweet Classification using Convolutional Neural Network. The value of accuracy, precision, recall and f1-score are 0.8946 or 89.46%</p>
                                                <p>
                                                    <span style={{ color: "#19f9d8" }}>python</span>, using <span style={{ color: "#19f9d8" }}>tensorflow</span>, <span style={{ color: "#19f9d8" }}>pandas</span>,{" "}
                                                    <span style={{ color: "#19f9d8" }}>pySastrawi</span>,<span style={{ color: "#19f9d8" }}> re</span> library
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="githubCNNAlgo" href="https://github.com/zulkarnaenfhr/Abusive-Indonesian-Tweet-Using-Convolutional-Neural-Networks-Method" target="_blank">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                                <a aria-label="colabCNNAlgo" href="https://colab.research.google.com/drive/1x1Io429fR7-a5QjX0-J9oSroOPCpzoLs?usp=sharing" target="_blank">
                                                    <span>
                                                        <i className="fab fa-python"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>Abusive Indonesian Tweets Using LSTM Algorithm</h2>
                                                <p>Abusive Tweet Classification using Long Short Term Memory. The value of accuracy, precision, recall and f1-score are 0.8814 or 88.14%</p>
                                                <p>
                                                    <span style={{ color: "#19f9d8" }}>python</span>, using <span style={{ color: "#19f9d8" }}>tensorflow</span>, <span style={{ color: "#19f9d8" }}>pandas</span>,{" "}
                                                    <span style={{ color: "#19f9d8" }}>pySastrawi</span>,<span style={{ color: "#19f9d8" }}> re</span> library
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="githubLSTMAlgo" href="https://github.com/zulkarnaenfhr/Abusive-Indonesian-Tweet-Classification-using-Long-Short-Term-Memory-Method" target="_blank">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                                <a aria-label="colabLSTMAlgo" href="https://colab.research.google.com/drive/1-8XYX22Ztd_1fxwUKD0QjtP9L5Y-5lDX?usp=sharing" target="_blank">
                                                    <span>
                                                        <i className="fab fa-python"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up-left" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>Hand Written Digit Classification using CNN Algorithm</h2>
                                                <p>Create an artificial intelligence that can classify a hand written digit in the form of an image</p>
                                                <p>
                                                    <span style={{ color: "#19f9d8" }}>python</span>, using <span style={{ color: "#19f9d8" }}>tensorflow</span>,<span style={{ color: "#19f9d8" }}> Pandas</span>,
                                                    <span style={{ color: "#19f9d8" }}> numpy</span> library
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="githubHandWritten" href="https://github.com/zulkarnaenfhr/CNN-Handwritten-Digit-Classification" target="_blank">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                                <a aria-label="colabHandWritten" href="https://colab.research.google.com/drive/1YwlumUVZhalSm3YKW7gbhlw09tBG4jLS?usp=sharing" target="_blank">
                                                    <span>
                                                        <i className="fab fa-python"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="projectSection-website">
                            <h1 style={{ color: "#87CEEB" }} className="judulSection judulSectionWebsiteProject" data-aos="fade-up" data-aos-offset="100">
                                / Website Project
                            </h1>
                            <div className="row">
                                {/* <!-- baris pertama  --> */}
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up-right" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>Indonesian Covid Mapping</h2>
                                                <p>a website that can monitor and mapping covid cases in each province, monitor daily indonesia growth cases and also covid-19 indonesia news update</p>
                                                <p>
                                                    <span style={{ color: "skyblue" }}>React Js</span>,<span style={{ color: "skyblue" }}> HTML</span>,<span style={{ color: "skyblue" }}> CSS</span>,
                                                    <span style={{ color: "skyblue" }}> Javascript</span>, using
                                                    <span style={{ color: "skyblue" }}> Indonesian government Covid-19 API</span>
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="githubCovidMapping" href="https://github.com/zulkarnaenfhr/indonesia-covid-mapping-react" target="_blank">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                                <a aria-label="websiteCovidMapping" href="https://indonesia-covid-mapping-react.vercel.app/" target="_blank">
                                                    <span>
                                                        <i className="fab fa-chrome"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>Big Sight Company Profile Website</h2>
                                                <p>Make a company profile website on Big Sight products as one of the activities following in kampus merdeka 2022 as a developer in PT Telkom Indonesia</p>
                                                <p>
                                                    <span style={{ color: "skyblue" }}>Next.Js</span>, <span style={{ color: "skyblue" }}>CSS</span>,<span style={{ color: "skyblue" }}> Node.Js</span>, using{" "}
                                                    <span style={{ color: "skyblue" }}>Bootstrap</span>, <span style={{ color: "skyblue" }}>Aos-Library</span>, <span style={{ color: "skyblue" }}>Axios</span>,{" "}
                                                    <span style={{ color: "skyblue" }}>Sequelize </span>
                                                    and many more
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="websiteCountdownTimer" href="https://bigsight.id/en" target="_blank">
                                                    <span>
                                                        <i className="fab fa-chrome"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up-left" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>Cek Bed Rumah Sakit Indonesia</h2>
                                                <p>Create a website for public to check the availability of hospital beds in indonesia, it can be categorize by covid or non covid patient</p>
                                                <p>
                                                    <span style={{ color: "skyblue" }}>Html</span>,<span style={{ color: "skyblue" }}> CSS</span>,<span style={{ color: "skyblue" }}> JavaScript</span>,
                                                    <span style={{ color: "skyblue" }}> PHP</span>, using <span style={{ color: "skyblue" }}> jQuery</span>,<span style={{ color: "skyblue" }}> Ajax</span>,
                                                    <span style={{ color: "skyblue" }}> Bootstrap </span>
                                                    Framework{" "}
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="githubCekBedRS" href="https://github.com/ElecticCode/Cek-Bed-Rs-Indonesia" target="_blank">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                                <a aria-label="websiteCekBedRS" href="https://cek-bed-rs-indonesia.herokuapp.com/" target="_blank">
                                                    <span>
                                                        <i className="fab fa-chrome"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- baris kedua  --> */}
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up-right" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>Gratio Class</h2>
                                                <p>
                                                    {" "}
                                                    Conduct training on the implement of React JS props and component into
                                                    <i> Gratio Class Website</i>
                                                </p>
                                                <p>
                                                    <span style={{ color: "skyblue" }}>React Js</span>,<span style={{ color: "skyblue" }}> Html</span>,<span style={{ color: "skyblue" }}> CSS</span>,
                                                    <span style={{ color: "skyblue" }}> JavaScript</span>, using <span style={{ color: "skyblue" }}> Bootstrap</span>,<span style={{ color: "skyblue" }}> jQuery</span>,
                                                    <span style={{ color: "skyblue" }}> Aos-library </span>
                                                    Framework
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="githubGratioClass" href="https://github.com/zulkarnaenfhr/GratioClass" target="_blank">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                                <a aria-label="websiteCekBedRS" href="https://gratio-class.vercel.app/" target="_blank">
                                                    <span>
                                                        <i className="fab fa-chrome"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>Little Dessert Landing Page Website</h2>
                                                <p>
                                                    {" "}
                                                    Make a landing page website for <i>Little Dessert Sidoarjo</i>
                                                </p>
                                                <p>
                                                    <span style={{ color: "skyblue" }}>Html</span>,<span style={{ color: "skyblue" }}> CSS</span>,<span style={{ color: "skyblue" }}> JavaScript</span>, using{" "}
                                                    <span style={{ color: "skyblue" }}> Bootstrap</span>,<span style={{ color: "skyblue" }}> jQuery</span>,<span style={{ color: "skyblue" }}> Aos-library </span>
                                                    Framework
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="githubLittleDessert" href="https://github.com/zulkarnaenfhr/little-dessert.github.io" target="_blank">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                                <a aria-label="websiteLittleDessert" href="https://zulkarnaenfhr.github.io/little-dessert.github.io/" target="_blank">
                                                    <span>
                                                        <i className="fab fa-chrome"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up-left" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>Cryptocurrency Market Monitor</h2>
                                                <p>Create a website to monitor the cryptocurrency market using indodax api. there are features for users what assets are recommend to be buy and recommended to be sell</p>
                                                <p>
                                                    <span style={{ color: "skyblue" }}>Html</span>,<span style={{ color: "skyblue" }}> CSS</span>,<span style={{ color: "skyblue" }}> JavaScript</span>,
                                                    <span style={{ color: "skyblue" }}> PHP</span>, using
                                                    <span style={{ color: "skyblue" }}> jQuery</span>,<span style={{ color: "skyblue" }}> Ajax</span>,<span style={{ color: "skyblue" }}> Bootstrap </span>
                                                    Framework
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="githubCryptocurrencyMonitor" href="https://github.com/zulkarnaenfhr/Indodax-API-x-Telegram-Website" target="_blank">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                                <a aria-label="websiteCryptocurrencyMonitor" href="https://indodax-monitoring-website.herokuapp.com/" target="_blank">
                                                    <span>
                                                        <i className="fab fa-chrome"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- baris ketiga  --> */}
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up-right" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>SpaceCapt University</h2>
                                                <p>
                                                    {" "}
                                                    Make a website that implement CRUD operations using php native for
                                                    <i> SpaceCapt University</i>
                                                </p>
                                                <p>
                                                    <span style={{ color: "skyblue" }}>PHP</span>,<span style={{ color: "skyblue" }}> Html</span>,<span style={{ color: "skyblue" }}> CSS</span>,
                                                    <span style={{ color: "skyblue" }}> JavaScript</span>, using <span style={{ color: "skyblue" }}> Bootstrap </span>
                                                    Framework and <span style={{ color: "skyblue" }}> MySql </span> Database
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="githubSpaceCaptUniversity" href="https://github.com/zulkarnaenfhr/spacecapt_university" target="_blank">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>SpaceCapt Tech Industry</h2>
                                                <p>Make a Rest API CRUD Operations and implement it on a SpaceCapt Tech Website</p>
                                                <p>
                                                    <span style={{ color: "skyblue" }}>PHP</span>,<span style={{ color: "skyblue" }}> Html</span>,<span style={{ color: "skyblue" }}> CSS</span>,
                                                    <span style={{ color: "skyblue" }}> JavaScript</span>, using <span style={{ color: "skyblue" }}> Bootstrap </span>
                                                    Framework and <span style={{ color: "skyblue" }}> MySql </span> Database
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="githubSpaceCaptTect" href="https://github.com/zulkarnaenfhr/SpaceCapt_Tech" target="_blank">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12" data-aos="fade-up-left" data-aos-offset="300">
                                    <div className="cardfahri-container">
                                        <div className="cardfahri">
                                            <div className="cardfahri--display">
                                                <h2>Password Generator Website</h2>
                                                <p>Website to generate passwords with the required password length and conditions</p>
                                                <p>
                                                    <span style={{ color: "skyblue" }}>Html</span>,<span style={{ color: "skyblue" }}> CSS</span>,<span style={{ color: "skyblue" }}> JavaScript</span>, using{" "}
                                                    <span style={{ color: "skyblue" }}>jQuery </span>
                                                    Framework for animation
                                                </p>
                                            </div>
                                            <div className="project-link">
                                                <a aria-label="githubPasswordGenerator" href="https://github.com/zulkarnaenfhr/Password-Generator.github.io" target="_blank">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                                <a aria-label="websitePasswordGenerator" href="https://zulkarnaenfhr.github.io/Password-Generator.github.io/" target="_blank">
                                                    <span>
                                                        <i className="fab fa-chrome"></i>
                                                    </span>
                                                </a>
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

export default Projectsection;
