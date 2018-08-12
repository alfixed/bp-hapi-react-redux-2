import { all } from 'redux-saga/effects';
import { watchTestButton } from './app-saga';
import { watchFetchCourses, watchAddCourse, watchDeleteCourse, watchUpdateCourse } from './courses-saga';

export default function* rootSaga() {
  yield all([
    watchTestButton(),
    watchFetchCourses(),
    watchAddCourse(),
    watchDeleteCourse(),
    watchUpdateCourse()
  ]);
}
