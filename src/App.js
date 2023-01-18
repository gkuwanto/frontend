import * as React from 'react';
import Train from './TrainPage';
import Test from './TestPage'

export default function App() {
  const [activePage, setActivePage] = React.useState(0);
  const setTrain = () => setActivePage(0)
  const setTest = () => setActivePage(1)
  return (
    <div>
      {activePage == 0? <Train setTrain={setTrain} setTest={setTest}/> : <Test setTrain={setTrain} setTest={setTest}/>}
    </div>
  );
};
