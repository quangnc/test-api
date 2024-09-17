export function onlyKeepProps(instance, props: string[]) {
  Object.keys(instance).forEach((key) => {
    if (!props.includes(key)) {
      instance[key] = undefined;
    }
  });
  return instance;
}

export const isObject = (val) => {
  return typeof val === 'object' && val !== null;
};
