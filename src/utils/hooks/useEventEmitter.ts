
type Subscription<T> = (val: T) => void

export class EventEmitter<T> {
  private subcriptions = new Set<Subscription<T>>()

  emit = (val: T) => {
    for (const sub of this.subcriptions) {
      sub(val)
    }
  }

  useSubcription = (callback: Subscription<T>) => {
    function subscription(val: T) {
      callback(val)
    }
    this.subcriptions.add(subscription)
  }
}

let eventEmitter: any = null

export default function useEventEmitter<T = void>() {
  if (eventEmitter === null) {
    eventEmitter = new EventEmitter<T>()
  }

  return eventEmitter
}
