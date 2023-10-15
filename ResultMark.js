function ResultMark(_ok, _ng) {
	this._ok = _ok || "O";
	this._ng = _ng || "X";
}
ResultMark.prototype.OK = function() { return this._ok; };
ResultMark.prototype.NG = function() { return this._ng; };
ResultMark.prototype.judge = function(result) {
	return (result ? this.OK() : this.NG());
};
ResultMark.prototype.setOK = function(aChar) { this._ok = aChar; };
ResultMark.prototype.setNG = function(aChar) { this._ng = aChar; };

console.debug("loaded ResultMark.js");

