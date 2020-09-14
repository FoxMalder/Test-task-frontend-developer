import React from 'react';

class Loading extends React.Component {
    render() {
        // Если не идёт загрузка, то скрывам колёсико загрузки
        if (this.props.show === false) return null;

        return (
            <img src={this.props.loadingImage} alt="loading" className="loading"></img>
        );
    }
}

export default Loading;
