var data = require('./data');
var _ = require('./node_modules/lodash/dist/lodash.min.js');

function getDuplicates(data) {
  var duplicates = [];

  var days = _.groupBy(data, function(elem) { return elem.fields.date; });

  var
    key,
    groupByMac = function(elem) { return elem.fields.mac; };
  for(key in days) {
    var macs = _.groupBy(days[key], groupByMac);

    var mac;
    for(mac in macs) {
      if(macs[mac].length > 1) {
        duplicates.push(macs[mac][0]);
      }
    }
  }

  return duplicates;
}

var duplicates = getDuplicates(data);
console.log(duplicates);
