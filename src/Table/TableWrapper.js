import React from "react";
import TableRow from "./TableRow";
import TalbeHeader from "./TalbeHeader";

class TableWrapper extends React.Component {
    render() {
        if (this.props.rows === undefined) return null;

        return (
            <table className="table">
                <thead className="table__head">
                    <TalbeHeader rows={this.props.rows} setRows={this.props.setRows} />
                </thead>
                <tbody className="table__body">
                    {this.props.rows.map((item, index) => (
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
