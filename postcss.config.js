const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        autoprefixer() // 不同浏览器css自动加前缀
    ]
}