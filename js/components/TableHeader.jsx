import React from 'react';

class TableHeader extends React.Component {
    render () {
        return (
            <thead>
                <tr>
                    <th>Lp.</th>
                    <th>Tytuł</th>
                    <th>Cena</th>
                    <th>Status</th>
                    <th>Typ</th>
                    <th>Data</th>
                    <th>Sprzedawca</th>
                </tr>
            </thead>
        );
    };
};

export default TableHeader;