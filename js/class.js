
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
