import React from "react";

class AddNewRow extends React.Component {
    constructor(props) {
        super(props);

        this.defaultValue = this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        };

        this.fills = [];
        for (let item in this.state) {
            this.fills.push(item);
        }

        this.setNewValue = this.setNewValue.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
    }

    addNewItem(event) {
        let address = {
            streetAddress: "Не указано",
            city: "Не указано",
            state: "Не указано",
            zip: "Не указано",
        };
        let description = "Не указано";

        this.props.setRows([
            {
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone,
                address: address,
                description: description,
            },
            ...this.props.rows,
        ]);

        this.setState(this.defaultValue);

        event.target.reset();
        event.preventDefault();
    }

    setNewValue(event, name) {
        this.setState({ [name]: event.target.value });
    }

    render() {
        if (!this.state.isOpened) {
            return (
                <div className="add-wrapper">
                    <button
                        className="add-wrapper__open-button--is-not-opened"
                        onClick={() =>
                            this.setState({ isOpened: !this.state.isOpened })
                        }
                    >
                        + Новая запись
                    </button>
                </div>
            );
        } else {
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
                    <form
                        className="add-wrapper__form"
                        onSubmit={(e) => this.addNewItem(e)}
                    >
                        <div className="add-wrapper__form__parameters">
                            <div className="add-wrapper__form__parameters__headers-wrapper">
                                <p className="add-wrapper__form__parameters__headers-wrapper__header"> ID </p>
                                <p className="add-wrapper__form__parameters__headers-wrapper__header"> Имя </p>
                                <p className="add-wrapper__form__parameters__headers-wrapper__header"> Фамилия </p>
                                <p className="add-wrapper__form__parameters__headers-wrapper__header"> E-mail </p>
                                <p className="add-wrapper__form__parameters__headers-wrapper__header"> Телефон </p>
                            </div>
                            <div className="add-wrapper__form__parameters__fills-wrapper">
                                <input
                                    className="add-wrapper__form__parameters__fills-wrapper__fill"
                                    type="number"
                                    value={this.state.id}
                                    onChange={(e) => this.setNewValue(e, 'id')}
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    className="add-wrapper__form__parameters__fills-wrapper__fill"
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={(e) => this.setNewValue(e, 'firstName')}
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    className="add-wrapper__form__parameters__fills-wrapper__fill"
                                    type="text"
                                    value={this.state.lastName}
                                    onChange={(e) => this.setNewValue(e, 'lastName')}
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    className="add-wrapper__form__parameters__fills-wrapper__fill"
                                    type="email"
                                    value={this.state.email}
                                    onChange={(e) => this.setNewValue(e, 'email')}
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    className="add-wrapper__form__parameters__fills-wrapper__fill"
                                    type="text"
                                    value={this.state.phone}
                                    onChange={(e) => this.setNewValue(e, 'phone')}
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
}

export default AddNewRow;
