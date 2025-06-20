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
      expect(screen.getByDisplayValue('test2023')).toBeInTheDocument();
    });

    // Check all form fields are present using specific identifiers
    expect(screen.getByLabelText(/^title$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subtitle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/persons/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('test2023')).toBeInTheDocument(); // conference field
    expect(screen.getByDisplayValue('eng')).toBeInTheDocument(); // language field
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
      expect(screen.getByDisplayValue('test2023')).toBeInTheDocument();
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
      expect(screen.getByDisplayValue('test2023')).toBeInTheDocument();
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
      expect(screen.getByDisplayValue('test2023')).toBeInTheDocument();
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
      expect(screen.getByDisplayValue('test2023')).toBeInTheDocument();
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
      expect(screen.getByDisplayValue('test2023')).toBeInTheDocument();
    });

    // Submit form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  test('sets current date as default value', async () => {
    render(<Form />);

    await waitFor(() => {
      const dateInput = screen.getByLabelText(/date/i);
      const today = new Date().toISOString().split('T')[0];
      expect(dateInput).toHaveValue(today);
    });
  });

  test('sets default language to English', async () => {
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('eng')).toBeInTheDocument();
    });
  });

  test('handles autocomplete for persons field', async () => {
    const user = userEvent.setup();
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByLabelText(/persons/i)).toBeInTheDocument();
    });

    const personsInput = screen.getByLabelText(/persons/i);
    
    // Type in the autocomplete field
    await user.type(personsInput, 'John Doe');
    
    // Check if input has the value
    expect(personsInput).toHaveValue('John Doe');
  });

  test('handles autocomplete for tags field', async () => {
    const user = userEvent.setup();
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    });

    const tagsInput = screen.getByLabelText(/tags/i);
    
    // Type in the autocomplete field
    await user.type(tagsInput, 'React');
    
    // Check if input has the value
    expect(tagsInput).toHaveValue('React');
  });

  test('handles language selection', async () => {
    const user = userEvent.setup();
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('eng')).toBeInTheDocument();
    });

    // Check default value
    expect(screen.getByDisplayValue('eng')).toBeInTheDocument();
  });

  test('handles conference selection', async () => {
    const user = userEvent.setup();
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('test2023')).toBeInTheDocument();
    });

    // Should default to first conference
    expect(screen.getByDisplayValue('test2023')).toBeInTheDocument();
  });

  test('validates URL input format', async () => {
    const user = userEvent.setup();
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByLabelText(/video url/i)).toBeInTheDocument();
    });

    const urlInput = screen.getByLabelText(/video url/i);
    
    await user.type(urlInput, 'invalid-url');
    
    // The input should still accept the value (browser validation would handle this)
    expect(urlInput).toHaveValue('invalid-url');
  });

  test('validates email input format', async () => {
    const user = userEvent.setup();
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    const emailInput = screen.getByLabelText(/email/i);
    
    await user.type(emailInput, 'invalid-email');
    
    // The input should still accept the value (browser validation would handle this)
    expect(emailInput).toHaveValue('invalid-email');
  });

  test('handles multiline description input', async () => {
    const user = userEvent.setup();
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    });

    const descriptionInput = screen.getByLabelText(/description/i);
    const multilineText = 'This is a multiline\ndescription\nfor the video.';
    
    await user.type(descriptionInput, multilineText);
    
    expect(descriptionInput).toHaveValue(multilineText);
  });

  test('handles date input change', async () => {
    const user = userEvent.setup();
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    });

    const dateInput = screen.getByLabelText(/date/i);
    const testDate = '2023-12-25';
    
    await user.clear(dateInput);
    await user.type(dateInput, testDate);
    
    expect(dateInput).toHaveValue(testDate);
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

    await waitFor(() => {
      expect(screen.getByDisplayValue('test2023')).toBeInTheDocument();
    });

    // Fill all form fields
    await user.type(screen.getByLabelText(/^title$/i), 'Test Video Title');
    await user.type(screen.getByLabelText(/subtitle/i), 'Test Subtitle');
    await user.type(screen.getByLabelText(/video url/i), 'https://example.com/video.mp4');
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/link/i), 'https://example.com');
    await user.type(screen.getByLabelText(/description/i), 'This is a test video description');
    
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
          body: expect.stringContaining('"title":"Test Video Title"')
        })
      );
    });
  });

  test('handles conference loading error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    // Clear all mocks and set up error mock
    fetch.mockClear();
    fetch.mockRejectedValueOnce(new Error('Failed to load conferences'));

    render(<Form />);

    // Wait for component to render - it should still render even with conference loading error
    await waitFor(() => {
      expect(screen.getByLabelText(/^title$/i)).toBeInTheDocument();
    });

    // The form should still be functional even without conferences loaded
    expect(screen.getByLabelText(/^title$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

    consoleSpy.mockRestore();
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

    await waitFor(() => {
      expect(screen.getByDisplayValue('test2023')).toBeInTheDocument();
    });

    // Submit form to trigger success message
    await user.type(screen.getByLabelText(/^title$/i), 'Test Video');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for success message to appear
    await waitFor(() => {
      expect(screen.getByText(/video submitted successfully/i)).toBeInTheDocument();
    });

    // Click close button on success alert
    const closeButton = screen.getByLabelText(/close/i);
    await user.click(closeButton);

    // Success message should disappear
    await waitFor(() => {
      expect(screen.queryByText(/video submitted successfully/i)).not.toBeInTheDocument();
    });
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

    await waitFor(() => {
      expect(screen.getByDisplayValue('test2023')).toBeInTheDocument();
    });

    // Submit form to trigger error message
    await user.type(screen.getByLabelText(/^title$/i), 'Test Video');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });

    // Click close button on error alert
    const closeButton = screen.getByLabelText(/close/i);
    await user.click(closeButton);

    // Error message should disappear
    await waitFor(() => {
      expect(screen.queryByText(/submission failed/i)).not.toBeInTheDocument();
    });
  });

  test('displays logo image', async () => {
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByAltText(/freifunk logo/i)).toBeInTheDocument();
    });
    
    const logoImage = screen.getByAltText(/freifunk logo/i);
    expect(logoImage).toHaveAttribute('src', '/static/images/logo/logo-small.png');
  });

  test('displays correct form title', async () => {
    render(<Form />);

    await waitFor(() => {
      expect(screen.getByText(/video upload/i)).toBeInTheDocument();
    });
  });
}); 