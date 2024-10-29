// This is a new file for solution!
import { Model } from 'sequelize'

const loadModel = (sequelize, DataTypes) => {
  class Performance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Performance.belongsTo(models.Restaurant, { foreignKey: 'restaurantId', as: 'restaurant', onDelete: 'cascade' })

    }
  }

  Performance.init({
    group: {
      allowNull:false,
      type: DataTypes.STRING
    },
    appointment: {
      allowNull: false,
      type: DataTypes.DATE
    },
    restaurantId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Performance'
  })

  return Performance
}

export default loadModel
