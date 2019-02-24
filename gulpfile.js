//gulp的配置文件
var gulp = require("gulp");//加载gulp模块 -->引入装好的gulp文件
var connect = require("gulp-connect")//服务器模块
var sass = require("gulp-sass")//将sass文件转换为css的插件 模块
var sourcemaps = require("gulp-sourcemaps")//让编译后的文件和源文件发生关联的模块
var concat = require("gulp-concat");//合并文件 --合并只是放一起--压缩才会真正合并相同样式
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");////设置压缩后的文件名
var babel = require("gulp-babel");
var cleancss = require("gulp-clean-css");//压缩css文件

//调用gulp的task方法创建任务

gulp.task("copyIndex",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());//浏览器自动刷新
});


gulp.task("copyImg",function(){
	gulp.src("img/*.{jpg,png}")
	.pipe(gulp.dest("dist/img"));
})


gulp.task("copyJs",function(){
	gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"));
})


gulp.task("copyCss",function(){
	gulp.src("css/*.css")
	.pipe(gulp.dest("dist/css"));
})


gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true,
	});
})


gulp.task("default",["server","watch"]);


gulp.task('scripts',function(){
	return gulp.src(["js/index.js","js/cart.js","js/detail.js","js/list.js","js/login.js","js/regist.js"])//所有is下的js文件
	.pipe(concat('mix.js'))//合并的文件名    混合
	.pipe(gulp.dest('dist/js'))//放到dist的js文件夹里
	.pipe(uglify())//压缩
	.pipe(rename('mix.min.js'))//压缩以后文件名重命名
	.pipe(gulp.dest('dist/js')); 
})

gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())//关联起来 初始化
	.pipe(sass({outputStyle:"compressed"}))//深压缩
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})


gulp.task("watch",function(){//监控并自动刷新
	gulp.watch("*.html",["copyIndex"]);
	gulp.watch("sass/*.scss",["sass"]);
	//还要写js 看到时候js压缩写到那  先监听这两个 index 和 sass
	//图片回来copy带dis里面
})


gulp.task('csscompress',function(){ 
	return gulp.src("css/*.css")//所有css下的css文件
	.pipe(concat('mix.css'))//合并的文件名  想好写
	.pipe(gulp.dest('dist/css'))
	.pipe(cleancss())
	.pipe(rename('mix.min.css'))//压缩以后添加的文件名
	.pipe(gulp.dest('dist/css'))//再把压缩的文件添加dist
	.pipe(connect.reload());
})

