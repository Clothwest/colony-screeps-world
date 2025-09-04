var roleUpgrader = {
	role: 'upgrader',
	max: 3,
	spawn: function() {
		let newName = this.role + Game.time;
		Game.spawns['spawn1'].spawnCreep(
			[WORK, CARRY, MOVE],
			newName,
			{ memory: { role: this.role, upgrading: false } }
		);
	},
	process: function(creep) {
		if (creep.store.getUsedCapacity() == 0) {
			creep.memory.upgrading = false;
		}
		if (creep.store.getFreeCapacity() == 0) {
			creep.memory.upgrading = true;
		}
		if (creep.memory.upgrading) {
			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
		}
		else {
			let sources = creep.room.find(FIND_SOURCES_ACTIVE);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0]);
			}
		}
	}
}

module.exports = roleUpgrader;
