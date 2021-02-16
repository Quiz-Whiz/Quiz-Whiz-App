import React from 'react';
import '../stylesheets/Results.css';

type Player = {
  username: string,
  score: number
};
const Result = (results:Player[], previousAnswer:string) => {
  const scores:JSX.Element[] = [];
  results.sort((a, b) => b.score - a.score);
  for (let i = 0; i < results.length; i += 1) {
    const score = (
      <div>
        { results[i].username }
        :
        {'  '}
        {results[i].score}
        <br />
        <br />
      </div>
    );
    scores.push(score);
  }
  return (
    <div className="resultsPage">
      <div className="resultsContainer">
        <div className="resultsHeader">
          <span style={{ color: '#ad229d' }}>L</span>
          ea
          <span style={{ color: '#1ae611' }}>d</span>
          erb
          <span style={{ color: 'red' }}>o</span>
          ar
          <span style={{ color: '#eef00b' }}>d</span>
          :
        </div>
        <br />
        <div>
          <span>Correct answer:</span>
        </div>
        <br />
        <div>
          <span>{previousAnswer}</span>
        </div>
        <br />
        <br />
        <br />
        {scores}
        <br />
        <br />
      </div>
    </div>
  );
};

export default Result;
