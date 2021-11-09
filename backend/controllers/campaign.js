const campaignRouter = require('express').Router()
const TokenCheck = require('../util/tokenCheck')
const Enemy = require('../models/enemy')
const Encounter = require('../models/encounter')
const Campaign = require('../models/campaign')
const User = require('../models/user')


// Get all public (not user created) enemies.
campaignRouter.get('/enemy', async (req, res) => {
	const enemies = await Enemy.find({ userCreated: false })

	res.json(enemies.map( e => e.toJSON() ))
})
// Create enemy.
campaignRouter.post('/enemy', async (req, res) => {
  const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

	const body = req.body

	const newEnemy = new Enemy({
		name: body.name,
		size: body.size,
		race: body.race,
		alignment: body.alignment,
		armorClass: body.armorClass,
		maxHealth: body.maxHealth,
		speed: body.speed,
		strength: body.strength,
		dexterity: body.dexterity,
		constitution: body.constitution,
		intelligence: body.intelligence,
		wisdom: body.wisdom,
		charisma: body.charisma,
		skills: body.skills,
		passiveWisdom: body.passiveWisdom,
		resistances: body.resistances,
		immunities: body.immunities,
		conditionImmunities: body.conditionImmunities,
		senses: body.senses,
		languages: body.languages,
		challenge: body.challenge,
		features: body.features,
		spellCastingAbility: body.spellCastingAbility,
		spellSlots: body.spellSlots,
		spells: body.spells,
		weapon: body.weapon,
		description: body.description,
		userCreated: true,
		creator: body.userId
	})

	const savedEnemy = await newEnemy.save()

	// Add to creator.
	const creator = await User.findById(body.userId)
	creator.creations.enemies = creator.creations.enemies.concat(savedEnemy._id)
	await creator.save()

	res.json(savedEnemy.toJSON())
})

// Update enemy.
campaignRouter.patch('/enemy/:id', async (req, res) => {
	const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

	const id = req.params.id
	const body = req.body

	const enemy = await Enemy.findById(id)

	// Check that enemy was created by this user.
	const enemyCreator = enemy.creator.toString()
	if(enemyCreator !== body.userId){
		res.status(403).end()
        return
	}

	// Field userCreated has to be true.
	body.update.userCreated = true
	const updatedEnemy = await Enemy.findByIdAndUpdate(id, body.update, { new: true })

	res.json(updatedEnemy.toJSON())
})

// Delete enemy.
campaignRouter.delete('/enemy/:id', async (req, res) => {
	const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

	const id = req.params.id
	const body = req.body

	const enemy = await Enemy.findById(id)

	// Check that enemy was created by this user.
	const enemyCreator = enemy.creator.toString()
	if(enemyCreator !== body.userId){
		res.status(403).end()
        return
	}

	await Enemy.findByIdAndDelete(id)

	const user = User.findById(body.userId)
	user.creations.enemies = user.creations.enemies.filter(e => e.toString() !== id)
	await user.save()

	res.status(204).end()
})

// Create encouter.
campaignRouter.post('/encounter', async (req, res) => {
	const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

	const body = req.body

	const newEncounter = new Encounter({
		creator: body.userId,
		name: body.name,
		enemies: body.enemies,
		npcs: body.npcs,
		loot: body.loot,
		experience: body.experience,
		notes: body.notes
	})

	const savedEncounter = await newEncounter.save()

	// Add to creator.
	const creator = await User.findById(body.userId)
	creator.creations.encounters = creator.creations.encounters.concat(savedEncounter._id)
	await creator.save()

	res.json(savedEncounter.toJSON())
})

// Update encounter.
campaignRouter.patch('/encounter/:id', async (req, res) => {
	const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

	const id = req.params.id
	const body = req.body

	const encounter = await Encounter.findById(id)

	// Check that encounter was created by this user.
	const encounterCreator = encounter.creator.toString()
	if(encounterCreator !== body.userId){
		res.status(403).end()
        return
	}

	// Field userCreated has to be true.
	body.update.userCreated = true
	const updatedEncounter = await Encounter.findByIdAndUpdate(id, body.update, { new: true })

	res.json(updatedEncounter.toJSON())
})

// Delete encounter.
campaignRouter.delete('/encounter/:id', async (req, res) => {
	const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

	const id = req.params.id
	const body = req.body

	const encounter = await Encounter.findById(id)

	// Check that encounter was created by this user.
	const encounterCreator = encounter.creator.toString()
	if(encounterCreator !== body.userId){
		res.status(403).end()
        return
	}

	await Encounter.findByIdAndDelete(id)

	const user = User.findById(body.userId)
	user.creations.encounters = user.creations.encounters.filter(e => e.toString() !== id)
	await user.save()

	res.status(204).end()
})

// Get specific campaign.
campaignRouter.get('/campaign/:id', async (req, res) => {
	const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

	const id = req.params.id
	const body = req.body

	const campaign = await Campaign.findById(id).populate(
		'heroes', {name: 1, race: 1, level: 1}).populate(
		'encounters', {name: 1}).populate(
		'npcs', {name: 1})

	// Check that campaign was created by this user.
	const campaignCreator = campaign.creator.toString()
	if(campaignCreator !== body.userId){
		res.status(403).end()
        return
	}

	res.json(campaign.toJSON())
})

// Create campaign.
campaignRouter.post('/campaign', async (req, res) => {
	const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

	const body = req.body

	const newCampaign = new Campaign({
		creator: body.userId,
		name: body.name,
		heroes: body.heroes,
		npcs: body.npcs,
		encounters: body.encounters,
		notes: body.notes
	})

	const savedCampaign = await newCampaign.save()

	// Add to creator.
	const creator = await User.findById(body.userId)
	creator.creations.campaigns = creator.creations.campaigns.concat(savedCampaign._id)
	await creator.save()

	res.json(savedCampaign.toJSON())
})

// Update campaign.
campaignRouter.patch('/campaign/:id', async (req, res) => {
	const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

	const id = req.params.id
	const body = req.body

	const campaign = await Campaign.findById(id)

	// Check that campaign was created by this user.
	const campaignCreator = campaign.creator.toString()
	if(campaignCreator !== body.userId){
		res.status(403).end()
        return
	}

	// Field userCreated has to be true.
	body.update.userCreated = true
	const updatedCampaign = await Campaign.findByIdAndUpdate(id, body.update, { new: true })

	res.json(updatedCampaign.toJSON())
})

// Delete campaign.
campaignRouter.delete('/campaign/:id', async (req, res) => {
	const [authorized, checkMessage] = await TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

	const id = req.params.id
	const body = req.body

	const campaign = await Campaign.findById(id)

	// Check that campaign was created by this user.
	const campaignCreator = campaign.creator.toString()
	if(campaignCreator !== body.userId){
		res.status(403).end()
        return
	}

	await Campaign.findByIdAndDelete(id)

	const user = User.findById(body.userId)
	user.creations.campaigns = user.creations.campaigns.filter(c => c.toString() !== id)
	await user.save()

	res.status(204).end()
})

module.exports = campaignRouter