type EventCallback = () => void;

class EventEmitterClass {
  private events: Record<string, EventCallback[]> = {};

  on(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event: string, callback: EventCallback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  emit(event: string) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback());
  }
}

export const eventEmitter = new EventEmitterClass();
