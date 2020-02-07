import {
  debounceTime,
  map,
  switchMap,
  filter,
  catchError,
  delay,
  mapTo,
  withLatestFrom,
  pluck,
} from 'rxjs/operators';
import {
  SEARCH,
  fetchFulfilled,
  setStatus,
  fetchFailed,
  CANCEL,
  reset,
} from './beersActions';
import { ofType } from 'redux-observable';
import { concat, merge, fromEvent, of, race } from 'rxjs';
const search = (apiBase, perPage, term) =>
  `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`;

export default function fetchBeersEpic(action$, state$, { getJSON, document }) {
  return action$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    filter(({ payload }) => payload.trim() !== ''),
    withLatestFrom(state$.pipe(pluck('config'))),
    switchMap(([{ payload }, config]) => {
      const ajax$ = getJSON(
        search(config.apiBase, config.perPage, payload),
      ).pipe(
        // delay(2500),
        map(resp => fetchFulfilled(resp)),
        catchError(err => {
          return of(fetchFailed(err.response.message));
        }),
      );

      const blocker$ = merge(
        action$.pipe(ofType(CANCEL)),
        fromEvent(document, 'keyup').pipe(
          filter(evt => evt.key === 'Escape' || evt.key === 'Esc'),
        ),
      ).pipe(mapTo(reset()));

      return concat(of(setStatus('pending')), race(ajax$, blocker$));
    }),
  );
}
