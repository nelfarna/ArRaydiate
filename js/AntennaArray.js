/*
 *  The AntennaArray class represents an array of antennas. 
 *  It also possesses the features of an antenna array including the phase
 *  difference, the spacing between elements, the number of elements in the
 *  array, and the array factor for the array.
 *  
 */

(function(exports) {

  function AntennaArray() {
    this.phase = constants.INIT_PHASE;       // phase shift angle (radians)
    this.spacing = constants.INIT_SPACING;   // spacing between elements (in wavelengths)
    this.num = constants.INIT_NUM;           // number of elements
    this.arrayType = "";                     // nonuniform as default
    this.beamWidth = 0.0;
    this.directivity = 0.0;

    this.af =  new ArrayFactor(); 
    this.antennas = [];
  }

  exports.AntennaArray = AntennaArray;

   /*
    * Resets all the amplitudes of the elements in a given array to the value val
    * - val - the value of amplitude to set all antennas
    */
    AntennaArray.prototype.resetAmplitudes = function(newVal) {
      this.clear();

      var amp = (!newVal) ? constants.INIT_AMP : newVal;
      for(var i = 0; i < this.num; i++) {
        var a = new Antenna (amp);
        this.antennas.push (a);
      }
    }; 

   /*
    * Clears the antenna array
    */
    AntennaArray.prototype.clear = function() {
      this.antennas = [];
    };

    AntennaArray.prototype.get = function(position) {
      return (antennas[pos]) ? antennas[pos] : null;
    };

   /*
    *  Sets the value of the phase difference for the antenna array
    *  phase - the phase value in degrees
    */
    AntennaArray.prototype.setPhase = function(phase) {
      this.phase = phase*Math.PI / 180.0; // convert to radians
    };
       
   /*
    *  Gets the value of the phase difference for the antenna array
    */
    AntennaArray.prototype.getPhase = function() {
      return this.phase;
    };

  /*
   *  Sets the spacing between the elements of the array
   *  spacing - value of the displacement in meters
   */
   AntennaArray.prototype.setSpacing = function(spacing) {
      this.spacing = spacing;
   };

  /*
   *  Gets the spacing between the elements of the array
   */
   AntennaArray.prototype.getSpacing = function() {
      return this.spacing;
   };

   /*
    *  Sets the number of elements in the array.  It adds or removes 
    *  antenna objects as needed.
    *  n - number of elements
    */
  AntennaArray.prototype.setElementNumber = function(n) {
    if (n < this.num) {
      for (var i = n; i < this.num; i++) {
        this.removeAntenna();
      }
    }
    if (n > this.num) {
      for (var i = this.num; i < n; i++) {
        this.addAntenna(constants.INIT_AMP);
      }
    }

    this.num = n;
  };

   /*
    *  Gets the number of elements in the array
    */
  AntennaArray.prototype.getElementNumber = function() {
    return this.num;
  };

   /*
    *  Searches the antennas for the one with the largest amplitude and
    *  returns this value.
    */
  AntennaArray.prototype.getMaxAmp = function() {
    var tempMax = 0.0;
    for (var i = 0; i < this.num; i++) {
      var a = this.antennas[i];
      if (a.getAmplitude() > tempMax) {
        tempMax = a.getAmplitude();
      }
    }
    return tempMax;
  };

   /*
    *  Searches the antennas for the one with the smallest amplitude and
    *  returns this value.
    */
  AntennaArray.prototype.getMinAmp = function() {
    var tempMin = constants.MAX_AMP;
    for (var i = 0; i < this.num; i++) {
      var a = this.antennas[i];
      if (a.getAmplitude() < tempMin) {
        tempMin = a.getAmplitude();
      }
    }
    return tempMin;
  };

   /*
    *  Sets the array type (i.e. uniform, binomial, chebyshev, etc)
    *  arrayType - string representing array type
    */  
  AntennaArray.prototype.setArrayType = function(arrayType) {
    this.arrayType = arrayType;
  };

   /*
    *  Gets the array type (i.e. uniform, binomial, chebyshev, etc)
    *  - arrayType - string representing array type
    */   
  AntennaArray.prototype.getArrayType = function() {
    return this.arrayType;
  };

   /*
    *  Changes the amplitude of a particular element in the array
    *  - amplitude - the value of the amplitude
    *  - index - index of the element of the array to change
    */ 
  AntennaArray.prototype.changeAmplitude = function(amplitude, index) {
    try {
      var a = this.antennas[index];
      a.setAmplitude(amplitude);
    } catch (e) {
      console.log ('Changing Amplitude - Index out of bounds');
    }
  };
     
   /*
    * Adds an antenna element to the array with a particular amplitude
    * - amplitude - value of the amplitude of the antenna to be added
    */
  AntennaArray.prototype.addAntenna = function(amplitude) {
    var a = new Antenna(amplitude);
    this.antennas.push(a);
  };
       
   /*
    * Adds an antenna element to the array at a particular index
    * - index - index of location to insert antenna object
    * - amplitude - amplitude value of the antenna to be inserted
    */
  AntennaArray.prototype.addAntennaAt = function(index, amplitude) {
    var a = new Antenna(amplitude);
    this.antennas.splice(index, 0, a);

  };
       
   /*
    * Removes the last antenna element from the antenna array 
    */
  AntennaArray.prototype.removeAntenna = function() {
    this.antennas.pop();
  };

  /*
   * Gets the array factor for this antenna array
   * @return  the array factor list for this antenna array
   */
  AntennaArray.prototype.getArrayFactor = function() {
    return this.af;
  };

  /*
   * Computes the array factor for this antenna array
   * - delta - the segment size to divide the angle width of the 
   * array factor for computation
   */
  AntennaArray.prototype.computeAF = function(delta) {
     this.af.computeArrayFactor(this.num, this.phase, this.spacing, this.antennas, this.getMaxAmp(), this.getMinAmp(), delta);
  };
  
})(typeof exports === 'undefined' ? this : exports);
