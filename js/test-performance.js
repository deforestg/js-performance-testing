function generateList(length) {
    var list = $('<ul>');
    for (var i = 0; i < length; i++) {
        list.append($('<li>'));
    }
    return list.find('li');
}

var testClass = new TestClass(),
    results = $('#results').find('.test-result'),
    eachResults = results.filter('.each-test'),
    bindResults = results.filter('.bind-test'),
    eachDataLengthInput = $('#test-each-data-length'),
    bindDataLengthInput = $('#test-bind-data-length');

function benchmark(func, desc, appendTo) {
    var start = (new Date()).getTime();
    func();
    var end = (new Date()).getTime();
    appendTo.append($('<li class="list-group-item">').text(desc + ':  ' + (end - start)));
}

$('#test-each').on('click', function() {
    eachResults.empty();
    var list = generateList(parseInt(eachDataLengthInput.val(), 10));

    benchmark(function() {
        testObject.testEachSelf(list);
    }, 'Object self each', eachResults);
    benchmark(function() {
        testObject.testEachBind(list);
    }, 'Object bind each', eachResults);
    benchmark(function() {
        testObject.testEachProxy(list);
    }, 'Object proxy each', eachResults);

    benchmark(function() {
        testClass.testEachSelf(list);
    }, 'Class self each', eachResults);
    benchmark(function() {
        testClass.testEachBind(list);
    }, 'Class bind each', eachResults);
    benchmark(function() {
        testClass.testEachProxy(list);
    }, 'Class proxy each', eachResults);
});

$('#test-bind').on('click', function() {
    bindResults.empty();
    var list = generateList(parseInt(bindDataLengthInput.val(), 10));

    benchmark(function() {
        testObject.testSelfBinds(list);
    }, 'Object self binds', bindResults);
    benchmark(function() {
        testObject.testBindBinds(list);
    }, 'Object bind binds', bindResults);
    benchmark(function() {
        testObject.testProxyBinds(list);
    }, 'Object proxy binds', bindResults);

    benchmark(function() {
        testClass.testSelfBinds(list);
    }, 'Class self binds', bindResults);
    benchmark(function() {
        testClass.testBindBinds(list);
    }, 'Class bind binds', bindResults);
    benchmark(function() {
        testClass.testProxyBinds(list);
    }, 'Class proxy binds', bindResults);
});
