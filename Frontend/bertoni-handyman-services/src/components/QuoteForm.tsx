import React, { useState, useEffect } from 'react';

interface QuoteFormProps {
  initialData?: any; // Consider defining a more specific type for your quote data
  onSubmit: (data: any) => void; // Adjust the type accordingly for better type safety
}

const QuoteForm: React.FC<QuoteFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="quoteDetail"
        value={formData.quoteDetail || ''}
        onChange={handleChange}
        placeholder="Enter quote detail"
      />
      {/* Example of additional input fields */}
      <input
        name="authorName"
        value={formData.authorName || ''}
        onChange={handleChange}
        placeholder="Enter author's name"
      />
      <input
        name="source"
        value={formData.source || ''}
        onChange={handleChange}
        placeholder="Enter source"
      />
      {/* Add more input fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuoteForm;