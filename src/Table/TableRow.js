import React from "react";

class TalbeRow extends React.Component {
    render() {
        return (
            <tr className="table__body__row" onClick ={()=>this.props.onClick(this.props.row)}>
                <td className="table__body__row__fill">{this.props.row.id}</td>
                <td className="table__body__row__fill">{this.props.row.firstName}</td>
                <td className="table__body__row__fill">{this.props.row.lastName}</td>
                <td className="table__body__row__fill">{this.props.row.email}</td>
                <td className="table__body__row__fill">{this.props.row.phone}</td>
            </tr>
        );
    }
}

export default TalbeRow;
