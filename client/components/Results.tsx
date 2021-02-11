import React from 'react';

type Player = {
  username: string,
  score: number
};
const Result = (results:Player[]) => {
  const scores:JSX.Element[] = [];
  // sort up here
  results.sort((a, b) => b.score - a.score);
  for (let i = 0; i < results.length; i += 1) {
    const score = (
      <div>
        { results[i].username }
        :
        {results[i].score}
      </div>
    );
    scores.push(score);
  }
  return (
    <div className="resultsPage">
      <div className="resultsContainer">
        <div className="resultsHeader">
          Leader Board:
        </div>
        <br />
        {scores}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Result;
