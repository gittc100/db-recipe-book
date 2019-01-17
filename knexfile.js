// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './DB_Recipe.sqlite3'
    },
    useNullAsDefault: true
  }
};
