let lastId = 0;

class Channel {
  constructor(name) {
    this.id = ++lastId;
    this.name = name;
    this.messages = [];
  }
}

module.exports = Channel
