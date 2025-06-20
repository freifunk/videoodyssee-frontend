// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Polyfills for JSDOM environment - Fix ResizeObserver properly
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe(element) {
    // Mock the observation with proper entry structure
    if (this.callback) {
      const entry = {
        target: element,
        contentRect: {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          top: 0,
          right: 100,
          bottom: 100,
          left: 0,
        },
        borderBoxSize: [{ inlineSize: 100, blockSize: 100 }],
        contentBoxSize: [{ inlineSize: 100, blockSize: 100 }],
        devicePixelContentBoxSize: [{ inlineSize: 100, blockSize: 100 }],
      };
      // Call the callback with proper entry format
      this.callback([entry], this);
    }
  }

  unobserve() {
    // Mock implementation
  }

  disconnect() {
    // Mock implementation
  }
};

global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  
  observe() {
    // Mock implementation
  }
  
  unobserve() {
    // Mock implementation
  }
  
  disconnect() {
    // Mock implementation
  }
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress only React act() warnings from MUI components
// These are false positives that don't indicate real problems
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    const message = String(args[0]);
    
    // Suppress React act() warnings that are caused by MUI internal animations
    if (message.includes('Warning: An update to') && message.includes('was not wrapped in act')) {
      return;
    }
    
    // Suppress ReactDOMTestUtils deprecation warning - we can't control this from React Testing Library
    if (message.includes('ReactDOMTestUtils.act') && message.includes('deprecated')) {
      return;
    }
    
    // Allow all other errors through
    originalError.apply(console, args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Configure React Testing Library
configure({
  // Increase timeout for async operations
  asyncUtilTimeout: 2000,
  // Configure better error messages
  getElementError: (message, container) => {
    const error = new Error(
      message +
      `\n\nRendered:\n${container.innerHTML}`
    );
    error.name = 'TestingLibraryElementError';
    return error;
  },
}); 