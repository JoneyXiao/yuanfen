// Polyfills for older browsers
// This file is imported in the root layout to ensure compatibility

// globalThis polyfill for older browsers
if (typeof globalThis === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).globalThis = global || window || self;
}

// Promise.allSettled polyfill for older browsers
if (!Promise.allSettled) {
  Promise.allSettled = function<T>(promises: Promise<T>[]): Promise<PromiseSettledResult<T>[]> {
    return Promise.all(
      promises.map((promise) =>
        Promise.resolve(promise)
          .then(
            (value) => ({ status: 'fulfilled' as const, value }),
            (reason) => ({ status: 'rejected' as const, reason })
          )
      )
    );
  };
}

// queueMicrotask polyfill for older browsers
if (typeof queueMicrotask !== 'function') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).queueMicrotask = function(callback: () => void) {
    Promise.resolve().then(callback);
  };
}

// String.prototype.matchAll polyfill for older browsers
if (!String.prototype.matchAll) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (String.prototype as any).matchAll = function(this: string, regexp: RegExp) {
    if (!regexp.global) {
      throw new TypeError('String.prototype.matchAll called with a non-global RegExp argument');
    }
    
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const str = this;
    let match;
    const matches: RegExpMatchArray[] = [];
    
    while ((match = regexp.exec(str)) !== null) {
      matches.push(match);
      if (match.index === regexp.lastIndex) {
        regexp.lastIndex++;
      }
    }
    
    return matches[Symbol.iterator]();
  };
}

export {}; 