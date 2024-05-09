import React, { memo } from 'react';
import ElectronicJournal from './ElectronicJournal';
import JurnalBlock from './JurnalBlock';

const Jurnal = memo(() => {
  return (
    <>
      <JurnalBlock />
      <ElectronicJournal />
    </>
  );
});

export default Jurnal;
