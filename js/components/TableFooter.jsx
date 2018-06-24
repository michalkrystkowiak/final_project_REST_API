import React from 'react';

class TableFooter extends React.Component {
    render () {
        return (
            <tfoot>
                <tr>
                    <td>Footer Row 1</td>
                    <td>Footer Row 2</td>
                    <td>{this.props.sum}</td>
                    <td>Footer Row 4</td>
                    <td>Footer Row 5</td>
                    <td>Footer Row 6</td>
                    <td>Footer Row 7</td>
                </tr>
            </tfoot>
        )
    };
};

export default TableFooter;