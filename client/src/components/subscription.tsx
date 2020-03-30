import React from 'react';

export enum SubState {
  None,
  InProgress,
  Done,
  Error,
}

export interface SubscriptionProps {
  service: string;
  status: SubState;
}

export default (props: SubscriptionProps) => <div>
  <p>Backend: {props.service}</p>
  <p>Status: {SubState[props.status]}</p>
</div>