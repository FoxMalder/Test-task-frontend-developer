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
                                {this.fills.map((key) => (
                                    <p
                                        key={key}
                                        className="add-wrapper__form__parameters__headers-wrapper__header"
                                    >
                                        {key}
                                    </p>
                                ))}
                            </div>
                            <div className="add-wrapper__form__parameters__fills-wrapper">
                                {this.fills.map((key) => (
                                    <input
                                        className="add-wrapper__form__parameters__fills-wrapper__fill"
                                        key={key}
                                        type="text"
                                        value={this.state[key]}
                                        onChange={(e) =>
                                            this.setNewValue(e, key)
                                        }
                                        autoComplete="off"
                                        required
                                    />
                                ))}
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
