/* eslint-disable react/react-in-jsx-scope */
'use client';

import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import { FlagsmithProvider, useFlags } from 'flagsmith/react';
import { IFlagsmithFeature, IFlagsmithTrait, IState } from 'flagsmith/types';
import { JSX, useRef } from 'react';
import { Flags } from './flag-list';

interface FeatureProviderProps {
  serverState: IState<string>;
  children: JSX.Element;
}

export const FeatureProvider = ({
  serverState,
  children,
}: FeatureProviderProps): JSX.Element => {
  const flagsmith = useRef(createFlagsmithInstance());
  return (
    <FlagsmithProvider flagsmith={flagsmith.current} serverState={serverState}>
      {children}
    </FlagsmithProvider>
  );
};

export function getFlag(
  flagId: string
): (IFlagsmithFeature & IFlagsmithTrait) | undefined {
  const flags = useFlags(Flags);
  return flags[flagId];
}
