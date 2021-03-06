const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const characterSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  race: { type: String },
  class: { type: String },
  level: { type: Number, min: 1 },
  experiencePoints: { type: Number, min: 0, required: true },
  background: { type: String },
  personalityTraits: { type: String },
  alignment: { 
      type: String,
      enum: ['true neutral', 'neutral evil', 'neutral good', 'chaotic neutral', 'chaotic evil', 'chaotic good', 'lawful neutral', 'lawful evil', 'lawful good']
    },
  maxHealth: { type: Number, min: 0 },
  currentHealth: { type: Number, min: 0 },
  hitDice: { type: String },
  armorClass: { type: Number, min: 0 },
  initiative: { type: Number, min: -20 },
  speed: { type: Number, min: 0 },
  strength: { type: Number, min: 0, max: 20 },
  dexterity: { type: Number, min: 0, max: 20 },
  constitution: { type: Number, min: 0, max: 20 },
  intelligence: { type: Number, min: 0, max: 20 },
  wisdom: { type: Number, min: 0, max: 20 },
  charisma: { type: Number, min: 0, max: 20 },
  passiveWisdom: { type: Number, min: 0, max: 20 },
  proficiencyBonus: { type: Number, min: 0, max: 20 },
  proficientSkills: [{
    type: String,
    enum: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation',
      'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival']
  }],
  languages: [{ type: String }],
  otherProficiencies: [{ 
    name: { type: String },
    description: { type: String }
  }],
  weapons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Weapon', required: true }],
  spellCastingAbility: { type: String, enum: ['Wisdom', 'Intelligence', 'Charisma', '']},
  spellSlots: [{
    level: { type: Number, min: 1 },
    amount: { type: Number, min: 0 },
    used: { type: Number, min: 0 }
  }],
  spells: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spell', required: true }],
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true }],
  storage: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true }],
  features: [{ 
    name: { type: String },
    description: { type: String }
  }],
  coins: { 
      copper: { type: Number, min: 0 },
      silver: { type: Number, min: 0 },
      gold: { type: Number, min: 0 },
      platinum: { type: Number, min: 0 },
      electrum: { type: Number, min: 0 }
    },
  notes: [{ type: String }]
    
})

characterSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const characterModel = mongoose.model("Character", characterSchema)

const partySchema = new mongoose.Schema({
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  name: {type: String, required: true }
})

partySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const partyModel = mongoose.model("Party", partySchema)

module.exports = {
  Character: characterModel,
  Party: partyModel
}