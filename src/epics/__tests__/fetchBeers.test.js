import { TestScheduler } from 'rxjs/testing';
import { initialState } from '../../reducers/configReducer';
import { fetchBeersEpic } from '../fetchBeers';
import {
  fetchFulfilled,
  setStatus,
  search,
  fetchFailed,
  cancel,
  reset,
} from '../../reducers/beersActions';
import { of } from 'rxjs';

it('produces correct actions (success)', function() {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, cold, expectObservable }) => {
    const action$ = hot('a', {
      a: search('ship'),
    });
    const state$ = of({
      config: initialState,
    });
    const dependencies = {
      getJSON: url => {
        return cold('-a', {
          a: [{ name: 'Beer 1' }],
        });
      },
      document: document,
    };
    const output$ = fetchBeersEpic(action$, state$, dependencies);
    expectObservable(output$).toBe('500ms ab', {
      a: setStatus('pending'),
      b: fetchFulfilled([{ name: 'Beer 1' }]),
    });
  });
});

it('produces correct actions (error)', function() {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, cold, expectObservable }) => {
    const action$ = hot('a', {
      a: search('ship'),
    });
    const state$ = of({
      config: initialState,
    });
    const dependencies = {
      getJSON: url => {
        return cold('-#', null, {
          response: {
            message: 'oops!',
          },
        });
      },
      document: document,
    };
    const output$ = fetchBeersEpic(action$, state$, dependencies);
    expectObservable(output$).toBe('500ms ab', {
      a: setStatus('pending'),
      b: fetchFailed('oops!'),
    });
  });
});

it('produces correct actions (Cancel)', function() {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, cold, expectObservable }) => {
    const action$ = hot('a 500ms -b', {
      a: search('ship'),
      b: cancel(),
    });
    const state$ = of({
      config: initialState,
    });
    const dependencies = {
      getJSON: url => {
        return cold('--a');
      },
      document: document,
    };
    const output$ = fetchBeersEpic(action$, state$, dependencies);
    expectObservable(output$).toBe('500ms a-b', {
      a: setStatus('pending'),
      b: reset(),
    });
  });
});
