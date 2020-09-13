import React from "react";

class AddNewRowButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isOpened: false };
    }

    addNewItem() {
        const newRows = [
            {
                id: "∞",
                firstName: "Sue",
                lastName: "Corson",
                email: "DWhalley@in.gov",
                phone: "(612)211-6296",
                address: {
                    streetAddress: "9792 Mattis Ct",
                    city: "Waukesha",
                    state: "WI",
                    zip: "22178",
                },
                description: "et lacus magna dolor...",
            },
            ...this.props.rows,
        ];

        this.props.setRows(newRows);
    }

    openForm() {
        this.setState({ isOpened: !this.state.isOpened });
    }

    render() {
        if (!this.state.isOpened) {
            return (
                <div className="header__add-container">
                    <button
                        className="header__add-container__add-button"
                        onClick={() => this.openForm()}
                    >
                        + Новая запись
                    </button>
                </div>
            );
        } else {
            return (
                <div className="header__add-container">
                    <button
                        className="header__add-container__add-button"
                        onClick={() => this.openForm()}
                    >
                        × Отмена
                    </button>
                    <div className="header__add-container__form">
                        <input type="text"></input>
                        <input type="text"></input>
                        <input type="text"></input>
                        <input type="text"></input>
                        <input type="text"></input>
                    </div>
                </div>
            );
        }
    }
}

export default AddNewRowButton;
