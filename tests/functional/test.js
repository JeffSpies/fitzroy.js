define([
    'intern!object',
    'intern/assert',
    'require'
], function (registerSuite, assert, require) {
    var home = 'example/index.html';
    var scroll = "window.scrollTo(0, document.body.scrollHeight);";
    var getBrowser = function(remote) {
        return remote.environmentType.browserName;
    };
    registerSuite({
        name: 'main',

        'loads home url accurately': function() {
            return this.get('remote').get(require.toUrl(home))
                .setFindTimeout(4000)
                .findByLinkText('Home').click().end()
                .getCurrentUrl().then(function (data) {
                    assert.strictEqual(data, "http://localhost:9000/", 'Home url is not accurate, returned instead : ' + data);
                });
        },

        'clicking Test navigates to file Page': function() {
            return this.get('remote').get(require.toUrl(home))
                .setFindTimeout(4000)
                .findByLinkText('File Page').click().end()
                .getCurrentUrl().then(function (data) {
                    assert.strictEqual(data, "http://localhost:9000/project/file", 'File url is not accurate, returned instead : ' + data);
                });
        },

        'clicking Project link loads project url': function() {
            return this.get('remote').get(require.toUrl(home))
                .findByLinkText('File Page').click().end()
                .setFindTimeout(4000)
                .findByLinkText('Project Page').click().end()
                .getCurrentUrl().then(function (data) {
                    assert.strictEqual(data, "http://localhost:9000/project", 'Project url is not accurate, returned instead : ' + data);
                });
        },

        'clicking home navigates to home AND shows content': function() {
            return this.get('remote').get(require.toUrl(home))
                .findByLinkText('Home').click().end()
                .setFindTimeout(3000)
                .findById('pageTitle')
                .getVisibleText()
                .then(function(text){
                    assert.strictEqual(text, 'Welcome Home',
                            'Home Title should say "Welcome Home", returned instead : ' + text );
                })
        },

        'clicking Test navigates to file page AND shows content': function() {
            return this.get('remote').get(require.toUrl(home))
                .findByLinkText('File Page').click().end()
                .setFindTimeout(3000)
                .findById('pageTitle')
                .getVisibleText()
                .then(function(text){
                    assert.strictEqual(text, 'File Page',
                            'About Title should say "File Page", returned instead : ' + text );
                })
        },

        'clicking Project Link navigates to project example AND shows content': function() {
            return this.get('remote').get(require.toUrl(home))
                .findByLinkText('File Page').click().end()
                .setFindTimeout(3000)
                .findByLinkText('Project Page').click().end()
                .setFindTimeout(3000)
                .findById('pageTitle')
                .getVisibleText()
                .then(function(text){
                    assert.strictEqual(text, 'Project Page',
                            'Item Example Title should say "Project Page", returned instead : ' + text );
                })
        },

        // item returns param ID
        'Returns parameter accurately': function() {
            return this.get('remote').get(require.toUrl(home))
                .setFindTimeout(4000)
                .findByLinkText('Parameter').click().end()
                .setFindTimeout(4000)
                .findById('pageTitle')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, "Id: 42", 'Param ID is not accurate, returned instead : ' + text);
                });
        }




    });
});

