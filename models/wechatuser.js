/**
 * Created by root on 7/1/15.
 */

/*
 id: int
 openId: String,
 wechatNichname: String,
 latitude: String,
 Atitude: String,
 oauthToken: String,
 regPhoneNum: String,
 regPasscode: String,
 regPscValidTime: String,
 creator:String,
 modifier:String,
 */

module.exports = function(sequelize,DataTypes){
    var wechatuser = sequelize.define('wechatuser',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        openId:     {type:DataTypes.STRING(128),unique:true},
        oauthToken: {type:DataTypes.STRING(512)},
        userId:     {type:DataTypes.UUID,unique:true},
        wechatNickname:   {type:DataTypes.STRING(128)},
        latitude:   {type:DataTypes.STRING(40)},
        Attiude:    {type:DataTypes.STRING(40)},
        locale:     {type:DataTypes.STRING(16)},
        validMessageId: {type:DataTypes.UUID},
        creator:    {type:DataTypes.STRING(40)},
        modifier:   {type:DataTypes.STRING(40)}
    }, {
        timestamps: true,
        paranoid:true,
        freezeTableName:true,
        tableName:'wechatuser'
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
    return wechatuser;
};