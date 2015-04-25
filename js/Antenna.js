/*
 * The Antenna class represents a single antenna within the antenna array.
 */

(function(exports) {

	function Antenna(amplitude) {
	  this.amplitude = amplitude;
	}

	exports.Antenna = Antenna;

	Antenna.prototype.setAmplitude = function(amplitude) {
	  this.amplitude = amplitude;
	};

	Antenna.prototype.getAmplitude = function() {
	  return this.amplitude;
	};

})(typeof exports === 'undefined' ? this : exports);

