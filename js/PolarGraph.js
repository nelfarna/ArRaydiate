/*
 *  The PolarGraph class represents the grid for the polar plot.
 */ 

(function(exports) {
    
    function PolarGraph (centerX, centerY, radius) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.maxRadius = radius;
        this.color = "#555555";
        this.fontColor = "#0000FF";
    }

    exports.PolarGraph = PolarGraph;

    PolarGraph.prototype.paintGraph = function(ctx) {
        
        var x_30_deg = this.maxRadius * Math.sin(Math.PI/6); 
        var y_30_deg = this.maxRadius * Math.cos(Math.PI/6); 
        var x_60_deg = this.maxRadius * Math.sin(Math.PI/3); 
        var y_60_deg = this.maxRadius * Math.cos(Math.PI/3); 

        ctx.fillStyle = this.fontColor;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.maxRadius, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.maxRadius * 0.75, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.maxRadius * 0.5, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.maxRadius * 0.25, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX - this.maxRadius, this.centerY);
        ctx.lineTo(this.centerX + this.maxRadius, this.centerY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX, this.centerY + this.maxRadius);
        ctx.lineTo(this.centerX, this.centerY - this.maxRadius);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX - x_30_deg, this.centerY - y_30_deg);
        ctx.lineTo(this.centerX + x_30_deg, this.centerY + y_30_deg);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX - x_60_deg, this.centerY - y_60_deg);
        ctx.lineTo(this.centerX + x_60_deg, this.centerY + y_60_deg);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX - x_60_deg, this.centerY + y_60_deg);
        ctx.lineTo(this.centerX + x_60_deg, this.centerY - y_60_deg);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX - x_30_deg, this.centerY + y_30_deg);
        ctx.lineTo(this.centerX + x_30_deg, this.centerY - y_30_deg);
        ctx.stroke();

     // Display labels that represent the angles of the grid   
        ctx.fillText("90", this.centerX - 3, this.centerY - 5 - this.maxRadius);
        ctx.fillText("270", this.centerX - 10, this.centerY + 12 + this.maxRadius);
        ctx.fillText("0", this.centerX + 5 + this.maxRadius, this.centerY);
        ctx.fillText("60", this.centerX - 3 + x_30_deg, this.centerY - 5 - y_30_deg);
        ctx.fillText("30", this.centerX + x_60_deg + 5, this.centerY - y_60_deg);
        ctx.fillText("330", this.centerX + 5 + x_60_deg, this.centerY + 5 + y_60_deg);
        ctx.fillText("300", this.centerX + x_30_deg, this.centerY + 10 + y_30_deg);
        ctx.fillText("240", this.centerX - 23 - x_30_deg, this.centerY + 10 + y_30_deg);
        ctx.fillText("210", this.centerX - 23 - x_60_deg, this.centerY + 10 + y_60_deg);
        ctx.fillText("180", this.centerX - 20 - this.maxRadius, this.centerY);
        ctx.fillText("150", this.centerX - 20 - x_60_deg, this.centerY -  5 - y_60_deg);
        ctx.fillText("120", this.centerX - 15 - x_30_deg, this.centerY - 10 - y_30_deg);
            
    };



    /*
     * Sets the center x of the graph
     * - x - center x of the graph
     */
    PolarGraph.prototype.setCenterX = function(x) {
        this.centerX = x;
    };

    /*
     * Sets the center y of the graph
     * - y - center y of the graph
     */
    PolarGraph.prototype.setCenterY = function(y) {
        this.centerY = y;
    };


    /*
     * Gets the center x of the graph
     */
    PolarGraph.prototype.getCenterX = function() {
        return this.centerX;
    };

    /*
     * Gets the center y of the graph
     */
    PolarGraph.prototype.getCenterY = function() {
        return this.centerY;
    };


    /*
     * Gets the radius of the polar graph
     */
    PolarGraph.prototype.getRadius = function() {
        return this.maxRadius;
    };

    /*
     * Sets the radius of the polar graph
     */
    PolarGraph.prototype.setRadius = function(radius) {
        this.maxRadius = radius;
    };

    /*
     * Gets the radius of the polar graph
     */
    PolarGraph.prototype.getMaxHeight = function() {
        return this.maxRadius;
    };

    /*
     * Draws the labels on the graph
     * - unitType - String representing dB or linear
     * - ctx - Context
     */
     PolarGraph.prototype.drawLabels = function(unitType, ctx) {
        if (unitType === constants.DB) {

            for (var i = 0; i < 4; i++) {
                var disp = -i*10;
                ctx.fillText(disp.toString(), this.centerX + 2, this.centerY - this.maxRadius*(1 - (.25*i)) + 15);
            }
        }
        else {
            for (var i = 0; i < 4; i++) {
                var disp = 1-.25*i;
                ctx.fillText(disp.toString(), this.centerX + 2, this.centerY - this.maxRadius*(1 - (.25*i)) + 15);
            }
        }
     };

})(typeof exports === 'undefined' ? this : exports);

