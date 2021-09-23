
export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | undefined;

type TargetElement = HTMLElement | Element | Document | Window;

export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement
  }

  let targetElement: TargetElement | undefined | null

  if (typeof target === 'function') {
    targetElement = target()
  } else {
    targetElement = target
  }

  return targetElement
}
