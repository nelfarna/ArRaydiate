/*
 *  The RectGraph class represents the grid for the polar plot.
 */ 

(function(exports) {
    
    function RectGraph (centerX, centerY, width, height) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.angleMeasure = constants.RADIANS;
        this.width = width;
        this.height = height;
        this.color = "#555555";
        this.fontColor = "#0000FF";
    }

    exports.RectGraph = RectGraph;

    RectGraph.prototype.paintGraph = function(ctx) {
        
        ctx.fillStyle = this.fontColor;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;

        // Draw horizontal grid lines
        ctx.beginPath();
        ctx.moveTo(this.centerX - (this.width / 2), this.centerY);
        ctx.lineTo(this.centerX + (this.width / 2), this.centerY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX - (this.width / 2), this.centerY - (this.height / 4));
        ctx.lineTo(this.centerX + (this.width / 2), this.centerY - (this.height / 4));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX - (this.width / 2), this.centerY + (this.height / 4));
        ctx.lineTo(this.centerX + (this.width / 2), this.centerY + (this.height / 4));
        ctx.stroke();
       
        // Draw vertical grid lines
        ctx.beginPath();
        ctx.moveTo(this.centerX, this.centerY - (this.height / 2));
        ctx.lineTo(this.centerX, this.centerY + (this.height / 2));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX - (this.width / 3), this.centerY - (this.height / 2));
        ctx.lineTo(this.centerX - (this.width / 3), this.centerY + (this.height / 2));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX + (this.width / 3), this.centerY - (this.height / 2));
        ctx.lineTo(this.centerX + (this.width / 3), this.centerY + (this.height / 2));
        ctx.stroke();


        ctx.beginPath();
        ctx.moveTo(this.centerX - (this.width / 6), this.centerY - (this.height / 2));
        ctx.lineTo(this.centerX - (this.width / 6), this.centerY + (this.height / 2));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX + (this.width / 6), this.centerY - (this.height / 2));
        ctx.lineTo(this.centerX + (this.width / 6), this.centerY + (this.height / 2));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX - (this.width / 4), this.centerY - (this.height / 2));
        ctx.lineTo(this.centerX - (this.width / 4), this.centerY + (this.height / 2));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX + (this.width / 4), this.centerY - (this.height / 2));
        ctx.lineTo(this.centerX + (this.width / 4), this.centerY + (this.height / 2));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX - (this.width / 12), this.centerY - (this.height / 2));
        ctx.lineTo(this.centerX - (this.width / 12), this.centerY + (this.height / 2));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX + (this.width / 12), this.centerY - (this.height / 2));
        ctx.lineTo(this.centerX + (this.width / 12), this.centerY + (this.height / 2));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX - (5*this.width / 12), this.centerY - (this.height / 2));
        ctx.lineTo(this.centerX - (5*this.width / 12), this.centerY + (this.height / 2));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX + (5*this.width / 12), this.centerY - (this.height / 2));
        ctx.lineTo(this.centerX + (5*this.width / 12), this.centerY + (this.height / 2));
        ctx.stroke();

        ctx.rect(this.centerX - (this.width / 2), this.centerY - (this.height / 2), this.width, this.height);  
        ctx.stroke();
        

        this.drawXAxisLabels(ctx, constants.RADIANS);  
    };

    /*
     * Draws the labels on the x axis
     * - ctx - Context (Canvas)
     * - type - RADIANS or DEGREES
     */
    RectGraph.prototype.drawXAxisLabels = function(ctx, type) {
            if(type === constants.RADIANS)
            {
        
                ctx.fillText("0", this.centerX - 3, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("\u03C0", this.centerX + (this.width  / 2) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("\u03C0" + "/2", this.centerX + (this.width  / 4) - 10 , (this.centerY + (this.height/2)) + 15);
                ctx.fillText("\u03C0" + "/6", this.centerX + (this.width  / 12) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("3" + "\u03C0" + "/4", this.centerX + 5*(this.width / 12) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("2" + "\u03C0" + "/3", this.centerX + (this.width  / 3) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("\u03C0" + "/3", this.centerX + (this.width  / 6) - 10, (this.centerY + (this.height/2)) + 15); 
                ctx.fillText("-3" + "\u03C0" + "/4", this.centerX - 5*(this.width / 12) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("-2" + "\u03C0" + "/3", this.centerX - (this.width  / 3) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("-\u03C0" + "/2", this.centerX - (this.width  / 4) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("-\u03C0" + "/3", this.centerX - (this.width  / 6) - 10, (this.centerY + (this.height/2)) + 15); 
                ctx.fillText("-\u03C0" + "/6", this.centerX - (this.width  / 12) - 10, (this.centerY + (this.height/2)) + 15);         
                ctx.fillText("-\u03C0", this.centerX - (this.width  / 2) - 10, (this.centerY + (this.height/2)) + 15);
            }

            if(type === constants.DEGREES)
            {
                ctx.fillText("0", this.centerX - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("180", this.centerX + (this.width  / 2) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("90", this.centerX + (this.width  / 4) - 10 , (this.centerY + (this.height/2)) + 15);
                ctx.fillText("30", this.centerX + (this.width  / 12) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("150", this.centerX + 5*(this.width / 12) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("120", this.centerX + (this.width  / 3) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("60", this.centerX + (this.width  / 6) - 10, (this.centerY + (this.height/2)) + 15); 
                ctx.fillText("-150", this.centerX - 5*(this.width / 12) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("-120", this.centerX - (this.width  / 3) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("-90", this.centerX - (this.width  / 4) - 10, (this.centerY + (this.height/2)) + 15);
                ctx.fillText("-60", this.centerX - (this.width  / 6) - 10, (this.centerY + (this.height/2)) + 15); 
                ctx.fillText("-30", this.centerX - (this.width  / 12) - 10, (this.centerY + (this.height/2)) + 15);         
                ctx.fillText("-180", this.centerX - (this.width  / 2) - 10, (this.centerY + (this.height/2)) + 15);
            }
        };
        
    /*
     * Sets the center x of the graph
     * - x - center x of the graph
     */
    RectGraph.prototype.setCenterX = function(x) {
        this.centerX = x;
    };

    /*
     * Sets the center y of the graph
     * - y - center y of the graph
     */
    RectGraph.prototype.setCenterY = function(y) {
        this.centerY = y;
    };

    /*
     * Gets the center x of the graph
     */
    RectGraph.prototype.getCenterX = function() {
        return this.centerX;
    };

    /*
     * Gets the center y of the graph
     */
    RectGraph.prototype.getCenterY = function() {
        return this.centerY;
    };

    /*
     * Gets the max height of the graph
     */
    RectGraph.prototype.getMaxHeight = function() {
        return this.height;
    };

    /*
     * Gets the width of the graph
     */
    RectGraph.prototype.getWidth = function() {
        return this.width;
    };

    /*
     * Draws the labels on the graph
     * - unitType - String representing dB or linear
     * - ctx - Context
     */
     RectGraph.prototype.drawLabels = function(unitType, ctx) {
        if (unitType === constants.DB) {

            for (var i = 0; i < 4; i++) {
                var disp = -i*10;
                ctx.fillText(disp.toString(), this.centerX - (this.width / 2), this.centerY - 0.25 * this.height * (2 - i) + 15);
            }
        }
        else {
            for (var i = 0; i < 4; i++) {
                var disp = 1-.25*i;
                ctx.fillText(disp.toString(), this.centerX - (this.width / 2), this.centerY - 0.25 * this.height * (2 - i) + 15);
            }
        }
     };

})(typeof exports === 'undefined' ? this : exports);
