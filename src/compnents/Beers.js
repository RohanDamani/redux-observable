import React from 'react';
import { connect } from 'react-redux';
import { BeerList } from './BeersList';
import { search, cancel } from '../reducers/beersActions';
import { setConfig } from '../reducers/configActions';

export function Beers(props) {
  const { data, status, messages, cancel, search, config, setConfig } = props;
  return (
    <>
      <div className="App-inputs">
        <select
          name="per-page"
          defaultValue={config.perPage}
          onChange={e => setConfig({ perPage: Number(e.target.value) })}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => {
            return (
              <option key={value} value={value}>
                {value} results
              </option>
            );
          })}
        </select>
        <input
        type="text"
        placeholder="Search beers"
        onChange={evt => search(evt.target.value)}
        />
      </div>
      {status === 'pending' && (
        <>
          <span className="App-spinner">Spinner</span>
          <button type="text" onClick={cancel}>
            Cancel
          </button>
        </>
      )}
      {status === 'success' && (
        <div className="App-content">
          <BeerList data={data} />
        </div>
      )}
      {status === 'failure' && (
        <div className="App-messages">
          <p>Oops! {messages[0].text}</p>
        </div>
      )}
    </>
  );
}

function mapState(state) {
  return {
    ...state.beers,
    config: state.config,
  };
}

export default connect(mapState, { search, cancel, setConfig })(Beers);
