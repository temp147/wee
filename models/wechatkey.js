/**
 * Created by root on 6/27/15.
 */


module.exports = function(sequelize,DataTypes){
    var Wechatkey = sequelize.define('wechatkey',{
        keytype:      {
            type:DataTypes.STRING(64),
            primaryKey:true
        },
        keyvalues: {type:DataTypes.STRING(512),allowNull: false},
        creator:    {type:DataTypes.STRING(40)},
        modifier:   {type:DataTypes.STRING(40)}
    }, {
        timestamps: true,
        paranoid:true,
        freezeTableName:true,
        tableName:'wechatkey'
    }, {
        indexes:[
            {}
        ]
    },{
        instanceMethods: {
            countTasks: function() {
                // how to implement this method ?
            }
        },
        classMethods:{
            classTasks: function(){
            },
            associate: function(models) {
            }
        }
    });
    return Wechatkey;
};