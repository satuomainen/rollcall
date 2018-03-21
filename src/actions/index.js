import axios from 'axios';

export const EXPRESS_TEST_START = 'EXPRESS_TEST_START';
export const expressTestStart = () => ({ type: EXPRESS_TEST_START });

export const EXPRESS_TEST_RESULTS = 'EXPRESS_TEST_RESULTS';
export const expressTestResults = data => ({ type: EXPRESS_TEST_RESULTS, data });

export const EXPRESS_TEST_ERROR = 'EXPRESS_TEST_ERROR';
export const expressTestError = data => ({ type: EXPRESS_TEST_ERROR, data });

export const EXPRESS_TEST = 'EXPRESS_TEST';
export const expressTest = () => dispatch => {
  dispatch(expressTestStart());
  axios.get('/api/express-test')
    .then(res => dispatch(expressTestResults(JSON.stringify(res.data))))
    .catch(err => dispatch(expressTestError(err)));
};

export const DB_TEST_START = 'DB_TEST_START';
export const dbTestStart = () => ({ type: DB_TEST_START });
export const DB_TEST_RESULTS = 'DB_TEST_RESULTS';
export const dbTestResults = data => ({ type: DB_TEST_RESULTS, data });
export const DB_TEST_ERROR = 'DB_TEST_ERROR';
export const dbTestError = data => ({ type: DB_TEST_ERROR, data });

export const DB_TEST = 'DB_TEST';
export const dbTest = () => dispatch => {
  dispatch(dbTestStart());
  axios.get('/api/products')
    .then(res => dispatch(dbTestResults(JSON.stringify(res.data))))
    .catch(err => dispatch(dbTestError(err)));
};
