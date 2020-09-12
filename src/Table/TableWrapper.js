import React from "react"; // Всегда подключать, чтобы работал React
import TableItem from "./TableItem";

function TableWrapper(props) {
    if (!props.isLoading) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        {props.columnHeaders.map((item, index) => {
                            return (
                                <th
                                    key={index}
                                    onClick={() =>
                                        props.onHeaderClick(
                                            item.name,
                                            item.isAscending
                                        )
                                    }
                                >
                                    {`${item.caption} ${
                                        item.isAscending
                                            ? "▲"
                                            : item.isAscending === undefined
                                            ? " "
                                            : "▼"
                                    }`}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className="table-body">
                    {props.tableRows.map((row, index) => {
                        return (
                            <TableItem
                                row={row}
                                key={index}
                                rowKey={index}
                                onRowClick={props.onRowClick}
                            />
                        );
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
        );
    }
    return null;
}

export default TableWrapper;
