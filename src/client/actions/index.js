export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const FETCH_DRAWINGS = 'fetch_drawings';
export const fetchDrawings = () => async (dispatch, getState, api) => {
  const res = await api.get('/user/drawings');

  dispatch({
    type: FETCH_DRAWINGS,
    payload: res
  });
};

export const UPLOAD_DRAWINGS = 'upload_drawings';
export const uploadDrawings = (data) => async (dispatch, getState, api) => {
  const res = await api.post('/drawing/upload', data);

  dispatch({
    type: FETCH_DRAWINGS,
    payload: res
  });
};
