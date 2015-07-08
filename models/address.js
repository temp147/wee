/**
 * Created by root on 6/28/15.
 */
//addressList: [{addressName: String, addressLocation: String, addressComments: String}],


module.exports = function(sequelize,DataTypes){
    var Address = sequelize.define('address',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        addressId:  {
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            unique:true
        },
        userId:      {
            type:DataTypes.UUID,
            unique:true
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