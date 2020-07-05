import {Creators as repoCreators} from '../../ducks/modules/repository';
import store from '../../ducks/store';
import {get} from '~/services/utils/clientRest';
import urls from '~/constants/urls';

const {dispatch} = store;

const respositoryService = {
  add: async (respository) => {
    const response = await get(urls.repositoryGet(respository), (data) => data);
    const record = {
      id: response.id,
      name: response.name,
      fullName: response.full_name,
      description: response.description,
      stars: response.stargazers_count,
      forks: response.forks_count,
    };

    const repositories = [];
    store.getState().repository.repository.forEach((item) => {
      repositories.push(item);
    });
    repositories.push(record);
    dispatch(repoCreators.setRepository(repositories));
  },
};

export default respositoryService;
