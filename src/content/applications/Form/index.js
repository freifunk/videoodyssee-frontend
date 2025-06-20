import { useState, useEffect } from 'react';

const initialValues = {
  title: "",
  subtitle: "",
  persons: [],
  tags: [],
  conference: "",
  language: "eng",
  date: new Date().toISOString().split('T')[0],
  url: "",
  name: "",
  email: "",
  link: "",
  description: ""
};

const Form = () => {
  const [values, setValues] = useState(initialValues);
  const [err, setErr] = useState({ err: false, message: '' });
  const [success, setSuccess] = useState({ success: false, message: '' });
  const [conferences, setConferences] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/video/`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(values),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setSuccess({ success: true, message: resJson.data });
        setTimeout(() => setSuccess({ success: false, message: '' }), 5000);
      } else {
        setErr({ err: true, message: resJson.message });
        setTimeout(() => setErr({ err: false, message: '' }), 5000);
      }
    } catch (err) {
      console.log(err);
      setErr({ err: true, message: 'Ein Fehler ist aufgetreten.' });
      setTimeout(() => setErr({ err: false, message: '' }), 5000);
    }
  };

  useEffect(() => {
    const getConferences = async () => {
      try {
        let res = await fetch(`${process.env.REACT_APP_VOCTOWEB_API_URL}/public/conferences`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        let resJson = await res.json();
        setConferences(resJson.conferences || []);
        if (resJson.conferences && resJson.conferences.length > 0) {
          setValues(prevValues => ({ 
            ...prevValues, 
            conference: resJson.conferences[0].acronym 
          }));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getConferences();
  }, []);

  return (
    <div className="form-container">
      <img src="/static/images/logo/logo-small.png" alt='Freifunk logo' className="logo" />
      <h2 className="form-title">Video Upload</h2>
      
      {success.success && (
        <div className="alert alert-success">
          {success.message}
        </div>
      )}
      
      {err.err && (
        <div className="alert alert-error">
          {err.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input
            className="form-input"
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="subtitle">Subtitle</label>
          <input
            className="form-input"
            type="text"
            id="subtitle"
            name="subtitle"
            value={values.subtitle}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="persons">Persons</label>
          <div className="tag-input-container">
            <div className="tags">
              {values.persons.map((person, index) => (
                <span key={index} className="tag">
                  {person}
                  <button
                    type="button"
                    className="tag-remove"
                    onClick={() => {
                      const newPersons = values.persons.filter((_, i) => i !== index);
                      setValues({ ...values, persons: newPersons });
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              className="tag-input"
              type="text"
              placeholder="Add person and press Enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const value = e.target.value.trim();
                  if (value && !values.persons.includes(value)) {
                    setValues({
                      ...values,
                      persons: [...values.persons, value]
                    });
                    e.target.value = '';
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="tags">Tags</label>
          <div className="tag-input-container">
            <div className="tags">
              {values.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  <button
                    type="button"
                    className="tag-remove"
                    onClick={() => {
                      const newTags = values.tags.filter((_, i) => i !== index);
                      setValues({ ...values, tags: newTags });
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              className="tag-input"
              type="text"
              placeholder="Add tag and press Enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const value = e.target.value.trim();
                  if (value && !values.tags.includes(value)) {
                    setValues({
                      ...values,
                      tags: [...values.tags, value]
                    });
                    e.target.value = '';
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="conference">Conference</label>
          <select
            className="form-select"
            id="conference"
            name="conference"
            value={values.conference}
            onChange={handleInputChange}
          >
            {conferences.map(({ acronym, title }) => (
              <option key={acronym} value={acronym}>{title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="language">Language</label>
          <select
            className="form-select"
            id="language"
            name="language"
            value={values.language}
            onChange={handleInputChange}
          >
            <option value="eng">English</option>
            <option value="deu">German</option>
            <option value="rus">Russian</option>
            <option value="fra">French</option>
            <option value="spa">Spanish</option>
            <option value="jpn">Japanese</option>
            <option value="hin">Hindi</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="date">Date</label>
          <input
            className="form-input"
            type="date"
            id="date"
            name="date"
            value={values.date}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="url">Video URL</label>
          <input
            className="form-input"
            type="url"
            id="url"
            name="url"
            value={values.url}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input
            className="form-input"
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="link">Link</label>
          <input
            className="form-input"
            type="url"
            id="link"
            name="link"
            value={values.link}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea
            className="form-input form-textarea"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
