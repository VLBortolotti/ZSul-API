require('dotenv').config()
const path    = require('path')
const express = require('express')
const cors    = require('cors')
const helmet  = require('helmet')
const app     = express()
const PORT    = Number(process.env.PORT) || 3000

app.use(cors())
app.use(express.json())
app.use(helmet())

app.use('/users', require('./routes/usersRoute'))
app.use('/elenco', require('./routes/elencoRoute'))
app.use('/staff', require('./routes/staffRoute'))
app.use('/campeonatos', require('./routes/campeonatoRoute'))
app.use('/image', require('./routes/imageRoute'))
app.use('/inscricoes', require('./routes/inscricoesRoute'))
app.use('/grupos', require('./routes/grupoRoute'))
app.use('/jogos', require('./routes/jogosRoute'))
app.use('/sumula', require('./routes/sumulaRoute'))
app.use('/estatistica', require('./routes/estatisticaRoute'))
app.use('/estatistica/jogador', require('./routes/estatisticaJogadorRoute'))
app.use('/transferencia', require('./routes/transferenciaRoute'))
app.use('/campos', require('./routes/campoRoute'))

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Rodando na porta: ${PORT}`) 
})