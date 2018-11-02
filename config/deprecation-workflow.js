window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-runtime.deprecate-copy-copyable" },
    { handler: "silence", matchId: "ember-component.send-action" },
    { handler: "silence", matchId: "ember-views.event-dispatcher.jquery-event" }
  ]
};
