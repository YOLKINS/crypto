import React from 'react';
import { useDispatch } from 'react-redux';
import { setPeriod } from '../redux/store/store';

import styles from '../styles/Peroid.module.css';

const Period: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.buttonList}>
      <button onClick={() => dispatch(setPeriod(1))}>Day</button>
      <button onClick={() => dispatch(setPeriod(3))}>3 Days</button>
      <button onClick={() => dispatch(setPeriod(7))}>Week</button>
      <button onClick={() => dispatch(setPeriod(30))}>Month</button>
    </div>
  );
};

export default Period;