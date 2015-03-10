var fs = require('fs');
var path = require('path');
var json2csv = require('json2csv');

var flagDuplicatesInCsv = function (pathToFile, target) {
  var header1, header2, header3; //create all possible col headers to search for duplicates
  if (target.toLowerCase() === 'phone') {
    header1 = 'Phone';
    header2 = 'Phone1';
    header3 = 'Phone2';
  }
  if (target.toLowerCase() === 'email') {
    header1 = 'Email';
    header2 = 'Email1';
    header3 = 'Email2';
  }
  var json = []; //hold our rows as arrays of Object literals

  //parser
  fs.readFile(pathToFile, function (error, chunk) {
    if (error) {
      console.log('Error: ', error);
    } else {
      var data = chunk.toString().split(/\r\n|\n|\r/); //split by row, account for carriage returns
      var columns = data[0].split(','); //split the first row by commas to get col names
      columns.push('Unique'); //create a new column 'Duplicate' that will be flagged as true || false
      for (var i = 1; i < data.length; i++) {
        var content = data[i].split(',');
        var temp = {};
        for (var j = 0; j < columns.length; j++) {
          temp[columns[j]] = content[j];
          temp.Unique = true;
        }
        json.push(temp);
      }

      var matches = []; //holds rows for output.csv
      var uniques = {}; //hash table of unique phone numbers or emails
      json.pop(); //a row of 'undefined's are added to the end of the array. Need to remove this row

      //identify duplicates
      json.forEach(function (row, index) {
        //if only one phone or email column
        if (columns.indexOf(header2) < 0) {
          if (uniques.hasOwnProperty(row['' + header1])) {
            matches[row['' + header1]] = false;
            row.Unique = false;
          } 
          else if (row['' + header1] !== '') {
            uniques[row['' + header1]] = index;
          }
          matches.push(row);
        } else { //if more than one phone or email column
          if (uniques.hasOwnProperty(row['' + header2])) {
            matches[row['' + header2]] = false;
            row.Unique = false;
          } 
          if (uniques.hasOwnProperty(row['' + header3])) {
            matches[row['' + header3]] = false;
            row.Unique = false;
          } else { //account for empty strings for a given column
            if (row['' + header2] !== '') {
              uniques[row['' + header2]] = index;
            }
            if (row['' + header3] !== '') {
              uniques[row['' + header3]] = index;
            }
          }
          matches.push(row);
        }
      });

      //generate output.csv
      json2csv({data: matches, fields: columns}, function (error, csv) {
        if (error) {
          console.log(error);
        } else {
          fs.writeFile('output.csv', csv);
        }
      });
    }
  });
}

//Add a path to file, and a column to search duplicates for 
// flagDuplicatesInCsv('./grouping/input1.csv', 'email');




