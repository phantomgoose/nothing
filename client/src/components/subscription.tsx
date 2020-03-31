import React from 'react';

export enum SubscriptionState {
  None,
  InProgress,
  Done,
  Error,
}

export interface SubscriptionProps {
  service: string;
  status: SubscriptionState;
  message: string;
}

export default (props: SubscriptionProps) => <div>
  <p>Backend: {props.service}</p>
  <p>Status: {SubscriptionState[props.status]}</p>
  <p>Message: {props.message}</p>
</div>