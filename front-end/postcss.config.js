module.exports = {
    // parser: 'suggarss',
    plugins: [
        require('autoprefixer')({
            browsers: [
                // 加这个后可以出现额外的兼容性前缀
                "> 0.02%"
            ]
        })
    ]
}