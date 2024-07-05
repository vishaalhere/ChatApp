module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "https://34.131.146.112",
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  proxy: {
    enabled: true,
    trustedProxies: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],
  },
});
