import React from 'react';

const SimpleTest = () => {
  console.log('SimpleTest component rendering');
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1>Simple Test Component</h1>
      <p>If you can see this, React is working!</p>
    </div>
  );
};

export default SimpleTest;
