/*!
 * Start Bootstrap - New Age v3.3.7 (http://startbootstrap.com/template-overviews/new-age)
 * Copyright 2013-2016 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
 */
!function (t) { "use strict"; t("a.page-scroll").bind("click", function (a) { var o = t(this); t("html, body").stop().animate({ scrollTop: t(o.attr("href")).offset().top - 50 }, 1250, "easeInOutExpo"), a.preventDefault() }), t("body").scrollspy({ target: ".navbar-fixed-top", offset: 100 }), t(".navbar-collapse ul li a").click(function () { t(".navbar-toggle:visible").click() }), t("#mainNav").affix({ offset: { top: 50 } }) }(jQuery);

var render = {
    curveChart: function (gamesSegment, elementId) {
        var formCurveOptions = hc.getFormCurveOptions(gamesSegment);
        $('#' + elementId).highcharts(formCurveOptions);
    },
    balanceChart: function (gamesSegment, elementId) {
        var balanceAllOptions = hc.getBalanceOptions(gamesSegment);
        $('#' + elementId).highcharts(balanceAllOptions);
    },
    memberStats: function (memberStats, id) {
        forEachPlayer(function (player) {
            var output = memberStats[player];
            $.each(output,
                function (i, stat) {
                    $('#' + id + player.toUpperCase()).append(stat.name + ': ' + stat.value + '<br />');
                });
        });
    },
    setScoreClass: function (id, score) {
        $(id).removeClass();
        $(id).html(score);
        $(id).addClass(render.getScoreClass(score));
    },
    getScoreClass: function (score) {
        if (score < 0)
            return "text-danger";
        if (score > 0)
            return "text-info";
        return "";
    }
}


function forEachPlayer(action, args1, args2, args3) {
    var arr = [];
    arr['rr'] = action('rr', args1, args2, args3);
    arr['nb'] = action('nb', args1, args2, args3);
    arr['rj'] = action('rj', args1, args2, args3);
    arr['fh'] = action('fh', args1, args2, args3);
    return arr;
}

Array.prototype.streak = function (predicate) {
    var longestStreak = [];
    var currentStreak = [];

    $.each(this, function (i, cur) {
        if (predicate(i, cur)) {
            currentStreak.push(cur);
        } else {
            currentStreak = [];
        }
        if (currentStreak.length >= longestStreak.length) {
            longestStreak = currentStreak;
        }
    });

    return longestStreak;
}

Array.prototype.skipTake = function (skip, take) {
    if (take === undefined)
        take = this.length;
    if (skip === undefined)
        skip = 0;
    var start = skip;
    var end = start + take;
    return this.slice(start, end);
}

Array.prototype.first = function () {
    return this[0];
}
Array.prototype.last = function () {
    return this[this.length - 1];
}