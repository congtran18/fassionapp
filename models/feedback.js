class Feedback {
    constructor(id, realname, title, ownerId, productId, date) {
      this.id = id;
      this.realname = realname;
      this.title = title;
      this.ownerId = ownerId;
      this.productId = productId,
      this.date = date;
    }
  
    get readableDate() {
      return this.date.toLocaleDateString("en-EN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }
  
  export default Feedback;
  