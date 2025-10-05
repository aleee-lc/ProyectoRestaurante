module.exports = {
  schema: './prisma/schema.prisma',
  backend: {
    generator: 'nexus', // usa "nexus" para CRUD/GraphQL base
    output: './src/generated', // dónde guardar el código generado
  },
};
