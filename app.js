//console.log('starting app.js');

const fs= require('fs');
const _=require('lodash');
const os=require('os');
const yargs=require('yargs');

const notes=require('./notes.js');
const titleOptions={
  describe:'title of the note',
  demand:true,
  alias:'t'
};
const bodyOptions={
  describe:'body of the note',
  demand:true,
  alias:'b'
};

const argv=yargs
  .command('add','add a new note',{
    title:titleOptions,
    body:bodyOptions
  })
  .command('list','list all notes')
  .command('read','read a note',{
    title:titleOptions
  })
  .command('remove','remove a note',{
      title:titleOptions
  })
  .help()
  .argv;

var command=process.argv[2];

// console.log('yargs: ',argv);
//
// console.log(command);
if(command === 'add'){
  var note = notes.addNote(argv.title,argv.body);
  //console.log(note);
  if(note){
    console.log('note created');
    notes.logNote(note);
  }
  else{
    console.log('note already exists');
  }
}
else if(command === 'list'){
  var allNotes=notes.getAll();
  console.log(`printing all ${allNotes.length} note(s).`);
  allNotes.forEach((note)=>notes.logNote(note));
}
else if(command === 'read'){
  var note=notes.getNote(argv.title);
  if(note){
    console.log('note found to be read');
    notes.logNote(note);
  }
  else{
    console.log('note not found');
  }
}
else if(command === 'remove'){
  var bool=notes.removeNote(argv.title);
  if(bool){
    console.log('note removed');
  }
  else{
    console.log('no match found');
  }
}
else{
  console.log('command not found');
}
