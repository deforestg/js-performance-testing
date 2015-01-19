
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
    },

    testSelfBinds: function(list) {
        var self = this;
        list.on('click', function(e) {
            $(e.target).addClass(self.testVar).removeClass(self.testVar);
        });
        list.trigger('click');
    },
    testBindBinds: function(list) {
        list.on('click', (function(e) {
            $(e.target).addClass(this.testVar).removeClass(this.testVar);
        }).bind(this));
        list.trigger('click');
    },
    testProxyBinds: function(list) {
        list.on('click', $.proxy(function(e) {
            $(e.target).addClass(this.testVar).removeClass(this.testVar);
        }, this));
        list.trigger('click');
    }

};
