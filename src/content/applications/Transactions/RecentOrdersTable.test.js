import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentOrdersTable from './RecentOrdersTable';

// Mock fetch
global.fetch = jest.fn();

// Mock date-fns
jest.mock('date-fns', () => ({
  format: jest.fn((date, formatString) => '2023-01-01')
}));

describe('RecentOrdersTable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock successful fetch response for video list
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        data: [
          {
            id: '1',
            title: 'Test Video',
            name: 'John Doe',
            email: 'john@example.com',
            status: 'pending',
            date: '2023-01-01',
            language: 'eng',
            url: 'https://example.com/video1'
          },
          {
            id: '2',
            title: 'Another Video',
            name: 'Jane Smith',
            email: 'jane@example.com',
            status: 'approved',
            date: '2023-01-02',
            language: 'deu',
            url: 'https://example.com/video2'
          }
        ]
      })
    });
  });

  test('calls /video/list with correct POST method and headers on mount', async () => {
    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/video/list`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify({})
        }
      );
    });
  });

  test('displays videos after successful fetch', async () => {
    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    
    // Use more specific selector for the status badge
    const statusBadges = screen.getAllByText('Pending');
    expect(statusBadges.length).toBeGreaterThan(0);
  });

  test('calls /video/approve with correct POST method when approve button is clicked', async () => {
    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });

    // Mock successful approve response
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 202,
      json: async () => ({ data: 'Video approved successfully' })
    });

    const approveButtons = screen.getAllByText('Approve');
    fireEvent.click(approveButtons[0]);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/video/approve`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ id: '1' })
        }
      );
    });
  });

  test('calls /video/reject with correct POST method when reject button is clicked', async () => {
    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });

    // Mock successful reject response
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: 'Video rejected successfully' })
    });

    const rejectButtons = screen.getAllByText('Reject');
    fireEvent.click(rejectButtons[0]);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/video/reject`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ id: '1' })
        }
      );
    });
  });

  test('shows approve/reject buttons only for pending videos', async () => {
    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });

    // Check that pending video has approve/reject buttons
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3); // header + 2 data rows

    // First video is pending - should have buttons
    expect(screen.getAllByText('Approve')).toHaveLength(1);
    expect(screen.getAllByText('Reject')).toHaveLength(1);
    
    // Second video is approved - should show "---"
    expect(screen.getAllByText('---')).toHaveLength(1);
  });

  test('displays success snackbar after successful approve', async () => {
    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });

    // Mock successful approve response
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 202,
      json: async () => ({ data: 'Video approved successfully' })
    });

    const approveButtons = screen.getAllByText('Approve');
    fireEvent.click(approveButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Video approved successfully')).toBeInTheDocument();
    });
  });

  test('displays error snackbar after failed approve', async () => {
    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });

    // Mock failed approve response
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Approve failed' })
    });

    const approveButtons = screen.getAllByText('Approve');
    fireEvent.click(approveButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Approve failed')).toBeInTheDocument();
    });
  });

  test('handles pagination correctly', async () => {
    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });

    // Should show pagination controls
    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
    expect(screen.getByText('1-2 of 2')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('handles status filter correctly', async () => {
    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });

    // Should show filter dropdown - look for the select element
    const statusSelect = screen.getByDisplayValue('All');
    expect(statusSelect).toBeInTheDocument();

    // Change filter to pending
    fireEvent.change(statusSelect, { target: { value: 'pending' } });
    expect(statusSelect.value).toBe('pending');
  });

  test('displays video links correctly', async () => {
    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });

    const videoLink = screen.getByRole('link', { name: 'Test Video' });
    expect(videoLink).toHaveAttribute('href', 'https://example.com/video1');
    expect(videoLink).toHaveAttribute('target', '_blank');
    expect(videoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('displays language correctly', async () => {
    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(screen.getByText('Test Video')).toBeInTheDocument();
    });

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('German')).toBeInTheDocument();
  });

  test('handles fetch error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<RecentOrdersTable />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
}); 