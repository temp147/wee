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
        userId:      {
            type:DataTypes.STRING(36),
            primaryKey:true
        },
        openID:{type:DataTypes.STRING(128)},
        mobilePhone:   {type:DataTypes.STRING(40)},
        userName: {type:DataTypes.STRING(128),allowNull: false},
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