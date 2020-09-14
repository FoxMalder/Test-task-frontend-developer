import React from "react";

class Pagination extends React.Component {
    render() {
        const pageNubersPerPage = 7;
        const minPage = 1;
        let maxPage = Math.ceil(this.props.totalRows.length / this.props.rowsPerPage);
        maxPage = maxPage <= 0 ? 1 : maxPage;
        const totalPageNumbers = [...new Array(maxPage).keys()].map((item) => item + 1);
        const indexOfLastNumberOfPage =
            this.props.currentPage < Math.ceil(pageNubersPerPage / 2)
                ? pageNubersPerPage
                : maxPage - this.props.currentPage < Math.ceil(pageNubersPerPage / 2)
                ? maxPage
                : this.props.currentPage + Math.floor(pageNubersPerPage / 2);
        const indexOfFirstNumberOfPage =
            indexOfLastNumberOfPage - pageNubersPerPage < 0
                ? 0
                : indexOfLastNumberOfPage - pageNubersPerPage;
        const currentPageNumbers = totalPageNumbers.slice(
            indexOfFirstNumberOfPage,
            indexOfLastNumberOfPage
        );

        return (
            <div className="page-navigation">
                <div className="page-navigation__current-page-wrapper">
                    {this.props.currentPage !== minPage ? (
                        <button
                            className="page-navigation__current-page-wrapper__navigation-button"
                            onClick={this.props.setActivePage.bind(
                                this,
                                this.props.currentPage - 1
                            )}
                        >
                            ⮜
                        </button>
                    ) : null}

                    <p className="page-navigation__current-page-wrapper__current-page">
                        Страница: {this.props.currentPage} из {maxPage}
                    </p>

                    {this.props.currentPage !== maxPage ? (
                        <button
                            className="page-navigation__current-page-wrapper__navigation-button"
                            onClick={this.props.setActivePage.bind(
                                this,
                                this.props.currentPage + 1
                            )}
                        >
                            ⮞
                        </button>
                    ) : null}
                </div>

                {maxPage > 1 ? (
                    <div className="page-navigation__pages-wrapper">
                        <p className="page-navigation__pages-wrapper__caption">Перейти на:</p>
                        {this.props.currentPage - Math.floor(pageNubersPerPage / 2) > 1 &&
                        maxPage > pageNubersPerPage ? (
                            <p
                                className="page-navigation__pages-wrapper__page-dots"
                                onClick={this.props.setActivePage.bind(this, 1)}
                            >
                                ...
                            </p>
                        ) : null}

                        {currentPageNumbers.map((item) => {
                            return (
                                <p
                                    key={item}
                                    className="page-navigation__pages-wrapper__page-number"
                                    onClick={this.props.setActivePage.bind(this, item)}
                                >
                                    {item}
                                </p>
                            );
                        })}

                        {this.props.currentPage + Math.floor(pageNubersPerPage / 2) < maxPage &&
                        maxPage > pageNubersPerPage ? (
                            <p
                                className="page-navigation__pages-wrapper__page-dots"
                                onClick={this.props.setActivePage.bind(this, maxPage)}
                            >
                                ...
                            </p>
                        ) : null}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Pagination;
