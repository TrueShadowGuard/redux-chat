class TimeObserver {
  observerMark = Symbol("observerMark");
  constructor() {
    this.observers = [];
    this.interval = setInterval(() => {
      this.timeTick(new Date());
    }, 1000);
  }

  subscribe(observer) {
    observer[this.observerMark] = Symbol();
    this.observers.push(observer);
  }

  unsubscribe(o) {
    this.observers = this.observers.filter(
      observer => observer[this.observerMark] !== o[this.observerMark]
    );
  }

  timeTick = (date) => {
    this.observers.forEach(observer => observer(date));
  }

  stopListening() {
    clearInterval(this.interval);
  }
}

const timeObserver = new TimeObserver();

export default timeObserver;
