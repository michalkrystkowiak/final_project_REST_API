import React from 'react';

class TableItems extends React.Component {
    render () {
        return (
            <tbody>
                {this.props.list}
            </tbody>
        )
    };
};

export default TableItems;