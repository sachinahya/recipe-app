module.exports = {
  client: {
    includes: ['src/**/!(*.generated).{gql,ts,tsx}'],
    service: {
      name: 'recipe-app',
      url: 'http://localhost:4000/graphql',
    },
  },
};
