// models/user.js

var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var Schema = mongoose.Schema;

var characterSchema = mongoose.Schema({
    name: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId, ref: "User", required: true},
    created: {type: Date, default: Date.now},
    campaigns: [{type: Schema.Types.ObjectId, ref: "Campaign"}],
    description: String,
    bio: {
        background: {type: String},
        personalityTraits: String,
        ideals: String,
        bonds: String,
        flaws: String,
        featuresAndTraits: String,
        languages: [String],
        otherProficiencies: [String]
    },
    alignment: String,
    age: {type: Number, min: 0},
    class: String,
    level: {type: Number, min: 0, default: 0},
    race: {type: String, default: "Human"},
    sex: String,
    inventory: {
        money: {
            platinum: {type: Number, min: 0, default: 0},
            gold: {type: Number, min: 0, default: 0},
            electrum: {type: Number, min: 0, default: 0},
            silver: {type: Number, min: 0, default: 0},
            copper: {type: Number, min: 0, default: 0},
            other: [{
                name: String,
                quantity: {type: Number, default: 0},
                description: String,
                value: {type: Number, default: 0}
            }]
        },
        items: [{
            name: String,
            quantity: {type: Number, default: 0},
            description: String
        }]

    },
    experience: {type: Number, default: 0},
    stats: {
        strength: {
            value: {type: Number, default: 0},
            modifier: {type: Number, default: 0}
        },
        dexterity: {
            value: {type: Number, default: 0},
            modifier: {type: Number, default: 0}
        },
        constitution: {
            value: {type: Number, default: 0},
            modifier: {type: Number, default: 0}
        },
        intelligence: {
            value: {type: Number, default: 0},
            modifier: {type: Number, default: 0}
        },
        wisdom: {
            value: {type: Number, default: 0},
            modifier: {type: Number, default: 0}
        },
        charisma: {
            value: {type: Number, default: 0},
            modifier: {type: Number, default: 0}
        },
        passiveWisdom: {type: Number, default: 0}
    },
    skills: {
        acrobatics: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        animalHandling: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        arcana: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        athletics: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        deception: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        history: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        insight: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        intimidation: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        investigation: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        medicine: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        nature: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        perception: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        performance: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        persuasion: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        religion: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        sleightOfHand: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        stealth: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        },
        survival: {
            selected: {type: Boolean, default: false},
            value: {type: Number, default: 0}
        }
    },
    savingThrows: {
        strength: {
            value: {type: Number, default: 0},
            selected: {type: Boolean, default: false}
        },
        dexterity: {
            value: {type: Number, default: 0},
            selected: {type: Boolean, default: false}
        },
        constitution: {
            value: {type: Number, default: 0},
            selected: {type: Boolean, default: false}
        },
        intelligence: {
            value: {type: Number, default: 0},
            selected: {type: Boolean, default: false}
        },
        wisdom: {
            value: {type: Number, default: 0},
            selected: {type: Boolean, default: false}
        },
        charisma: {
            value: {type: Number, default: 0},
            selected: {type: Boolean, default: false}
        }
    },
    combat: {
        armorClass: {type: Number, default: 0},
        initiative: {type: Number, default: 0},
        speed: {type: Number, default: 0},
        currentHitPoints: {type: Number, default: 0},
        temporaryHitPoints: {type: Number, default: 0},
        activeEffects: [String],
        passiveEffects: [String],
        hitDice: {
            total: {type: Number, default: 0},
            dice: [{
                number: {type: Number, default: 1},
                die: {type: Number, default: 4}
            }],
            remaining: {type: Number, default: 0}
        },
        deathSaves: {
            successes: {type: Number, min: 0},
            failures: {type: Number, min: 0}
        },
        attacks: {
            spells: [{
                name: String,
                level: {type: Number, min: 0},
                description: String
            }],
            weapons: [{
                name: String,
                twoHanded: {type: Boolean, default: false},
                attackBonus: {type: Number, default: 0},
                damage: {
                    roll: String,
                    bonus: {type: Number, default: 0}
                },
                type: String
            }]
        }
    },
    spells: {
        cantrips: [{
            name: String,
            page: String,
            available: {type: Boolean, default: false}
        }],
        spells: [{
            name: String,
            page: String,
            level: {type: Number, min: 0},
            available: {type: Boolean, default: false}
        }]
    }
});

module.exports = mongoose.model("Character", characterSchema);
