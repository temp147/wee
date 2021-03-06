/**
 * Created by root on 6/28/15.
 */
//carList: [{carName: String, carModel: String, carColor: String, carNumber: String, carComments: String}]


module.exports = function(sequelize,DataTypes){
    var Car = sequelize.define('carinfo',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        carId:  {
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            unique:true
        },
        userId:      {
            type:DataTypes.UUID,
            unique:true
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