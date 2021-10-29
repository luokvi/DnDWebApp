const mongoose = require('mongoose')

const enemySchema = new mongoose.Schema({
	name: { type: String, required: true },
	size: { type: String },
	race: { type: String },
	alignment: {
		type: String,
		enum: ['true neutral', 'neutral evil', 'neutral good', 'chaotic neutral', 'chaotic evil', 'chaotic good', 'lawful neutral', 'lawful evil', 'lawful good']
	},
	armorClass: { type: Number, min: 0, max: 30 },
	maxHealth: { type: Number, min: 0 },
	speed: { type: Number, min: 0 },
	strength: { type: Number, min: 0, max: 20 },
	dexterity: { type: Number, min: 0, max: 20 },
	constitution: { type: Number, min: 0, max: 20 },
	intelligence: { type: Number, min: 0, max: 20 },
	wisdom: { type: Number, min: 0, max: 20 },
	charisma: { type: Number, min: 0, max: 20 },
	skills: [{
		type: String,
		enum: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation',
			'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival']
	}],
	passiveWisdom: { type: Number, min: 0, max: 20 },
	resistances: [{ type: String }],
	immunities: [{ type: String }],
	conditionImmunities: [{ type: String }],
	senses: [{
		name: { type: String },
		range: { type: Number, min: 0 }
	}],
	languages: [{ type: String }],
	challenge: { type: Number, min: 0 },
	features: [{
		name: { type: String },
		description: { type: String }
	}],
	spellCastingAbility: { type: String, enum: ['Wisdom', 'Intelligence', 'Charisma']},
	spellSlots: [{
		level: { type: Number, min: 1 },
		amount: { type: Number, min: 0 },
		used: { type: Number, min: 0 }
	}],
	spells: {
		cantrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spell' }],
		prepared: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spell' }]
	},
	weapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' },
	description: { type: String }
})

enemySchema.set('toJSON', {
  transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Enemy", enemySchema)