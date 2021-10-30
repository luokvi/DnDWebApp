const itemRouter = require('express').Router()
const TokenCheck = require('../util/tokenCheck')
const { Spell } = require('../models/items')
const { Equipment } = require('../models/items')
const { Weapon } = require('../models/items')
const User = require('../models/user')

// Get all public (ie. not user created) items.
itemRouter.get('/spells', async (req, res) => {
    const spells = await Spell.find({ userCreated: false })
    
    res.json(spells.map( s => s.toJSON() ))
})

itemRouter.get('/equipment', async (req, res) => {
    const equipment = await Equipment.find({ userCreated: false })
    
    res.json(equipment.map( e => e.toJSON() ))
})

itemRouter.get('/weapons', async (req, res) => {
    const weapons = await Weapon.find({ userCreated: false })

    res.json(weapons.map( w => w.toJSON() ))
})

itemRouter.delete('/spells/:id', async (req, res) => {
    const [authorized, checkMessage] = TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const id = req.params.id
    const body = req.body

    const spell = await Spell.findById(id)

    // Check that spell was created by this user.
    const spellCreator = spell.creator.toString()
    if (spellCreator !== body.userId){
        res.status(403).end()
        return
    }

    await Spell.findByIdAndDelete(id)

    res.status(204).end()
})

itemRouter.delete('/equipment/:id', async (req, res) => {
    const [authorized, checkMessage] = TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const id = req.params.id
    const body = req.body

    const equipment = await Equipment.findById(id)

    // Check that spell was created by this user.
    const equipmentCreator = equipment.creator.toString()
    if (equipmentCreator !== body.userId){
        res.status(403).end()
        return
    }

    await Equipment.findByIdAndDelete(id)

    res.status(204).end()
})

itemRouter.delete('/weapons/:id', async (req, res) => {
    const [authorized, checkMessage] = TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const id = req.params.id
    const body = req.body

    const weapon = await Weapon.findById(id)

    // Check that weapon was created by this user.
    const weaponCreator = weapon.creator.toString()
    if (weaponCreator !== body.userId){
        res.status(403).end()
        return
    }

    await Weapon.findByIdAndDelete(id)

    res.status(204).end()
})

itemRouter.post('/', async (req, res) => {
    const [authorized, checkMessage] = TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const body = req.body
    const user = await User.findById(body.userId)
    const itemType = body.itemType
    let saved = false
    switch (itemType){
        case "Equipment":
            const newEquip = new Equipment({
                name: body.name,
                description: body.description,
                userCreated: true,
                creator: body.userId
            })
            saved = await newEquip.save()

            user.creations.equipment = user.creations.equipment.concat(saved._id)
            break

        case "Spell":
            const newSpell = new Spell({
                name: body.name,
                level: body.level,
                description: body.description,
                castingTime: body.castingTime,
                range: body.range,
                components: body.components,
                duration: body.duration,
                userCreated: true,
                creator: body.userId
            })
            saved = await newSpell.save()

            user.creations.spells = user.creations.spells.concat(saved._id)
            break

        case "Weapon":
            const newWeapon = new Weapon({
                name: body.name,
                description: body.description,
                atkBonus: body.atkBonus,
                damage: body.damage,
                range: body.range,
                userCreated: true,
                creator: body.userId
            })
            saved = await newWeapon.save()

            user.creations.weapons = user.creations.weapons.concat(saved._id)
            break
    }
    
    if(saved){
        await user.save()
        res.json(saved.toJSON())
    }
    else {
        res.status(400).send('Unsupported Item Type')
    }

})

module.exports = itemRouter