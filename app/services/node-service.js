import Service from '@ember/service';

export default Service.extend({
  async destroyNode(node) {
    const children = await node.get("children");
    const parents = await node.get("parents");

    children
      .forEach(async edge => {
        const b = await edge.get("b");
        await edge.destroyRecord();
        await b.save();
      });

    parents
      .forEach(async edge => {
        const a = await edge.get("a");
        await edge.destroyRecord();
        await a.save();
      });

    await node.destroyRecord();
  }
});
