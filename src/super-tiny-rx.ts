export interface Observable<T> {
  subscribe(
    onNext: (arg: T) => void,
    onFinish?: () => void,
    onError?: (error: Error) => void
  ): void;
  //---------------------------//
  debounce(ms: number): Observable<T>;
  map<M>(func: (it: T) => M): Observable<M>;
  filter(func: (it: T) => boolean): Observable<T>;
  flatMap<M>(func: (it: T) => Iterable<M>): Observable<M>;
  window(ms: number): Observable<Array<T>>;
}

export interface Observer<T> {
  next(item: T): void;
  finish(): void;
  error(err: Error): void;
}

export function getObserver<T>(): Observer<T> {
  return new Subject();
}

export class Subject<T> implements Observable<T>, Observer<T> {
  finish(): void {
    if (this.onFinish) {
      this.onFinish();
    }
  }
  error(err: Error): void {
    if (this.onError) {
      this.onError(err);
    }
  }

  next(item: T) {
    this.onNext(item);
  }
  //--------------------//
  private onNext: (arg: T) => void;
  private onFinish: () => void;
  private onError: (e: Error) => void;

  subscribe(
    onNext: (arg: T) => void,
    onFinish?: () => void,
    onError?: (error: Error) => void
  ): void {
    if (onNext) {
      this.onNext = onNext;
    }
    if (onFinish) {
      this.onFinish = onFinish;
    }
    if (onError) {
      this.onError = onError;
    }
  }
  //---------------------//

  map<M>(func: (it: T) => M): Observable<M> {
    const $new = new Subject<M>();
    this.subscribe(it => {
      $new.next(func(it));
    });
    return $new;
  }

  filter(func: (it: T) => boolean): Observable<T> {
    const $new = new Subject<T>();
    this.subscribe(it => {
      if (func(it)) {
        $new.next(it);
      }
    });
    return $new;
  }

  flatMap<M>(func: (it: T) => Iterable<M>): Observable<M> {
    const $new = new Subject<M>();
    this.subscribe(it => {
      for (let item of func(it)) {
        $new.next(item);
      }
    });
    return $new;
  }

  debounce(ms: number): Observable<T> {
    const $new = new Subject<T>();
    let time = Date.now();
    let item = undefined;
    this.subscribe(it => {
      const t = Date.now();
      if (it != item || time + ms < t) {
        item = it;
        time = t;
        $new.next(it);
      }
    });
    return $new;
  }

  window(ms: number): Observable<Array<T>> {
    const $new = new Subject<Array<T>>();
    let temp = [];
    this.subscribe(it => {
      temp.push(it);
    });

    setInterval(() => {
      $new.next(temp);
      temp = [];
    }, ms);

    return $new;
  }
}
