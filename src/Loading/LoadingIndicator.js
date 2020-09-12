import React from "react";

function LoadingIndicator(props) {
    if (props.isLoading) {
        return (
            <div className="loading-indicator">
                <img src="img/loading.png" alt="loading"/>
            </div>
        );
    }
    return null;
}

export default LoadingIndicator;
