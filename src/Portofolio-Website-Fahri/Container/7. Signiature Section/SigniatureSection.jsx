import React, { Component } from "react";
import "./SigniatureSection.css";
import { LanguageContext } from "../../LanguageContext";

class Signiaturesection extends Component {
    static contextType = LanguageContext;
    render() {
        const { t } = this.context;
        return (
           <section id="digitalSignature">
              <div className="container-fluid digitalSignature-content">
                 <div className="container">
                    <p className="digitalSignature-write">{t.footer}</p>
                 </div>
              </div>
           </section>
        );
    }
}

export default Signiaturesection;
