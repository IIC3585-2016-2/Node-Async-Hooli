const async = require('async');
const fs = require('fs');
const Promise = require('promise');
const readdirPromise = Promise.denodeify(fs.readdir);
const statPromise = Promise.denodeify(fs.stat);

 /*
 * These functions do the same.
 * They list all the files in this directory that weight more than 1.5MB.
 */

const searchWithAsync = () => {
  async.waterfall([
    callback => fs.readdir('.', callback),
    (files, callback) => {
      const textFiles = files.filter(file => file.endsWith('.txt'));
      async.filter(
        textFiles, 
        (file, cb) => fs.stat(file, (err, stats) => cb(null, stats.size > 1500000)),
        (err, results) => callback(null, results));
    }
  ],
    (err, results) => console.log(results)
  );
}

const searchWithPromises = () => {
  readdirPromise('.')
    .then(files => files.filter(file => file.endsWith('.txt')))
    .then(textFiles => textFiles.map(file => statPromise(file).then(({ size }) => Promise.resolve({ file, size }))))
    .then(promises => Promise.all(promises))
    .then(stats => stats.filter(stat => stat.size > 1500000))
    .then(filtered => console.log(filtered.map(f => f.file)))
}

console.log('Searching for text files that weight more than 1.5MB');
// searchWithPromises()
searchWithAsync()
