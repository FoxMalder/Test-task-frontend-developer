import React from "react";

class TalbeRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: {},
        };
    }

    render() {
        return (
            <tr className="table__body__row">
                <td className="table__body__row__fill">Поле1</td>
                <td className="table__body__row__fill">Поле2</td>
                <td className="table__body__row__fill">Поле3</td>
            </tr>
        );
    }
}

export default TalbeRow;
