import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

export class DefaultHandyServiceLoadedHandler {

  protected _loadedStateSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public _initialized: boolean = false;
  
  public onStateLoaded(toDoWhenLoaded: () => void): void {

    if (this._initialized) {
      toDoWhenLoaded();
      return;
    }

    this._loadedStateSubject.pipe(first(state => state === true))
    .subscribe(() => {
      toDoWhenLoaded();
      return;
    })

  }
  
  public onStateLoadedPromise(): Promise<void> {

    return new Promise((resolve, reject) => {

      this.onStateLoaded(() => {
        return resolve();
      })

    })

  }

  protected _markStateAsLoaded(): void {
    this._initialized = true;
    this._loadedStateSubject.next(true);
  }

}