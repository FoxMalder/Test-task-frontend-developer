import React from "react";
import TableRow from "./TableRow";
import TableHead from "./TableHead";

class TableWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rows: [] };
    }

    render() {
        return (
            <table className="table">
                <thead className="table__head">
                    <TableHead></TableHead>
                </thead>
                <tbody className="table__body">
                    <TableRow></TableRow>
                    <TableRow></TableRow>
                    <TableRow></TableRow>
                </tbody>
                <tfoot className="table__footer"></tfoot>
            </table>
        );
    }
}

export default TableWrapper;
