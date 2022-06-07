document.getElementById('conv').addEventListener('click', function () {
    var dropdown = document.getElementById('drpdown').value;
    var sqltext = document.getElementById('sql').value;
    var cstext = document.getElementById('cs');
    cstext.value = "";
    switch (dropdown) {
        case '0':
            for (var elem of sqltext.split('\n')) {
                var name = elem.split('\t')[0];
                var dtype = elem.split('\t')[1];
                if (name.length < 3 || dtype.length < 3) {
                    continue;
                }
                if (dtype.includes('varchar')) {
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
            break;
        case '1':
            sqltext = cstext.value;
            cstext.value = 'public class ' + sqltext.split(' ')[2] + ' { \n';
            for (var elem of sqltext.replace('\n', '').replace('\t', '').split('(')[1].split(',')) {
                var elements = elem.replace(/^\s+|\s+$/g, '').split(' ');
                var name = elements[0];
                var dtype = elements[1];
                if (name  && dtype){
    if (dtype.includes('varchar')) {
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
            }
            cstext.value += `\n}`;

}
})