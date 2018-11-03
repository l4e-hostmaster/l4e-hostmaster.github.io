function Games(gamesJson) {
    this.gamesJson = gamesJson;
    this.get = function (skip, take) {
        return getGames(gamesJson.skipTake(skip, take));
    }
    this.getLast = function (count) {
        return getGames(gamesJson.slice(-count));
    }
}

function getGames(rawGames) {
    var parsedGames = parseGames(rawGames);
    var parsedFor = parseGamesFor(rawGames);
    return {
        all: parsedGames,
        for: parsedFor,
        count: parsedGames.length,
        getMemberStats: function () {
            return forEachPlayer(function (player, gamesFor) {
                return getStatsFor(gamesFor[player]);
            },
                parsedFor);
        }
    }
}

/* ------------------------- parsers ------------------------- */

function getStatsFor(games) {
    var stats = [];
    stats.push({ name: 'Level', value: games.last().form });

    stats.push({ name: 'Største sejr', value: Math.max.apply(Math,games.map(g=>g.score)) });
    stats.push({ name: 'Største nederlag', value: Math.min.apply(Math, games.map(g=>g.score)) });
    return stats;
}

function parseGamesFor(rawGames) {
    var parsedGamesFor = [];
    forEachPlayer(function (player) {
        parsedGamesFor[player] = [];
    });

    var indexMagnitude = Number(30);

    $.each(rawGames,
        function (i, game) {
            forEachPlayer(function (player) {
                var pre = parsedGamesFor[player][i - 1];
                if (pre === undefined)
                    pre = nullGame();
                var index = game['9bare'];
                var score = Number(game[player]);
                parsedGamesFor[player][i] = parsePlayerGame(pre, score, index, indexMagnitude);
            });

        });
    return parsedGamesFor;
}

function parseGames(rawGames) {
    var parsedGames = [];
    $.each(rawGames,
        function (i, cur) {
            parsedGames.push({
                date: cur.date,
                place: cur.place,
                games: cur.games,
                comments: cur.comments,
                '9bare': Number(cur['9bare'])
            });
        });
    return parsedGames;
}

function parsePlayerGame(pre, score, index, indexMagnitude) {
    var indexedScore = indexMagnitude * score / index;
    var outcome = score === 0 ? 0 : score < 0 ? -1 : 1;
    var balance = pre.balance + score;
    var form = pre.form + outcome;
    return {
        balance: balance,
        form: form,
        score: score,
        indexedScore: indexedScore,
        outcome: outcome
    }
}

function nullGame() {
    return {
        balance: 0,
        form: 0
    }
}