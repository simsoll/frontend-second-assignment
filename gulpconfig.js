function gulpConfig(){
    var root = './';
    var build = './build/';
    var client = './public/';
    var server = root;
    var clientApp = client + 'app/';
    var jsApp = clientApp + '**/*.js';
    var vendor = client + 'vendor/';

    var config = {
        /**
         * files paths
         */
        alljs: [
            client + '**/*.js',
            './*.js'
        ],
        build: build,
        client: client,
		clientCss: client + 'css/',
        cssApp: client + 'css/styles.css',
        cssVendor: vendor + '**/*.css',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        images: client + 'images/**/*.*',
		index: root + 'index.html',
        js: './**/*.js',
        jsApp: jsApp,
        jsVendor: vendor + '**/*.js',
        root: root,
        server: server,
        styles: './sass/**/*.scss',
        vendor: vendor,        

        /**
         * Bower settings
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        
		/**
		 * Browsersync settings
		 */
		browserSync: {
			files: [client + '**/*.*'],
			port: 4000,
			browsers: ['chrome'],			
		},
        /**
         * Node settings
         */
        defaultPort: 7203,
        nodeServer: './server.js'
    };

	return config;
}

module.exports = gulpConfig;