const indexR = require('./index');
const usersR = require('./users');
const playbacksR = require('./playbacks');
const contactFormsR = require('./contactForms');
const requestRecordFormsR = require('./requestRecordForms');

exports.routesInit = (app) => {
    app.use('/', indexR);
    app.use('/users', usersR);
    app.use('/playbacks', playbacksR);
    app.use('/contactForms', contactFormsR);
    app.use('/requestRecordForms', requestRecordFormsR);
}