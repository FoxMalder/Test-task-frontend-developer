import React from "react";
import TableRow from "./TableRow";
import TalbeHeader from "./TalbeHeader";

class TableWrapper extends React.Component {
    render() {
        return (
            <table className="table">
                <thead className="table__head">
                    <TalbeHeader totalRows={this.props.totalRows} setRows={this.props.setRows} />
                </thead>
                <tbody className="table__body">
                    {this.props.currentRows.map((item, index) => (
                        <TableRow
                            row={item}
                            key={index}
                            index={index}
                            onClick={this.props.onRowClick}
                        />
                    ))}
                </tbody>
                <tfoot className="table__footer"></tfoot>
            </table>
        );
    }
}

export default TableWrapper;
