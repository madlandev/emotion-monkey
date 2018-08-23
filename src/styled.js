import { channel, contextTypes } from 'emotion-theming';
import * as React from 'react';
import { testPickPropsOnComponent, testAlwaysTrue, testPickPropsOnStringTag, pickAssign, setTheme, } from './utils';
import { Consumer } from './context';


const createStyled = (tag, options) => {
  if (process.env.NODE_ENV !== 'production') {
    if (tag === undefined) {
      throw new Error('You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.');
    }
  }
  let staticClassName;
  let identifierName;
  let stableClassName;
  let shouldForwardProp;
  if (options !== undefined) {
    staticClassName = options.e;
    identifierName = options.label;
    stableClassName = options.target;
    shouldForwardProp =
      tag.__emotion_forwardProp && options.shouldForwardProp
        ? (propName) => tag.__emotion_forwardProp(propName) &&
          options.shouldForwardProp(propName)
        : options.shouldForwardProp;
  }
  const isReal = tag.__emotion_real === tag;
  const baseTag = staticClassName === undefined
    ? (isReal && tag.__emotion_base) || tag
    : tag;
  if (typeof shouldForwardProp !== 'function') {
    shouldForwardProp =
      typeof baseTag === 'string' &&
        baseTag.charAt(0) === baseTag.charAt(0).toLowerCase()
        ? testPickPropsOnStringTag
        : testPickPropsOnComponent;
  }
  return (...args) => {
    const styles = isReal && tag.__emotion_styles !== undefined
      ? tag.__emotion_styles.slice(0)
      : [];
    if (identifierName !== undefined) {
      styles.push(`label:${identifierName};`);
    }
    if (staticClassName === undefined) {
      if (args[0] == null || args[0].raw === undefined) {
        styles.push.apply(styles, args);
      }
      else {
        styles.push(args[0][0]);
        const len = args.length;
        let i = 1;
        for (; i < len; i++) {
          styles.push(args[i], args[0][i]);
        }
      }
    }
    class Styled extends React.Component {
      componentWillMount() {
        if (this.context[channel] !== undefined) {
          this.unsubscribe = this.context[channel].subscribe(setTheme.bind(this));
        }
      }
      componentWillUnmount() {
        if (this.unsubscribe !== undefined) {
          this.context[channel].unsubscribe(this.unsubscribe);
        }
      }
      render() {
        const { props, state } = this;
        this.mergedProps = pickAssign(testAlwaysTrue, {}, props, {
          theme: (state !== null && state.theme) || props.theme || {},
        });
        const { _emotion: emotion } = props;
        let className = '';
        const classInterpolations = [];
        if (props.className) {
          if (staticClassName === undefined) {
            className += emotion.getRegisteredStyles(classInterpolations, props.className);
          }
          else {
            className += `${props.className} `;
          }
        }
        if (staticClassName === undefined) {
          className += emotion.css.apply(this, styles.concat(classInterpolations));
        }
        else {
          className += staticClassName;
        }
        if (stableClassName !== undefined) {
          className += ` ${stableClassName}`;
        }
        return React.createElement(baseTag,

        pickAssign(shouldForwardProp, {}, props, {
          className,
          ref: props.innerRef,
        })
      );
      }
    }
    Styled.displayName =
      identifierName !== undefined
        ? identifierName
        : `Styled(${typeof baseTag === 'string'
          ? baseTag
          : baseTag.displayName || baseTag.name || 'Component'})`;
    if (tag.defaultProps !== undefined) {
      Styled.defaultProps = tag.defaultProps;
    }
    Styled.contextTypes = contextTypes;
    Styled.__emotion_styles = styles;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_real = Styled;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value() {
        if (process.env.NODE_ENV !== 'production' &&
          stableClassName === undefined) {
          return 'NO_COMPONENT_SELECTOR';
        }

        return `.${stableClassName}`;
      },
    });
    Styled.withComponent = (nextTag, nextOptions) => {
      return createStyled(nextTag, nextOptions !== undefined
        ?
          pickAssign(testAlwaysTrue, {}, options, nextOptions)
        : options)(...styles);
    };
    return (props) => (React.createElement(Consumer, null, (emotion) => (React.createElement(Styled, Object.assign({}, props, { _emotion: emotion })))));
  };
};
export { createStyled as styled };
