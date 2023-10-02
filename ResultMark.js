function ResultMark(_ok, _ng) {
	this._ok = _ok;
	this._ng = _ng;
}
ResultMark.prototype.OK = function() { return this._ok; };
ResultMark.prototype.NG = function() { return this._ng; };
ResultMark.prototype.judge = function(result) {
	return (result ? this._ok : this._ng);
};
ResultMark.prototype.setOK = function(aChar) { this._ok = aChar; };
ResultMark.prototype.setNG = function(aChar) { this._ng = aChar; };

