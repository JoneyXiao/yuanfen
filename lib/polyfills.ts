/* eslint-disable @typescript-eslint/no-explicit-any */
// Polyfills for older browser compatibility
// Import core-js polyfills for essential modern features

// Essential polyfills for Safari 14.3 and Chrome 92
import 'core-js/stable/promise';
import 'core-js/stable/array/includes';
import 'core-js/stable/array/find';
import 'core-js/stable/array/find-index';
import 'core-js/stable/array/from';
import 'core-js/stable/object/assign';
import 'core-js/stable/object/entries';
import 'core-js/stable/object/values';
import 'core-js/stable/string/includes';
import 'core-js/stable/string/starts-with';
import 'core-js/stable/string/ends-with';
import 'core-js/stable/number/is-integer';
import 'core-js/stable/symbol';

// Intersection Observer polyfill for older browsers
import 'intersection-observer';

// Custom polyfills for specific features
if (typeof window !== 'undefined') {
  // CSS custom properties fallback detection
  if (!window.CSS || !window.CSS.supports || !window.CSS.supports('(--custom: property)')) {
    console.warn('CSS custom properties not supported, some styling may appear different');
  }

  // ResizeObserver polyfill for older Safari
  if (!window.ResizeObserver) {
    window.ResizeObserver = class ResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
        this.observedElements = new Set();
      }
      
      private callback: ResizeObserverCallback;
      private observedElements: Set<Element>;

      observe(element: Element) {
        this.observedElements.add(element);
        // Fallback using window resize events
        window.addEventListener('resize', this.handleResize);
        // Initial call
        this.handleResize();
      }

      unobserve(element: Element) {
        this.observedElements.delete(element);
        if (this.observedElements.size === 0) {
          window.removeEventListener('resize', this.handleResize);
        }
      }

      disconnect() {
        this.observedElements.clear();
        window.removeEventListener('resize', this.handleResize);
      }

      private handleResize = () => {
        const entries: ResizeObserverEntry[] = [];
        this.observedElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          entries.push({
            target: element,
            contentRect: {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height,
              top: rect.top,
              right: rect.right,
              bottom: rect.bottom,
              left: rect.left,
            } as DOMRectReadOnly,
            borderBoxSize: [{
              blockSize: rect.height,
              inlineSize: rect.width,
            }] as ReadonlyArray<ResizeObserverSize>,
            contentBoxSize: [{
              blockSize: rect.height,
              inlineSize: rect.width,
            }] as ReadonlyArray<ResizeObserverSize>,
            devicePixelContentBoxSize: [{
              blockSize: rect.height,
              inlineSize: rect.width,
            }] as ReadonlyArray<ResizeObserverSize>,
          });
        });
        if (entries.length > 0) {
          this.callback(entries, this);
        }
      };
    };
  }

  // Smooth scroll polyfill for older browsers
  if (!('scrollBehavior' in document.documentElement.style)) {
    const originalScrollTo = window.scrollTo;
    const originalElementScrollTo = Element.prototype.scrollTo;

    const smoothScroll = (element: Element | Window, x: number, y: number) => {
      const startTime = performance.now();
      const startX = element === window ? window.pageXOffset : (element as Element).scrollLeft;
      const startY = element === window ? window.pageYOffset : (element as Element).scrollTop;
      const distanceX = x - startX;
      const distanceY = y - startY;
      const duration = 500; // 500ms duration

      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        const currentX = startX + distanceX * ease;
        const currentY = startY + distanceY * ease;

        if (element === window) {
          window.scrollTo(currentX, currentY);
        } else {
          (element as Element).scrollLeft = currentX;
          (element as Element).scrollTop = currentY;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    // Override scrollTo methods
    (window as any).scrollTo = function(x: any, y?: any) {
      if (typeof x === 'object' && x && x.behavior === 'smooth') {
        smoothScroll(window, x.left || 0, x.top || 0);
      } else {
        originalScrollTo.call(this, x, y || 0);
      }
    };

    (Element.prototype as any).scrollTo = function(x: any, y?: any) {
      if (typeof x === 'object' && x && x.behavior === 'smooth') {
        smoothScroll(this, x.left || 0, x.top || 0);
      } else {
        originalElementScrollTo.call(this, x, y || 0);
      }
    };
  }

  // Object.fromEntries polyfill for older browsers
  if (!Object.fromEntries) {
    Object.fromEntries = function<T>(iterable: Iterable<readonly [PropertyKey, T]>) {
      const obj: Record<PropertyKey, T> = {} as Record<PropertyKey, T>;
      for (const [key, value] of iterable) {
        obj[key] = value;
      }
      return obj;
    };
  }

  // Array.at() polyfill for older browsers
  if (!Array.prototype.at) {
    Array.prototype.at = function(index: number) {
      const length = this.length;
      const relativeIndex = index >= 0 ? index : length + index;
      return (relativeIndex >= 0 && relativeIndex < length) ? this[relativeIndex] : undefined;
    };
  }
} 