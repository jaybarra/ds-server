// models/user.js

var mongoose = require("mongoose");
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
            platinum: {type: Number, min: 0},
            gold: {type: Number, min: 0},
            electrum: {type: Number, min: 0},
            silver: {type: Number, min: 0},
            copper: {type: Number, min: 0},
            other: [{
                name: String,
                quantity: {type: Number},
                description: String,
                value: {type: Number}
            }]
        },
        items: [{
            name: String,
            quantity: {type: Number},
            description: String
        }]

    },
    experience: {type: Number},
    stats: {
        strength: {
            value: {type: Number},
            modifier: {type: Number}
        },
        dexterity: {
            value: {type: Number},
            modifier: {type: Number}
        },
        constitution: {
            value: {type: Number},
            modifier: {type: Number}
        },
        intelligence: {
            value: {type: Number},
            modifier: {type: Number}
        },
        wisdom: {
            value: {type: Number},
            modifier: {type: Number}
        },
        charisma: {
            value: {type: Number},
            modifier: {type: Number}
        },
        passiveWisdom: {type: Number}
    },
    skills: {
        acrobatics: {
            selected: Boolean,
            value: {type: Number}
        },
        animalHandling: {
            selected: Boolean,
            value: {type: Number}
        },
        arcana: {
            selected: Boolean,
            value: {type: Number}
        },
        athletics: {
            selected: Boolean,
            value: {type: Number}
        },
        deception: {
            selected: Boolean,
            value: {type: Number}
        },
        history: {
            selected: Boolean,
            value: {type: Number}
        },
        insight: {
            selected: Boolean,
            value: {type: Number}
        },
        intimidation: {
            selected: Boolean,
            value: {type: Number}
        },
        investigation: {
            selected: Boolean,
            value: {type: Number}
        },
        medicine: {
            selected: Boolean,
            value: {type: Number}
        },
        nature: {
            selected: Boolean,
            value: {type: Number}
        },
        perception: {
            selected: Boolean,
            value: {type: Number}
        },
        performance: {
            selected: Boolean,
            value: {type: Number}
        },
        persuasion: {
            selected: Boolean,
            value: {type: Number}
        },
        religion: {
            selected: Boolean,
            value: {type: Number}
        },
        sleightOfHand: {
            selected: Boolean,
            value: {type: Number}
        },
        stealth: {
            selected: Boolean,
            value: {type: Number}
        },
        survival: {
            selected: Boolean,
            value: {type: Number}
        }
    },
    savingThrows: {
        strength: {
            value: {type: Number},
            selected: Boolean
        },
        dexterity: {
            value: {type: Number},
            selected: Boolean
        },
        constitution: {
            value: {type: Number},
            selected: Boolean
        },
        intelligence: {
            value: {type: Number},
            selected: Boolean
        },
        wisdom: {
            value: {type: Number},
            selected: Boolean
        },
        charisma: {
            value: {type: Number},
            selected: Boolean
        }
    },
    combat: {
        armorClass: {type: Number},
        initiative: {type: Number},
        speed: {type: Number},
        currentHitPoints: {type: Number},
        temporaryHitPoints: {type: Number},
        activeEffects: [String],
        passiveEffects: [String],
        hitDice: {
            total: {type: Number},
            dice: [{
                number: {type: Number},
                die: {type: Number}
            }],
            remaining: {type: Number}
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
                twoHanded: Boolean,
                attackBonus: {type: Number},
                damage: {
                    roll: String,
                    bonus: {type: Number}
                },
                type: String
            }]
        }
    },
    spells: {
        cantrips: [{
            name: String,
            page: String,
            available: Boolean
        }],
        spells: [{
            name: String,
            page: String,
            level: {type: Number, min: 0},
            available: Boolean
        }]
    }
});

module.exports = mongoose.model("Character", characterSchema);
