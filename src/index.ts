#!/usr/bin/env node

import fs  from 'fs';
import path from 'path';
import os from 'os';

interface Sequence {
  lastDate: string;
  nextSequence: number;
}

const homedir = os.homedir();

const SEQUENCE_FILE_NAME = '.fakemail.json';
const DELIMITER = '.';
const EMAIL_PREFIX = 'bdtest';
const DOMAIN = 'bestegg.com';

const getDateString = () => {
  return getNow().replace(/-/g, DELIMITER);
};

const getNow = () => {
  return new Date().toISOString().substring(0, 10);
};

const formatEmail = (sequence: number) => {
  return `${EMAIL_PREFIX}${DELIMITER}${getDateString()}${DELIMITER}${sequence}@${DOMAIN}`;
};

const getFakeEmail = () => {
  const sequenceFilePath = path.resolve(homedir, SEQUENCE_FILE_NAME);

  let sequenceFile: string;
  let sequence: Sequence;

  try {
    sequenceFile = fs.readFileSync(sequenceFilePath, 'utf-8');
  } catch (error) {
    // Set up sequence file if it does not exist
    if (error.code === 'ENOENT') {
      sequence = {
        lastDate: getNow(),
        nextSequence: 2
      };
      fs.writeFileSync(sequenceFilePath, JSON.stringify(sequence), 'utf-8')
    } else {
      throw error;
    }

    return formatEmail(1);

  }

  sequence = JSON.parse(sequenceFile);
  const now = getNow();

  // Handle same day generation
  if (now === sequence.lastDate) {
    const currentSequence = sequence.nextSequence;
    sequence.nextSequence += 1;
    fs.writeFileSync(sequenceFilePath, JSON.stringify(sequence), 'utf-8');

    return formatEmail(currentSequence)
  } else {
    // Handle new day generation
    sequence.nextSequence = 2
    sequence.lastDate = now;
    fs.writeFileSync(sequenceFilePath, JSON.stringify(sequence), 'utf-8');

    return formatEmail(1);
  }
};

console.log(getFakeEmail());
