/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

// Polyfills for older browsers
// This file is imported client-side only to avoid SSR issues

const loadPolyfills = () => {
  if (typeof window !== 'undefined') {
    // Array polyfills
    if (!Array.prototype.find) {
      Array.prototype.find = function(predicate: any) {
        for (let i = 0; i < this.length; i++) {
          if (predicate(this[i], i, this)) {
            return this[i];
          }
        }
        return undefined;
      };
    }

    if (!Array.prototype.includes) {
      Array.prototype.includes = function(searchElement: any) {
        return this.indexOf(searchElement) !== -1;
      };
    }

    // Object.assign polyfill
    if (!Object.assign) {
      Object.assign = function(target: any, ...sources: any[]) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        const to = Object(target);
        sources.forEach(source => {
          if (source != null) {
            for (const key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                to[key] = source[key];
              }
            }
          }
        });
        return to;
      };
    }

    // Promise polyfill (basic)
    if (typeof Promise === 'undefined') {
      (window as any).Promise = class Promise {
        private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
        private value: any;
        private handlers: Array<{ onFulfilled?: Function; onRejected?: Function }> = [];

        constructor(executor: (resolve: Function, reject: Function) => void) {
          try {
            executor(this.resolve.bind(this), this.reject.bind(this));
          } catch (error) {
            this.reject(error);
          }
        }

        private resolve(value: any) {
          if (this.state === 'pending') {
            this.state = 'fulfilled';
            this.value = value;
            this.handlers.forEach(handler => {
              if (handler.onFulfilled) {
                try {
                  handler.onFulfilled(value);
                } catch {
                  // Handle error silently
                }
              }
            });
          }
        }

        private reject(reason: any) {
          if (this.state === 'pending') {
            this.state = 'rejected';
            this.value = reason;
            this.handlers.forEach(handler => {
              if (handler.onRejected) {
                try {
                  handler.onRejected(reason);
                } catch {
                  // Handle error silently
                }
              }
            });
          }
        }

        then(onFulfilled?: Function, onRejected?: Function) {
          return new Promise((resolve, reject) => {
            const handleCallback = () => {
              try {
                if (this.state === 'fulfilled') {
                  const result = onFulfilled ? onFulfilled(this.value) : this.value;
                  resolve(result);
                } else if (this.state === 'rejected') {
                  if (onRejected) {
                    const result = onRejected(this.value);
                    resolve(result);
                  } else {
                    reject(this.value);
                  }
                }
              } catch (error) {
                reject(error);
              }
            };

            if (this.state === 'pending') {
              this.handlers.push({ onFulfilled: handleCallback, onRejected: handleCallback });
            } else {
              setTimeout(handleCallback, 0);
            }
          });
        }

        catch(onRejected: Function) {
          return this.then(undefined, onRejected);
        }

        static resolve(value: any) {
          return new Promise(resolve => resolve(value));
        }

        static reject(reason: any) {
          return new Promise((_, reject) => reject(reason));
        }
      };
    }

    // Basic Symbol polyfill
    if (typeof Symbol === 'undefined') {
      (window as any).Symbol = function Symbol(description?: string) {
        const id = Math.random().toString(36).substr(2, 9);
        return {
          toString: () => `Symbol(${description || id})`,
          valueOf: () => `Symbol(${description || id})`
        };
      };
    }

    // Helper function for smooth scroll
    const smoothScrollStep = (
      startPosition: number,
      distance: number,
      duration: number,
      start: number | null,
      timestamp: number
    ): void => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function
      const easedPercentage = percentage < 0.5 
        ? 2 * percentage * percentage 
        : -1 + (4 - 2 * percentage) * percentage;
      
      window.scrollTo(0, startPosition + distance * easedPercentage);
      
      if (progress < duration) {
        window.requestAnimationFrame((ts) => smoothScrollStep(startPosition, distance, duration, start, ts));
      }
    };

    // Element.scrollIntoView with options polyfill
    let needsScrollPolyfill = false;
    try {
      const testElement = document.createElement('div');
      testElement.scrollIntoView({ behavior: 'smooth' });
    } catch {
      needsScrollPolyfill = true;
    }

    if (needsScrollPolyfill || !Element.prototype.scrollIntoView) {
      Element.prototype.scrollIntoView = function(this: Element, options?: any) {
        const isObject = options && typeof options === 'object';
        const behavior = isObject ? options.behavior : options;
        
        if (behavior === 'smooth') {
          const targetPosition = this.getBoundingClientRect().top + window.pageYOffset;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 1000;
          
          window.requestAnimationFrame((timestamp) => 
            smoothScrollStep(startPosition, distance, duration, null, timestamp)
          );
        } else {
          // Fallback to standard behavior
          const rect = this.getBoundingClientRect();
          window.scrollTo(0, rect.top + window.pageYOffset);
        }
      };
    }

    // requestAnimationFrame polyfill
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback: FrameRequestCallback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id: number) {
        clearTimeout(id);
      };
    }
  }
};

// Auto-execute polyfills when imported
loadPolyfills();

export default loadPolyfills;
export { loadPolyfills };
