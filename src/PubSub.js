export const PubSub = {

    events: {},

    Subscribe(evName, fn) {
      console.log(`PUBSUB: someone just subscribed to know about ${evName}`);
      this.events[evName] = this.events[evName] || [];
      this.events[evName].push(fn);
    },
    
    Unsubscribe(evName, fn) {
      console.log(`PUBSUB: someone just UNsubscribed from ${evName}`);
      if (this.events[evName]) {
        this.events[evName] = this.events[evName].filter((f) => f !== fn);
      }
    },
    
    Publish(evName, data) {
      console.log(`PUBSUB: Making an broadcast about ${evName} with ${data}`);
      if (this.events[evName]) {
        this.events[evName].forEach((f) => {
           f(data);
        });
      }
    },
  };