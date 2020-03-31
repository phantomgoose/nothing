import React, { useState, useEffect } from 'react';
import Subscription, { SubscriptionState } from './components/subscription';
import './App.css';

interface SubscriptionMap {
  [service: string]: {
    state: SubscriptionState;
    message: string;
    updateState: React.Dispatch<SubscriptionState>;
    updateMessage: React.Dispatch<string>;
  }
}

interface ServiceResponse {
  data: string;
}

const Services: string[] = ['node', 'go'];

export default () => {
  const subState = Services.reduce((map, service) => {
    const [state, updateState] = useState(SubscriptionState.None);
    const [message, updateMessage] = useState('');
    return { ...map, [service]: { state, updateState, message, updateMessage } };
  }, {} as SubscriptionMap);

  useEffect(() => {
    (async function makeApiCall() {
      for (const service of Services) {
        const { state, updateState, updateMessage } = subState[service];
        if (state === SubscriptionState.None) {
          updateState(SubscriptionState.InProgress);
          console.log(`Fetching sub status for ${service}`);
          const res = await fetch(`/api/${service}/test`);
          updateState(res.ok ? SubscriptionState.Done : SubscriptionState.Error);
          if (!res.ok) return;

          const jsonResponse: ServiceResponse = await res.json();
          updateMessage(jsonResponse.data);
        }
      }
    })();
  });

  return (
    <section>
      {Services.map(service => <Subscription key={service} service={service} status={subState[service].state} message={subState[service].message} />)}
    </section>
  );
}