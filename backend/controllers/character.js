const charaRouter = require('express').Router()
const Character = require('../models/character')
const TokenCheck = require('../util/tokenCheck')

charaRouter.get('/:id', async (req, res) => {
    const id = req.params.id

    const chara = await Character.findById(id)

    res.json(chara.toJSON())
})

// Create new character.
charaRouter.post('/', async (req, res) => {
    const [authorized, checkMessage] = TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const body = req.body

    const chara = new Character({
        creator: body.userId,
        name: body.name,
        race: body.race,
        class: body.class,
        level: body.level,
        experiencePoints: body.experiencePoints,
        background: body.background,
        personalityTraits: body.personalityTraits,
        alignment: body.alignment,
        maxHealth: body.maxHealth,
        currentHealth: body.maxHealth,
        hitDice: body.hitDice,
        armorClass: body.armorClass,
        initiative: body.initiative,
        speed: body.speed,
        strength: body.strength,
        dexterity: body.dexterity,
        constitution: body.constitution,
        intelligence: body.intelligence,
        wisdom: body.wisdom,
        charisma: body.charisma,
        passiveWisdom: body.passiveWisdom,
        proficiencyBonus: body.proficiencyBonus,
        proficiencies: body.proficiencies,
        languages: body.languages,
        otherProficiencies: body.otherProficiencies,
        weapons: body.weapons,
        spellCastingAbility: body.spellCasting,
        spells: body.spells,
        equipment: body.equipment,
        storage: body.storage,
        features: body.features,
        coins: body.coins

    })

    const savedChara = await chara.save()

    res.json(savedChara.toJSON())
})

// Update character.
charaRouter.patch('/:id', async (req, res) => {
    const [authorized, checkMessage] = TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const id = req.params.id
    const body = req.body

    const chara = await Character.findByIdAndUpdate(id, body.update, { new: true })

    res.json(chara.toJSON())
})

// Delete character.
charaRouter.delete('/:id', async (req, res) => {
    const [authorized, checkMessage] = TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const id = req.params.id

    await Character.deleteOne({ "_id": id })

    res.status(204).end()
})

module.exports = charaRouter