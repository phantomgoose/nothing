import React, { useState, useEffect } from 'react';
import Subscription, { SubState } from './components/subscription';
import './App.css';

interface SubscriptionStatus {
  [service: string]: {
    state: SubState;
    updateState: React.Dispatch<any>;
  }
}

const Subscriptions: string[] = ['node', 'go'];

export default () => {
  const subState = Subscriptions.reduce((map, service) => {
    const [state, updateState] = useState(SubState.None);
    return { ...map, [service]: { state, updateState } };
  }, {} as SubscriptionStatus);

  useEffect(() => {
    (async function makeApiCall() {
      for (const service of Subscriptions) {
        const { state, updateState } = subState[service];
        if (state === SubState.None) {
          updateState(SubState.InProgress);
          console.log(`Fetching sub status for ${service}`);
          setTimeout(async () => {
            const res = await fetch(`/${service}/api/test`);
            updateState(res.ok ? SubState.Done : SubState.Error);
          }, Math.floor(Math.random() * 2000 + 1000));
        }
      }
    })();
  });

  return (
    <section>
      <p>Press the button to subscribe and get literally nothing in return!</p>
      {Subscriptions.map(service => <Subscription service={service} status={subState[service].state} />)}
    </section>
  );
}