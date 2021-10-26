const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const spellSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, min: 1, required: true },
    description: { type: String, required: true },
    castingTime: { type: String, required: true },
    range: { type: Number, min: 0, required: true },
    components: [{ type: String, enum: ['Verbal', 'Somatic', 'Material'], required: true }],
    duration: {
      minutes: { type: Number, min: 0, required: true },
      isConcentration: { type: Boolean, required: true }
    },
    userCreated: { type: Boolean, required: true }
  })

  spellSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const spellModel = mongoose.model("Spell", spellSchema)
  
  const weaponSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    atkBonus: { type: Number, min: 0, max: 20, required: true },
    damage: { type: String, required: true },
    userCreated: { type: Boolean, required: true }
  })

  weaponSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const weaponModel = mongoose.model("Weapon", weaponSchema)
  
  const equipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    userCreated: { type: Boolean, required: true }
  })

  equipmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const equipmentModel = mongoose.model('Equipment', equipmentSchema)
  

module.exports = {
    Spell: spellModel,
    Weapon: weaponModel,
    Equipment: equipmentModel
}