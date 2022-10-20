let testUser = null
let testBlog = null

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        testUser = {
            name: 'Miihkali',
            username: 'Miihku',
            password: 'salasana1234',
        }

        cy.request('POST', 'http://localhost:3003/api/users', testUser)

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.get('#loginform').get('input[name=\'Username\']')
        cy.get('#loginform').get('input[name=\'Password\']')

    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('Miihku'),
            cy.get('#password').type('salasana1234')
            cy.get('#loginbutton').click()

            cy.contains(`${testUser.name} logged in`)
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('Miihki')
            cy.get('#password').type('salssana1234')
            cy.get('#loginbutton').click()

            cy.contains('Wrong credentials')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            testUser = {
                name: 'Miihkali',
                username: 'Miihku',
                password: 'salasana1234',
            }

            cy.login({ username: testUser.username, password: testUser.password })
        })

        it('blog can be created', function() {
            cy.contains('create new blog').click()

            cy.get('#title').type('Title')
            cy.get('#author').type('Author')
            cy.get('#url').type('URL')

            cy.get('#createButton').click()

            cy.contains('a new blog added')
            cy.contains('Title')
            cy.contains('Author')
        })

        describe('blog exists', function() {
            beforeEach(function() {
                testBlog = {
                    title: 'Title',
                    author: 'Author',
                    url: 'URL'
                }

                cy.createBlog({ title: testBlog.title, author: testBlog.author, url: testBlog.url })
            })

            it('blog can be liked', function() {
                cy.contains('view').click()
                cy.contains('likes 0')

                cy.get('#likeButton').click()
                cy.contains('likes 1')
            })

            it('user who added can also remove blog', function() {
                cy.contains('Title Author')

                cy.contains('view').click()
                cy.get('#removeButton').click()

                cy.contains('Blog removed!')
                cy.contains('Title Author').should('not.exist')
            })
        })

        it('blogs are in like order, the most liked first', function() {
            const testBlog1 = {
                title: 'Second liked',
                author: 'Number 2',
                url: 'www.secondplace.com'
            }

            const testBlog2 = {
                title: 'Least liked',
                author: 'Number 3',
                url: 'www.thirdplace.com'
            }


            const testBlog3 = {
                title: 'The most liked',
                author: 'Number 1',
                url: 'www.firstplace.com'
            }

            //adding likes from here...
            cy.createBlog({ title: testBlog1.title, author: testBlog1.author, url: testBlog1.url })
            cy.createBlog({ title: testBlog2.title, author: testBlog2.author, url: testBlog2.url })
            cy.createBlog({ title: testBlog3.title, author: testBlog3.author, url: testBlog3.url })

            cy.contains('Least liked').contains('view').click()
            cy.contains('Least liked').contains('like').click()

            cy.contains('The most liked').contains('view').click()
            cy.contains('The most liked').contains('like').click()
            cy.visit('http://localhost:3000')
            cy.contains('The most liked').contains('view').click()
            cy.contains('The most liked').contains('like').click()

            cy.contains('Second liked').contains('view').click()
            cy.contains('Second liked').contains('like').click()
            cy.visit('http://localhost:3000')
            cy.contains('Second liked').contains('view').click()
            cy.contains('Second liked').contains('like').click()

            cy.contains('The most liked').contains('view').click()
            cy.contains('The most liked').contains('like').click()

            cy.visit('http://localhost:3000')
            //...to here

            //proceed by checking if the most likes
            //comes first and then removing it and moving
            //to the next one

            //the most liked
            cy.contains('view').click()
            cy.contains('likes 3')
            cy.contains('The most liked Number 1').contains('remove').click()
            cy.contains('The most liked Number 1').should('not.exist')

            //second
            cy.contains('view').click()
            cy.contains('likes 2')
            cy.contains('Second liked Number 2').contains('remove').click()
            cy.contains('Second liked Number 2').should('not.exist')

            //the last
            cy.contains('view').click()
            cy.contains('likes 1')
            cy.contains('Least liked Number 3').contains('remove').click()
            cy.contains('Least liked Number 3').should('not.exist')
        })
    })
})