const User = require('./user');
const Attire = require('./attire');

User.hasMany(Attire, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Attire.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Attire };
