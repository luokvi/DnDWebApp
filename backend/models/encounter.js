const mongoose = require('mongoose')

const encounterSchema = new mongoose.Schema({
	creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	name: { type: String, required: true },
	enemies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enemy' }],
	npcs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
	loot: {
		weapons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' }],
		equipments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
		coins: {
			copper: { type: Number, min: 0 },
			silver: { type: Number, min: 0 },
			gold: { type: Number, min: 0 },
			electrum: { type: Number, min: 0 },
			platinum: { type: Number, min: 0 }
		}
	},
	experience: { type: Number, min: 0},
	notes: [{ type: String }]
})

encounterSchema.set('toJSON', {
  transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Encounter", encounterSchema)