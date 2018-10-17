window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-runtime.deprecate-copy-copyable" },
    { handler: "silence", matchId: "ember-component.send-action" }

    // { handler: "silence", matchId: "ds.serializer.private-should-serialize-has-many" },
    // { handler: "silence", matchId: "ember-metal.model_factory_injections" },
    // { handler: "silence", matchId: "ember-views.lifecycle-hook-arguments" },
    // { handler: "silence", matchId: "ember-router.router" }
  ]
};
