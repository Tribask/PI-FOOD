const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    health_score:{
      type: DataTypes.INTEGER,
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dishTypes:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },    
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps: false,
  });
};
