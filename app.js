var fs = require('fs');
var path = require('path');
var json2csv = require('json2csv');

var findInCsv = function (pathToFile, target) {
  var json = [];
  fs.readFile(pathToFile, function (error, chunk) {
    if (error) {
      console.log('Error: ', error);
    } else {
      var data = chunk.toString().split(/\r\n|\n|\r/); //split by row
      var columns = data[0].split(','); //split the first row by commas to get col names
      for (var i = 1; i < data.length; i++) {
        var content = data[i].split(',');
        var temp = {};
        for (var j = 0; j < columns.length; j++) {
          temp[columns[j]] = content[j];
        }
        json.push(temp);
      }

      var matches = [];
      json.forEach(function (row) {
        Object.keys(row).forEach(function (col) {
          if (row[col] === target) {
            matches.push(row);
          }
        });
      });

      json2csv({data: matches, fields: columns}, function (error, csv) {
        if (error) {
          console.log(error);
        } else {
          console.log(csv);
          fs.writeFile('output.csv', csv);
        }
      });
    }
  });
}

//Add a path to file, and a value to search for 
// findInCsv('./grouping/input3.csv', 'Walter');


