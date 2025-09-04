const { filter } = require("lodash");

var roleHarvester = {
	role: 'harvester',
	max: 3,
	spawn: function() {
		let newName = this.role + Game.time;
		Game.spawns['spawn1'].spawnCreep(
			[WORK, CARRY, MOVE],
			newName,
			{ memory: { role: this.role, harvesting: false } }
		);
	},
	process: function(creep) {
		if (creep.store.getUsedCapacity() == 0) {
			creep.memory.harvesting = true;
		}
		if (creep.store.getFreeCapacity() == 0) {
			creep.memory.harvesting = false;
		}
		if (creep.memory.harvesting) {
			let sources = creep.room.find(FIND_SOURCES_ACTIVE);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0]);
			}
		}
		else {
			let targets = creep.room.find(
				FIND_STRUCTURES,
				{
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_SPAWN ||
							structure.structureType == STRUCTURE_EXTENSION ||
							structure.structureType == STRUCTURE_TOWER) &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
					}
				}
			);
			if (targets.length) {
				if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
			else {
				let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
				if (targets.length) {
					if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0]);
					}
				}
				else {
					if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
						creep.moveTo(creep.room.controller);
					}
				}
			}
		}
	}
};

module.exports = roleHarvester;
