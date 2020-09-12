import React from "react";

function TableItem(props) {
    return (
        <tr onClick={() => props.onRowClick(props.rowKey)}>
            <td>{props.row.id}</td>
            <td>{props.row.firstName}</td>
            <td>{props.row.lastName}</td>
            <td>{props.row.email}</td>
            <td>{props.row.phone}</td>
            {/* <td>{props.row.adress}</td>
            <td>{props.row.description}</td> */}
        </tr>
    );
}

export default TableItem;
