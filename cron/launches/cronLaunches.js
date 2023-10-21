const cron = require('node-cron');
const Launches = require('../../models/launches/launches')

cron.schedule('0 9 * * *', () => {
    console.log('Executando a tarefa agendada...');
    Launches.insertDataDb()
});

module.exports = cron