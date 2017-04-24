
import {Parser} from 'binary-parser'
// import {Buffer} from 'buffer/';
import {Buffer} from 'buffer/';

let BLEHelper = {

    getDataFromStringData: function(stringData) {
      var buffer = new Buffer(stringData, 'hex');

      let flagParser = new Parser().bit1('hrIntType')
                                  .bit2('sensorContact')
                                  .bit1('energyexpended')
                                  .bit1('rr_present')
                                  .bit3('reserved');
      let flags = flagParser.parse(buffer);
      let parser = new Parser().nest('flags', {
                                                  type: new Parser().bit1('hrIntType')
                                                  .bit2('sensorContact').bit1('energyexpended')
                                                  .bit1('rr_present').bit3('reserved')
                                              });


      if (flags.hrIntType == 0) {
          parser = parser.uint8('hr')
      }else {
          parser = parser.uint16le('hr')
      }
      if (flags.energyexpended == 1){
          //do not believe in energyexpended flag
          // parser = parser.uint16le('energyexpended')
      }
      parser.array('rr', {  type: 'uint16le', readUntil: 'eof' });

      try {
        var d = parser.parse(buffer);
        // console.log('returning d = ', d);
        return d;

      }catch (e){
        // console.log('Error while parsing: e = ', e);
      }

      return undefined;
    }

}

export default BLEHelper;
