// routes/dice

const rollDie = (sides) => {
    if (isNaN(sides) || sides < 1) {
        sides = 6.0;
    }
    return Math.round(Math.random() * (sides - 1) + 1);
};

module.exports = function (app) {
    app.get("/roll", (req, res) => {
        const rolls = {
            dice: [],
            total: 0
        };

        let dice = Object.keys(req.query);

        if (dice.length === 0) {
            let roll = rollDie(6);
            rolls.dice.push({"1d6": [roll]});
            rolls.total += rolls.dice[0];
        } else {
            dice.forEach(roll => {
                let parsedRoll = roll.split("d");

                let r = {};
                let dieRolls = [];

                for (let i = 0; i < parseInt(parsedRoll[0]); i++) {
                    let val = rollDie(parseInt(parsedRoll[1]));
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

