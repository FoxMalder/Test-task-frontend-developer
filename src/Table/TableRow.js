import React from "react";

class TalbeRow extends React.Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    // Событие при нажатии на строчку с записью
    //      row — значения строчки
    onClick(row) {
        this.props.setBackgroundLoading(true);
        setTimeout(() => {
            this.props.onClick(row);
            this.props.setBackgroundLoading(false);
        }, 0);
    }

    render() {
        return (
            <tr className="table__body__row" onClick={this.onClick.bind(this, this.props.row)}>
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
