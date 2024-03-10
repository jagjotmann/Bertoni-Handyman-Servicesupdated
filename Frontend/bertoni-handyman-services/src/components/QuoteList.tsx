import React from 'react';

interface Quote {
  id: string;
  detail: string;
  status: string;
  // Include other fields as necessary
}

interface QuoteListProps {
  quotes: Quote[];
}

const QuoteList = ({ quotes }: { quotes: Quote[] }) => {
  return (
    <div>
      <h2>Quotes</h2>
      <QuoteList quotes={quotes} />

      <ul>
      {quotes.map((quote) => (
        <li key={quote.id}>{quote.detail} - {quote.status}</li>
      ))}
    </ul>
    </div>
  );
};

export default QuoteList;