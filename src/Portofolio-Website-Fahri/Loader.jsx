import React, { Component } from "react";
import "./Loader.css";

class Loader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusShow: false,
        };
    }

    componentDidMount() {
        this.setState({
            statusShow: true,
        });

        setTimeout(() => {
            this.setState({
                statusShow: false,
            });
        }, 2000);
    }

    render() {
        return (
            <div className={this.state.statusShow ? "load-show" : "load-hide"}>
                <div className={`loader-wrapper`}>
                    <div id="load">
                        <div>N</div>
                        <div>E</div>
                        <div>A</div>
                        <div>N</div>
                        <div>R</div>
                        <div>A</div>
                        <div>K</div>
                        <div>L</div>
                        <div>U</div>
                        <div>Z</div>
                    </div>
                </div>
                <button>halo</button>
            </div>
        );
    }
}

export default Loader;
