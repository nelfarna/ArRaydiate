(function(exports) {

	var ArRaydiate = function(canvasId) {
		var canvas = document.getElementById(canvasId),
			ctx = canvas.getContext("2d");

		this.constants = constants;
		this.aa = new AntennaArray();
		this.aa.resetAmplitudes();
		this.aa.computeAF(1);

		this.pp = new PlotPanel(canvas.width, canvas.height, this.constants.POLAR, this.aa.getArrayFactor())
		this.pp.paint(ctx);

		this.cp = new ControlPanel(this.aa, this.pp);
		this.cp.initialize(ctx);
	};

	exports.ArRaydiate = ArRaydiate;
})(this);