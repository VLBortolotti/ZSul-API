require('dotenv').config()
const path    = require('path')
const express = require('express')
const cors    = require('cors')
const helmet  = require('helmet')
const app     = express()
const PORT    = Number(process.env.PORT) || 3000

app.use(cors({
    origin: "https://zsuldash.netlify.app/",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
        "Origin",
        "Content-Type",
        "Accept",
        "Authorization",
        "X-Request-With"
    ]
}))
app.use(express.json())
app.use(helmet())

app.use('/users', require('./routes/usersRoute'))
app.use('/elenco/status', require('./routes/elencoStatusRoute'))
app.use('/elenco', require('./routes/elencoRoute'))
app.use('/staff', require('./routes/staffRoute'))
app.use('/campeonatos', require('./routes/campeonatoRoute'))
app.use('/image', require('./routes/imageRoute'))
app.use('/inscricoes', require('./routes/inscricoesRoute'))
app.use('/grupos', require('./routes/grupoRoute'))
app.use('/jogos', require('./routes/jogosRoute'))
app.use('/sumula', require('./routes/sumulaRoute'))
app.use('/sumulaPermissao', require('./routes/sumulaPermissaoRoute'))
app.use('/estatistica', require('./routes/estatisticaRoute'))
app.use('/estatistica/jogador', require('./routes/estatisticaJogadorRoute'))
app.use('/estatisticaJogador/campeonato', require('./routes/estatisticaJogadorCampeonatoRoute'))
app.use('/transferencia', require('./routes/transferenciaRoute'))
app.use('/campos', require('./routes/campoRoute'))
app.use('/blog', require('./routes/blogRoute'))
app.use('/fotografo', require('./routes/fotografoRoute'))

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Rodando na porta: ${PORT}`) 
})