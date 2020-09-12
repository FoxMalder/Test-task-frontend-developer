import React from "react";

function ItemShowForm(props) {
    try {
        if (props.activeItem === undefined) throw "No active element selected"
        let selectedRow = props.row[props.activeItem];
        return (
            <div className="showing-form">
                <h2 className="showing-form__header">
                    Выбран пользователь:
                    {` ${selectedRow.firstName} ${selectedRow.lastName}`}
                </h2>
                <div className="showing-form__data">
                    <p className="showing-form__data__fill">Описание:</p>
                    <p className="showing-form__data__fill">
                        <textarea className="showing-form__data__fill__textarea" defaultValue={selectedRow.description} />{" "}
                    </p>
                    <p className="showing-form__data__fill">
                        Адрес проживания:{" "}
                        <b>{selectedRow.address.streetAddress} </b>{" "}
                    </p>
                    <p className="showing-form__data__fill">
                        Город: <b>{selectedRow.address.city}</b>{" "}
                    </p>
                    <p className="showing-form__data__fill">
                        Штат/провинция: <b>{selectedRow.address.state}</b>{" "}
                    </p>
                    <p className="showing-form__data__fill">
                        Индекс: <b>{selectedRow.address.zip}</b>{" "}
                    </p>
                </div>
            </div>
        );
    } catch (e) {
        console.log(e);
        return null;
    }
}

export default ItemShowForm;
