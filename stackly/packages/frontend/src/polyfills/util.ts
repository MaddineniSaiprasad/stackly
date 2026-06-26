export function debuglog() {
  return () => {};
}

export function inspect(obj: any) {
  return typeof obj === 'string' ? obj : JSON.stringify(obj);
}

export function inherits(ctor: any, superCtor: any) {
  if (superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }
}

const util = { debuglog, inspect, inherits };
export default util;
