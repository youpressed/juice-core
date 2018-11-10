import Service from '@ember/service';
import localforage from 'localforage';
import { inject as service } from '@ember/service';

export default Service.extend({
  session: service(),

  async flushLS () {
    await localforage.setItem("appdata", {version:2});

    this.get('session').invalidate();
  },

  // Use this if there are breaking changes to the data model. This will wipe the session object from LS
  // and force a hard refresh to avoid weird migration issues with simple auth
  async checkMigration() {
    let appData = await localforage.getItem("appdata");

    if(appData === null) {
      await this.flushLS();
    }

    appData = await localforage.getItem("appdata");

    if(appData.version != 2) {
      await this.flushLS();
    }
  },
});
