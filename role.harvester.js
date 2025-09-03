var roleHarvester = {
	role: 'harvester',
	max: 2,
	spawn: function() {
		let newName = this.role + Game.time;
		Game.spawns['spawn1'].spawnCreep(
			[WORK, CARRY, MOVE],
			newName,
			{ memory: { role: this.role, harvesting: false } }
		);
	},
	process: function(creep) {
		if (creep.memory.harvesting && creep.store.getFreeCapacity() > 0) {
			let sources = creep.room.find(FIND_SOURCES_ACTIVE);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0]);
			}
		}
		else {
			creep.memory.harvesting = false;
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
			if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets[0]);
			}
			if (creep.store.getUsedCapacity() <= 0) {
				creep.memory.harvesting = true;
			}
		}
	}
};

module.exports = roleHarvester;
