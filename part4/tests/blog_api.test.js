const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require("../utils/list_helper")
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
    title: "Strong shall survive",
    author: "Bill Starr",
    url: "hs.fi",
    likes: 88,
    id: "60429883c38b5f41c0580fb6"
    },
  {
    title: "Kummeli Jackpot",
    author: "Pera Järvelä",
    url: "is.fi",
    likes: 43,
    id: "60429883c38b5f41c0580fb6"
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api.get('/api/blogs')    
    .expect('Content-Type', /application\/json/)    
})

test('there are correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(initialBlogs.length) 
})

// Tee testi joka varmistaa että sovellukseen voi lisätä blogeja 
// osoitteeseen /api/blogs tapahtuvalla HTTP POST -pyynnölle. 
// Testaa ainakin, että blogien määrä kasvaa yhdellä. Voit myös varmistaa, 
// että oikeansisältöinen blogi on lisätty järjestelmään.
// Kun testi on valmis, refaktoroi operaatio käyttämään promisejen sijaan 
// async/awaitia.

test("blog is added", async() => {
  const newBlog = {
    title: "testi_blogi",
    author: "Juha Föhr",
    url: "mtv3.fi",
    likes: 43,
    id: "4243234432423432423"
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  const blogsAfterAdding = await helper.blogsInDb()
    expect(blogsAfterAdding).toHaveLength(3)
})

test("blog is deleted", async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAfterDeleting = await helper.blogsInDb()
    expect(blogsAfterDeleting).toHaveLength(blogsAtStart.length - 1)
  
  const titles = blogsAfterDeleting.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)

})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
      expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode if password shorter than 2 chars', async () => {
  
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root2',
    name: 'testuser',
    password: 'pw',
  }

  const result = await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('password must be at least 3 chars')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('creation fails if no password is given', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root3',
    name: 'testuser3',
    password: '',
  }

  const result = await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('password must be at least 3 chars')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

})

afterAll(() => {
  mongoose.connection.close()
})