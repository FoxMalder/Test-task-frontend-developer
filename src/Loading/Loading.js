import React from 'react';

class Loading extends React.Component {
    render() {
        if (this.props.show === false) return null;

        return (
            <img src={this.props.loadingImage} alt="loading" className="loading"></img>
        );
    }
}

export default Loading;
