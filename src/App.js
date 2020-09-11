import React, { useEffect } from 'react';
import TableWrapper from './Table sort/TableWrapper';

function App() {
    const [tableRows, setValues] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    
    let queryURL = `http://www.filltext.com/?rows=30&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`;
    
    useEffect(
        function() {
            fetch(queryURL)
                .then(res => res.json())
                .then(
                    function(result) {
                        console.log(result);
                        setLoading(false);
                        setValues(result);
                    },

                    function(error) {
                        console.log(error);
                    }
                )
        }, 
        []
    );


    if (loading) {
        return (
            <div className="wrapper">
                <h1>Загрузка...</h1>
            </div>
        );
    } else {
        return (
            <div className="wrapper">
                <h1>Таблица</h1>
                <TableWrapper tableRows = { tableRows }/>
            </div>
        );
    }
}

export default App;