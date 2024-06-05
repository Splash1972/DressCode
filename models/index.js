const User = require('./User');
const Attire = require('./Attire');

User.hasMany(Attire, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Attire.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Attire };
