import React, { useEffect } from "react";
import TableWrapper from "./Table/TableWrapper";
import ShowInformation from "./Information/ShowInformation";
import AddNewRowButton from "./Table/addNewRowButton";

function App() {
    const queryURL = `http://www.filltext.com/?rows=10&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`;

    const [rows, setRows] = React.useState(undefined);
    const [selectedRow, setSelectedRow] = React.useState(undefined);

    useEffect(() => {
        fetch(queryURL)
            .then((res) => res.json())
            .then((data) => setRows(data));
    }, []);

    return (
        <div className="wrapper">
            <div className="header">
                <AddNewRowButton
                    rows={rows}
                    setRows={setRows}
                />
            </div>
            <TableWrapper
                rows={rows}
                onRowClick={setSelectedRow}
                setRows={setRows}
            />
            <ShowInformation rows={rows} selectedRow={selectedRow} />
        </div>
    );
}

export default App;
