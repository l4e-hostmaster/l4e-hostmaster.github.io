var hc = {
    getBalanceOptions: function (games) {
        var co = hc.getCurveOptions();
        co.xAxis.categories = hc.getDateCategories(games);
        co.series = hc.getSeries(games, function (game) {
            return game.balance;
        });
        return co;
    },
    
    getFormCurveOptions: function (games) {
        var co = hc.getCurveOptions();
        co.xAxis.categories = hc.getDateCategories(games);
        co.series = hc.getSeries(games, function (game) {
            return game.form;
        });
        return co;
    },
    getDateCategories: function (games) {
        var categories = [];
        $.each(games.all,
            function (i, game) {
                categories.push(moment(game.date).format('DD. MMM \'YY'));
            });
        return categories;
    },
    getSeries: function (games, mapCallback) {
        var series = [];
        forEachPlayer(function (player) {
                series.push({
                    name: player,
                    data: games.for[player].map(g => renderFloatForChart(mapCallback(g)))
                });
        });
        return series;
    },
    getCurveOptions: function () {
        var options = hc.getBaseOptions();
        options.yAxis.tickInterval = 1;
        options.xAxis.categories = [];

        options.chart = {
            type: 'spline'
        },
        options.plotOptions = {
            spline: {
                marker: {
                    enable: false
                }
            }
        }
        return options;
    },
    getBaseOptions: function () {
        var options = {
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            yAxis: {
                title: {
                    enabled: false
                }
            },
            xAxis: {
                type: 'datetime',
            },
            tooltip: {
                shared: true,
                crosshairs: true
            },
            series: []
        };
        return options;
    }
}
function renderFloatForChart(num) {
    return Number(num.toFixed(2));
}