
var testObject = {

    testVar: 'test',

    testEachSelf: function(list) {
        var self = this;
        list.each(function(key, value) {
            $(value).addClass(self.testVar).removeClass(self.testVar);
        });
    },
    testEachBind: function(list) {
        list.each((function(key, value) {
            $(value).addClass(this.testVar).removeClass(this.testVar);
        }).bind(this));
    },
    testEachProxy: function(list) {
        list.each($.proxy(function(key, value) {
            $(value).addClass(this.testVar).removeClass(this.testVar);
        }, this));
    }

};
