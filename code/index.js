'use strict';
const async = require('async');
const fs = require('fs');
const Promise = require('promise');


// Read all files and get them in the 'files' array (once all have been read)
const readFile = Promise.denodeify(fs.readFile);

const readAllWithPromises = filenames => {
  const promises = filenames.map(file => readFile(file));
  Promise.all(promises).then(files => {
    console.log('Result: ', files);
    console.log('All files have been read.');
  });
}

const readAllWithAsync = filenames => {
  async.map(filenames,
    fs.readFile,
    (err, files) => {
      console.log('Result: ', files);
      console.log('All files have been read.');
  });
}



// TODO: FIX THIS
const stat = Promise.denodeify(fs.stat);
const filterPromises = filenames => {
  const accumulator = [];
  let ready = Promise.resolve(null);

  filenames.forEach(file => {
    ready = ready.then(() => {
      return new Promise(fulfill => {
        stat(file)
        .then(() => accumulator.push(file))
        .catch();
      })
    });
  });

  ready.then(() => console.log(accumulator));
}


const filterAsync = filenames => {
  async.filter(
    filenames,
    (file, callback) => fs.stat(file, err => callback(null, !err)),
    (err, files) => console.log('Result: ', files)
  );
}

const filenames = ['file1.txt', 'file2.txt', 'file3.txt'];
readAllWithAsync(filenames);
