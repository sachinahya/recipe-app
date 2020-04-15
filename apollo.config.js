module.exports = {
  client: {
    includes: ['./packages/client/**/!(*.gql).{gql,ts,tsx}'],
    service: {
      name: 'recipe-app',
      localSchemaFile: './packages/server/schema.gql',
    },
  },
};
