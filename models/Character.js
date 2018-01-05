// models/user.js

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var characterSchema = mongoose.Schema({
    name: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId, ref: "User", required: true},
    campaigns: [{type: Schema.Types.ObjectId, ref: "Campaign"}],
    description: {
        background: String,
        personalityTraits: String,
        ideals: String,
        bonds: String,
        flaws: String,
        featuresAndTraits: String,
        languages: [String],
        otherProficiencies: [String]
    },
    background: String,
    alignment: String,
    age: Number,
    class: String,
    level: Number,
    race: String,
    sex: String,
    inventory: {
        money: {
            platinum: Number,
            gold: Number,
            silver: Number,
            copper: Number,
            jewels: [String]
        },
        items: [{
            name: String,
            quantity: Number,
            description: String
        }]

    },
    experience: Number,
    stats: {
        strength: {
            value: Number,
            modifier: Number
        },
        dexterity: {
            value: Number,
            modifier: Number
        },
        constitution: {
            value: Number,
            modifier: Number
        },
        intelligence: {
            value: Number,
            modifier: Number
        },
        wisdom: {
            value: Number,
            modifier: Number
        },
        charisma: {
            value: Number,
            modifier: Number
        },
        passiveWisdom: Number
    },
    skills: {
        acrobatics: {
            selected: Boolean,
            value: Number
        },
        animalHandling: {
            selected: Boolean,
            value: Number
        },
        arcana: {
            selected: Boolean,
            value: Number
        },
        athletics: {
            selected: Boolean,
            value: Number
        },
        deception: {
            selected: Boolean,
            value: Number
        },
        history: {
            selected: Boolean,
            value: Number
        },
        insight: {
            selected: Boolean,
            value: Number
        },
        intimidation: {
            selected: Boolean,
            value: Number
        },
        investigation: {
            selected: Boolean,
            value: Number
        },
        medicine: {
            selected: Boolean,
            value: Number
        },
        nature: {
            selected: Boolean,
            value: Number
        },
        perception: {
            selected: Boolean,
            value: Number
        },
        performance: {
            selected: Boolean,
            value: Number
        },
        persuasion: {
            selected: Boolean,
            value: Number
        },
        religion: {
            selected: Boolean,
            value: Number
        },
        sleightOfHand: {
            selected: Boolean,
            value: Number
        },
        stealth: {
            selected: Boolean,
            value: Number
        },
        survival: {
            selected: Boolean,
            value: Number
        }
    },
    savingThrows: {
        strength: {
            value: Number,
            selected: Boolean
        },
        dexterity: {
            value: Number,
            selected: Boolean
        },
        constitution: {
            value: Number,
            selected: Boolean
        },
        intelligence: {
            value: Number,
            selected: Boolean
        },
        wisdom: {
            value: Number,
            selected: Boolean
        },
        charisma: {
            value: Number,
            selected: Boolean
        }
    },
    combat: {
        armorClass: Number,
        initiative: Number,
        speed: Number,
        currentHitPoints: Number,
        temporaryHitPoints: Number,
        activeEffects: [String],
        passiveEffects: [String],
        hitDice: {
            total: Number,
            dice: [{
                number: Number,
                die: Number
            }],
            remaining: Number
        },
        deathSaves: {
            successes: {type: Number, min: 0},
            failures: {type: Number, min: 0}
        },
        attacks: {
            spells: [{
                name: String,
                level: Number,
                description: String
            }],
            weapons: [{
                name: String,
                twoHanded: Boolean,
                attackBonus: Number,
                damage: {
                    roll: String,
                    bonus: Number
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
            level: Number,
            available: Boolean
        }]
    }
});

module.exports = mongoose.model("Character", characterSchema);
