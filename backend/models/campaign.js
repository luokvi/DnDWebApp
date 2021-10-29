const mongoose = require('mongoose')

const campaignSchema = new mongoose.Schema({
	creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	name: { type: String, required: true },
	heroes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
	npcs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
	encounters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Encounter' }],
	notes: [{ type: String }]
})

campaignSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Campaign", campaignSchema)