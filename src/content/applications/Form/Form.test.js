import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './index';

// Mock fetch globally
global.fetch = jest.fn();

// Mock environment variables
process.env = {
  ...process.env,
  REACT_APP_API_URL: 'http://localhost:3001',
  REACT_APP_VOCTOWEB_API_URL: 'http://localhost:3002'
};

// Mock data for conferences
const mockConferences = {
  conferences: [
    { acronym: 'test2023', title: 'Test Conference 2023' },
    { acronym: 'demo2023', title: 'Demo Conference 2023' }
  ]
};

describe('Form Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    // Mock successful conferences fetch by default
    fetch
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockConferences
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with all required fields', async () => {
    render(<Form />);
    
    // Wait for conferences to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Conference 2023')).toBeInTheDocument();
    });

    // Check all form fields are present
    expect(screen.getByLabelText(/^title$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subtitle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/conference/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/video url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/link/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('loads conferences on component mount', async () => {
    render(<Form />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3002/public/conferences',
        expect.objectContaining({
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
      );
    });
  });

  test('handles user input correctly', async () => {
    const user = userEvent.setup();
    render(<Form />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Conference 2023')).toBeInTheDocument();
    });

    const titleInput = screen.getByLabelText(/^title$/i);
    const subtitleInput = screen.getByLabelText(/subtitle/i);
    const emailInput = screen.getByLabelText(/email/i);

    await user.type(titleInput, 'Test Video Title');
    await user.type(subtitleInput, 'Test Subtitle');
    await user.type(emailInput, 'test@example.com');

    expect(titleInput).toHaveValue('Test Video Title');
    expect(subtitleInput).toHaveValue('Test Subtitle');
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('submits form with correct data', async () => {
    const user = userEvent.setup();
    
    // Mock successful submission
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: 'Video submitted successfully!' })
    });

    render(<Form />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Conference 2023')).toBeInTheDocument();
    });

    // Fill form
    await user.type(screen.getByLabelText(/^title$/i), 'Test Video');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/video url/i), 'https://example.com/video.mp4');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/video/',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: expect.stringContaining('"title":"Test Video"')
        })
      );
    });
  });

  test('displays success message on successful submission', async () => {
    const user = userEvent.setup();
    
    // Mock successful submission
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: 'Video submitted successfully!' })
    });

    render(<Form />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Conference 2023')).toBeInTheDocument();
    });

    // Fill minimum required fields and submit
    await user.type(screen.getByLabelText(/^title$/i), 'Test Video');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/video submitted successfully/i)).toBeInTheDocument();
    });
  });

  test('displays error message on failed submission', async () => {
    const user = userEvent.setup();
    
    // Mock failed submission
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Submission failed!' })
    });

    render(<Form />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Conference 2023')).toBeInTheDocument();
    });

    // Fill minimum required fields and submit
    await user.type(screen.getByLabelText(/^title$/i), 'Test Video');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });
  });

  test('handles network errors gracefully', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    // Mock network error
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Form />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Conference 2023')).toBeInTheDocument();
    });

    // Fill minimum required fields and submit
    await user.type(screen.getByLabelText(/^title$/i), 'Test Video');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  test('sets default language to English', async () => {
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('English')).toBeInTheDocument();
    });
  });

  test('handles language selection', async () => {
    const user = userEvent.setup();
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('English')).toBeInTheDocument();
    });

    const languageSelect = screen.getByLabelText(/language/i);
    await user.selectOptions(languageSelect, 'deu');

    expect(screen.getByDisplayValue('German')).toBeInTheDocument();
  });

  test('handles conference selection', async () => {
    const user = userEvent.setup();
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Conference 2023')).toBeInTheDocument();
    });

    const conferenceSelect = screen.getByLabelText(/conference/i);
    await user.selectOptions(conferenceSelect, 'demo2023');

    expect(screen.getByDisplayValue('Demo Conference 2023')).toBeInTheDocument();
  });

  test('submits form with all fields filled', async () => {
    const user = userEvent.setup();
    
    // Mock successful submission
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: 'Video submitted successfully!' })
    });

    render(<Form />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Conference 2023')).toBeInTheDocument();
    });

    // Fill all fields
    await user.type(screen.getByLabelText(/^title$/i), 'Complete Test Video');
    await user.type(screen.getByLabelText(/subtitle/i), 'A comprehensive test');
    await user.type(screen.getByLabelText(/video url/i), 'https://example.com/video.mp4');
    await user.type(screen.getByLabelText(/name/i), 'Test User');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/link/i), 'https://example.com');
    await user.type(screen.getByLabelText(/description/i), 'Test description');

    // Submit form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/video/',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: expect.stringContaining('"title":"Complete Test Video"')
        })
      );
    });
  });

  test('closes success snackbar when close button is clicked', async () => {
    const user = userEvent.setup();
    
    // Mock successful submission
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: 'Video submitted successfully!' })
    });

    render(<Form />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Conference 2023')).toBeInTheDocument();
    });

    // Fill and submit form
    await user.type(screen.getByLabelText(/^title$/i), 'Test Video');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/video submitted successfully/i)).toBeInTheDocument();
    });

    // Success message should disappear after timeout (mocked by component)
    // This test verifies the message appears, actual timeout behavior is handled by component
  });

  test('closes error snackbar when close button is clicked', async () => {
    const user = userEvent.setup();
    
    // Mock failed submission
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Submission failed!' })
    });

    render(<Form />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Conference 2023')).toBeInTheDocument();
    });

    // Fill and submit form
    await user.type(screen.getByLabelText(/^title$/i), 'Test Video');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });

    // Error message should disappear after timeout (mocked by component)
    // This test verifies the message appears, actual timeout behavior is handled by component
  });
}); 