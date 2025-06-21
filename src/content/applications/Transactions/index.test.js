import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Transactions from './index';

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mock window.location.reload
delete window.location;
window.location = { reload: jest.fn() };

describe('Transactions Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set up localStorage mock to return test-token for x-token key
    window.localStorage.getItem.mockImplementation((key) => {
      if (key === 'x-token') return 'test-token';
      return null;
    });
    
    // Mock successful fetch response
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: '1',
            title: 'Test Video',
            subtitle: 'Test Subtitle',
            status: 'pending',
            conference: 'Test Conference',
            date: '2023-01-01'
          }
        ]
      })
    });
  });

  test('calls /video/list with correct POST method and headers', async () => {
    render(<Transactions />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/video/list`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token'
          },
          body: JSON.stringify({})
        }
      );
    });
  });

  test('displays videos after successful fetch', async () => {
    render(<Transactions />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  test('calls /video/approve with correct POST method when approve button is clicked', async () => {
    render(<Transactions />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });

    const approveButton = screen.getByText('Approve');
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/video/approve`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token'
          },
          body: JSON.stringify({ id: '1' })
        }
      );
    });
  });

  test('calls /video/reject with correct POST method when reject button is clicked', async () => {
    render(<Transactions />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });

    const rejectButton = screen.getByText('Reject');
    fireEvent.click(rejectButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/video/reject`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token'
          },
          body: JSON.stringify({ id: '1' })
        }
      );
    });
  });

  test('shows loading state initially', () => {
    render(<Transactions />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows "no videos" message when no videos are returned', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] })
    });

    render(<Transactions />);

    await waitFor(() => {
      expect(screen.getByText('Keine Videos gefunden.')).toBeInTheDocument();
    });
  });

  test('includes Authorization header with token from localStorage', async () => {
    window.localStorage.getItem.mockImplementation((key) => {
      if (key === 'x-token') return 'my-jwt-token';
      return null;
    });
    
    render(<Transactions />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer my-jwt-token'
          })
        })
      );
    });
  });

  test('handles fetch error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Transactions />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
}); 