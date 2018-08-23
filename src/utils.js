import isPropValid from '@emotion/is-prop-valid';
export function setTheme(theme) {
    this.setState({ theme });
}
export const testPickPropsOnStringTag = isPropValid;
export const testPickPropsOnComponent = (key) => key !== 'theme' && key !== 'innerRef';
export const testAlwaysTrue = () => true;
export const pickAssign = function (testFn, target) {
    let i = 2;
    const length = arguments.length;
    for (; i < length; i++) {
        const source = arguments[i];
        let key;
        for (key in source) {
            if (testFn(key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};
