import { Emotion } from 'create-emotion';
import * as React from 'react';
import { Consumer } from './context';
import { Subtract } from 'utility-types';


export type Stylesheet = (emotion: Emotion) => any;

export interface InjectedProps {
  styles: any;
}

export function injectEmotion(stylesheet: Stylesheet) {
  return <P extends InjectedProps> (Comp: React.ComponentType<P>): React.ComponentType<Subtract<P, InjectedProps>> => (props) => (
    <Consumer>
      {(emotion) => {
        if (emotion === null) throw new Error('You likely forgot to wrap your app in EmotionProvider');
        return <Comp {...props} styles={stylesheet(emotion)} />;
      }}
    </Consumer>
  );
}
