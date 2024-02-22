import React from 'react';

interface GoogleCalendarProps {
  embedUrl: string;
  width?: string;
  height?: string;
}

const GoogleCalendar: React.FC<GoogleCalendarProps> = ({ embedUrl, width = '800px', height = '600px' }) => {
  if (!embedUrl) {
    return <div>Embed URL is missing</div>;
  }

  return (
    <iframe
      src={"https://calendar.google.com/calendar/embed?src=wizardsweb42%40gmail.com&ctz=America%2FLos_Angeles"} 
      style={{ border: '0', width, height }} 
      width={width} 
      height={height} 
      frameBorder={0} 
      scrolling="no"
      title="Google Calendar"
    />
  );
};

export default GoogleCalendar;
