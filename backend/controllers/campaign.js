const campaignRouter = require('express').Router()
const TokenCheck = require('../util/tokenCheck')
const Enemy = require('../models/enemy')
const Encounter = require('../models/encounter')
const Campaign = require('../models/campaign')

// Create enemy.
campaignRouter.post('/enemy', async (req, res) => {
  const [authorized, checkMessage] = TokenCheck.checkToken(req, req.body.userId)
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
		userCreated: true
	})

	const savedEnemy = await newEnemy.save()
	res.json(savedEnemy.toJSON())
})

// Create encouter.
campaignRouter.post('/encounter', async (req, res) => {
	const [authorized, checkMessage] = TokenCheck.checkToken(req, req.body.userId)
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
	res.json(savedEncounter.toJSON())
})

// Create campaign.
campaignRouter.post('/campaign', async (req, res) => {
	const [authorized, checkMessage] = TokenCheck.checkToken(req, req.body.userId)
	if (!authorized){
		res.status(401).send(checkMessage).end()
		return
	}

	const body = req.body

	const newCampaign = new Campaign({
		creator = body.userId,
		name: body.name,
		heroes: body.heroes,
		npcs: body.npcs,
		encounters: body.encounters,
		notes: body.notes
	})

	const savedCampaign = await newCampaign.save()
	res.json(savedCampaign.toJSON())
})