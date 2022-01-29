const charaRouter = require('express').Router()
const { Party } = require('../models/character')
const { Character } = require('../models/character')
const User = require('../models/user')
const TokenCheck = require('../util/tokenCheck')

charaRouter.get('/:id', async (req, res) => {
    const id = req.params.id

    const chara = await (await Character.findById(id).populate(
        "creator", { username: 1}).populate(
        "equipment", { name: 1, description: 1 }).populate(
        "weapons", { name: 1, description: 1, atkBonus: 1, damage: 1 }).populate(
        "spells", { name: 1, description: 1, level: 1 })
        )

    // Check that character belongs to querying user.
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, chara.creator.id)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    res.json(chara.toJSON())
})

// Create new character.
charaRouter.post('/', async (req, res) => {
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
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
        proficientSkills: body.proficiencientSkills,
        languages: body.languages,
        otherProficiencies: body.otherProficiencies,
        weapons: body.weapons,
        spellCastingAbility: body.spellCastingAbility,
        spells: body.spells,
        equipment: body.equipment,
        storage: body.storage,
        features: body.features,
        coins: body.coins

    })

    const savedChara = await chara.save()

    const user = await User.findById(body.userId)
    user.characters = user.characters.concat(savedChara._id)
    await user.save()

    res.json(savedChara.toJSON())
})

// Update character.
charaRouter.patch('/:id', async (req, res) => {
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const id = req.params.id
    const body = req.body

    const chara = await Character.findByIdAndUpdate(id, body, { new: true })

    res.json(chara.toJSON())
})

// Delete character.
charaRouter.delete('/:id', async (req, res) => {
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const id = req.params.id

    await Character.deleteOne({ "_id": id })

    res.status(204).end()
})

// Create party.
charaRouter.post('/party', async (req, res) => {
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const body = req.body
    const party = new Party({
        name: body.name,
        users: body.users,
        characters: body.characters
    })

    const savedParty = await party.save()

    // Add party to users' creations.
    savedParty.users.forEach(async u => {
        const user = await User.findById(u)
        user.creations.parties = user.creations.parties.concat(savedParty._id)
        await user.save()
    })

    res.json(savedParty.toJSON())
})

// Modify party, e.g. add members.
charaRouter.patch('/party/:id', async (req, res) => {
    console.log("patch party")
    console.log(req.body)
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const body = req.body
    const id = req.params.id
    const party = await Party.findById(id)

    // Check that modifying user is a user in this party.
    const isUser = party.users.includes(body.userId)
    if (!isUser){
        res.status(401).send("User not in this Party").end()
        return
    }

    const updatedParty = await Party.findByIdAndUpdate(id, body, { new: true })

    // Add party to users' creations.
    updatedParty.users.forEach(async u => {
        const user = await User.findById(u)
        if (!user.creations.parties.includes(updatedParty._id)){
            user.creations.parties = user.creations.parties.concat(updatedParty._id)
        }
        await user.save()
    })

    res.json(updatedParty.toJSON())
})

// Get party.
charaRouter.get('/party/:id', async (req, res) => {
    const id = req.params.id

    const party = await Party.findById(id).populate(
        "users", { username: 1}).populate(
        "characters", {name: 1, race: 1, class: 1, level: 1}
        )

    res.json(party.toJSON())
})

module.exports = charaRouter