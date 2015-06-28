/**
 * Created by root on 6/28/15.
 */
//addressList: [{addressName: String, addressLocation: String, addressComments: String}],


module.exports = function(sequelize,DataTypes){
    var Address = sequelize.define('address',{
        addressId:  {
            type:DataTypes.STRING(36),
            primaryKey:true
        },
        userId:      {
            type:DataTypes.STRING(36),
            primaryKey:true
        },
        addressLocation:{type:DataTypes.STRING(128),allowNull: false},
        addressComments:    {type:DataTypes.STRING(512)},
        creator:    {type:DataTypes.STRING(40)},
        modifier:   {type:DataTypes.STRING(40)}
    }, {
        timestamps: true,
        paranoid:true,
        freezeTableName:true,
        tableName:'address'
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
    return Address;
};