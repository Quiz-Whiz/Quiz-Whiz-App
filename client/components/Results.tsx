import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import '../stylesheets/Results.css';

const Result: React.FC = React.memo(() => {
  //declare context
  const history = useHistory();
  const { results, setResults, endGame, question, setQuestion } = useContext(GlobalContext);
  useEffect(() => {
    if (endGame === false) {
      setTimeout(() => {
        history.push('/game');
      }, 4000);
    }
  });
  const endGameBtn: JSX.Element = (
    <Link className="returnLobby_link" to="/lobby">
      <button className="endGamePgBtn" type="button">
        Return to Lobby
      </button>
    </Link>
  );
  let temp:JSX.Element = (
    <div>
      <br />
      <br />
      <br />
    </div>
  );
  const sortTable: any = results.sort((a: any, b: any) => b.score - a.score);
  console.log(sortTable);
  // for all the values
  const tableOfResults:any = sortTable.map((el:any, index:any) => <p key={index}> {index + 1} : {el[Object.keys(el)[0]]} : {el[Object.keys(el)[1]]}</p>);
  if (endGame === true) {
    temp = endGameBtn;
  }
  return (
    <div className="resultsPage">
      <div className="resultsContainer">
        <div className="resultsHeader">
          Leader Board:
        </div>
        <br />
        {tableOfResults}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {temp}
      </div>
    </div>
  );
});

export default Result;
