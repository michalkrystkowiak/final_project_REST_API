import React from 'react';

class ChartItemsPerDay extends React.Component {

    componentDidMount () {
        new Chart(this.canvas.getContext("2d"), {
            type: 'line',
            data: {
                labels: Object.keys(this.props.itemsPerDay),
                datasets: [{
                    label: 'Items per Day',
                    data: Object.values(this.props.itemsPerDay).map(items => items.length),
                    backgroundColor: '#d4c3f1',
                    borderColor: '#9681bb',
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                annotation: {
                    annotations: [{
                      type: 'line',
                      mode: 'horizontal',
                      scaleID: 'y-axis-0',
                      value: 10,
                      borderColor: 'rgb(75, 192, 192)',
                      borderWidth: 4,
                      label: {
                        enabled: false,
                        content: 'Test label'
                      }
                    }]
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            },
        });
    }

    render () {
        return <canvas id="myChart" width="200" height="50" ref={canvas=>this.canvas=canvas} />
    }

};

export default ChartItemsPerDay;