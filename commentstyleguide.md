#access

- @private
- @protected
- @public
- @static
- @global
- @constant


#type

- number
- boolean
- string
- callback
- Object
- Array

/**
  @typedef PropertiesHash
  @type {object}
  @property {string} id - an ID.
  @property {string} name - your name.
  @property {number} age - your age.
 /

 - { PropertiesHash }

- { (number|boolean) }
- { number }
- { Array<string> }
- { Object<string, number> }
- { Object<a:string, b:number> }
- { number } [foo] //optional
- { callback }
- { ...number } //many objects
- @default [value]


#function/class

- @function name/scope
- @constructs [name]
- @class [name]
- @extends namepath

- @param {type} namepath - desciption
- @returns {type} description

- @property {type} namepath


#other

- @namespace namepath
- @module namepath
- @exports namepath

- @author name [email]
- @file desc of file
- @version change everytime i make a significant change
