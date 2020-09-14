import React from "react";

class TalbeHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: [
                { name: "id", isAscending: undefined },
                { name: "firstName", isAscending: undefined },
                { name: "lastName", isAscending: undefined },
                { name: "email", isAscending: undefined },
                { name: "phone", isAscending: undefined },
            ],
        };

        this.onHeaderClick = this.onHeaderClick.bind(this);
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
        let sortedTotalRows = this.props.totalRows;
        let sortedFiltredRows = this.props.filtredRows;

        if (!isAscending) {
            sortedTotalRows.sort((a, b) => (a[name] > b[name] ? 1 : -1));
            sortedFiltredRows.sort((a, b) => (a[name] > b[name] ? 1 : -1));
            this.setFill(name, true);
        } else {
            sortedTotalRows.sort((a, b) => (a[name] > b[name] ? -1 : 1));
            sortedFiltredRows.sort((a, b) => (a[name] > b[name] ? -1 : 1));
            this.setFill(name, false);
        }

        this.props.setRows(sortedTotalRows);
        this.props.setFiltredRows(sortedFiltredRows);
    }

    onHeaderClick(fillName, isAscending) {
        this.props.setBackgroundLoading(true);

        setTimeout(() => {
            this.sortByName(fillName, isAscending);
            this.props.setBackgroundLoading(false);
        }, 0);
    }

    render() {
        return (
            <tr className="table__head__row">
                {this.state.headers.map((item, index) => {
                    return (
                        <th
                            key={index}
                            className="table__head__row__fill"
                            onClick={() => {
                                this.onHeaderClick(item.name, item.isAscending);
                            }}
                        >
                            {`${item.name} ${
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
