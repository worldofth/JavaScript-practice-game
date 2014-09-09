/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};

(function(){
	'use strict';

	var entities = {},
	sets = [],

	addSet = function(name){
		sets.push(name);
		entities[name] = {};
		entities[name].entityNames = [];
	},

	removeSet = function(name){
		if(sets.indexOf(name) !== -1){
		   	sets.splice(sets.indexOf(name), 1);
			delete entities[name];
		}
	},

	addEntitiy = function(setname, entityname, entity){
		if(sets.indexOf(setname) === -1){
			throw new Error("No entity set was found using the name: "+setname);
		}
		if(!!entities[setname][entityname]){
			throw new Error("Entity name is already in use, please change it: " + entityname);
		}

		entities[setname].entityNames.push(entityname);
		entities[setname][entityname] = entity;
	},

	removeEntity = function(setname, entityname){
		if(sets.indexOf(setname) === -1){
			throw new Error("No entity set was found using the name: "+setname);
		}
		if(!!!entities[setname][entityname]){
			throw new Error("No entity was found to delete by the name: " + entityname);
		}
		entities[setname].entityNames.splice(entities[setname].entityNames.indexOf(entityname), 1);
		delete entities[setname][entityname];
	},

	preUpdate = function(){
		for(var i = 0; i < sets.length; i++){
			for(var j = 0; j < entities[sets[i]].entityNames.length; j++){
				if(entities[sets[i]][entities[sets[i]].entityNames[j]].toDelete){
					removeEntity(sets[i], entities[sets[i]].entityNames[j]);
					continue;
				}
				entities[sets[i]][entities[sets[i]].entityNames[j]].preUpdate();
			}
		}
	},

	postUpdate = function(){
		for(var i = 0; i < sets.length; i++){
			for(var j = 0; j < entities[sets[i]].entityNames.length; j++){
				entities[sets[i]][entities[sets[i]].entityNames[j]].postUpdate();
			}
		}
	},


	update = function(){
		for(var i = 0; i < sets.length; i++){
			for(var j = 0; j < entities[sets[i]].entityNames.length; j++){
				entities[sets[i]][entities[sets[i]].entityNames[j]].update();
			}
		}
	};

	testgame.entityManager = {
		entities: entities,
		sets: sets,
		addSet: addSet,
		removeSet: removeSet,
		addEntitiy: addEntitiy,
		removeEntity: removeEntity,
		preUpdate: preUpdate,
		postUpdate: postUpdate,
		update: update
	};

}());
