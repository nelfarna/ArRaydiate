/*
 *   The ArrayFactor class is an array of  
 *   type DataPoint that represents each point of data in 
 *   the array factor.
 */   

(function(exports) {
  
  function ArrayFactor () {
    this.angleMaxima = 0.0;
    this.maxAF_DB = 0.0;
    this.maxAF = 0.0;
    this.dataPoints = [];
  } 

  exports.ArrayFactor = ArrayFactor;

   /*
    * Sets the angle at which the maximum value of the AF occurs
    * - angle - the value to set the angle of the max magnitude
    */    
  ArrayFactor.prototype.setMaxAngle = function(angle) {
    this.angleMaxima = angle;
  };

  /*
   * Gets the angle at which the maximum value of the AF occurs
   */
  ArrayFactor.prototype.getMaxAngle = function() {
    return this.angleMaxima;
  };

  ArrayFactor.prototype.length = function() {
    return this.dataPoints.length;
  };

   /*
    * Gets the value of the maximum magnitude of the array factor
    */
  ArrayFactor.prototype.getMaxAF = function() {
    return this.maxAF;
  };
      
  /*
   * Gets the value of the maximum magnitude (in dB) of the af
   */  
  ArrayFactor.prototype.getMaxAF_DB = function() {
    return this.maxAF_DB;
  };
      
  /*
   * Clears the array factor list of all data points.
   */
  ArrayFactor.prototype.clearAF = function() {
    this.dataPoints = [];
  }; 
    
   /*
    *  Calculates and sets the value of the maximum of the array factor.
    *  This value is then used to normalize the plot, so that the maximum value 
    *  always remains within the plots boundaries.
    */ 
  ArrayFactor.prototype.setMaxAF = function() {
    var maxAF_DB, maxAF, temp1, temp2;
    maxAF = 0.0;
    maxAF_DB = 0.0;

    for (var i = 0; i < this.dataPoints.length; i++) {
      var data = this.dataPoints[i];
      temp1 = data.getAbsMagnitude_DB();
      temp2 = data.getMagnitude();
      if (temp1 > maxAF_DB) {
        maxAF_DB = temp1;
      }
      if (temp2 > maxAF) {
        maxAF = temp2;
      }

      this.maxAF_DB = maxAF_DB;
      this.maxAF = maxAF;
    }
  };

  ArrayFactor.prototype.get = function(index) {
    return this.dataPoints[ index ];
  }
      
   /*
    *  Computes the array factor (AF) of the antenna array.  It calculates 
    *  the AF at each increment (+ delta) of the angle, theta, and saves
    *  the value in the arraylist dataSet.
    *  - num - number of elements in antenna array
    *  - phase - the phase difference of the antenna array
    *  - spacing - the displacement between the elements of the array
    *  - antennas - the list of antennas and their amplitudes
    *  - maxAmp - maximum possible amplitude an antenna may have
    *  - minAmp - minimum possible amplitude an antenna may have 
    *  - delta -  angle segment size
    */
    ArrayFactor.prototype.computeArrayFactor = function(num, phase, spacing, antennas, maxAmp, minAmp, delta) {
      var dataPoint;
      var d = delta * (Math.PI / 180);
      var real, imag, magnitude, magnitude_DB, absMag_DB = 0.0;
      var prevMax = 0.0;
      this.clearAF();

      for (var theta = 0.0; theta <= 2*Math.PI; theta += d) {

        real = this.realAF(theta, num, phase, spacing, antennas);
        imag = this.imagAF(theta, num, phase, spacing, antennas);
        magnitude = Math.sqrt(real*real + imag*imag);

        if (magnitude < prevMax) {
          prevMax = magnitude;
          angleMaxima = theta;
        }

        dataPoint = new DataPoint();
        dataPoint.setMagnitude(magnitude);
        dataPoint.setMagnitude_DB(magnitude);
        dataPoint.setAngle(theta);
        this.dataPoints.push(dataPoint);
      }

      this.setMaxAF();
    };
        
    /*
     *  Computes the real part of the array factor
     *  - theta - the angle of a particular point of the array factor
     *  - num - number of elements
     *  - phase - phase difference of the antenna array
     *  - spacing - displacement between the elements
     *  - antennas - array of antennas and their amplitudes
     */ 
     ArrayFactor.prototype.realAF = function(theta, num, phase, spacing, antennas) {
        var real = 0.0;
        var psy = 0.0;
        var odd = (num % 2 === 0) ? false : true;

        for (var n = 1; n <= num; n++) {
          try {
            var a = antennas[ n - 1 ];
            
            psy = constants.K * spacing * Math.cos(theta) - phase;

            if(odd) {
               real += a.getAmplitude()*Math.cos((n - 1) * psy);
            } else {
               real += a.getAmplitude()*Math.cos(psy * (2*n - 1) / 2);
            }

          } catch (e) {
            console.log("Exception calculating realAF");
          }
        }
        return real;
     };
         
    /*
     *  Computes the imaginary part of the array factor
     *  - theta - the angle of a particular point of the array factor
     *  - num - number of antenna elements
     *  - phase - phase difference of the antenna array
     *  - spacing - displacement between the elements
     *  - antennas - array of antennas and their amplitudes
     */ 
     ArrayFactor.prototype.imagAF = function(theta, num, phase, spacing, antennas) {
        var imag = 0.0;
        var psy = 0.0;
        var odd = (num % 2 === 0) ? false : true;
        for (var n = 1; n <= num; n++) {
          try {
            var a = antennas[ n - 1 ];
            psy = constants.K * spacing * Math.cos(theta) - phase;
            
            if(odd) {
               imag += a.getAmplitude()*Math.sin((n - 1) * psy);
              } else {
               imag += a.getAmplitude()*Math.sin(psy * (2*n - 1) / 2);
              }
          } catch (e) {
            console.log("Exception calculating imagAF");

          }
        }
        return imag;
     };

 })(typeof exports === 'undefined' ? this : exports);
