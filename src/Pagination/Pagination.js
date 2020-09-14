import React from "react";

class Pagination extends React.Component {
    constructor(props) {
        super();

        this.pageNubersPerPage = 7;
        this.minPage = 1;
        this.maxPage = undefined;
        this.indexOfLastNumberOfPage = undefined;
        this.indexOfFirstNumberOfPage = undefined;
        this.indexOfFirstNumberOfPage = undefined;
        this.currentPageNumbers = undefined;
        this.totalPageNumbers = undefined;

        this.onClick = this.onClick.bind(this);
        this.countVaribles = this.countVaribles.bind(this);

        this.countVaribles(props);
    }

    componentDidMount() {
        this.countVaribles(this.props);
    }

    componentDidUpdate() {
        this.countVaribles(this.props);
    }

    // Подсчёт значний для параметров
    //      _props — параметры, переданные в объект
    countVaribles(_props) {
        this.minPage = 1;

        // Нахождение максимального номера страницы и его проверка
        this.maxPage = Math.ceil(_props.rows.length / _props.rowsPerPage);
        this.maxPage = this.maxPage <= 0 ? 1 : this.maxPage;

        // Все номера страниц
        const totalPageNumbers = [...new Array(this.maxPage).keys()].map((item) => item + 1);

        // Нахождение параметров для списка отображаемых номеров страниц и их проверка
        if (_props.currentPage < Math.ceil(this.pageNubersPerPage / 2)) {
            this.indexOfLastNumberOfPage = this.pageNubersPerPage;
        } else if (this.maxPage - _props.currentPage < Math.ceil(this.pageNubersPerPage / 2)) {
            this.indexOfLastNumberOfPage = this.maxPage;
        } else {
            this.indexOfLastNumberOfPage =
                _props.currentPage + Math.floor(this.pageNubersPerPage / 2);
        }

        if (this.indexOfLastNumberOfPage - this.pageNubersPerPage < 0) {
            this.indexOfFirstNumberOfPage = 0;
        } else {
            this.indexOfFirstNumberOfPage = this.indexOfLastNumberOfPage - this.pageNubersPerPage;
        }

        if(_props.currentPage > this.maxPage) {
            _props.setActivePage(this.maxPage);
        }

        // Установка отображаемых страниц на текущей странице
        this.currentPageNumbers = totalPageNumbers.slice(
            this.indexOfFirstNumberOfPage,
            this.indexOfLastNumberOfPage
        );
    }

    // Установка новой страницы
    //      page — новый номер страницы
    onClick(page) {
        this.props.setBackgroundLoading(true);

        setTimeout(() => {
            this.props.setActivePage(page);
            this.props.setBackgroundLoading(false);
        }, 0);
    }

    render() {
        return (
            <div className="page-navigation">
                <div className="page-navigation__current-page-wrapper">
                    {/* Если можно пролистать назад, то отображаем кнопку перехода на предыдущую страницу.
                        Иначе просто скрываем ее. */}
                    {this.props.currentPage !== this.minPage ? (
                        <button
                            className="page-navigation__current-page-wrapper__navigation-button"
                            onClick={this.onClick.bind(this, this.props.currentPage - 1)}
                        >
                            ⮜
                        </button>
                    ) : null}

                    {/* Отображаем текующую страницу и номер всех страниц */}
                    <p className="page-navigation__current-page-wrapper__current-page">
                        Страница: {this.props.currentPage} из {this.maxPage}
                    </p>

                    {this.props.currentPage !== this.maxPage ? (
                        <button
                            className="page-navigation__current-page-wrapper__navigation-button"
                            onClick={this.onClick.bind(this, this.props.currentPage + 1)}
                        >
                            ⮞
                        </button>
                    ) : null}
                </div>

                {this.maxPage > 1 ? (
                    <div className="page-navigation__pages-wrapper">
                        <p className="page-navigation__pages-wrapper__caption">Перейти на:</p>
                        {this.props.currentPage - Math.floor(this.pageNubersPerPage / 2) > 1 &&
                        this.maxPage > this.pageNubersPerPage ? (
                            <p
                                className="page-navigation__pages-wrapper__page-dots"
                                onClick={this.onClick.bind(this, 1)}
                            >
                                ...
                            </p>
                        ) : null}

                        {this.currentPageNumbers.map((item) => {
                            return (
                                <p
                                    key={item}
                                    className="page-navigation__pages-wrapper__page-number"
                                    onClick={this.onClick.bind(this, item)}
                                >
                                    {item}
                                </p>
                            );
                        })}

                        {this.props.currentPage + Math.floor(this.pageNubersPerPage / 2) <
                            this.maxPage && this.maxPage > this.pageNubersPerPage ? (
                            <p
                                className="page-navigation__pages-wrapper__page-dots"
                                onClick={this.onClick.bind(this, this.maxPage)}
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
