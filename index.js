document.getElementById('conv').addEventListener('click', function () {
    var sqltext = document.getElementById('sql').value;
    var cstext = document.getElementById('cs');
    cstext.value = "";
    for (var elem of sqltext.split('\n')) {
        var name = elem.split('\t')[0];
        var dtype = elem.split('\t')[1];
        if ( dtype.includes('varchar')) {
            dtype = 'string';
        }
       else if (dtype.includes('bit')) {
            dtype = 'bool';
        }
        else if (dtype.includes('date')) {
            dtype = 'DateTime';
        }
        cstext.value += `\npublic ${dtype} ${name} { get; set; }`;
    }
})