# emotion-monkey 🐒 → 🦍

Manage [emotion](https://emotion.sh) instances with React context mechanism.

You probably don't need to use this. Please refer to [create-emotion](https://github.com/emotion-js/emotion/tree/master/packages/create-emotion) for use-cases.

## Motivation

Using single `emotion` instance works almost everytime. However when you need to have multiple instances of emotion, you may face issues with storing and managing them.

Monkeys will come to the rescue! 🙉

## Installation

```bash
npm i @madlan145/emotion-monkey -S
```

## Usage

In you app's entry point:

```typescript
import { EmotionProvider } from '@madlan145/emotion-monkey';
import createEmotion from 'create-emotion';

const emotion = createEmotion({});


const App: React.SFC<{}> = () => (
  <EmotionProvider emotion={emotion}>
    <Component label="Label 🐒" />
  </EmotionProvider>
);

```

Having EmotionProvider, you can use `styled` as you would normally use it with `react-emotion`.


To use css & other stuff from `emotion`:

```typescript
import { Emotion } from 'create-emotion';
import { injectEmotion } from '@madlan145/emotion-monkey';


const stylesheet = ({ css }: Emotion) => ({
  redButton: css`
    color: red;
  `,
  container: css`
    padding: 15px;
  `,
});


interface ComponentProps {
  styles: ReturnType<typeof stylesheet>;
  label: string;
}

const Component: React.SFC<ComponentProps> = ({ styles, label }) => (
  <div className={styles.container}>
    <button className={styles.redButton}>{label}</button>
  </div>
);

export default injectEmotion(stylesheet)(Component);

```
