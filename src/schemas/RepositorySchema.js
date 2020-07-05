export class RepositorySchema {
  static schema = {
    name: 'Repository',
    properties: {
      id: 'int',
      name: 'string',
      fullName: 'string',
      description: 'string',
      stars: 'int',
      forks: 'int',
    },
  };
}
