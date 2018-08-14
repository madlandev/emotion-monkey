import { Emotion } from 'create-emotion';
import * as React from 'react';
import { Consumer } from './context';


type SetDifference<A, B> = A extends B ? never : A;
type SetComplement<A, A1 extends A> = SetDifference<A, A1>;
type Subtract<T extends T1, T1 extends object> = Pick<T, SetComplement<keyof T, keyof T1>>;

export type Stylesheet = (emotion: Emotion) => any;

export interface InjectedProps {
  styles: any;
}

export function injectEmotion(stylesheet: Stylesheet) {
  return <P extends InjectedProps>(Comp: React.ComponentType<P>): React.ComponentType<Subtract<P, InjectedProps>> => (props) => (
    <Consumer>
      {(emotion) => {
        if (emotion === null) throw new Error('You likely forgot to wrap your app in EmotionProvider');
        return <Comp {...props} styles={stylesheet(emotion)} />;
      }}
    </Consumer>
  );
}
