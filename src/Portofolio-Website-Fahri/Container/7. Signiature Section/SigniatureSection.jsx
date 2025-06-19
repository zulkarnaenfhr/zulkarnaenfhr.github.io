import React, { Component } from "react";
import "./SigniatureSection.css";

class Signiaturesection extends Component {
    render() {
        return (
           <section id="digitalSignature">
              <div className="container-fluid digitalSignature-content">
                 <div className="container">
                    <p className="digitalSignature-write">Crafted with care by Fahri Zulkarnaen @juniordeveloper-era-2025</p>
                 </div>
              </div>
           </section>
        );
    }
}

export default Signiaturesection;
