import axios from 'axios';

export const urlConfig = (getState) => {
  if( getState().authReducer.isPrivacyMode ) {
    return 'https://globaltraqsdev.com';
  } else {
    return 'http://192.81.130.223:8001';
  }
};

export const loadStories = () => {
  return (dispatch, getState) => { //Might have to remove getState
    dispatch({ type: 'LOAD_STORIES_START'});
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    axios.get(`${urlConfig(getState)}/api/pins`, config)
    .then((res) => {
      dispatch({ type: 'LOAD_STORIES_SUCCESS', payload: res.data});
    }).catch((err) => {
      dispatch({ type: 'LOAD_STORIES_FAILURE', payload: error});
    })
  }
}
