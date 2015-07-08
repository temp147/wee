/**
 * Created by root on 6/28/15.
 */
/*
    userId: String,
    userName: String,
    gender: String,
    mobilePhone: String,
    defaultAddress: String,
    defaultCar: String,
    lastLoginDate: String,
    lastOrderDate: String,
    totalAddress: Number,
    totalCar:Number,
    totalCoupons:Number,
    totalCost:Number,
    totalFeedBack:Number,


 */

module.exports = function(sequelize,DataTypes){
    var User = sequelize.define('userinfo',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        userId:      {
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            unique:true
        },
        mobilePhone:   {type:DataTypes.STRING(40),unique:true},
        userName: {type:DataTypes.STRING(128),allowNull: false},
        password: {type:DataTypes.STRING(256)},
        gender:    {type:DataTypes.STRING(1)},
        lastLoginDate:{type:DataTypes.DATE},
        lastOrderDate:{type:DataTypes.DATE},
        totalCar:{type:DataTypes.INTEGER},
        totalCost:{type:DataTypes.INTEGER},
        totalFeedback:{type:DataTypes.INTEGER},
        creator:    {type:DataTypes.STRING(40)},
        modifier:   {type:DataTypes.STRING(40)}
    }, {
        timestamps: true,
        paranoid:true,
        freezeTableName:true,
        tableName:'userinfo'
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
    return User;
};