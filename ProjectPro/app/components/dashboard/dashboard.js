export const init = () => {
    Highcharts.chart('container-spline', {
        chart: {
        type: 'spline'
        },
        title: {
        text: 'Monthly Average Temperature'
        },
        xAxis: {
        categories: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        accessibility: {
            description: 'Months of the year'
        }
        },
        yAxis: {
        title: {
            text: 'Temperature'
        },
        labels: {
            format: '{value}°'
        }
        },
        tooltip: {
        crosshairs: true,
        shared: true
        },
        plotOptions: {
        spline: {
            marker: {
            radius: 4,
            lineColor: '#000000',
            lineWidth: 1
            }
        }
        },
        series: [{
        name: '',
        marker: {
            symbol: 'square'
        },
        data: [{
            y: 1.5,
            marker: {
                symbol: 'url(/../../../api/photos/charts/low-temp.png)',
                width: 56,
                height: 56
            },
            accessibility: {
            description: 'Snowy symbol, this is the coldest point in the ' +
                'chart.'
            }
        },5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
            y: 26.4,
            marker: {
            symbol: 'url(/../../../api/photos/charts/high-temp.png)',
            width: 56,
            height: 56
            },
            accessibility: {
            description: 'Sunny symbol, this is the warmest point in the ' +
                'chart.'
            }
        }, 22.8, 17.5, 12.1, 7.6]
    
        }], 
    });
    
    Highcharts.chart('container', {
        data: {
            table: 'datatable'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Live births in Norway'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Amount'
            }
        }
    });
}