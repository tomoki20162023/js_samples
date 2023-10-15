function IResult() {
	this.prototype.show = throwNotImplemented;
}

function Result(error, message, details) {
	this.error = error || false;
//	this.code = 0;
	this.message = message || "";
	this.details = details || [];
}

IResult.call(Result);
// Object.setPrototypeOf(Result.prototype, IResult.prototype);
Result.prototype.__proto__ =  IResult.prototype;
Result.prototype.setDetailMessages = function(details) {
	this.details = details;
};

console.debug("loaded Result.js");

