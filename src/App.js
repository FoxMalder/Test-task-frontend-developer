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

        this.queryURL = `http://www.filltext.com/?rows=500&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`;

        this.state = {
            totalRows: undefined,
            filtredRows: undefined,
            selectedRow: undefined,

            currentRows: undefined,
            rowsPerPage: 10,
            currentPage: 1,

            isLoading: true,
            isBackgroundLoading: false,
        };

        this.setSelectedRow = this.setSelectedRow.bind(this);
        this.setActivePage = this.setActivePage.bind(this);
        this.setTotalRows = this.setTotalRows.bind(this);
        this.setFiltredRows = this.setFiltredRows.bind(this);
        this.setBackgroundLoading = this.setBackgroundLoading.bind(this);
    }

    setBackgroundLoading(state) {
        this.setState({ isBackgroundLoading: state });
    }

    componentDidMount() {
        fetch(this.queryURL)
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

    countCurrentRowsOnPage(currentPage, rowsPerPage, totalRows) {
        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = totalRows.slice(indexOfFirstRow, indexOfLastRow);

        return currentRows;
    }

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

    setFiltredRows(_filtredRows) {
        this.setState({
            filtredRows: _filtredRows,
            searched: true,
            currentRows: this.countCurrentRowsOnPage(
                this.state.currentPage,
                this.state.rowsPerPage,
                _filtredRows
            ),
        });
    }

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

    setSelectedRow(_row) {
        this.setState({ selectedRow: _row });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="wrapper">
                    <div className="wrapper__header">
                        <h1>Таблица</h1>
                        <Loading show={this.state.isLoading} loadingImage={loadingImage} />
                    </div>
                </div>
            );
        }

        if (this.state.error) {
            return (
                <div className="wrapper">
                    <div className="wrapper__header error">
                        <h1>Таблица</h1>
                        <p>
                            В результате выполнения запроса произошла ошибка.
                            <br />
                            Текст ошибки: <b>{this.state.error}</b>
                        </p>
                    </div>
                </div>
            );
        }
        return (
            <div className="wrapper">
                <div className="wrapper__header">
                    <h1>Таблица</h1>
                    <Loading
                        show={this.state.isLoading || this.state.isBackgroundLoading}
                        loadingImage={loadingImage}
                    />
                </div>
                <AddNewRow
                    totalRows={this.state.totalRows}
                    filtredRows={this.state.filtredRows}
                    setTotalRows={this.setTotalRows}
                    setFiltredRows={this.setFiltredRows}
                />
                <Search
                    totalRows={this.state.totalRows}
                    currentRows={this.state.currentRows}
                    setFiltredRows={this.setFiltredRows}
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
                    totalRows={this.state.filtredRows}
                    rowsPerPage={this.state.rowsPerPage}
                    setActivePage={this.setActivePage}
                    setBackgroundLoading={this.setBackgroundLoading}
                />
                <Loading
                    show={this.state.isLoading || this.state.isBackgroundLoading}
                    loadingImage={loadingImage}
                />
                <ShowInformation selectedRow={this.state.selectedRow} />
            </div>
        );
    }
}

export default App;
