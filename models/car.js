/**
 * Created by root on 6/28/15.
 */
//carList: [{carName: String, carModel: String, carColor: String, carNumber: String, carComments: String}]


module.exports = function(sequelize,DataTypes){
    var Car = sequelize.define('carinfo',{
        carId:  {
            type:DataTypes.STRING(36),
            primaryKey:true
        },
        userId:      {
            type:DataTypes.STRING(36),
            primaryKey:true
        },
        carName:{type:DataTypes.STRING(128),allowNull: false},
        carModel:   {type:DataTypes.STRING(40)},
        carColor: {type:DataTypes.STRING(24)},
        carComments:    {type:DataTypes.STRING(512)},
        creator:    {type:DataTypes.STRING(40)},
        modifier:   {type:DataTypes.STRING(40)}
    }, {
        timestamps: true,
        paranoid:true,
        freezeTableName:true,
        tableName:'carinfo'
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
    return Car;
};