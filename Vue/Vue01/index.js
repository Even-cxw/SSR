const Vue = require('vue');
const server = require('express')();

const template = require('fs').readFileSync('./index.template.html', 'utf-8');

// console.log('template',template)

// 将html注入到renderer中
const renderer = require('vue-server-renderer').createRenderer({
  template,
});

// 创建renderer的环境上下文，html文件可以直接访问
const context = {
    title: 'vue ssr',
    meta: `<meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">`,
};

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`,
  });
  /**
   * @desc renderToString参数
   * @params {app} vue实例
   * @params {context} html的环境上下文
   */
  renderer.renderToString(app,context).then(html => {
    console.log(html)
    res.end(html);
  }).catch(err => {
    console.error(err)
  })
})

server.listen(8086);