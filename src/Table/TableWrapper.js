import React from "react";
import TableRow from "./TableRow";
import TalbeHeader from "./TalbeHeader";

class TableWrapper extends React.Component {
    render() {
        return (
            <table className="table">
                <thead className="table__head">
                    {this.props.currentRows.length !== 0 ? (
                        <TalbeHeader
                            setBackgroundLoading={this.props.setBackgroundLoading}
                            totalRows={this.props.totalRows}
                            setRows={this.props.setRows}
                            filtredRows={this.props.filtredRows}
                            setFiltredRows={this.props.setFiltredRows}
                        />
                    ) : null}
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
                    {this.props.currentRows.length === 0 ? (
                        <tr className="table__body__row table__body__row--unable">
                            <td colSpan="5" className="table__body__row__no-to-show">
                                Нет элементов для отображения
                            </td>
                        </tr>
                    ) : null}
                </tbody>
                <tfoot className="table__footer"></tfoot>
            </table>
        );
    }
}

export default TableWrapper;
