
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const allLikes = blogs.reduce(function(sum, blog) {
        return sum + blog.likes
    }, 0)

    return allLikes
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce(function(prev, cur) {
        return prev.likes > cur.likes ? prev : cur
    }, 0)

    return favorite
}

const mostBlogs = (blogs) => {

    const map = new Map()

    let auth = blogs[0].author
    let blogsAmount = 0

    blogs.forEach(value => {
        if (map.has(value.author)) {
            map.set(value.author, map.get(value.author) + 1)
        } else {
            map.set(value.author, 1)
        }

        if (map.get(value.author) > blogsAmount) {
            auth = value.author
            blogsAmount = map.get(value.author)
        }
    })

    return { 'author': `${auth}`, 'likes': blogsAmount}
}

const mostLikes = (blogs) => {

    const map = new Map()

    let auth = blogs[0].author
    let mostLikes = 0

    blogs.forEach(value => {
        if (map.has(value.author)) {
            map.set(value.author, map.get(value.author) + value.likes)
        } else {
            map.set(value.author, value.likes)
        }

        if (map.get(value.author) > mostLikes) {
            auth = value.author
            mostLikes = map.get(value.author)
        }
    })

    return { 'author': `${auth}`, 'likes': mostLikes}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}