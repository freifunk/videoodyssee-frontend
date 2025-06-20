const Status404 = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '50vh',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '6rem', margin: 0, color: '#6c757d' }}>404</h1>
      <h2 style={{ color: '#333', marginBottom: '1rem' }}>Seite nicht gefunden</h2>
      <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
        Die angeforderte Seite konnte nicht gefunden werden.
      </p>
      <a 
        href="/" 
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.75rem 1.5rem',
          textDecoration: 'none',
          borderRadius: '4px',
          transition: 'background-color 0.2s'
        }}
      >
        Zurück zur Startseite
      </a>
    </div>
  );
};

export default Status404;
