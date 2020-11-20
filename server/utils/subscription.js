function Subscription() {
    this.listeners = []; //Observers
}

Subscription.prototype = {
    subscribe: function (fn) {
        this.listeners.push(fn);
    },

    unsubscribe: function (fn) {
        this.listeners = this.listeners.filter(
            function (item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },

    fire: function () {
        this.listeners.forEach(function (item) {
            item.call()
        })
    },


}


module.exports = Subscription;