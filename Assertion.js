function MatcherCore() {
	['a', 'an', 'of', 'is', 'to', 'be', 'does'].forEach(_context => this[_context] = _context);

	this.instance = new InstanceMatcherCore();
	this.type = new TypeMatcherCore();
}

MatcherCore.prototype.null = function(obj) { return obj === null; };
MatcherCore.prototype.undefined = function(obj) { return obj === undefined; };
MatcherCore.prototype.true = function(obj) { return obj === true; };
MatcherCore.prototype.false = function(obj) { return obj === false; };

MatcherCore.prototype.loseFalse = function(obj) {
	if (obj instanceof Object) {
		if (obj instanceof Boolean) return obj == false;
		if (obj instanceof Number) {
			return (!obj.valueOf()) == true;
		}
	}
	return Boolean(obj) == false;
};
MatcherCore.prototype.loseTrue = function(obj) { return !this.loseFalse(obj); };

function InstanceMatcherCore() {
	this.of = this;
}
[Object, Boolean, Array, String, Number, Function].forEach(function(cons) {
	InstanceMatcherCore.prototype[cons.name] = function(obj) { return obj instanceof cons; };
});

function TypeMatcherCore() {
	this.of = this;
}
['object', 'undefined', 'boolean', 'string', 'number', 'function'].forEach(function(type) {
	TypeMatcherCore.prototype[type] = function(obj) { return typeof(obj) === type; };
});

function MatcherContext(_core) {
	this._core = _core;
	this.instanceof = {
		context: this,
		String: function(actual, message) { return this.context.isInstanceofString(actual, message); }
	};
}

MatcherContext.prototype._hasConstructor = function(obj) {
	if (obj === undefined) return false;
	if (obj === null) return false;
	return true;
};

MatcherContext.prototype._getObjectDetailString = function(obj, name) {
	let varName = (("string" == typeof name) || (name instanceof String))? name: "instance";
	// 値のメッセージ
	let msgValue = varName + " is " + JSON.stringify(obj);
	// 型のメッセージ
	let typeStr = typeof obj;
	let msgType = "type: " + typeStr;
	// コンストラクタのメッセージ
	let msgConstructor = "";
	if (["object", "function"].indexOf(typeStr) > -1) {
		if (obj.constructor) {
			msgConstructor = "constructor is " + obj.constructor.name;
		}
	}

	let optionalMessages = [msgType];
	if (msgConstructor) {
		optionalMessages.push(msgConstructor);
	}
	return msgValue + "[" + optionalMessages.join(", ") + "]";
};

MatcherContext.prototype._getResultDetailsActual = function(actual) {
	return this._getObjectDetailString(actual, "actual");
};
MatcherContext.prototype._getResultDetailsExpect = function(expect) {
	return this._getObjectDetailString(expect, "expected");
};
MatcherContext.prototype._getResultDetails = function(actual, expected, message) {
	let details = [];
	details.push(message);
	details.push("\n, " + this._getResultDetailsActual(actual));
	details.push("\n, " + this._getResultDetailsExpect(expected));
	return details;
};
MatcherContext.prototype._getResultDetailsConstructor = function(actual, constructor, message) {
	let details = [];
	details.push(message);
	details.push("\n, " +this._getResultDetailsActual(actual));
	details.push("\n, expected is " + constructor.name);
	return details;
};

MatcherContext.prototype.instanceof = function(actual, constructor, message) {
	let result = new Result(!this._core.isInstanceOf(actual, constructor), message);
	if (result.error) {
		let msg = message;
		if (actual.constructor) {
			msg += " : constructor is " + actual.constructor.name;
		}
		result.setDetailMessages(this._getResultDetails(actual, constructor.name, msg));
	}
	return result;
}

MatcherContext.prototype.Object = function(actual, message) {
	return this._isObject(actual, message);
}
MatcherContext.prototype._isObject = function(actual, message) {
	let result = new Result(!this._core.isInstanceObject(actual), message);

	if (result.error) {
		result.setDetailMessages(this._getResultDetailsConstructor(actual, Object, message));
	}
	return result;
};

MatcherContext.prototype.String = function(actual, message) {
	return this._isString(actual, message);
}
MatcherContext.prototype._isString = function(actual, message) {
	let result = new Result(!this._core.isInstanceString(actual), message);

	if (result.error) {
		result.setDetailMessages(this._getResultDetailsConstructor(actual, String, message));
	}
	return result;
};

function Assertion() {
	this._core = new MatcherCore();
	this._ctx = new MatcherContext(this._core);
	this.is = this._ctx;
	this.instance = this._ctx;
	this.of = this._ctx;
};


Assertion.prototype._getResultDetails = function(actual, expected, message) {
	let details = [];
	details.push("actual is " + String(actual));
	details.push(", expected is " + String(expected));
	details.push(",\n\t" + message);
	return details;
};


Assertion.prototype.check = function(actual, expected, message) {
	let result = new Result(!(actual == expected), message);

	if (result.error) {
		result.setDetailMessages(this._ctx._getResultDetails(actual, expected, message));
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

