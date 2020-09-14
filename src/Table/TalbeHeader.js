import React from "react";

class TalbeHeader extends React.Component {
    constructor(props) {
        super();

        this.state = {
            // Заголовки полей записей таболицы
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

    // Сброс внешнего вида каждого столбца
    //      Имя столбца внешний вид которого будет не затронут
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

    // Установка значения сортировки для столбца
    //      name — имя столбца
    //      isAscending — тип сортировки сортировки
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

    // Сортировка по имени столбца
    //      name — имя столбца
    //      isAscending — тип сортировки (true — по возрастанию, false — по убыванию)
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

    // Событие при нажатии на имя столбца
    //      fillName — имя заголовка
    //      isAscending — тип сортировки (true — по возрастанию, false — по убыванию)
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
                            onClick={this.onHeaderClick.bind(this, item.name, item.isAscending)}
                        >
                            {/* Определяем значок для сортировки */}
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
