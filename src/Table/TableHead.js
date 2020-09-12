import React from "react";

class TalbeHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: {},
        };
    }

    render() {
        return (
            <tr className="table__head__row">
                <th className="table__head__row__fill">Заголовок1</th>
                <th className="table__head__row__fill">Заголовок2</th>
                <th className="table__head__row__fill">Заголовок3</th>
            </tr>
        );
    }
}

export default TalbeHead;