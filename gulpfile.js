var gulp = require('gulp'),
less = require("gulp-less"),
uglify = require("gulp-uglify"),
rename = require('gulp-rename'),
cssmin = require("gulp-minify-css"),
cssver = require("gulp-make-css-url-version"),
htmlmin = require("gulp-htmlmin"),
concat = require('gulp-concat'),
livereload = require('gulp-livereload'),
// jshint = require('gulp-jshint'),
browserSync = require("browser-sync");



//编译less文件
gulp.task("compile",function() {
	gulp.src('app/css/**/*.less')
	.pipe(less())
	.pipe(cssver())
	.pipe(gulp.dest('app/css'))
	.pipe(livereload());
})

//监听到less文件有变化时执行编译less任务
gulp.task("testWatch", function() {
	gulp.watch("app/css/**/*.less", ['compile']);
})

//启动服务器及浏览器和服务器之间的socket
//默认开启啦监听服务
gulp.task("default", ['testWatch'], function() {
	console.log("开启服务");
	var files = [
		'app/page/**/*.html',
		'app/page/*.html',
		'app/css/**/*.css',
		'app/js/**/*.js'
	];
	browserSync.init(files, {
		server: {
			baseDir: 'app',
			index: 'page/index.html'
		},
		port: 9999
	});
})

//打包压缩文件
gulp.task("min", function(){
	gulp.src("app/js/**/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("dist/js"));

	gulp.src('app/css/**/*.css')
	.pipe(cssmin())
	.pipe(gulp.dest('dist/css'));

	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        //省略布尔属性的值 <input checked="true"/> ==> <input />
        collapseBooleanAttributes: true,
        //删除所有空格作属性值 <input id="" /> ==> <input />
        removeEmptyAttributes: true,
        //删除<script>的type="text/javascript"
        removeScriptTypeAttributes: true,
        //删除<style>和<link>的type="text/css"
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };

	gulp.src(['app/page/**/*.html', 'app/page/*.html'])
	.pipe(htmlmin(options))
	.pipe(gulp.dest('dist/page'));
})

//启动打包过后的项目文件夹
gulp.task("dist", function() {
	var files = [
		'dist/page/**/*.html',
		'dist/page/*.html',
		'dist/css/**/*.css',
		'dist/js/**/*.js'
	];
	browserSync.init(files, {
		server: {
			baseDir: 'dist',
			index: 'page/index.html'
		},
		port: 9001
	});
})














//压缩js文件
// gulp.task("uglifyJs", function() {
// 	gulp.src("app/js/**/*.js",false, false)
// 	.pipe(jshint())
// 	.pipe(jshint.reporter('default'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest("dist/js"));
// })


//合并文件
// gulp.task("commomconcat",function(){
// 	gulp.src("app/coponents/**/.*js")
// 	.pipe(concat('common.js'))
// 	.pipe(gulp.dest("dist/js/commom"))
// })