import React from "react";

class Pagination extends React.Component {
    render() {
        let minPage = 1;
        let maxPage = Math.ceil(this.props.totalRows / this.props.rowsPerPage);
        let pageNumbers = [...new Array(maxPage).keys()].map((item) => item + 1);

        return (
            <div className="page-navigation">
                <p className="page-navigation__current-page">Страница: {this.props.currentPage}</p>
                <div className="page-navigation__pages-wrapper">
                    {this.props.currentPage !== minPage ? (
                        <button
                            className="page-navigation__pages-wrapper__navigation-button"
                            onClick={() => this.props.setPage(this.props.currentPage - 1)}
                        >
                            ⮜
                        </button>
                    ) : null}
                    {pageNumbers.map((item) => {
                        return (
                            <p
                                key={item}
                                className="page-navigation__pages-wrapper__page-number"
                                onClick={() => this.props.setPage(item)}
                            >
                                {item}
                            </p>
                        );
                    })}
                    {this.props.currentPage !== maxPage ? (
                        <button
                            className="page-navigation__pages-wrapper__navigation-button"
                            onClick={() => this.props.setPage(this.props.currentPage + 1)}
                        >
                            ⮞
                        </button>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Pagination;
