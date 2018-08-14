import * as React from 'react';
import { Emotion } from 'create-emotion';


const {
  Provider,
  Consumer,
} = React.createContext<Emotion | null>(null);


interface ProviderProps {
  emotion: Emotion;
}

const EmotionProvider: React.SFC<ProviderProps> = ({ emotion, ...props }) => (
  <Provider value={emotion} {...props} />
);

export { Consumer, EmotionProvider };

