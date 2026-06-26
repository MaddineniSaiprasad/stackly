export class EventEmitter {
  private _events: Record<string, Function[]> = {};

  on(type: string, listener: Function) {
    this._events[type] = this._events[type] || [];
    this._events[type].push(listener);
    return this;
  }

  once(type: string, listener: Function) {
    const onceWrapper = (...args: any[]) => {
      this.off(type, onceWrapper);
      listener.apply(this, args);
    };
    (onceWrapper as any).listener = listener;
    this.on(type, onceWrapper);
    return this;
  }

  off(type: string, listener?: Function) {
    if (!this._events[type]) return this;
    if (!listener) {
      delete this._events[type];
      return this;
    }
    this._events[type] = this._events[type].filter(l => l !== listener && (l as any).listener !== listener);
    return this;
  }

  removeListener(type: string, listener: Function) {
    return this.off(type, listener);
  }

  emit(type: string, ...args: any[]) {
    if (!this._events[type]) return false;
    this._events[type].forEach(listener => listener.apply(this, args));
    return true;
  }

  listeners(type: string) {
    return this._events[type] || [];
  }
}

const events = { EventEmitter };
export default events;
