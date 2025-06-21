import React, { useState } from 'react';
import './ScheduleImport.css';

const ScheduleImport = ({ onTalkSelect }) => {
  const [scheduleUrl, setScheduleUrl] = useState('');
  const [schedule, setSchedule] = useState(null);
  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSchedule = async () => {
    if (!scheduleUrl.trim()) {
      setError('Bitte gib eine gültige Schedule-URL ein');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(scheduleUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const extractedTalks = extractTalks(data);
      
      setSchedule(data);
      setTalks(extractedTalks);
      
      if (extractedTalks.length === 0) {
        setError('Keine Talks in diesem Schedule gefunden');
      }
      
    } catch (err) {
      console.error('Fehler beim Laden des Schedules:', err);
      setError(`Fehler beim Laden: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const extractTalks = (scheduleData) => {
    const talks = [];
    
    if (!scheduleData.schedule || !scheduleData.schedule.conference || !scheduleData.schedule.conference.days) {
      console.log('No schedule.conference.days found in data');
      return talks;
    }

    // Iterate through days
    scheduleData.schedule.conference.days.forEach(day => {
      if (!day.rooms) return;
      
      // Iterate through rooms
      Object.keys(day.rooms).forEach(roomName => {
        const roomTalks = day.rooms[roomName];
        if (!Array.isArray(roomTalks)) return;
        
        // Process each talk
        roomTalks.forEach(talk => {
          const processedTalk = {
            id: talk.id,
            title: talk.title || '',
            subtitle: talk.subtitle || '',
            abstract: talk.abstract || '',
            description: talk.description || talk.abstract || '',
            date: talk.date || day.date,
            start: talk.start || '',
            duration: talk.duration || '',
            room: talk.room || roomName,
            language: talk.language || 'en',
            type: talk.type || '',
            url: talk.url || '',
            persons: talk.persons ? talk.persons.map(p => p.public_name || p.name).join(', ') : '',
            // Create tags from type and other metadata
            tags: [
              talk.type,
              talk.language,
              talk.room
            ].filter(Boolean).join(', '),
            originalUrl: talk.url || '',
            // Format date for display
            formattedDate: talk.date ? formatDate(talk.date) : day.date ? formatDate(day.date) : '',
            // Additional metadata
            guid: talk.guid,
            slug: talk.slug,
            do_not_record: talk.do_not_record
          };
          
          talks.push(processedTalk);
        });
      });
    });
    
    console.log(`Extracted ${talks.length} talks from schedule`);
    return talks;
  };

  const handleTalkSelect = (talk) => {
    onTalkSelect({
      title: talk.title,
      subtitle: talk.subtitle,
      description: talk.description,
      persons: talk.persons,
      tags: talk.tags,
      date: talk.date,
      originalUrl: talk.originalUrl
    });
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      return date.toLocaleDateString('de-DE', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="schedule-import">
      <h3>📅 Pretalx Schedule Import</h3>
      
      <div className="schedule-url-input">
        <div className="form-group">
          <label className="form-label" htmlFor="schedule-url">Schedule JSON URL</label>
          <div className="url-input-group">
            <input
              type="url"
              id="schedule-url"
              className="form-input"
              value={scheduleUrl}
              onChange={(e) => setScheduleUrl(e.target.value)}
              placeholder="https://pretalx.example.com/event/schedule/export/schedule.json"
            />
            <button 
              type="button"
              className="load-button"
              onClick={fetchSchedule}
              disabled={loading}
            >
              {loading ? '⏳' : '📥'} Laden
            </button>
          </div>
        </div>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
      </div>

      {schedule && (
        <div className="schedule-info">
          <h4>🎪 {schedule.schedule.conference.title}</h4>
          <p>
            📅 {schedule.schedule.conference.start} bis {schedule.schedule.conference.end} | 
            🗣️ {talks.length} Talks gefunden
          </p>
        </div>
      )}

      {talks.length > 0 && (
        <div className="talks-list">
          <h4>Talks auswählen:</h4>
          <div className="talks-grid">
            {talks.map((talk) => (
              <div className="talk-card" key={talk.id} onClick={() => handleTalkSelect(talk)}>
                <div className="talk-header">
                  <h4 className="talk-title">{talk.title}</h4>
                  {talk.subtitle && <p className="talk-subtitle">{talk.subtitle}</p>}
                </div>
                
                <div className="talk-meta">
                  <div className="talk-date-time">
                    📅 {talk.formattedDate}
                    {talk.start && <span className="talk-time"> • ⏰ {talk.start}</span>}
                    {talk.duration && <span className="talk-duration"> • ⏱️ {talk.duration}</span>}
                  </div>
                  
                  {talk.room && (
                    <div className="talk-room">
                      🏠 {talk.room}
                    </div>
                  )}
                  
                  {talk.type && (
                    <div className="talk-type">
                      🎯 {talk.type}
                    </div>
                  )}
                  
                  {talk.persons && (
                    <div className="talk-persons">
                      👤 {talk.persons}
                    </div>
                  )}
                </div>
                
                {talk.abstract && (
                  <p className="talk-description">
                    {talk.abstract.length > 150 
                      ? `${talk.abstract.substring(0, 150)}...` 
                      : talk.abstract
                    }
                  </p>
                )}
                
                <div className="talk-footer">
                  <span className="select-hint">Klicken zum Auswählen</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleImport; 