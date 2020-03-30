import React, { useState, useEffect } from 'react';
import Subscription, { SubState } from './components/subscription';
import './App.css';

interface SubscriptionStatus {
  [service: string]: {
    state: SubState;
    message: string;
    updateState: React.Dispatch<SubState>;
    updateMessage: React.Dispatch<string>;
  }
}

interface ServiceResponse {
  data: string;
}

const Subscriptions: string[] = ['node', 'go'];

export default () => {
  const subState = Subscriptions.reduce((map, service) => {
    const [state, updateState] = useState(SubState.None);
    const [message, updateMessage] = useState('');
    return { ...map, [service]: { state, updateState, message, updateMessage } };
  }, {} as SubscriptionStatus);

  useEffect(() => {
    (async function makeApiCall() {
      for (const service of Subscriptions) {
        const { state, updateState, updateMessage } = subState[service];
        if (state === SubState.None) {
          updateState(SubState.InProgress);
          console.log(`Fetching sub status for ${service}`);
          setTimeout(async () => {
            const res = await fetch(`/api/${service}/test`);
            updateState(res.ok ? SubState.Done : SubState.Error);
            if (!res.ok) return;

            const jsonResponse: ServiceResponse = await res.json();
            updateMessage(jsonResponse.data);
          }, Math.floor(Math.random() * 2000 + 1000));
        }
      }
    })();
  });

  return (
    <section>
      <p>Press the button to subscribe and get literally nothing in return!</p>
      {Subscriptions.map(service => <Subscription service={service} status={subState[service].state} message={subState[service].message} />)}
    </section>
  );
}