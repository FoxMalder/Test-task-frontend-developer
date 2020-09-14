import React from "react";

class AddNewRow extends React.Component {
    constructor(props) {
        super();

        // Значения по умолчанию
        this.defaultValue = this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        };

        this.setNewValue = this.onChangeInput.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    // Добавление нового элемента в записи
    onFormSubmit(event) {
        event.preventDefault();
        this.props.setBackgroundLoading(true);

        setTimeout(() => {
            let address = {
                streetAddress: "Не указано",
                city: "Не указано",
                state: "Не указано",
                zip: "Не указано",
            };
            let description = "Не указано";

            this.props.setTotalRows([
                {
                    id: +this.state.id,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    phone: this.state.phone,
                    address: address,
                    description: description,
                },
                ...this.props.totalRows,
            ]);

            this.props.setFiltredRows([
                {
                    id: +this.state.id,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    phone: this.state.phone,
                    address: address,
                    description: description,
                },
                ...this.props.filtredRows,
            ]);

            this.setState(this.defaultValue);

            this.props.setBackgroundLoading(false);
    }, 0);
    }

    // Установка нового значения при изменении поля
    //      name — идентификатор поля
    onChangeInput(event, name) {
        this.setState({ [name]: event.target.value });
    }

    render() {
        if (!this.state.isOpened) {
            return (
                <div className="add-wrapper">
                    <button
                        className="add-wrapper__open-button--is-not-opened"
                        onClick={() => this.setState({ isOpened: !this.state.isOpened })}
                    >
                        + Новая запись
                    </button>
                </div>
            );
        }

        return (
            <div className="add-wrapper">
                <button
                    className="add-wrapper__open-button"
                    onClick={() => {
                        this.setState({ isOpened: !this.state.isOpened });
                        this.setState(this.defaultValue);
                    }}
                >
                    × Отмена
                </button>
                <form className="add-wrapper__form" onSubmit={this.onFormSubmit}>
                    <div className="add-wrapper__form__parameters">
                        <div className="add-wrapper__form__parameters__headers-wrapper">
                            <p className="add-wrapper__form__parameters__headers-wrapper__header">
                                id
                            </p>
                            <p className="add-wrapper__form__parameters__headers-wrapper__header">
                                firstName
                            </p>
                            <p className="add-wrapper__form__parameters__headers-wrapper__header">
                                lastName
                            </p>
                            <p className="add-wrapper__form__parameters__headers-wrapper__header">
                                email
                            </p>
                            <p className="add-wrapper__form__parameters__headers-wrapper__header">
                                phone
                            </p>
                        </div>
                        <div className="add-wrapper__form__parameters__fills-wrapper">
                            <input
                                className="add-wrapper__form__parameters__fills-wrapper__fill"
                                type="number"
                                value={this.state.id}
                                onChange={(e) => this.onChangeInput(e, "id")}
                                autoComplete="off"
                                required
                            />
                            <input
                                className="add-wrapper__form__parameters__fills-wrapper__fill"
                                type="text"
                                value={this.state.firstName}
                                onChange={(e) => this.onChangeInput(e, "firstName")}
                                autoComplete="off"
                                required
                            />
                            <input
                                className="add-wrapper__form__parameters__fills-wrapper__fill"
                                type="text"
                                value={this.state.lastName}
                                onChange={(e) => this.onChangeInput(e, "lastName")}
                                autoComplete="off"
                                required
                            />
                            <input
                                className="add-wrapper__form__parameters__fills-wrapper__fill"
                                type="email"
                                value={this.state.email}
                                onChange={(e) => this.onChangeInput(e, "email")}
                                autoComplete="off"
                                required
                            />
                            <input
                                className="add-wrapper__form__parameters__fills-wrapper__fill"
                                type="text"
                                value={this.state.phone}
                                onChange={(e) => this.onChangeInput(e, "phone")}
                                autoComplete="off"
                                required
                            />
                        </div>
                    </div>
                    <div className="add-wrapper__form__buttons-wrapper">
                        <input
                            className="add-wrapper__form__buttons-wrapper__clear-button"
                            type="reset"
                            value="Очистить форму"
                            onClick={() => this.setState(this.defaultValue)}
                        />
                        <input
                            className="add-wrapper__form__buttons-wrapper__add-button"
                            type="submit"
                            value="+ Добавить"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default AddNewRow;
