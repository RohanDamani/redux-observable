import React from 'react';

export function BeerList(props) {
  const { data } = props;
  console.log(`BeersList:6 (BeerList) - props:`, props);
  return (
    <ul className="App-list">
      {data.map(beer => {
        return (
          <li key={beer.id}>
            <img src={beer.image_url} alt={beer.name}/>
            <p>{beer.name}</p>
            <p>{beer.tagline}</p>
          </li>
        );
      })}
    </ul>
  );
}
