import { EventEmitter } from "events";

type StockEvent = {
  data: { name: string; price: string };
};

class StockTracker {
  private emitter = new EventEmitter();
  private intervalId = 0;
  private price = Math.random() * 100;

  constructor(private stock: string) {
    this.intervalId = setInterval(() => {
      const delta = Math.random() * 2 * (Math.random() > 0.5 ? 1 : -1);
      this.emitter.emit("data", {
        name: this.stock,
        price: (this.price + delta).toFixed(2),
      });

    }, 1500);
  }

  public on<T extends keyof StockEvent>(
    name: T,
    callback: (data: StockEvent[T]) => void
  ) {
    this.emitter.on(name, callback);
  }
  public stop() {
    clearInterval(this.intervalId);
    this.emitter.removeAllListeners();
  }

  // Removes listener w/o clearing interval.
  // Clean up listener to prevent firing twice when listening in useEffect
  public removeListeners() {
    this.emitter.removeAllListeners();
  }
}

export default StockTracker;
