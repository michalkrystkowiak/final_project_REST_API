import React from 'react';

class ChartRevenuePerDay extends React.Component {

    componentDidMount () {
        new Chart(this.canvas.getContext("2d"), {
            type: 'line',
            data: {
                labels: Object.keys(this.props.itemsPerDay),
                datasets: [{
                    label: 'Revenue per Day',
                    data: this.props.arrayWithRevenue,
                    backgroundColor: '#9681bb',
                    borderColor: '#d4c3f1',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

    render () {
        return <canvas id="myChart" width="200" height="50" ref={canvas=>this.canvas=canvas} />
    }

};

export default ChartRevenuePerDay;