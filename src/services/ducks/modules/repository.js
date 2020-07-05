import produce from 'immer';

export const Types = {
  SET_REPOSITORY: 'repository/SET_REPOSITORY',
};

const INITIAL_STATE = {
  repository: [
    {id: 0, name: '', fullName: '', description: '', stars: 0, forks: 0},
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.SET_REPOSITORY:
      return produce(state, (draft) => {
        draft.repository = action.payload;
      });
    default:
      return state;
  }
};

export const Creators = {
  setRepository: (data) => ({type: Types.SET_REPOSITORY, payload: data}),
};
