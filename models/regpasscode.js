/**
 * Created by root on 7/1/15.
 */

/*
 id: int
 regPhoneNum: String,
 regPasscode: String,
 status: String,
 regPscValidTime: String,
 creator:String,
 modifier:String,
 */

module.exports = function(sequelize,DataTypes){
    var regpasscode = sequelize.define('regpasscode',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        messageId:  {
            type:DataTypes.UUID,
            default: DataTypes.UUIDV4,
            unique: true
        },
        messagetype: {
            type: DataTypes.STRING(8),
            allowNull:false
        },
        regPhoneNum:{type:DataTypes.STRING(40)},
        regPassCode:   {type:DataTypes.STRING(40)},
        status:    {type:DataTypes.STRING(8)},
        regPscValidTime:     {type:DataTypes.DATE},
        creator:    {type:DataTypes.STRING(40)},
        modifier:   {type:DataTypes.STRING(40)}
    }, {
        timestamps: true,
        paranoid:true,
        freezeTableName:true,
        tableName:'regpasscode'
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
    return regpasscode;
};
