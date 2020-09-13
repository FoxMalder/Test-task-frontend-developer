import React from "react";

class ShowInformation extends React.Component {
    render() {
        if (this.props.selectedRow === undefined) return null;

        return (
            <div className="information">
                <p className="information__fill">
                    Выбран пользователь:{" "}
                    <b>{`${this.props.selectedRow.firstName} ${this.props.selectedRow.lastName}`}</b>
                </p>
                <div className="information__fills-wrapper">
                    <p className="information__fills-wrapper__fill">Описание:</p>
                    <textarea
                        className="information__fills-wrapper__textarea"
                        readOnly
                        value={this.props.selectedRow.description}
                    ></textarea>
                </div>
                <p className="information__fill">
                    Адрес проживания: <b>{this.props.selectedRow.address.streetAddress}</b>
                </p>
                <p className="information__fill">
                    Город: <b>{this.props.selectedRow.address.city}</b>
                </p>
                <p className="information__fill">
                    Провинция/штат: <b>{this.props.selectedRow.address.state}</b>
                </p>
                <p className="information__fill">
                    Индекс: <b>{this.props.selectedRow.address.zip}</b>
                </p>
            </div>
        );
    }
}

export default ShowInformation;
