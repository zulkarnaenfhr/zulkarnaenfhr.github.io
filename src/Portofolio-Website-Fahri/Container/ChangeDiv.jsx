import React, { Component } from "react";
import "./ChangeDiv.css";

class Changediv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusShow: "div1",
        };
        this.buttonHandleChange = this.buttonHandleChange.bind(this);
    }

    buttonHandleChange = (event) => {
        this.setState({
            statusShow: event.target.name,
        });
        // console.log(event);
    };

    render() {
        return (
            <div className="container">
                <h1>masuk</h1>
                <hr />
                {this.state.statusShow}
                <div className={this.state.statusShow === "div1" ? "load-show" : "load-hide"}>
                    <div className="div1">Masuk Div 1</div>
                </div>

                <div className={this.state.statusShow === "div2" ? "load-show" : "load-hide"}>
                    <div className="div1">Masuk Div 2</div>
                </div>

                <button name="div1" onClick={this.buttonHandleChange}>
                    change 1
                </button>
                <button name="div2" onClick={this.buttonHandleChange}>
                    change 2
                </button>
            </div>
        );
    }
}

export default Changediv;
