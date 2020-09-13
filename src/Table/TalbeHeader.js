import React from "react";

class TalbeHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: [
                { name: "id", caption: "ID", isAscending: undefined },
                { name: "firstName", caption: "Имя", isAscending: undefined },
                { name: "lastName", caption: "Фамилия", isAscending: undefined },
                { name: "email", caption: "Эл. почта", isAscending: undefined },
                { name: "phone", caption: "Телефон", isAscending: undefined },
            ],
        };
    }

    resetHeaders(name) {
        this.setState({
            headers: this.state.headers.map((item) => {
                if (item.name !== name) {
                    item.isAscending = undefined;
                }
                return item;
            }),
        });
    }

    setFill(name, isAscending) {
        this.resetHeaders(name);
        this.setState({
            headers: this.state.headers.map((item) => {
                if (item.name === name) {
                    item.isAscending = isAscending;
                }
                return item;
            }),
        });
    }

    sortByName(name, isAscending) {
        let sorted = [...this.props.totalRows];
        if (!isAscending) {
            sorted.sort((a, b) => (a[name] > b[name] ? 1 : -1));
            this.setFill(name, true);
        } else {
            sorted.sort((a, b) => (a[name] > b[name] ? -1 : 1));
            this.setFill(name, false);
        }

        this.props.setRows(sorted);
    }

    render() {
        if (this.state.isLoading) {
            return null;
        }

        return (
            <tr className="table__head__row">
                {this.state.headers.map((item, index) => {
                    return (
                        <th
                            key={index}
                            className="table__head__row__fill"
                            onClick={() => this.sortByName(item.name, item.isAscending)}
                        >
                            {`${item.caption} ${
                                item.isAscending ? "▲" : item.isAscending === undefined ? " " : "▼"
                            }`}
                        </th>
                    );
                })}
            </tr>
        );
    }
}

export default TalbeHeader;
