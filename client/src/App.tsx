import React, { useState } from 'react';
import './App.css';

export default () => {
  const [isSubscribed, updateSubscribed] = useState(false);

  const subscribe = () => {
    updateSubscribed(true);
  }
  return (
    <section>
      <p>Press the button to subscribe and get literally nothing in return!</p>
      <p>You {isSubscribed ? 'are' : 'are not'} subscribed!</p>
      <button onClick={() => subscribe()}>Subscribe</button>
    </section>
  );
}