var data = require('./data');
var _ = require('./node_modules/lodash/dist/lodash.min.js');

function getDuplicates(data) {
  var duplicates = [];

  var days = _.groupBy(data, function(elem) { return elem.fields.date; });

  var
    key,
    groupById = function(elem) { return elem.fields.student; };
  for(key in days) {
    var ids = _.groupBy(days[key], groupById);

    var id;
    for(id in ids) {
      if(ids[id].length > 1) {
        duplicates.push(ids[id][0]);
      }
    }
  }

  return duplicates;
}

var duplicates = getDuplicates(data);
console.log(duplicates);
