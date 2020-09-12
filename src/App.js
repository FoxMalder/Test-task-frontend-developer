import React, { useEffect } from "react";
import TableWrapper from "./Table/TableWrapper";
import ItemShowForm from "./Item Info/ItemShowForm";
import LoadingIndicator from "./Loading/LoadingIndicator";

function App() {
    const queryURL = `http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`;
    const [tableRows, setTableRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [sortLoading, setSortLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorText, setErrorText] = React.useState("");
    const [activeItem, setActiveItem] = React.useState(undefined);
    const [columnHeaders, setColumnHeaders] = React.useState([
        { caption: "ID", name: "id", isAscending: undefined },
        { caption: "Имя", name: "firstName", isAscending: undefined },
        { caption: "Фамилия", name: "lastName", isAscending: undefined },
        { caption: "Email", name: "email", isAscending: undefined },
        { caption: "Телефон", name: "phone", isAscending: undefined },
        // { caption: "Адрес", name: "adress", isAscending: undefined },
        // { caption: "Описание", name: "description", isAscending: undefined },
    ]);

    // Установка свойств сортировки
    //     name — уникальное имя столбца
    //     isAscending — тип сортировки (true — по возрастанию, false — по убыванию)
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

    // Сортировка столбца по выбранному полю
    //    fill — поле, по которому будет произведена сортировка
    //    isAscending — тип сортировки (true — по возрастанию, false — по убыванию)
    function sortByFill(fill, isAscending) {
            setSortLoading(true);

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
            setSortLoading(false);
    }

    // Функция при удачном обращении к серверу
    //     result — полученные данные с сервера
    function getDataSucess(result) {
        setTableRows([...result]);
        setLoading(false);
    }

    // Функция при неудачном обращении к серверу
    //     error — ошибка, возвращаемая при неудачном запросе
    function getDataFail(error) {
        setLoading(false);
        setError(true);
        setErrorText(error.toString());
    }

    // Добавление нового элемента в таблицу
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

    // Получение данных с сервера
    useEffect(() => {
        fetch(queryURL)
            .then((res) => res.json())
            .then(getDataSucess, getDataFail);
    }, [queryURL]);

    return (
        <div className="wrapper">
            <div className="wrapper__header">
                <div className="flex">
                    <h1>Таблица</h1>
                    <LoadingIndicator isLoading={loading || sortLoading} />
                </div>
                <button
                    className="wrapper__header__add-button"
                    onClick={() => addNewItem()}
                >
                    + Новый элемент
                </button>
            </div>
            <TableWrapper
                isLoading={loading}
                tableRows={tableRows}
                columnHeaders={columnHeaders}
                onHeaderClick={sortByFill}
                onRowClick={setActiveItem}
            />
            <ItemShowForm
                row={tableRows}
                activeItem={activeItem}
                caption={"Информация об записи"}
            />
        </div>
    );
}

export default App;
