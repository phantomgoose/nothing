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
  message: string;
}

export default (props: SubscriptionProps) => <div>
  <p>Backend: {props.service}</p>
  <p>Status: {SubState[props.status]}</p>
  <p>Message: {props.message}</p>
</div>