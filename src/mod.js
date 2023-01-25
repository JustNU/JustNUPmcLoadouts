"use strict";

class Mod {
	postDBLoad(container) {
		// Constants
		const Config = require("../config/config.json");
		const logger = container.resolve("WinstonLogger");
		const database = container.resolve("DatabaseServer").getTables();
		const Items = database.templates.items;
		const bots = database.bots.types;
		const HeadWearMaxLevel = (Config.HeadwearMaxLevel + 1)
		const HeadWearMinLevel = (Config.HeadwearMinLevel - 1)
		const ArmoredVestMaxLevel = (Config.ArmoredVestMaxLevel + 1)
		const ArmoredVestMinLevel = (Config.ArmoredVestMinLevel - 1)
		const BlacklistHeadwear = Config.BlacklistEquipment.BlacklistHeadwear
		const BlacklistEarpiece = Config.BlacklistEquipment.BlacklistEarpiece
		const BlacklistFaceCover = Config.BlacklistEquipment.BlacklistFaceCover
		const BlacklistArmorVests = Config.BlacklistEquipment.BlacklistArmorVests
		const BlacklistEyewear = Config.BlacklistEquipment.BlacklistEyewear
		const BlacklistArmbands = Config.BlacklistEquipment.BlacklistArmbands
		const BlacklistRigs = Config.BlacklistEquipment.BlacklistRigs
		const BlacklistBackpacks = Config.BlacklistEquipment.BlacklistBackpacks
		const BlacklistWeap = Config.BlacklistEquipment.BlacklistWeap
		const BlacklistItems = Config.BlacklistEquipment.BlacklistItems
		const BlacklistModsAndAmmo = Config.BlacklistEquipment.BlacklistModsAndAmmo
		
		for (const botType in bots) {
			if (botType === "usec" || botType === "bear") {
				// empty inventory slots
				bots[botType].inventory.equipment.ArmBand = {};
				bots[botType].inventory.equipment.ArmorVest = {};
				bots[botType].inventory.equipment.Backpack = {};
				bots[botType].inventory.equipment.Earpiece = {};
				bots[botType].inventory.equipment.Eyewear = {};
				bots[botType].inventory.equipment.FaceCover = {};
				bots[botType].inventory.equipment.Headwear = {};
				bots[botType].inventory.equipment.TacticalVest = {};
				bots[botType].inventory.equipment.FirstPrimaryWeapon = {};
				bots[botType].inventory.equipment.SecondPrimaryWeapon = {};
				bots[botType].inventory.equipment.Holster = {};
				bots[botType].inventory.equipment.Scabbard = {};
				
				bots[botType].inventory.mods = {};
				
				bots[botType].inventory.items.TacticalVest = [];
				bots[botType].inventory.items.Pockets = [];
				bots[botType].inventory.items.Backpack = [];
				bots[botType].inventory.items.SecuredContainer = [];
				
				bots[botType].inventory.Ammo = {};
				
				// push new items into inventory slots
				for (const itemId in database.templates.items) {
					
					// equipment
					// Headwear
					if (Items[itemId]._parent === "5a341c4086f77401f2541505" && Items[itemId]._props.armorClass < HeadWearMaxLevel && Items[itemId]._props.armorClass > HeadWearMinLevel) {
						bots[botType].inventory.equipment.Headwear[itemId] = 1;
					}
					// Earpiece
					if (Items[itemId]._parent === "5645bcb74bdc2ded0b8b4578") {
						for (const earpiece in Items["55d7217a4bdc2d86028b456d"]._props.Slots[11]._props.filters[0].Filter) {
							const earpieceId = Items["55d7217a4bdc2d86028b456d"]._props.Slots[11]._props.filters[0].Filter[earpiece]
							
							if (itemId === earpieceId) {
								bots[botType].inventory.equipment.Earpiece[itemId] = 1;
							}
						}
					}
					// Face Cover
					if (Items[itemId]._parent === "5a341c4686f77469e155819e" && Items[itemId]._props.armorClass < 7) {
						bots[botType].inventory.equipment.FaceCover[itemId] = 1;
					}
					// Armor Vests
					if (Items[itemId]._parent === "5448e54d4bdc2dcc718b4568" && Items[itemId]._props.armorClass < ArmoredVestMaxLevel && Items[itemId]._props.armorClass > ArmoredVestMinLevel) {
						bots[botType].inventory.equipment.ArmorVest[itemId] = 1;
					}
					// Eyewear
					if (Items[itemId]._parent === "5448e5724bdc2ddf718b4568") {
						bots[botType].inventory.equipment.Eyewear[itemId] = 1;
					}
					// Armbands
					if (Items[itemId]._parent === "5b3f15d486f77432d0509248" && Items[itemId]._props.armorClass < 7) {
						bots[botType].inventory.equipment.ArmBand[itemId] = 1;
					}
					// Armored Tactical Rigs
					if (Items[itemId]._parent === "5448e5284bdc2dcb718b4567" && Items[itemId]._props.armorClass > 0) {
						if (Items[itemId]._parent === "5448e5284bdc2dcb718b4567" && Items[itemId]._props.armorClass < ArmoredVestMaxLevel && Items[itemId]._props.armorClass > ArmoredVestMinLevel) {
							bots[botType].inventory.equipment.TacticalVest[itemId] = 1;
						}
					}
					// Non-armored Tactical Rigs
					if (Items[itemId]._parent === "5448e5284bdc2dcb718b4567" && !Items[itemId]._props.armorClass) {
						bots[botType].inventory.equipment.TacticalVest[itemId] = 1;
					}
					// Backpacks
					if (Items[itemId]._parent === "5448e53e4bdc2d60728b4567") {
						bots[botType].inventory.equipment.Backpack[itemId] = 1;
					}
					// First and Second primary weapons
					if (Items[itemId]._props.weapUseType === "primary" && itemId !== "5422acb9af1c889c16000029") {
						bots[botType].inventory.equipment.FirstPrimaryWeapon[itemId] = 1;
						bots[botType].inventory.equipment.SecondPrimaryWeapon[itemId] = 1;
					}
					// Sidearms
					if (Items[itemId]._props.weapUseType === "secondary" && itemId !== "5422acb9af1c889c16000029") {
						bots[botType].inventory.equipment.Holster[itemId] = 1;
					}
					// Melee
					if (Items[itemId]._parent === "5447e1d04bdc2dff2f8b4567" && itemId !== "5fc64ea372b0dd78d51159dc") {
						bots[botType].inventory.equipment.Scabbard[itemId] = 1;
					}
					
					// mods
					for (const slots in Items[itemId]._props.Slots) {
						if (itemId !== "55d7217a4bdc2d86028b456d") {
							if (Items[itemId]) {
								if (!bots[botType].inventory.mods[itemId]) {
									bots[botType].inventory.mods[itemId] = new Object();
								}
								
								bots[botType].inventory.mods[itemId][Items[itemId]._props.Slots[slots]._name] = [];
								
								for (const modIndex in Items[itemId]._props.Slots[slots]._props.filters[0].Filter) {
									if (Items[Items[itemId]._props.Slots[slots]._props.filters[0].Filter[modIndex]]) {
										bots[botType].inventory.mods[itemId][Items[itemId]._props.Slots[slots]._name].push(Items[itemId]._props.Slots[slots]._props.filters[0].Filter[modIndex])
									}
								}
							}
						}
					}
					
					// generate mags
					if (Items[itemId]._parent === "5448bc234bdc2d3c308b4569" && Items[itemId]._props.Cartridges) {
						
						if (!bots[botType].inventory.mods[itemId]) {
							bots[botType].inventory.mods[itemId] = new Object()
						}
						
						for (const ammo in Items[itemId]._props.Cartridges[0]._props.filters[0].Filter) {
							const ammoId = Items[itemId]._props.Cartridges[0]._props.filters[0].Filter[ammo]
							
							if (!bots[botType].inventory.mods[itemId][Items[itemId]._props.Cartridges[0]._name]) {
								bots[botType].inventory.mods[itemId][Items[itemId]._props.Cartridges[0]._name] = [];
							}
							
							if (Items[ammoId]) {
								bots[botType].inventory.mods[itemId][Items[itemId]._props.Cartridges[0]._name].push(ammoId);
							}
						}
					}
					
					// loose loot/meds/nades
					// meds
					if (Items[itemId]._parent) {
						if (Items[Items[itemId]._parent]._parent === "543be5664bdc2dd4348b4569" && Items[itemId]._props.MaxHpResource < 1801 && itemId !== "terragroupSpecialist_chemical_meds" 
						&& itemId !== "terragroupSpecialist_chemical_meds2") {
							bots[botType].inventory.items.TacticalVest.push(itemId);
							bots[botType].inventory.items.Pockets.push(itemId);
							bots[botType].inventory.items.Backpack.push(itemId);
							bots[botType].inventory.items.SecuredContainer.push(itemId);
						}
					}
					// loose loot
					if (Items[itemId]._parent) {
						if (!Items[itemId]._props.QuestItem && Items[itemId]._props.BackgroundColor !== "yellow" && Items[Items[itemId]._parent]._parent === "5448eb774bdc2d0a728b4567") {
							bots[botType].inventory.items.TacticalVest.push(itemId);
							bots[botType].inventory.items.Pockets.push(itemId);
							bots[botType].inventory.items.Backpack.push(itemId);
						}
					}
					// food/drinks
					if (Items[itemId]._parent) {
						if (Items[Items[itemId]._parent]._parent === "543be6674bdc2df1348b4569") {
							bots[botType].inventory.items.TacticalVest.push(itemId);
							bots[botType].inventory.items.Pockets.push(itemId);
							bots[botType].inventory.items.Backpack.push(itemId);
						}
					}
					// keys
					if (Items[itemId]._parent) {
						if (!Items[itemId]._props.QuestItem && Items[itemId]._props.BackgroundColor !== "yellow" && Items[Items[itemId]._parent]._parent === "543be5e94bdc2df1348b4568" 
						&& itemId !== "terragroupSpecialist_manager_keycard") {
							bots[botType].inventory.items.TacticalVest.push(itemId);
							bots[botType].inventory.items.Pockets.push(itemId);
							bots[botType].inventory.items.Backpack.push(itemId);
						}
					}
					// cases/maps
					if (Items[itemId]._parent === "5795f317245977243854e041" || Items[itemId]._parent === "567849dd4bdc2d150f8b456e") {
						bots[botType].inventory.items.TacticalVest.push(itemId);
						bots[botType].inventory.items.Pockets.push(itemId);
						bots[botType].inventory.items.Backpack.push(itemId);
					}
					// info loot
					if (!Items[itemId]._props.QuestItem && Items[itemId]._props.BackgroundColor !== "yellow" && Items[itemId]._parent === "5448ecbe4bdc2d60728b4568") {
						bots[botType].inventory.items.TacticalVest.push(itemId);
						bots[botType].inventory.items.Pockets.push(itemId);
						bots[botType].inventory.items.Backpack.push(itemId);
					}
					// loose mods
					if (Config.AllowWeaponModsInLootPool) {
						if (Items[itemId]._props.RaidModdable === false) {
							bots[botType].inventory.items.TacticalVest.push(itemId);
							bots[botType].inventory.items.Pockets.push(itemId);
							bots[botType].inventory.items.Backpack.push(itemId);
						}
					}
					// special items loot (markers, multitool, etc.)
					if (!Items[itemId]._props.QuestItem && Items[itemId]._props.BackgroundColor !== "yellow" && Items[itemId]._parent === "5447e0e74bdc2d3c308b4567" && itemId !== "5f4f9eb969cdc30ff33f09db") {
						bots[botType].inventory.items.TacticalVest.push(itemId);
						bots[botType].inventory.items.Pockets.push(itemId);
						bots[botType].inventory.items.Backpack.push(itemId);
					}
					// nades
					if (Items[itemId]._parent === "543be6564bdc2df4348b4568") {
						bots[botType].inventory.items.TacticalVest.push(itemId);
						bots[botType].inventory.items.Pockets.push(itemId);
					}
					// ammo
					if (Items[itemId]._parent === "5485a8684bdc2da71d8b4567") {
						bots[botType].inventory.items.SecuredContainer.push(itemId);
					}
				}
				
				// Blacklist some shit
				// Headwear
				/*
				for (const BlacklistHeadwearEntry in BlacklistHeadwear) {
					let BlacklistHeadwearId = BlacklistHeadwear[BlacklistHeadwearEntry]
					if (Items[BlacklistHeadwearId]) {
						bots[botType].inventory.equipment.Headwear = bots[botType].inventory.equipment.Headwear.filter(v => v !== BlacklistHeadwearId);
					}
				}
				// Earpiece
				for (const BlacklistEarpieceEntry in BlacklistEarpiece) {
					let BlacklistEarpieceId = BlacklistEarpiece[BlacklistEarpieceEntry]
					if (Items[BlacklistEarpieceId]) {
						bots[botType].inventory.equipment.Earpiece = bots[botType].inventory.equipment.Earpiece.filter(v => v !== BlacklistEarpieceId);
					}
				}
				// Face Cover
				for (const BlacklistFaceCoverEntry in BlacklistFaceCover) {
					let BlacklistFaceCoverId = BlacklistFaceCover[BlacklistFaceCoverEntry]
					if (Items[BlacklistFaceCoverId]) {
						bots[botType].inventory.equipment.FaceCover = bots[botType].inventory.equipment.FaceCover.filter(v => v !== BlacklistFaceCoverId);
					}
				}
				// Armor Vests
				for (const BlacklistArmorVestsEntry in BlacklistArmorVests) {
					let BlacklistArmorVestsId = BlacklistArmorVests[BlacklistArmorVests]
					if (Items[BlacklistArmorVestsId]) {
						bots[botType].inventory.equipment.ArmorVest = bots[botType].inventory.equipment.ArmorVest.filter(v => v !== BlacklistArmorVestsId);
					}
				}
				// Eyewear
				for (const BlacklistEyewearEntry in BlacklistEyewear) {
					let BlacklistEyewearId = BlacklistEyewear[BlacklistEyewearEntry]
					if (Items[BlacklistEyewearId]) {
						bots[botType].inventory.equipment.Eyewear = bots[botType].inventory.equipment.Eyewear.filter(v => v !== BlacklistEyewearId);
					}
				}
				// Armbands
				for (const BlacklistArmbandsEntry in BlacklistArmbands) {
					let BlacklistArmbandsId = BlacklistArmbands[BlacklistArmbandsEntry]
					if (Items[BlacklistArmbandsId]) {
						bots[botType].inventory.equipment.ArmBand = bots[botType].inventory.equipment.ArmBand.filter(v => v !== BlacklistArmbandsId);
					}
				}
				// Rigs
				for (const BlacklistRigsEntry in BlacklistRigs) {
					let BlacklistRigsId = BlacklistRigs[BlacklistRigsEntry]
					if (Items[BlacklistRigsId]) {
						bots[botType].inventory.equipment.TacticalVest = bots[botType].inventory.equipment.TacticalVest.filter(v => v !== BlacklistRigsId);
					}
				}
				// Backpacks
				for (const BlacklistBackpacksEntry in BlacklistBackpacks) {
					let BlacklistBackpacksId = BlacklistBackpacks[BlacklistBackpacksEntry]
					if (Items[BlacklistBackpacksId]) {
						bots[botType].inventory.equipment.Backpack = bots[botType].inventory.equipment.Backpack.filter(v => v !== BlacklistBackpacksId);
					}
				}
				// First and Second primary weapons
				for (const BlacklistWeapEntry in BlacklistWeap) {
					let BlacklistWeapId = BlacklistWeap[BlacklistWeapEntry]
					if (Items[BlacklistWeapId]) {
						bots[botType].inventory.equipment.FirstPrimaryWeapon = bots[botType].inventory.equipment.FirstPrimaryWeapon.filter(v => v !== BlacklistWeapId);
						bots[botType].inventory.equipment.SecondPrimaryWeapon = bots[botType].inventory.equipment.SecondPrimaryWeapon.filter(v => v !== BlacklistWeapId);
						bots[botType].inventory.equipment.Holster = bots[botType].inventory.equipment.Holster.filter(v => v !== BlacklistWeapId);
						bots[botType].inventory.equipment.Scabbard = bots[botType].inventory.equipment.Scabbard.filter(v => v !== BlacklistWeapId);
					}
				}
				// Items (meds/nades/loose loot)
				for (const BlacklistItemsEntry in BlacklistItems) {
					let BlacklistItemsId = BlacklistItems[BlacklistItemsEntry]
					if (Items[BlacklistItemsId]) {
						bots[botType].inventory.items.TacticalVest = bots[botType].inventory.items.TacticalVest.filter(v => v !== BlacklistItemsId);
						bots[botType].inventory.items.Pockets = bots[botType].inventory.items.Pockets.filter(v => v !== BlacklistItemsId);
						bots[botType].inventory.items.Backpack = bots[botType].inventory.items.Backpack.filter(v => v !== BlacklistItemsId);
						bots[botType].inventory.items.SecuredContainer = bots[botType].inventory.items.SecuredContainer.filter(v => v !== BlacklistItemsId);
					}
				}
				// mods and ammo 
				// FUCK THIS SHIT, I AIN'T TOUCHING THIS EVER AGAIN
				for (const BlacklistModsEntry in BlacklistModsAndAmmo) {
					let BlacklistModsId = BlacklistModsAndAmmo[BlacklistModsEntry]
					if (Items[BlacklistModsId]) {
						for (const moddableItem in bots[botType].inventory.mods) {
							for (const modItemSlots in bots[botType].inventory.mods[moddableItem]) {
								for (const modItemIndex in bots[botType].inventory.mods[moddableItem][modItemSlots]) {
									if (bots[botType].inventory.mods[moddableItem][modItemSlots][modItemIndex] === BlacklistModsId) {
										bots[botType].inventory.mods[moddableItem][modItemSlots] = bots[botType].inventory.mods[moddableItem][modItemSlots].filter(v => v !== BlacklistModsId);
									}
								}
							}
						}
					}
				}
				*/
				
				// chances
				/*
				for (const equipment in bots[botType].chances.equipment) {
					if (equipment === "ArmorVest" || equipment === "Headwear" || equipment === "FirstPrimaryWeapon") {
						bots[botType].chances.equipment[equipment] = 99;
					} else if (equipment === "TacticalVest" || equipment === "Scabbard") {
						bots[botType].chances.equipment[equipment] = 100;
					} else if (equipment === "SecondPrimaryWeapon") {
						bots[botType].chances.equipment[equipment] = 10;
					} else {
						bots[botType].chances.equipment[equipment] = 50;
					}
				}
				for (const mods in bots[botType].chances.mods) {
					if (mods === "mod_mount_004" || mods === "mod_charge" || mods === "mod_tactical" || mods === "mod_bipod" || mods === "mod_foregrip" || mods === "mod_tactical_000" || mods === "mod_equipment" 
					|| mods === "mod_equipment_000" || mods === "mod_scope_001" || mods === "mod_muzzle_001" || mods === "mod_tactical001" || mods === "mod_equipment_001" || mods === "mod_equipment_002") {
						bots[botType].chances.mods[mods] = 50;
					} else if (mods === "mod_mount_001" || mods === "mod_tactical_2" || mods === "mod_tactical_001" || mods === "mod_tactical002" || mods === "mod_scope_002") {
						bots[botType].chances.mods[mods] = 25;
					} else if (mods === "mod_tactical_002" || mods === "mod_mount_002" || mods === "mod_scope_003") {
						bots[botType].chances.mods[mods] = 12;
					} else if (mods === "mod_tactical_003" || mods === "mod_mount_003" || mods === "mod_nvg") {
						bots[botType].chances.mods[mods] = 6;
					} else if (mods === "mod_mount_005") {
						bots[botType].chances.mods[mods] = 3;
					} else if (mods === "mod_mount_006") {
						bots[botType].chances.mods[mods] = 2;
					} else if (mods === "mod_launcher") {
						bots[botType].chances.mods[mods] = 0;
					} else if (mods === "mod_scope" || mods === "mod_scope_000") {
						bots[botType].chances.mods[mods] = 70;
					} else {
						bots[botType].chances.mods[mods] = 99;
					}
				}
				*/
				
				
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.equipment.Headwear) + " - Headwear" + " " + botType)
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.equipment.Earpiece) + " - Earpiece")
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.equipment.FaceCover) + " - FaceCover")
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.equipment.ArmorVest) + " - ArmorVest")
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.equipment.Eyewear) + " - Eyewear")
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.equipment.ArmBand) + " - ArmBand")
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.equipment.TacticalVest) + " - TacticalVest")
				//logger.info(bots[botType].inventory.equipment.FirstPrimaryWeapon)
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.equipment.SecondPrimaryWeapon) + " - SecondPrimaryWeapon")
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.equipment.Holster) + " - Holster")
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.equipment.Scabbard) + " - Scabbard")
				
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.items.TacticalVest) + " - items.TacticalVest")
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.items.Pockets) + " - items.Pockets")
				//Logger.log(bots[botType].inventory.equipment.Backpack)
				//logger.logInfo(common_f.json.serialize(bots[botType].inventory.items.SecuredContainer) + " - items.SecuredContainer")
				
				//logger.logInfo(common_f.json.serialize(bots[botType].chances.equipment) + " - chances.equipment")
				//logger.logInfo(common_f.json.serialize(bots[botType].chances.mods) + " - chances.mods")
				
				/*
				bots[botType].inventory.equipment.FirstPrimaryWeapon = [
					"AK50"
				];
				
				JustNUPMCLoadouts.testBot("bear")
				JustNUPMCLoadouts.testBot("bear")
				JustNUPMCLoadouts.testBot("bear")
				JustNUPMCLoadouts.testBot("bear")
				JustNUPMCLoadouts.testBot("bear")
				JustNUPMCLoadouts.testBot("bear")
				JustNUPMCLoadouts.testBot("bear")
				JustNUPMCLoadouts.testBot("bear")
				JustNUPMCLoadouts.testBot("bear")
				JustNUPMCLoadouts.testBot("bear")
				JustNUPMCLoadouts.testBot("bear")
				JustNUPMCLoadouts.testBot("bear")
				*/
				
				//Logger.log(bots[botType].inventory.mods.GLOCK40_MAG_22RND)
			}
		}
    }
	
	static testBot(role)
	{
		let bot = JsonUtil.clone(database.bots.base);
		
		var testing = BotController.generateBot(bot, role)
	}
}

module.exports = { mod: new Mod() }