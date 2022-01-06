const itemRouter = require('express').Router()
const TokenCheck = require('../util/tokenCheck')
const { Spell } = require('../models/items')
const { Equipment } = require('../models/items')
const { Weapon } = require('../models/items')
const User = require('../models/user')

// Get all public (ie. not user created) spells.
itemRouter.get('/spells', async (req, res) => {
    console.log("Spell router got:")
    console.log(req.body)
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)

    const body = req.body
    const publicSpells = await Spell.find({ userCreated: false })

    let spells = publicSpells

    // If authorized to access user's spells, get them too.
    if (authorized){
        const usersSpells = await Spell.find({ creator: body.userId })
        spells.concat(usersSpells)
    }
    
    res.json(spells.map( s => s.toJSON() ))
})

// Update spell.
itemRouter.patch('/spells/:id', async (req, res) => {
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const id = req.params.id
    const body = req.body

    // Check that spell was created by user.
    const spellToUpdate = await Spell.findById(id)
    const spellCreator = spellToUpdate.creator.toString()
    if(spellCreator !== body.userId){
        res.status(403).end()
        return
    }

    // Field userCreated has to be true.
	body.update.userCreated = true
    const spell = await Spell.findByIdAndUpdate(id, body.update, { new: true })

    res.json(spell.toJSON())
})

// Delete spell.
itemRouter.delete('/spells/:id', async (req, res) => {
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
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

    const user = await User.findById(body.userId)
    user.creations.spells = user.creations.spells.filter(s => s.toString() !== id)
    await user.save()

    res.status(204).end()
})

// Get all public (ie. not user created) equipment.
itemRouter.get('/equipment', async (req, res) => {
    const equipment = await Equipment.find({ userCreated: false })
    
    res.json(equipment.map( e => e.toJSON() ))
})

// Update equipment.
itemRouter.patch('/equipment/:id', async (req, res) => {
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const id = req.params.id
    const body = req.body

    // Check that spell was created by user.
    const equipmentToUpdate = await Equipment.findById(id)
    const equipmentCreator = equipmentToUpdate.creator.toString()
    if(equipmentCreator !== body.userId){
        res.status(403).end()
        return
    }
    
    // Field userCreated has to be true.
	body.update.userCreated = true
    const equipment = await Equipment.findByIdAndUpdate(id, body.update, { new: true })

    res.json(equipment.toJSON())
})

// Delete equipment.
itemRouter.delete('/equipment/:id', async (req, res) => {
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
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

    const user = await User.findById(body.userId)
    user.creations.equipment = user.creations.equipment.filter(e => e.toString() !== id)
    await user.save()

    res.status(204).end()
})

// Get all public (ie. not user created) weapons.
itemRouter.get('/weapons', async (req, res) => {
    const weapons = await Weapon.find({ userCreated: false })

    res.json(weapons.map( w => w.toJSON() ))
})

// Update weapon.
itemRouter.patch('/weapons/:id', async (req, res) => {
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const id = req.params.id
    const body = req.body

    // Check that weapon was created by user.
    const weaponToUpdate = await Weapon.findById(id)
    const weaponCreator = weaponToUpdate.creator.toString()
    if(weaponCreator !== body.userId){
        res.status(403).end()
        return
    }
    
    // Field userCreated has to be true.
	body.update.userCreated = true
    const weapon = await Weapon.findByIdAndUpdate(id, body.update, { new: true })

    res.json(weapon.toJSON())
})

// Delete weapon.
itemRouter.delete('/weapons/:id', async (req, res) => {
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
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

    const user = await User.findById(body.userId)
    user.creations.weapons = user.creations.weapons.filter(w => w.toString() !== id)
    await user.save()

    res.status(204).end()
})

// Create new item.
itemRouter.post('/', async (req, res) => {
    // Debug.
    console.log("Post item.")
    const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
    if (!authorized){
        res.status(401).send(checkMessage).end()
        return
    }

    const body = req.body
    // Debug.
    console.log(body)
    const user = await User.findById(body.userId)
    // Debug.
    console.log(user)
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
    
    // Debug.
    console.log(saved)
    
    if(saved){
        await user.save()
        res.json(saved.toJSON())
    }
    else {
        res.status(400).send('Unsupported Item Type')
    }

})

module.exports = itemRouter