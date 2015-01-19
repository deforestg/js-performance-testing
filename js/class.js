
function TestClass() {}

TestClass.prototype.testVar = 'test';

TestClass.prototype.testEachSelf = function(list) {
    var self = this;
    list.each(function(key, value) {
        $(value).addClass(self.testVar).removeClass(self.testVar);
    });
};

TestClass.prototype.testEachBind = function(list) {
    list.each((function(key, value) {
        $(value).addClass(this.testVar).removeClass(this.testVar);
    }).bind(this));
};

TestClass.prototype.testEachProxy = function(list) {
    list.each($.proxy(function(key, value) {
        $(value).addClass(this.testVar).removeClass(this.testVar);
    }, this));
};

TestClass.prototype.testSelfBinds = function(list) {
    var self = this;
    list.on('click', function(e) {
        $(e.target).addClass(self.testVar).removeClass(self.testVar);
    });
    list.trigger('click');
};

TestClass.prototype.testBindBinds = function(list) {
    list.on('click', (function(e) {
        $(e.target).addClass(this.testVar).removeClass(this.testVar);
    }).bind(this));
    list.trigger('click');
};

TestClass.prototype.testProxyBinds = function(list) {
    list.on('click', $.proxy(function(e) {
        $(e.target).addClass(this.testVar).removeClass(this.testVar);
    }, this));
    list.trigger('click');
};
