import React from "react";

function TableItem(props) {
    return (
        <tr>
            <td>{props.row.id}</td>
            <td>{props.row.firstName}</td>
            <td>{props.row.lastName}</td>
            <td>{props.row.email}</td>
            <td>{props.row.phone}</td>
<<<<<<< HEAD
            {/* <td>{props.row.adress}</td>
            <td>{props.row.description}</td> */}
=======
            <td>{props.row.adress}</td>
            <td>{props.row.description}</td>
>>>>>>> 2f85999acd0915d69c5f804df1bc441e320bfc3f
        </tr>
    );
}

export default TableItem;
