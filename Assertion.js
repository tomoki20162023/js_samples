function MatcherCore() {}
MatcherCore.prototype.isNull = function(obj) { return obj === null; };
MatcherCore.prototype.isUndefined = function(obj) { return obj === undefined; };
MatcherCore.prototype.isFalse = function(obj) {
	if (obj instanceof Object) {
		if (obj instanceof Boolean) return obj == false;
		if (obj instanceof Number) {
			return (!obj.valueOf()) == true;
		}
	}
	return Boolean(obj) == false;
};
MatcherCore.prototype.isTrue = function(obj) { return !this.isFalse(obj); };

MatcherCore.prototype.isInstanceObject = function(obj) { return obj instanceof Object; };
MatcherCore.prototype.isInstanceBoolean = function(obj) { return obj instanceof Boolean; };
MatcherCore.prototype.isInstanceArray = function(obj) { return obj instanceof Array; };
MatcherCore.prototype.isInstanceString = function(obj) { return obj instanceof String; };
MatcherCore.prototype.isInstanceNumber = function(obj) { return obj instanceof Number; };

MatcherCore.prototype.isTypeObject = function(obj) { return typeof(obj) === 'object'; };
MatcherCore.prototype.isTypeUndefined = function(obj) { return typeof(obj) === 'undefined'; };
MatcherCore.prototype.isTypeBoolean = function (obj) { return typeof(obj) === 'boolean'; };
MatcherCore.prototype.isTypeString = function(obj) { return typeof(obj) === 'string'; };
MatcherCore.prototype.isTypeNumber = function(obj) { return typeof(obj) === 'number'; };

function Assertion() {
	this._core = new MatcherCore();
	this.of = {
		parent: this
	};
	this.of.String = function(actual, message) { return this.parent._ofString(actual, message); };
};

Assertion.prototype._ofString = function(actual, message) {
	let result = new Result(!this._core.isInstanceString(actual), message);

	if (result.error) {
		let msg = message;
		msg += " : actual type is " + (typeof actual);
		if (actual.constructor) {
			msg += " : constructor is " + actual.constructor.name;
		}
		result.setDetailMessages(this._getResultDetails(actual, "String", msg));
	}
	return result;
};

Assertion.prototype._getResultDetails = function(actual, expected, message) {
	let details = [];
	details.push("actual is " + String(actual));
	details.push(", expected is " + String(expected));
	details.push(",\n\t" + message);
	return details;
};


Assertion.prototype.is = function(actual, expected, message) {
	let result = new Result(actual != expected, message);

	if (result.error) {
		result.setDetailMessages(this._getResultDetails(actual, expected, message));
	}
	return result;
};

/*
const Assertion = {
	'is': {
		'type': {
			'object': isTypeObject,
			'undefined': isTypeUndefined,
			'boolean': isTypeBoolean,
			'string': isTypeString,
			'number': isTypeNumber
		},
		'of': {
			'Object': isObject,
			'Boolean': isBoolean,
			'Array': isArray,
			'String': isString,
			'Number': isNumber
		},
		'null': isNull,
		'undefined': isUndefined,
		'true': isTrue,
		'false': isFalse
	}
};
*/

console.debug("loaded Assertion.js");

