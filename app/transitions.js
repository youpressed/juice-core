export default function(){
  // Add your transitions here, like:
    this.transition(
      this.matchSelector('.ember-modal-dialog'),
      this.use('fade', {duration: 100})
    );

}
