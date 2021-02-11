const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')

const PORT = config.get('port') || 5000

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.router'))
app.use('/api/initiative', require('./routes/initiatives.router'))
app.use('/api/law', require('./routes/laws.router'))
app.use('/api/countries', require('./routes/country.router'))
app.use('/api/video', require('./routes/videos.router'))
app.use('/api/users', require('./routes/users.router'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
