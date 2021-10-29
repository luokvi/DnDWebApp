const itemRouter = require('express').Router()
const TokenCheck = require('../util/tokenCheck')
const { Spell } = require('../models/items')
const { Equipment } = require('../models/items')
const { Weapon } = require('../models/items')

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

itemRouter.post('/', async (req, res) => {
    const [authorized, checkMessage] = TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }
    
    const body = req.body
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
            break

        case "Weapon":
            const newWeapon = new Weapon({
                name: body.name,
                description: body.description,
                atkBonus: body.atkBonus,
                damage: body.damage,
                userCreated: true,
                creator: body.userId
            })
            saved = await newWeapon.save()
            break
    }
    
    if(saved){
        res.json(saved.toJSON())
    }
    else {
        res.status(400).send('Unsupported Item Type')
    }

})

module.exports = itemRouter