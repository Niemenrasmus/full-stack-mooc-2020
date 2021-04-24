const Blog = require("../models/blog")
const User = require("../models/user")
const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    total = 0
    blogs.forEach(function(blog) {
        total += blog.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    favorite_blog = { 
    _id: "", 
    title: "", 
    author: "", 
    url: "", 
    likes: 0,
     __v: 0 } 
    blogs.forEach(function(blog) {
        if (blog.likes >= favorite_blog.likes) {
            favorite_blog = blog
        }
    })
    return favorite_blog
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
    }

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    blogsInDb,
    usersInDb
  }
