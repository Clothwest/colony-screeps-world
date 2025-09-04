var roleBuilder = {
	role: 'builder',
	max: 3,
	spawn: function() {
		let newName = this.role + Game.time;
		Game.spawns['spawn1'].spawnCreep(
			[WORK, CARRY, MOVE],
			newName,
			{ memory: { role: this.role, building: false } }
		);
	},
	process: function(creep) {
		if (creep.store.getUsedCapacity() == 0) {
			creep.memory.building = false;
		}
		if (creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
		}
		if (creep.memory.building) {
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
		else {
			let sources = creep.room.find(FIND_SOURCES_ACTIVE);
			if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[1]);
			}
		}
	}
}

module.exports = roleBuilder
