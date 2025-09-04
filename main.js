var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
	for (const name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
		}
	}
	
	// harvester
	let harvesterCur = _.filter(Game.creeps, (creep) => creep.memory.role == roleHarvester.role).length;
	if (!Game.spawns['spawn1'].spawning && harvesterCur < roleHarvester.max) {
		roleHarvester.spawn();
	}

	// upgrader
	let upgraderCur = _.filter(Game.creeps, (creep) => creep.memory.role == roleUpgrader.role).length;
	if (!Game.spawns['spawn1'].spawning && upgraderCur < roleUpgrader.max) {
		roleUpgrader.spawn();
	}

	let builderCur = _.filter(Game.creeps, (creep) => creep.memory.role == roleBuilder.role).length;
	if (!Game.spawns['spawn1'].spawning && builderCur < roleBuilder.max) {
		roleBuilder.spawn();
	}

	for (const name in Game.creeps) {
		let creep = Game.creeps[name];
		if (creep.memory.role == roleHarvester.role) {
			roleHarvester.process(creep);
		}
		if (creep.memory.role == roleUpgrader.role) {
			roleUpgrader.process(creep);
		}
		if (creep.memory.role == roleBuilder.role) {
			roleBuilder.process(creep);
		}
	}
}