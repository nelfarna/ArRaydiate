/*
 * The PolarPlotPanel is responsible for the construction of the polar plot of the array
 * factor of an antenna array.  This class contains the method to plot the data points of 
 * the specified instance of the ArrayFactor object.
 */

(function(exports) {
	
	function PolarPlotPanel (width, height, arrayFactor) {
		this.centerX = width / 2;
		this.centerY = height / 2;
		this.width = width;
		this.height = height;
		this.radius = (width < height) ? ((width / 2) - 20) : ((height / 2) - 20);
		this.polarGraph = new PolarGraph(this.centerX, this.centerY, this.radius);
		this.af = arrayFactor;
		this.lineColor = "#FF0000";
		this.bgrdColor = "#FFFFFF";
		this.unit = constants.LINEAR;
	}

	exports.PolarPlotPanel = PolarPlotPanel;

	PolarPlotPanel.prototype.paint = function(ctx) {
		ctx.fillStyle = this.bgrdColor;
		ctx.fillRect(0, 0, this.width, this.height);  // "clear" canvas

		this.polarGraph.paintPolarGraph(ctx);

		if(this.unit !== constants.DB) {
			this.polarGraph.drawLabels("linear", ctx);
		} else {
			this.polarGraph.drawLabels("db", ctx);
		}
		
		this.plot(ctx);
	};

	PolarPlotPanel.prototype.plot = function(ctx) {
		var tempPoints = [];
		var temp_dp, d1, p1, p2; // datapoints to store and plot

		var magnitude, angle;
		var x, y, z;

		for(var i = 0; i < this.af.length(); i++) {
			temp_dp = new DataPoint();
			d1 = this.af.get(i);
			angle = d1.getAngle();
			magnitude = d1.getMagnitude() / this.af.getMaxAF(); // normalize so it fits within polar plot

			if (this.unit == constants.DB) {
				magnitude = 10 * Math.log(magnitude) + 40.0;

				if (magnitude > 0.0) {
					magnitude *= this.polarGraph.getRadius() / 40.0;
				} else magnitude = 0.0;
			} else {
				magnitude *= this.polarGraph.getRadius();
			}

			y = Math.sin(angle) * magnitude;
			x = Math.cos(angle) * magnitude;

			z = Math.cos(x) * Math.cos(y);

			temp_dp.setLocation(x + this.centerX, y + this.centerY);
			tempPoints.push(temp_dp);

			
		}

		// now plot temp data points
		ctx.strokeStyle = this.lineColor;
		for (var i = 0; i < tempPoints.length; i++) {
			try {
				p1 = tempPoints[i];
				p2 = tempPoints[i + 1];
				
				ctx.beginPath();
			    ctx.moveTo(p1.getX(), p1.getY());
			    ctx.lineTo(p2.getX(), p2.getY());
			    ctx.lineWidth = 3;
			    ctx.stroke();

			} catch (e) {}
		}

	};

	PolarPlotPanel.prototype.updateAF = function(af) {
		this.af = af;
	};

	PolarPlotPanel.prototype.setBackgroundColor = function(color) {
		this.bgrdColor = bg;
	};

	PolarPlotPanel.prototype.setLineColor = function(color) {
		this.lineColor = color;
	};

	PolarPlotPanel.prototype.setDecibel = function(db) {
		this.unit = (db) ? constants.DB : constants.LINEAR;
	};

})(typeof exports === 'undefined' ? this : exports);
 
        
