import React from 'react'; // Всегда подключать, чтобы работал React
import TableItem from './TableItem';

function TableWrapper(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Адрес</th>
                    <th>Описание</th>
                </tr>
            </thead>
            <tbody className="table-body"> { 
                props.tableRows.map( 
                    function (row) {
                        return <TableItem 
                            row = { row } 
                            key = { row.id }
                        />
                    }
                )
            }
            </tbody>
            <tfoot></tfoot>
        </table>
    )
}

export default TableWrapper;