module.exports=function (grunt){
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.initConfig({
		jshint: {
			all: ['*.js', 'db/**/*.js','logic/**/*.js']
		},
		mochaTest: {
			test: {
				reporter: 'spec',
			},
			source: ['test/*.js']
		}
	});

	
	grunt.registerTask('test',['jshint','mochaTest']);

	grunt.registerTask('default',['jshint','mochaTest']);

};