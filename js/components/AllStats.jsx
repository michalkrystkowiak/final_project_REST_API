import React from 'react';

class AllStats extends React.Component {
    render () {
        return (
            <div className="secondContainer">
                <div className="statsResults">
                    <div className="statsElements">{this.props.totalItems}</div>
                    <div className="statsElements">{this.props.mean}</div>
                    <div className="statsElements">{this.props.median}</div>
                    <div className="statsElements">{this.props.range}</div>
                    <div className="statsElements">{this.props.stddev}</div>
                </div>
                <div className="statsName">
                    <div className="statsElementsName">Total [No.]</div>
                    <div className="statsElementsName">Mean [€]</div>
                    <div className="statsElementsName">Median [€]</div>
                    <div className="statsElementsName">Range [€]</div>
                    <div className="statsElementsName">St.Dev [%]</div>
                </div>
            </div>
        );
    };
};

export default AllStats;