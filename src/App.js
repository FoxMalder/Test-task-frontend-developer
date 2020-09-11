import React, { useEffect } from "react";
import TableWrapper from "./Table/TableWrapper";

function App() {
    const queryURL = `http://www.filltext.com/?rows=10&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`;
    const [tableRows, setTableRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [errorText, setErrorText] = React.useState("");
    const [columnHeaders, setColumnHeaders] = React.useState([
        { caption: "ID", name: "id", isAscending: undefined },
        { caption: "Имя", name: "firstName", isAscending: undefined },
        { caption: "Фамилия", name: "lastName", isAscending: undefined },
        { caption: "Email", name: "email", isAscending: undefined },
        { caption: "Телефон", name: "phone", isAscending: undefined },
        // { caption: "Адрес", name: "adress", isAscending: undefined },
        // { caption: "Описание", name: "description", isAscending: undefined },
    ]);

    function setHeaderFill(name, isAscending) {
        setColumnHeaders(
            columnHeaders.map((item) => {
                if (item.name === name) {
                    item.isAscending = isAscending;
                }
                return item;
            })
        );
    }

    function sortByFill(fill, isAscending) {
        
        setColumnHeaders(
            columnHeaders.map((item) => {
                if (item.name !== fill) {
                    item.isAscending = undefined;
                }
                return item;
            })
        );

        const sorted = [...tableRows];
        sorted.sort((a, b) => {
            if (isAscending) {
                setHeaderFill(fill, false);
                return a[fill] > b[fill] ? -1 : 1;
            } else {
                setHeaderFill(fill, true);
                return a[fill] > b[fill] ? 1 : -1;
            }
        });
        setTableRows(sorted);
    }

    function getDataSucess(result) {
        setLoading(false);
        setTableRows(
            result.map((item) => {
                item.adress = `${item.address.state}, ${item.address.city}, ${item.address.streetAddress}, ${item.address.zip}`;
                return item;
            })
        );
    }

    function getDataFail(error) {
        setLoading(false);
        setError(true);
        setErrorText(error.toString());
    }

    function addNewItem() {
        console.log("goga");
        const new_object = {
            id: 10000,
            firstName: "Ara",
            lastName: "Гогич",
            email: "gogagogich@goga.gu",
            phone: "(880)555-3454",
        };

        const new_array = [...tableRows, new_object];
        setTableRows(new_array);
    }

    useEffect(() => {
        fetch(queryURL)
            .then((res) => res.json())
            .then(getDataSucess, getDataFail);
    }, [queryURL]);

    if (loading) {
        // Загрузка
        return (
            <div className="wrapper">
                <h1>Загрузка...</h1>
            </div>
        );
    } else if (error) {
        // Ошибка
        return (
            <div className="wrapper">
                <h1> Ошибка </h1>
                <p> {errorText} </p>
            </div>
        );
    } else {
        // Нормальная работа
        return (
            <div className="wrapper">
                <div className="wrapper__header">
                    <h1>Таблица</h1>
                    <button
                        className="wrapper__header__add-button"
                        onClick={() => addNewItem()}
                    >
                        + Новый элемент
                    </button>
                </div>
                <TableWrapper
                    tableRows={tableRows}
                    onClick={sortByFill}
                    columnHeaders={columnHeaders}
                />
            </div>
        );
    }
}

export default App;
