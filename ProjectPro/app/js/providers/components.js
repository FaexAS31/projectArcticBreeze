export async function loadComponent(options) {
    // Split url
    var urlParts = options.url.split('/');
    var fileName = urlParts[urlParts.length - 1];
    // Request and module urls
    var now = new Date();
    var componentUrl = window.location.href + options.url + '/' + fileName;
    var requestUrl = componentUrl + '.html' + '?a=' + now.getTime();
    var moduleUrl = componentUrl + '.js';
    // Get component
    console.log('Loading Component ' + requestUrl);
    console.log(document.getElementById(options.parent));
    return await fetch(requestUrl, {
        headers: {
            'pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'cache': 'no-store'
        }
    })
    .then ( (response) => response.text() )
    .then ( (html) => { document.getElementById(options.parent).innerHTML = html} )
    .then ( () => { importModule(moduleUrl) } )
}

// Import module
async function importModule(moduleUrl) {
    console.log('Importing Module ' + moduleUrl);
    let { init } = await import(moduleUrl);
    init();
}