/*
 * The DataPoint class represents a data point (or location) for  * the array factor in 2-D space.  It specifies the magnitude value (both
 * linear and dB) and the angle at which this value occurs in the
 * array factor. 
 */

(function(exports) {
    
    function DataPoint () {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.magnitude = 0.0;         // value of magnitude of af
            this.magnitude_DB = 0.0;      // value in linear decibel  
            this.angle = 0.0;             // angle at which value occurs 
            this.absMag_DB = 0.0;         // absolute value of the decibel value 
    }

    exports.DataPoint = DataPoint;

    DataPoint.prototype.getX = function() {
        return this.x;
    };

    DataPoint.prototype.getY = function() {
        return this.y;
    };

    DataPoint.prototype.getZ = function() {
        return this.z;
    };

    DataPoint.prototype.setX = function(x) {
        this.x = x;
    };

    DataPoint.prototype.setY = function(y) {
        this.y = y;
    };

    DataPoint.prototype.setZ = function(z) {
        this.z = z;
    };

    DataPoint.prototype.setLocation = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z ? z : 0;
    };

    /*
     *  Sets the magnitude value for this point in the af
     *  -  magnitude - the value of the magnitude at this point
     */
     DataPoint.prototype.setMagnitude = function(magnitude) {
        this.magnitude = magnitude;
     };
      
    /*
     *  Gets the magnitude value for this point in the af
     */
     DataPoint.prototype.getMagnitude = function() {
        return this.magnitude;
     };
       
    /*
     *  Sets the decibel magnitude value for this point in the af
     *  - magnitude - the value of the magnitude in dB
     */
     DataPoint.prototype.setMagnitude_DB = function(magnitude) {
        this.magnitude_DB = 10 * Math.log(magnitude) + 40.0;
     };
        
    /*
     *  Gets the decibel magnitude value for this point in the af
     */
     DataPoint.prototype.getMagnitude_DB = function() {
        return this.magnitude_DB;
     };
       
    /*
     *  Sets the decibel magnitude value for this point in the af
     *  -  val - the absolute value the magnitude in dB
     */
     DataPoint.prototype.setAbsMagnitude_DB = function(val) {
        this.absMag_DB = val;
     };
     
    /*
     *  Gets the absolute value of the dB magnitude for this point in the af
     */
     DataPoint.prototype.getAbsMagnitude_DB = function() {
        return this.absMag_DB;
     };
         
    /*
     *  Sets the angle for this point in the af
     *  - angle - the value of the angle in radians
     */
     DataPoint.prototype.setAngle = function(angle) {
        this.angle = angle;
     };
       
    /*
     *  Gets the angle for this point in the af
     */
     DataPoint.prototype.getAngle = function() {
        return this.angle;
     };
        
    /*
     *  Returns a string representation of this point.  The string includes
     *  information about the magnitude value, magnitude value in dB, and the 
     *  angle at this point of the af.  The location (x, y) is not included
     *  in the string.
     */
     DataPoint.prototype.toString = function() {
        var angStr1 = this.angle.toFixed(3),
            angStr2 = (this.angle*(180/Math.PI)).toFixed(0),
            magStr1 = this.magnitude.toFixed(3),
            magStr2 = this.magnitude_DB.toFixed(3);

        return angStr1 + " rad (" + angStr2 + " deg) : " + magStr1 + " " + magStr2 + " dB ";
     };

})(typeof exports === 'undefined' ? this : exports);
    