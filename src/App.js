import React from "react";
import TableWrapper from "./Table/TableWrapper";
import ShowInformation from "./Information/ShowInformation";
import AddNewRow from "./Table/AddNewRow";
import Pagination from "./Pagination/Pagination";
import loadingImage from "./Loading.png";
import Search from "./Search/Search.js";
import Loading from "./Loading/Loading";

class App extends React.Component {
    constructor(props) {
        super();

        // Адрес запроса, для получения данных
        this.bigDataQuery = `http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`;
        this.littleDataQuery = `http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`;
        this.queryURL = undefined;

        this.state = {
            totalRows: undefined,
            filtredRows: undefined,
            selectedRow: undefined,

            currentRows: undefined,
            rowsPerPage: 50, // Количество записей на странице
            currentPage: 1,

            isLoading: true,
            error: false,
            isBackgroundLoading: false,
            isDataTypeSelected: false,

            allRows: 0,
        };

        this.setSelectedRow = this.setSelectedRow.bind(this);
        this.setActivePage = this.setActivePage.bind(this);
        this.setTotalRows = this.setTotalRows.bind(this);
        this.setFiltredRows = this.setFiltredRows.bind(this);
        this.setBackgroundLoading = this.setBackgroundLoading.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onClickRepeat = this.onClickRepeat.bind(this);

        this.setBigDataQuery = this.setBigDataQuery.bind(this);
        this.setLittleDataQuery = this.setLittleDataQuery.bind(this);
    }

    componentDidMount() {
        // this.getDataFromServer(this.queryURL);
    }

    setBackgroundLoading(state) {
        this.setState({ isBackgroundLoading: state });
    }

    setBigDataQuery() {
        this.setState({ isDataTypeSelected: true });
        this.getDataFromServer(this.bigDataQuery);
    }

    setLittleDataQuery() {
        this.setState({ isDataTypeSelected: true });
        this.getDataFromServer(this.littleDataQuery);
    }

    // Получение данных с сервера
    //      queryURL — get-запрос серверу
    getDataFromServer(queryURL) {
        fetch(queryURL)
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.length > 0) {
                        if (result[0].error) {
                            console.log(result[0].error);
                            this.setState({
                                isLoading: false,
                                error: result[0].error,
                            });
                            return;
                        }
                    }

                    this.setState({
                        isLoading: false,
                        totalRows: result,
                        filtredRows: result,
                        currentRows: this.countCurrentRowsOnPage(
                            this.state.currentPage,
                            this.state.rowsPerPage,
                            result
                        ),
                        allRows: result.length,
                    });
                },

                (error) => {
                    this.setState({
                        isLoading: false,
                        error: error.toString(),
                    });
                    console.log(error);
                }
            );
    }

    // Функция при нажатии на повторение запроса
    onClickRepeat() {
        this.setState({ isLoading: true, error: false });

        setTimeout(() => {
            this.getDataFromServer(this.queryURL);
        }, 0);
    }

    // Определение среза страницы
    //      currentPage — текущая выбранная страница для отображения
    //      rowsPerPage — количество записей на страницу
    //      totalRows — массив всех записей
    countCurrentRowsOnPage(currentPage, rowsPerPage, totalRows) {
        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = totalRows.slice(indexOfFirstRow, indexOfLastRow);

        return currentRows;
    }

    // Установка массива всех записей
    //      _rows — новое значение для массива
    setTotalRows(_rows) {
        this.setState({
            totalRows: _rows,
            currentRows: this.countCurrentRowsOnPage(
                this.state.currentPage,
                this.state.rowsPerPage,
                _rows
            ),
        });
    }

    // Установка массива отфильтрованных страниц
    //      _filtredRows — новое значение для массива
    setFiltredRows(_filtredRows) {
        this.setState({
            filtredRows: _filtredRows,
            searched: true,
            currentRows: this.countCurrentRowsOnPage(
                this.state.currentPage,
                this.state.rowsPerPage,
                _filtredRows
            ),
            allRows: _filtredRows.length,
        });
    }

    // Установка текущей страницы
    //      newPageNumber — новое значение для текущей страницы
    setActivePage(newPageNumber) {
        this.setState({
            currentRows: this.countCurrentRowsOnPage(
                newPageNumber,
                this.state.rowsPerPage,
                this.state.filtredRows
            ),
            currentPage: newPageNumber,
        });
    }

    // Установка выбранной пользователем записи для отображение в блоке под таблицей
    //      _row — обеъкт, содержащий в себе значения выбранной записи
    setSelectedRow(_row) {
        this.setState({ selectedRow: _row });
    }

    render() {
        // Приветствие
        if (!this.state.isDataTypeSelected) {
            return (
                <div className="wrapper">
                    <div className="hello">
                        <h1 className="hello__header">
                            Тестовое задание на позицию frontend разработчика
                        </h1>
                        <p className="hello__paragraph">
                            Выполнил: <b>Шамшурин Михаил</b>
                        </p>
                        <div className="hello__select-data-type">
                            <p className="hello__select-data-type__paragraph">
                                Выберите объем данных:
                            </p>
                            <button className="hello__select-data-type__button" onClick={this.setLittleDataQuery}>
                                Маленький объем данных
                            </button>
                            <button className="hello__select-data-type__button" onClick={this.setBigDataQuery}>
                                Большой объем данных
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // Отображение сообщения о загрузке
        if (this.state.isLoading) {
            return (
                <div className="wrapper">
                    <div className="wrapper__header">
                        <h1>Таблица</h1>
                        <Loading show={this.state.isLoading} loadingImage={loadingImage} />
                        <p className="wrapper__header__all-rows-count">Получение записей</p>
                    </div>
                </div>
            );
        }

        // Отображение сообщение об ошибке
        if (this.state.error) {
            return (
                <div className="wrapper">
                    <div className="wrapper__header error">
                        <h1>Таблица</h1>
                        <p>
                            В результате выполнения запроса произошла ошибка.
                            <br />
                            <b>Текст ошибки:</b> <b className="red">{this.state.error}</b>
                        </p>
                        <button onClick={this.onClickRepeat} className="wrapper__header__repeat">
                            Повторить запрос{" "}
                        </button>
                    </div>
                </div>
            );
        }

        // Отображение интерфейса
        return (
            <div className="wrapper">
                <div className="wrapper__header">
                    <h1>Таблица</h1>
                    <Loading
                        show={this.state.isLoading || this.state.isBackgroundLoading}
                        loadingImage={loadingImage}
                    />
                    <p className="wrapper__header__all-rows-count">
                        Всего записей: {this.state.allRows}
                    </p>
                </div>
                <AddNewRow
                    totalRows={this.state.totalRows}
                    filtredRows={this.state.filtredRows}
                    setTotalRows={this.setTotalRows}
                    setFiltredRows={this.setFiltredRows}
                    setBackgroundLoading={this.setBackgroundLoading}
                />
                <Search
                    totalRows={this.state.totalRows}
                    currentRows={this.state.currentRows}
                    setFiltredRows={this.setFiltredRows}
                    setBackgroundLoading={this.setBackgroundLoading}
                />
                <Pagination
                    currentPage={this.state.currentPage}
                    rows={this.state.filtredRows}
                    rowsPerPage={this.state.rowsPerPage}
                    setActivePage={this.setActivePage}
                    setBackgroundLoading={this.setBackgroundLoading}
                />
                <TableWrapper
                    totalRows={this.state.totalRows}
                    filtredRows={this.state.filtredRows}
                    currentRows={this.state.currentRows}
                    onRowClick={this.setSelectedRow}
                    setRows={this.setTotalRows}
                    setFiltredRows={this.setFiltredRows}
                    setBackgroundLoading={this.setBackgroundLoading}
                />
                <Pagination
                    currentPage={this.state.currentPage}
                    rows={this.state.filtredRows}
                    rowsPerPage={this.state.rowsPerPage}
                    setActivePage={this.setActivePage}
                    setBackgroundLoading={this.setBackgroundLoading}
                />
                <ShowInformation selectedRow={this.state.selectedRow} />
            </div>
        );
    }
}

export default App;
