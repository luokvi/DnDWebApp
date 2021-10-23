const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const characterSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    race: { type: String },
    class: { type: String },
    level: { type: Number, min: 1 },
    expreriencePoints: { type: Number, min: 0 },
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
    proficiences: [{ 
      name: { type: String },
      stat: { type: String }
    }],
    languages: [{ type: String }],
    otherProficiences: [{ type: String }],
    equipment: [{ 
      name: { type: String },
      description: { type: String }
    }],
    storage: [{
      name: { type: String },
      description: { type: String }
    }],
    features: [{ 
      name: { type: String },
      description: { type: String }
    }],
    coins: { 
        copper: { type: Number, min: 0 },
        silver: { type: Number, min: 0 },
        gold: { type: Number, min: 0 },
        platinum: { type: Number, min: 0 },
        ep: { type: Number, min: 0 }
      }
    
})

characterSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model("Character", characterSchema)