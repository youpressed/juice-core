import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import config from 'juice-core/config/environment';
import _ from 'lodash';
import { notEmpty } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';

const client = window.algoliasearch(config.algolia.appId, config.algolia.searchApiId);
const algoliaNodeIndex = client.initIndex('nodes');

export default Component.extend({
  query: "",
  results: [],
  currentHighlightedIndex: 0,

  clearResults() {
    this.set("hasNoMatches", false);
    this.set("results", []);
  },

  reset() {
    this.set("query", "");
    this.clearResults();
  },

  search: task(function* (term) {
    this.clearResults();

    if (isEmpty(term)) {
      return;
    }

    const reg = new RegExp(term, "i");

    const localMatches = _
      .chain(this.get("options"))
      .filter(match => reg.test(match.get('label')))
      .map(match => ({
        action: "add",
        type: match.get("type"),
        label: match.get("label"),
        data: match
      }))
      .take(5)
      .value();

    if (!isEmpty(localMatches)) {
      this.set("results", localMatches);
      return;
    }

    yield timeout(300);

    const algoliaResults = yield algoliaNodeIndex.search(term).hits;

    const remoteMatches = _
      .chain(algoliaResults)
      .map(match => ({
          action: "clone",
          type: match.type,
          label: match.label,
          data: match
        }))
      .take(5)
      .value();

    if (!isEmpty(remoteMatches)) {
       this.set("results", remoteMatches);
       return;
    }

    this.set("results", [
      {
        action: "create",
        label: term
      }
    ]);
    this.set("hasNoMatches", true);
  }).restartable(),

  submitCurrentSelection() {
    const match = this.get("results")[this.get("currentHighlightedIndex")];
    this.reset();

    this.get("onselect")(match);
  },

  highlightPrevious() {
    const current = this.get("currentHighlightedIndex");
    const newIndex = Math.max(0, current - 1);
    this.set("currentHighlightedIndex", newIndex);
  },

  highlightNext() {
    const current = this.get("currentHighlightedIndex");
    const newIndex = Math.min(this.get("results").length - 1, current + 1);
    this.set("currentHighlightedIndex", newIndex);
  },

  actions: {
    onQueryChanged(q){
      this.get("search").perform(q);
    },

    onKeyDown(str, e) {
      switch (e.key) {
        case "Enter":
          this.submitCurrentSelection();
          break;
        case "Tab":
          this.submitCurrentSelection();
          break;
        case "ArrowDown":
          this.highlightNext();
          break;
        case "ArrowUp":
          this.highlightPrevious();
          break;
        default:
          this.set("currentHighlightedIndex", 0);
          break;
      }
    },

    onSelect(result) {
      console.log(result);
    },

    onBlur() {
      this.reset();
    }
  }
});
