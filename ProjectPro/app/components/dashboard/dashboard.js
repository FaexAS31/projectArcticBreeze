import { getDataSource } from '../../js/providers/dataSource.js';

let dataSources = await getDataSource();

function calculateAveragesAndExtremes(dataSources) {
    let totalHumidity = 0;
    let totalElectricConsumption = 0;
    let totalTemperature = 0;
    let count = dataSources.length;

    let minHumidity = Infinity;
    let maxHumidity = -Infinity;
    let minElectricConsumption = Infinity;
    let maxElectricConsumption = -Infinity;
    let minTemperature = Infinity;
    let maxTemperature = -Infinity;

    dataSources.forEach(dataSource => {
        let { humidity, electricConsumption, temperature } = dataSource;

        totalHumidity += humidity;
        totalElectricConsumption += electricConsumption;
        totalTemperature += temperature;

        if (humidity < minHumidity) minHumidity = humidity;
        if (humidity > maxHumidity) maxHumidity = humidity;
        if (electricConsumption < minElectricConsumption) minElectricConsumption = electricConsumption;
        if (electricConsumption > maxElectricConsumption) maxElectricConsumption = electricConsumption;
        if (temperature < minTemperature) minTemperature = temperature;
        if (temperature > maxTemperature) maxTemperature = temperature;
    });

    let averageHumidity = totalHumidity / count;
    let averageElectricConsumption = totalElectricConsumption / count;
    let averageTemperature = totalTemperature / count;

    return {
        averageHumidity,
        minHumidity,
        maxHumidity,
        averageElectricConsumption,
        minElectricConsumption,
        maxElectricConsumption,
        averageTemperature,
        minTemperature,
        maxTemperature
    };
}

export const init = () => {

    let results = calculateAveragesAndExtremes(dataSources);

    if(document.getElementById('hum-high') !== null) {
        document.getElementById('hum-high').textContent = results.maxHumidity.toFixed(2);
        document.getElementById('hum-low').textContent = results.minHumidity.toFixed(2);
        document.getElementById('ener-high').textContent = results.maxElectricConsumption.toFixed(2);
        document.getElementById('ener-low').textContent = results.minElectricConsumption.toFixed(2);
        document.getElementById('temp-high').textContent = results.maxTemperature.toFixed(2);
        document.getElementById('temp-low').textContent = results.minTemperature.toFixed(2);
    }
    Highcharts.chart('container-spline', {
        chart: {
        type: 'spline',
        backgroundColor: 'transparent'
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
            y: 22,
            marker: {
                symbol: 'url(../app/api/photos/charts/low-temp.png)',
                width: 56,
                height: 56
            },
            accessibility: {
            description: 'Snowy symbol, this is the coldest point in the ' +
                'chart.'
            }
        },24, 26, 27, 25, 24,{
            y: 28,
            marker: {
            symbol: 'url(../app/api/photos/charts/high-temp.png)',
            width: 56,
            height: 56
            },
            accessibility: {
            description: 'Sunny symbol, this is the warmest point in the ' +
                'chart.'
            }
        }, 24, 23, 23, 23, 22]
    
        }], 
    });
    
    Highcharts.chart('container', {
        data: {
            table: 'datatable'
        },
        chart: {
            type: 'column',
            backgroundColor: 'transparent' 
        },
        title: {
            text: 'Energy Consumption, humitity and temperature'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Amount'
            }
        },
        series: [{
            name: 'Highest Value',
            color: '#d88484' 
        }, {
            name: 'Lowest Value',
            color: '#8596bb'  
        }],
    });

    // // Gauge chart
    // const gaugeOptions = {
    //     chart: {
    //         type: 'solidgauge'
    //     },
    
    //     title: null,
    
    //     pane: {
    //         center: ['50%', '85%'],
    //         size: '140%',
    //         startAngle: -90,
    //         endAngle: 90,
    //         background: {
    //             backgroundColor: 'transparent',
    //             borderRadius: 5,
    //             innerRadius: '60%',
    //             outerRadius: '100%',
    //             shape: 'arc'
    //         }
    //     },
    
    //     exporting: {
    //         enabled: false
    //     },
    
    //     tooltip: {
    //         enabled: false
    //     },
    
    //     yAxis: {
    //         stops: [
    //             [0.1, '#55BF3B'], // green
    //             [0.5, '#DDDF0D'], // yellow
    //             [0.9, '#DF5353'] // red
    //         ],
    //         lineWidth: 0,
    //         tickWidth: 0,
    //         minorTickInterval: null,
    //         tickAmount: 2,
    //         title: {
    //             y: -70
    //         },
    //         labels: {
    //             y: 16
    //         }
    //     },
    
    //     plotOptions: {
    //         solidgauge: {
    //             borderRadius: 3,
    //             dataLabels: {
    //                 y: 5,
    //                 borderWidth: 0,
    //                 useHTML: true
    //             }
    //         }
    //     }
    // };
    
    // const chartSpeed = Highcharts.chart(
    //     'container-speed', Highcharts.merge(gaugeOptions, {
    //         yAxis: {
    //             min: 0,
    //             max: 200,
    //             title: {
    //                 text: 'Electric Consumption'
    //             }
    //         },
    
    //         credits: {
    //             enabled: false
    //         },
    
    //         series: [{
    //             name: 'Electric Consumption',
    //             data: [results.averageElectricConsumption],
    //             dataLabels: {
    //                 format:
    //                 '<div style="text-align:center">' +
    //                 '<span style="font-size:25px">{y}</span><br/>' +
    //                 '<span style="font-size:12px;opacity:0.4">km/h</span>' +
    //                 '</div>'
    //             },
    //             tooltip: {
    //                 valueSuffix: ' km/h'
    //             }
    //         }]
    
    //     }));
    
    // const chartRpm = Highcharts.chart(
    //     'container-rpm', Highcharts.merge(gaugeOptions, {
    //         yAxis: {
    //             min: 0,
    //             max: 5,
    //             title: {
    //                 text: 'Humidity'
    //             }
    //         },
    
    //         series: [{
    //             name: 'Humidity',
    //             data: [results.averageHumidity],
    //             dataLabels: {
    //                 format:
    //                 '<div style="text-align:center">' +
    //                 '<span style="font-size:25px">{y:.1f}</span><br/>' +
    //                 '<span style="font-size:12px;opacity:0.4">' +
    //                 '* 1000 / min' +
    //                 '</span>' +
    //                 '</div>'
    //             },
    //             tooltip: {
    //                 valueSuffix: ' revolutions/min'
    //             }
    //         }]
    
    //     }));
    // const chartTemperature = Highcharts.chart(
    //     'container-temp', Highcharts.merge(gaugeOptions, {
    //         yAxis: {
    //             min: 0,
    //             max: 100,
    //             title: {
    //                 text: 'Temperature'
    //             }
    //         },
    
    //         series: [{
    //             name: 'Temperature',
    //             data: [results.averageTemperature],
    //             dataLabels: {
    //                 format:
    //                 '<div style="text-align:center">' +
    //                 '<span style="font-size:25px">{y}</span><br/>' +
    //                 '<span style="font-size:12px;opacity:0.4">°C</span>' +
    //                 '</div>'
    //             },
    //             tooltip: {
    //                 valueSuffix: ' °C'
    //             }
    //         }]
    
    //     }));
    
}

