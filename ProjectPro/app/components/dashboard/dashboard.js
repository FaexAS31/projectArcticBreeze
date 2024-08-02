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
                symbol: 'url(../app/api/photos/charts/low-temp.png)',
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
            symbol: 'url(../app/api/photos/charts/high-temp.png)',
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
        }
    });
}