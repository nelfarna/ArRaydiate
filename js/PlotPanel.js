/*
 * The PlotPanel is responsible for the construction of the polar or rectangular plot of the array
 * factor of an antenna array.  This class contains the method to plot the data points of 
 * the specified instance of the ArrayFactor object.
 */

(function(exports) {

	function PlotPanel (width, height, plotType, arrayFactor) {
		this.type = plotType;
		this.centerX = width / 2;
		this.centerY = height / 2;
		this.width = width;
		this.height = height;
		this.radius = (width < height) ? ((width / 2) - 20) : ((height / 2) - 20);
		this.graph; 
		this.setGraph(plotType);
		this.af = arrayFactor;
		this.lineColor = "#FF0000";
		this.bgrdColor = "#FFFFFF";
		this.unit = constants.LINEAR;
	}

	exports.PlotPanel = PlotPanel;

	PlotPanel.prototype.paint = function(ctx) {

		ctx.fillStyle = this.bgrdColor;
		ctx.fillRect(0, 0, this.width, this.height);  // "clear" canvas

		this.graph.paintGraph(ctx);

		if(this.unit !== constants.DB) {
			this.graph.drawLabels(constants.LINEAR, ctx);
		} else {
			this.graph.drawLabels(constants.DB, ctx);
		}
		

		this.plot(ctx);
	};

	PlotPanel.prototype.setGraph = function(type) {
		this.type = type;
		if(type ===  constants.RECT) {
			 this.centerY = this.centerY - this.height / 4;
			 this.graph = new RectGraph(this.centerX, this.centerY, 8 * this.width / 9, 8 * this.height / 18);
		} else {
			this.centerY = this.height / 2;
			this.graph = new PolarGraph(this.centerX, this.centerY, this.radius);
		}
	}

	PlotPanel.prototype.plot = function(ctx) {
		var tempPoints = [];
		var temp_dp, d1, p1, p2; // datapoints to store and plot

		var magnitude, angle;
		var x, y, z;

		for(var i = 0; i < this.af.length(); i++) {
			temp_dp = new DataPoint();
			d1 = this.af.get(i);
			angle = d1.getAngle();

			if (this.type === constants.RECT) {
				if (angle <= Math.PI)
	            { 
	               x = (angle / Math.PI) * (this.graph.getWidth() / 2);
	               magnitude = d1.getMagnitude() / this.af.getMaxAF();  // normalize to fit within plot boundaries
	               if(this.unit == constants.DB) {   
	               		magnitude = 10 * Math.log(magnitude) + 40.0;
	               		if (magnitude > 0.0) {
	               			y = magnitude*(this.graph.getMaxHeight() / 40.0);
	               		} else y = 0.0;
	               } else y = magnitude * this.graph.getMaxHeight();

	            }
	        } 

	        if (this.type === constants.POLAR) {
				magnitude = d1.getMagnitude() / this.af.getMaxAF(); // normalize so it fits within plot

				if (this.unit == constants.DB) {
					magnitude = 10 * Math.log(magnitude) + 40.0;

					if (magnitude > 0.0) {
						magnitude *= this.graph.getRadius() / 40.0;
					} else magnitude = 0.0;

				} else {
					magnitude *= this.graph.getRadius();
				}

				y = Math.sin(angle) * magnitude;
				x = Math.cos(angle) * magnitude;

			}
			temp_dp.setLocation(x, y);
			tempPoints.push(temp_dp);

		}

		// now plot temp data points
		ctx.strokeStyle = this.lineColor;

		var centerY = this.centerY + (this.graph.getMaxHeight() / 2);
		for (var i = 0; i < tempPoints.length; i++) {
			try {
				p1 = tempPoints[i];
				p2 = tempPoints[i + 1];
				
				ctx.beginPath();
				if (this.type === constants.POLAR) {
				    ctx.moveTo(this.centerX + p1.getX(), this.centerY + p1.getY());
				    ctx.lineTo(this.centerX + p2.getX(), this.centerY + p2.getY());
				} else {
					// right half of grid
					ctx.moveTo(this.centerX + p1.getX(), centerY - p1.getY());
				    ctx.lineTo(this.centerX + p2.getX(), centerY - p2.getY());
				    // left half of grid
				    ctx.moveTo(this.centerX - p1.getX(), centerY - p1.getY());
				    ctx.lineTo(this.centerX - p2.getX(), centerY - p2.getY());
				}
			    ctx.lineWidth = 3;
			    ctx.stroke();

			} catch (e) {}
		}


	};

	PlotPanel.prototype.updateAF = function(af) {
		this.af = af;
	};

	PlotPanel.prototype.setBackgroundColor = function(color) {
		this.bgrdColor = bg;
	};

	PlotPanel.prototype.setLineColor = function(color) {
		this.lineColor = color;
	};

	PlotPanel.prototype.setDecibel = function(db) {
		this.unit = (db) ? constants.DB : constants.LINEAR;
	};

})(typeof exports === 'undefined' ? this : exports);
        
