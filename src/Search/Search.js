import React, { Component } from "react";

class Search extends Component {
    constructor(props) {
        super();

        this.state = {
            searchQuery: "",
        };

        this.queryChange = this.queryChange.bind(this);
        this.filterRows = this.filterRows.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    // Изменение текста для фильтрации
    queryChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    // Фильтрация значений
    filterRows() {

        // Если запрос пуст, то отменяем фильтрацию
        if (this.state.searchQuery === "") {
            this.props.setFiltredRows(this.props.totalRows);
            return;
        }

        let array = [...this.props.totalRows].filter((item) => {
            for (let key in item) {
                if (
                    item[key]
                        .toString()
                        .toLowerCase()
                        .indexOf(this.state.searchQuery.toLowerCase()) !== -1
                ) {
                    return true;
                }
            }
            return false;
        });
        this.props.setFiltredRows(array);
    }

    // Событие при подтверждении формы
    onSubmitForm(event) {
        event.preventDefault();

        this.props.setBackgroundLoading(true);
        setTimeout(() => {
            this.filterRows();
            this.props.setBackgroundLoading(false);
        }, 0);
    }

    render() {
        return (
            <div className="search">
                <form className="search__form" onSubmit={this.onSubmitForm}>
                    <input
                        className="search__form__input"
                        type="text"
                        value={this.state.searchQuery}
                        onChange={this.queryChange}
                        placeholder="Введите ключевое слово для фильтрации"
                    ></input>
                    <input className="search__form__submit" type="submit" value="Найти"></input>
                </form>
            </div>
        );
    }
}

export default Search;
