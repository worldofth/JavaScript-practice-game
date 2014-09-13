/* globals testgame */

/**
* @author Tom Hopkins [https://github.com/worldofth]
* @file entityManager
* @version 1.0.0
*/

/**
* entityManager
* @module testgame.entityManager
*/
(function(){
	'use strict';

    /**
	* @property { Object } - holds all entities in an array like object
    * @public
	*/
	var entities = {},

    /**
	* @property { Array } - a list of sets the entities
    * fall under in the array like object
    * @public
	*/
	sets = [],

    /**
    * Adds a set and sets up the entities object to
    * add then entities for that set
    *
    * @method testgame.entityManager#addSet
    * @param { string } - set name
    * @public
    */
	addSet = function(name){
		sets.push(name);
		entities[name] = {};
		entities[name].entityNames = [];
	},

    /**
    * removes a set and deletes all entities in that set
    *
    * @method testgame.entityManager#removeSet
    * @param { string } name - set name
    * @public
    */
	removeSet = function(name){
		if(sets.indexOf(name) !== -1){
		   	sets.splice(sets.indexOf(name), 1);
			delete entities[name];
		}
	},

    /**
    * adds an entity to the entities array like object
    *
    * @method testgame.entityManager#addEntitiy
    * @param { string } name - set name
    * @param { string } entntiy name - name of enttity
    * @param { Entity } entity - the entity object to be held
    * @public
    */
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

    /**
    * removes an entity from a set
    *
    * @method testgame.entityManager#removeEntity
    * @param { string } name - set name
    * @param { string } entntiy name - name of enttity
    * @public
    */
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

    /**
	* The update before the main update
	*
	* @method testgame.entityManager#preUpdate
    * @public
	*/
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

    /**
	* The Main update
	*
	* @method testgame.entityManager#update
    * @public
	*/
	update = function(){
		for(var i = 0; i < sets.length; i++){
			for(var j = 0; j < entities[sets[i]].entityNames.length; j++){
				entities[sets[i]][entities[sets[i]].entityNames[j]].update();
			}
		}
	},

    /**
	* The update after the main update
	*
	* @method testgame.entityManager#postUpdate
    * @public
	*/
	postUpdate = function(){
		for(var i = 0; i < sets.length; i++){
			for(var j = 0; j < entities[sets[i]].entityNames.length; j++){
				entities[sets[i]][entities[sets[i]].entityNames[j]].postUpdate();
			}
		}
	};

    /**
    * @exports public interface of entityManager to the textgame namespace
    */
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
