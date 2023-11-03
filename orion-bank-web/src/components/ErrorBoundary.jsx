import React, { Component } from 'react';
import ErroPath from "../assets/img/path-error.svg";
import ErroServer from "../assets/img/server-error.svg";
import { Link } from "react-router-dom";
import './css/errorboundary.css';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo,
        });
    }

    render() {
        if (this.props.pathError) {
            console.log(this.props.pathError)
            return (
                <div className='containerError'>
                    <img src={ErroPath} alt="404" />
                    <h4 style={{ color: "#3f3d56" }}>Ops! Veio para o lugar errado.</h4>
                    <Link to="/login"><a class="btn-back">Voltar</a></Link>
                </div>
            );
        }

        if (this.state.hasError) {
            return (
                <div className='containerError'>
                <img src={ErroServer} alt="404" />
                <h4 style={{ color: "#3f3d56" }}>Algo deu errado.</h4>
                <Link to="/login"><a class="btn-back">Voltar</a></Link>
            </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;