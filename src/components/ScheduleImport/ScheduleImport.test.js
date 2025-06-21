import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScheduleImport from './index';

// Mock fetch globally
global.fetch = jest.fn();

const mockScheduleData = {
  schedule: {
    conference: {
      title: "Battlemesh v17",
      start: "2025-06-10",
      end: "2025-06-16",
      days: [
        {
          index: 1,
          date: "2025-06-11",
          rooms: {
            "Rautenkranz": [
              {
                id: 394,
                guid: "8a5a1265-ab78-5c5a-8dd0-c4cf7fd5d10e",
                title: "DIY fibre backbone deployments",
                abstract: "A talk about community fibre deployment concepts",
                type: "Talk - 30 min + 10 min Q&A",
                language: "en",
                duration: "01:00",
                room: "Rautenkranz",
                date: "2025-06-11T11:30:00+02:00",
                url: "https://pretalx.example.com/talk/HMSBNC/",
                persons: [
                  {
                    public_name: "Bluse",
                    id: 345
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  }
};

describe('ScheduleImport Component', () => {
  const mockOnTalkSelect = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
    mockOnTalkSelect.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders schedule import form', () => {
    render(<ScheduleImport onTalkSelect={mockOnTalkSelect} />);

    expect(screen.getByText('📅 Pretalx Schedule Import')).toBeInTheDocument();
    expect(screen.getByLabelText(/schedule json url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /📥 laden/i })).toBeInTheDocument();
  });

  test('shows error when trying to load without URL', async () => {
    const user = userEvent.setup();
    render(<ScheduleImport onTalkSelect={mockOnTalkSelect} />);

    const loadButton = screen.getByRole('button', { name: /📥 laden/i });
    await user.click(loadButton);

    expect(screen.getByText('Bitte gib eine gültige Schedule-URL ein')).toBeInTheDocument();
  });

  test('loads and displays schedule successfully', async () => {
    const user = userEvent.setup();
    
    // Mock successful fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockScheduleData)
    });

    render(<ScheduleImport onTalkSelect={mockOnTalkSelect} />);

    // Enter URL and click load
    const urlInput = screen.getByLabelText(/schedule json url/i);
    const loadButton = screen.getByRole('button', { name: /📥 laden/i });

    await user.type(urlInput, 'https://example.com/schedule.json');
    await user.click(loadButton);

    // Wait for schedule to load
    await waitFor(() => {
      expect(screen.getByText('🎪 Battlemesh v17')).toBeInTheDocument();
    });

    expect(screen.getByText(/1 talks gefunden/i)).toBeInTheDocument();
    expect(screen.getByText('DIY fibre backbone deployments')).toBeInTheDocument();
  });

  test('handles fetch error gracefully', async () => {
    const user = userEvent.setup();
    
    // Mock fetch error
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<ScheduleImport onTalkSelect={mockOnTalkSelect} />);

    const urlInput = screen.getByLabelText(/schedule json url/i);
    const loadButton = screen.getByRole('button', { name: /📥 laden/i });

    await user.type(urlInput, 'https://example.com/schedule.json');
    await user.click(loadButton);

    await waitFor(() => {
      expect(screen.getByText(/fehler beim laden: network error/i)).toBeInTheDocument();
    });
  });

  test('handles HTTP error responses', async () => {
    const user = userEvent.setup();
    
    // Mock HTTP error
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    render(<ScheduleImport onTalkSelect={mockOnTalkSelect} />);

    const urlInput = screen.getByLabelText(/schedule json url/i);
    const loadButton = screen.getByRole('button', { name: /📥 laden/i });

    await user.type(urlInput, 'https://example.com/schedule.json');
    await user.click(loadButton);

    await waitFor(() => {
      expect(screen.getByText(/fehler beim laden: http 404: not found/i)).toBeInTheDocument();
    });
  });

  test('selects talk and calls onTalkSelect callback', async () => {
    const user = userEvent.setup();
    
    // Mock successful fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockScheduleData)
    });

    render(<ScheduleImport onTalkSelect={mockOnTalkSelect} />);

    // Load schedule
    const urlInput = screen.getByLabelText(/schedule json url/i);
    const loadButton = screen.getByRole('button', { name: /📥 laden/i });

    await user.type(urlInput, 'https://example.com/schedule.json');
    await user.click(loadButton);

    // Wait for talks to appear and click on one
    await waitFor(() => {
      expect(screen.getByText('DIY fibre backbone deployments')).toBeInTheDocument();
    });

    // Find and click the talk card using a more specific selector
    const talkTitle = screen.getByText('DIY fibre backbone deployments');
    await user.click(talkTitle);

    // Verify callback was called with correct data
    expect(mockOnTalkSelect).toHaveBeenCalledWith({
      title: "DIY fibre backbone deployments",
      subtitle: "",
      description: "A talk about community fibre deployment concepts",
      persons: "Bluse",
      tags: "Talk - 30 min + 10 min Q&A, en, Rautenkranz",
      date: "2025-06-11T11:30:00+02:00",
      originalUrl: "https://pretalx.example.com/talk/HMSBNC/"
    });
  });

  test('shows loading state while fetching', async () => {
    const user = userEvent.setup();
    
    // Mock a slow response
    fetch.mockImplementation(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          status: 200,
          json: jest.fn().mockResolvedValue(mockScheduleData)
        }), 100)
      )
    );

    render(<ScheduleImport onTalkSelect={mockOnTalkSelect} />);

    const urlInput = screen.getByLabelText(/schedule json url/i);
    const loadButton = screen.getByRole('button', { name: /📥 laden/i });

    await user.type(urlInput, 'https://example.com/schedule.json');
    await user.click(loadButton);

    // Check loading state
    expect(screen.getByRole('button', { name: /⏳ laden/i })).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('DIY fibre backbone deployments')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('formats date correctly', async () => {
    const user = userEvent.setup();
    
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockScheduleData)
    });

    render(<ScheduleImport onTalkSelect={mockOnTalkSelect} />);

    const urlInput = screen.getByLabelText(/schedule json url/i);
    const loadButton = screen.getByRole('button', { name: /📥 laden/i });

    await user.type(urlInput, 'https://example.com/schedule.json');
    await user.click(loadButton);

    await waitFor(() => {
      // Check that talk date is formatted (more specific selector)
      expect(screen.getByText(/Mi\., 11\. Juni 2025/)).toBeInTheDocument();
    });
  });

  test('handles empty schedule gracefully', async () => {
    const user = userEvent.setup();
    
    const emptySchedule = {
      schedule: {
        conference: {
          title: "Empty Conference",
          start: "2025-01-01",
          end: "2025-01-02",
          days: []
        }
      }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(emptySchedule)
    });

    render(<ScheduleImport onTalkSelect={mockOnTalkSelect} />);

    const urlInput = screen.getByLabelText(/schedule json url/i);
    const loadButton = screen.getByRole('button', { name: /📥 laden/i });

    await user.type(urlInput, 'https://example.com/schedule.json');
    await user.click(loadButton);

    await waitFor(() => {
      expect(screen.getByText('Keine Talks in diesem Schedule gefunden')).toBeInTheDocument();
    });
  });
}); 