function generateList(length) {
    var list = $('<ul>');
    for (var i = 0; i < length; i++) {
        list.append($('<li>'));
    }
    return list.find('li');
}

var start, end, list, testClass = new TestClass(),
    results = $('#results').find('ul');

function benchmark(func, desc) {
    start = (new Date()).getTime();
    func();
    end = (new Date()).getTime();
    results.append($('<li>').text(desc + ':  ' + (end - start)));
}

var dataLengthInput = $('#test-each-data-length');
$('#test-each').on('click', function() {
    results.empty();
    list = generateList(parseInt(dataLengthInput.val(), 10));

    benchmark(function() {
        testObject.testEachSelf(list);
    }, 'Object self each');
    benchmark(function() {
        testObject.testEachBind(list);
    }, 'Object bind each');
    benchmark(function() {
        testObject.testEachProxy(list);
    }, 'Object proxy each');

    benchmark(function() {
        testClass.testEachSelf(list);
    }, 'Class self each');
    benchmark(function() {
        testClass.testEachBind(list);
    }, 'Class bind each');
    benchmark(function() {
        testClass.testEachProxy(list);
    }, 'Class proxy each');
});
