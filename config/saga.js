import { all } from 'redux-saga/effects';
import gallery from 'services/saga/gallery';

export default function* saga() {
  yield all([gallery()]);
}
