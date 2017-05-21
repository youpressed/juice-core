window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "container-lookupFactory" },
    { handler: "silence", matchId: "ds.serializer.private-should-serialize-has-many" },
    { handler: "silence", matchId: "ember-metal.model_factory_injections" }
  ]
};
