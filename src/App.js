import React from "react";
import TableWrapper from "./Table/TableWrapper";
import ShowInformation from "./Information/ShowInformation";
import AddNewRow from "./Table/addNewRow";
import Pagination from "./Pagination/Pagination";

class App extends React.Component {
    constructor(props) {
        super();

        this.queryURL = `http://www.filltext.com/?rows=100&id=%7Bnumber%7C10000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`;

        this.state = {
            totalRows: undefined,
            isLoading: true,
            selectedRow: undefined,

            pages: undefined,
            currentPage: 1,
            currentRows: undefined,
            rowsPerPage: 10,
        };

        this.currnetRows = undefined;

        this.setSelectedRow = this.setSelectedRow.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setRows = this.setRows.bind(this);
    }

    componentDidMount() {
        fetch(this.queryURL)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoading: false,
                        totalRows: result,
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

    setRows(_rows) {
        this.setState({
            totalRows: _rows,
            currentRows: this.countCurrentRowsOnPage(
                this.state.currentPage,
                this.state.rowsPerPage,
                _rows
            ),
        });
    }

    setPage(newPageNumber) {
        this.setState({
            currentRows: this.countCurrentRowsOnPage(
                newPageNumber,
                this.state.rowsPerPage,
                this.state.totalRows
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
                    <h1 className="wrapper__header">Таблица</h1>
                    <p>Получение данных...</p>
                </div>
            );
        }

        if (this.state.error) {
            return (
                <div className="wrapper">
                    <h1 className="wrapper__header">Таблица</h1>
                    <p>Произошла ошибка, при получении данных</p>
                </div>
            );
        }

        return (
            <div className="wrapper">
                <h1 className="wrapper__header">Таблица</h1>
                <AddNewRow rows={this.state.totalRows} setRows={this.setRows} />
                <TableWrapper
                    totalRows={this.state.totalRows}
                    currentRows={this.state.currentRows}
                    onRowClick={this.setSelectedRow}
                    setRows={this.setRows}
                />
                <Pagination
                    currentPage={this.state.currentPage}
                    setPage={this.setPage}
                    totalRows={this.state.totalRows.length}
                    rowsPerPage={this.state.rowsPerPage}
                />
                <ShowInformation selectedRow={this.state.selectedRow} />
            </div>
        );
    }
}

export default App;
