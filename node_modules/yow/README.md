# Yow

Toolbox for Node. Contains stuff you only wished was there in the first place.

## Installation

	npm install yow --save
	
## Methods

### General Purpose

- **sprintf(args)**        - Just as you would expect. Uses the npm module 'sprintf-js'.
- **extend(args)**         - Again, just as you would expect. Uses the npm module 'extend'.


### File System

- **mkdir(path)**                 - Creates the directory you specify.
- **mkpath(path)**                - Creates the directory you specify. It will create multiple directories if they do not exit.
- **fileExists(path)**            - Nothing fancy, it just returns true/false.
- **readJSON(fileName)**          - Reads a JSON file and returns the contents.
- **writeJSON(fileName, object)** - Writes an object to a JSON file.


### Type Checks

- **isType(object, type)** - Returns true/false if typeof equals 'type'.
- **isArray(object)**      - Is object an array?
- **isNumber(object)**     - Is object a JavaScript **Number** object?
- **isString(object)**     - Is object a **String** object?
- **isDate(object)**       - Is object a **Date** object?
- **isFunction(object)**   - Is object a **function** object?
- **isObject(object)**     - Is object an object? BTW **null** is not an object.
- **isInteger(object)**    - Is object an integer?
- **isFloat(object)**      - Is object a float?


### Random

- **random()**             - Returns Math.random().
- **random(integer)**      - Returns a random number from 0 to the integer specified (exclusive).
- **random(min, max)**     - Returns a random number from min to max (inclusive).
- **random(array)**        - Returns a randomly chosen object in the specified array.
- **random(object)**       - Returns a randomly chosen object property.
