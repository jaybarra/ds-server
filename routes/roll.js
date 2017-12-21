// routes/dice

module.exports = function (app) {
    app.get("/api/roll", function (req, res) {
        const rolls = {
            dice: [],
            total: 0
        };

        var dice = Object.keys(req.query);

        if (dice.length === 0) {
            var roll = rollDie(6);
            rolls.dice.push({"1d6": [roll]});
            rolls.total += roll;
        } else {
            dice.forEach(function (roll) {
                var parsedRoll = roll.split("d");

                var r = {};
                var dieRolls = [];

                for (var i = 0; i < parseInt(parsedRoll[0]); i++) {
                    var val = rollDie(parseInt(parsedRoll[1]));
                    dieRolls.push(val);
                    rolls.total += val;
                }
                r[roll] = dieRolls;
                rolls.dice.push(r);
            });
        }
        res.json(rolls);
    });
};

function rollDie(sides) {
    if (isNaN(sides) || sides < 1) {
        sides = 6;
    }
    return Math.round(Math.random() * (sides - 1) + 1);
}
