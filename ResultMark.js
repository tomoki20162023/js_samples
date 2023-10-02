function ResultMark(_ok, _ng) {
	this._ok = _ok;
	this._ng = _ng;
}
ResultMark.prototype.OK = function() { return this._ok; };
ResultMark.prototype.NG = function() { return this._ng; };

