<html>
<head>
    <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <script type="application/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="bower_components/highlightjs/styles/default.css">
    <link rel="stylesheet" type="text/css" href="bower_components/highlightjs/styles/monokai.css">
    <script type="application/javascript" src="bower_components/highlightjs/highlight.pack.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
</head>

<body>

<div class="jumbotron">
    <div class="container">
        <h1>Comparing js performance</h1>
        <p class="lead">Comparing different ways of doing things</p>
    </div>
</div>

<div class="container">
    <div id="results" class="row-fluid marketing">
        <h3>self vs bind vs proxy</h3>
        <div class="col-md-4">
            <h4>single bind then loop:</h4>
            <p>
                <label for="test-each-data-length">Iterations after bind</label>
                <input type="text" id="test-each-data-length" value="1000">
                <a class="btn btn-small btn-success"  id="test-each">Test</a>
            </p>
            <ul class="list-group test-result each-test"></ul>
        </div>
        <div class="col-md-8">
            <h4>test code</h4>
            <div class="highlight"><pre><code class="javascript hljs">
/* "object" */
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
/* "class" */
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
            </code></pre></div>
        </div>
        <div class="col-md-4">
            <h4>multiple binds:</h4>
            <p>
                <label for="test-bind-data-length">Number of binds</label>
                <input type="text" id="test-bind-data-length" value="1000">
                <a class="btn btn-small btn-success"  id="test-bind">Test</a>
            </p>
            <ul class="list-group test-result bind-test"></ul>
        </div>
        <div class="col-md-8">
            <h4>test code</h4>
            <div class="highlight"><pre><code class="javascript hljs">
/* "object" */
testSelfBinds: function(list) {
    var self = this;
    list.on('click', function(e) {
        $(e.target).addClass(self.testVar).removeClass(self.testVar);
    });
    list.trigger('click');
},
testBindBinds: function(list) {
    var self = this;
    list.on('click', (function(e) {
        $(e.target).addClass(self.testVar).removeClass(self.testVar);
    }).bind(this));
    list.trigger('click');
},
testProxyBinds: function(list) {
    var self = this;
    list.on('click', $.proxy(function(e) {
        $(e.target).addClass(self.testVar).removeClass(self.testVar);
    }, this));
    list.trigger('click');
}
/* "class" */
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
            </code></pre></div>
        </div>
    </div>
</div>

<script type="application/javascript" src="js/object.js"></script>
<script type="application/javascript" src="js/class.js"></script>
<script type="application/javascript" src="js/test-performance.js"></script>

</body>

</html>
