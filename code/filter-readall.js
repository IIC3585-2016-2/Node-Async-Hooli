'use strict';
const async = require('async');
const fs = require('fs');
const Promise = require('promise');


// Read all files and get them in the 'files' array (once all have been read)
// In this case, the functions are almost the same in terms of readability and size.
const readAllWithPromises = filenames => {
  const readFile = Promise.denodeify(fs.readFile);

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



// Return only existing files
// Clearly, async handles this case much better than promises.
const filterWithPromises = filenames => {
  const stat = Promise.denodeify(fs.stat);
  const files = [];
  const promises = filenames.map(file =>
    new Promise((fulfill, reject) => {
      stat(file).then(() => {
        files.push(file);
        fulfill();
      }).catch(() => fulfill())
    })
  )
  Promise.all(promises).then(() => console.log('Result: ', files))
}

const filterAsync = filenames => {
  async.filter(
    filenames,
    (file, callback) => fs.stat(file, err => callback(null, !err)),
    (err, files) => console.log('Result: ', files)
  );
}

const filenames = ['file1.txt', 'file2.txt', 'file3.txt'];
// const filenames = ['file5.txt', 'file2.txt', 'file3.txt'];
// readAllWithPromises(filenames);
// readAllWithAsync(filenames);
// filterWithAsync(filenames);
filterWithPromises(filenames);
