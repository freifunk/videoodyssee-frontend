import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './index';

// Mock fetch globally
global.fetch = jest.fn();

// Mock environment variables
process.env = {
  ...process.env,
  REACT_APP_API_URL: 'http://localhost:3001'
};

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock window.location
const locationMock = {
  href: ''
};
Object.defineProperty(window, 'location', {
  value: locationMock,
  writable: true
});

describe('LoginForm Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
    window.location.href = '';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form with required fields', () => {
    render(<LoginForm />);

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('handles user input correctly', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('submits form with correct credentials', async () => {
    const user = userEvent.setup();
    
    // Mock successful login with proper Response object
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ data: 'jwt-token-here' })
    };
    fetch.mockResolvedValueOnce(mockResponse);

    render(<LoginForm />);

    // Fill form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'correctpassword');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/auth/login',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: 'user@example.com',
            password: 'correctpassword'
          })
        })
      );
    });
  });

  test('stores token and redirects on successful login', async () => {
    const user = userEvent.setup();
    
    // Mock successful login with proper Response object
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ data: 'jwt-token-123' })
    };
    fetch.mockResolvedValueOnce(mockResponse);

    render(<LoginForm />);

    // Fill and submit form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'password');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for success message to appear first
    await waitFor(() => {
      expect(screen.getByText(/authentication successful/i)).toBeInTheDocument();
    });

    // Check that localStorage.setItem was called 
    expect(localStorageMock.setItem).toHaveBeenCalledWith('x-token', 'jwt-token-123');
    
    // Check that window.location.href was set
    expect(window.location.href).toBe('/dashboard');
  });

  test('displays success message on successful authentication', async () => {
    const user = userEvent.setup();
    
    // Mock successful login with proper Response object
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ data: 'jwt-token-123' })
    };
    fetch.mockResolvedValueOnce(mockResponse);

    render(<LoginForm />);

    // Fill and submit form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'password');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/authentication successful/i)).toBeInTheDocument();
    });
  });

  test('displays error message on failed login', async () => {
    const user = userEvent.setup();
    
    // Mock failed login with proper Response object
    const mockResponse = {
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({ message: 'Invalid credentials' })
    };
    fetch.mockResolvedValueOnce(mockResponse);

    render(<LoginForm />);

    // Fill and submit form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  test('handles network errors gracefully', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    // Mock network error
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<LoginForm />);

    // Fill and submit form
    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  test('email input has correct type', () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('password input has correct type', () => {
    render(<LoginForm />);
    
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('form has proper structure with Paper component', () => {
    render(<LoginForm />);
    
    // Check for the paper container and form structure
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
}); 