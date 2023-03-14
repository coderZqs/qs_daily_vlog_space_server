/**
 * 自动加载路由
 * destory 无法使用中间件
 */

/* fs.readdir(path.resolve(__dirname, "./router"), (err, files) => {
  if (err) {
    return;
  } else {
    files.forEach(async (routeName) => {
      let route =  import(`./router/${routeName}`);
      app.use(route.default.routes());
    });
  }
});
 */