import React, { Component } from "react";
import "./SigniatureSection.css";

class Signiaturesection extends Component {
    render() {
        return (
           <section id="digitalSignature">
              <div className="container-fluid digitalSignature-content">
                 <div className="container">
                    <p className="digitalSignature-write">Designed and built with intention by Fahri Izzuddin Zulkarnaen.</p>
                 </div>
              </div>
           </section>
        );
    }
}

export default Signiaturesection;
