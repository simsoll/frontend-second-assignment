function gulpConfig(){
    var build = './build/';
    var client = './public/';
    var server = './';
    var clientApp = client + 'app/';
    var jsApp = clientApp + '**/app.js';
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
        css: client + 'styles/styles.css',
        cssVendor: vendor + '**/*.css',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        images: client + 'images/**/*.*',
		index: client + 'index.html',
        js: './**/*.js',
        jsApp: jsApp,
        jsVendor: vendor + '**/*.js',
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
			files: [client + '**/*'],
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