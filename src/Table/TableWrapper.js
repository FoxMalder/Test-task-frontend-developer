import React from "react"; // Всегда подключать, чтобы работал React
import TableItem from "./TableItem";

function TableWrapper(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    {props.columnHeaders.map((item, index) => {
                        return (
                            <th
                                key={index}
                                onClick={() =>
                                    props.onClick(item.name, item.isAscending)
                                }
                            >
<<<<<<< HEAD
                                {`${item.caption} ${
=======
                                {`${item.caption} ${
>>>>>>> 2f85999acd0915d69c5f804df1bc441e320bfc3f
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
                {props.tableRows.map(function (row, index) {
                    return <TableItem row={row} key={index} />;
                })}
            </tbody>
            <tfoot></tfoot>
        </table>
    );
}

export default TableWrapper;
