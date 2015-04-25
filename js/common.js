(function(exports) {

	exports.constants = {
		"MAX_AMP" : 20.0,  				// Max amplitude possible for an antenna
	    "INIT_AMP" : 1.0,  				// Max amplitude possible for an antenna
	    "INIT_NUM" : 2,      			// Initial # of elements/antennas
	    "INIT_PHASE" : 0.0,  			// Initial phase difference
	    "INIT_SPACING" : 0.5, 			// Initial spacing between elements
	    "K" : 2*Math.PI,				// Max amplitude possible for an antenna
		"MAX_SPACING" : 250,			// Max spacing allowed btwn antennas
		"MIN_SPACING" : 10,				// Min spacing allowed btwn antennas
		"SPACING_INITIAL_VALUE" : 50,	// Initial spacing is set to half a wavelength
		"RADIANS" : 1,					// Selection value for radians
		"DEGREES" : 2,					// Selection value for degrees
		"POLAR" : 1,					// Selection value for polar graph
		"RECT" : 2,						// Selection value for rectangular graph
		"DB" : 1,						// Selection value for plotting in decibel
		"LINEAR" : 2,					// Selection value for plotting in linear
		"ICON_ON" : "images/ant_icon.gif",			// path to enabled antenna icon
		"ICON_OFF" : "images/ant_icon_gray.gif"		// path to disabled antenna icon
	};
	
})(typeof exports === 'undefined' ? this : exports);