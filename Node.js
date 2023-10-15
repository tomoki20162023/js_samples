function INode() {
	this.prototype.add = throwNotImplemented;
	this.prototype.exec = throwNotImplemented;
}

function TestCase(_name, _callback) {
	this._name = _name;
	this._callback = _callback;
}
INode.call(TestCase);
Object.setPrototypeOf(TestCase.prototype, INode.prototype);

function Suite(_name, _callback) {
	this._name = _name;
	this._callback = _callback;
}
INode.call(Suite);
Object.setPrototypeOf(Suite.prototype, INode.prototype);

console.debug("loaded Node.js");

