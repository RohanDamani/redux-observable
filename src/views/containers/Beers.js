import React from "react";
import { connect } from "react-redux";
import { BeerList } from "../components/BeersList";
import { search, cancel } from "../../redux/beers/beersActions";
import { setConfig } from "../../redux/config/configActions";
import { Button, Input, Dropdown, Loader, Segment } from "semantic-ui-react";

const OPTIONS = [
  { key: "1", value: 1, text: "One" },
  { key: "2", value: 2, text: "Two" },
  { key: "3", value: 3, text: "Three" },
  { key: "4", value: 4, text: "Four" },
  { key: "5", value: 5, text: "Five" },
  { key: "6", value: 6, text: "Six" },
  { key: "7", value: 7, text: "Seven" },
  { key: "8", value: 8, text: "Eight" },
  { key: "9", value: 9, text: "Nine" },
  { key: "10", value: 10, text: "Ten" }
];

export function Beers(props) {
  const { data, status, messages, cancel, search, config, setConfig } = props;
  return (
    <>
      <Segment>
        <Dropdown
          placeholder="# of Results"
          selection
          options={OPTIONS}
          onChange={(e, d) => setConfig({ perPage: d.value })}
          defaultValue={config.perPage}
        />
        <Input
          placeholder="Search beers"
          focus
          onChange={evt => search(evt.target.value)}
          icon="search"
        />
        {status === "pending" && (
          <Button floated="right" basic negative type="text" onClick={cancel}>
            Cancel
          </Button>
        )}
      </Segment>
      {status === "pending" && <Loader active />}
      {status === "success" && (
        <div className="App-content">
          <BeerList data={data} />
        </div>
      )}
      {status === "failure" && (
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
    config: state.config
  };
}

export default connect(mapState, { search, cancel, setConfig })(Beers);
