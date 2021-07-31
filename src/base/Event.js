class Event {
  constructor(client, { on = null, name }) {
    this.client = client;
    this.conf = { on, name };
  }

  run() {
    throw new Error(`Event ${this.conf.on} is missing run method`);
  }
}

export default Event
