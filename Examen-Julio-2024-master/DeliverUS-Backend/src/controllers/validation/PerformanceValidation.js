// This is a new file for solution!
import { check } from 'express-validator'
import { Restaurant, Performance } from '../../models/models.js'

const checkRestaurantExists = async (value, { req }) => {
  try {
    const restaurant = await Restaurant.findByPk(req.body.restaurantId)
    if (restaurant === null) {
      return Promise.reject(new Error('The restaurantId does not exist.'))
    } else { return Promise.resolve() }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}
const checkPerfo = async (value, { req }) => {
  try {
    const performances = await Performance.findAll({
      where: { restaurantId: req.body.restaurantId }
    })
    const alguno = performances.some(p => p.appointment.getTime() == new Date(req.body.appointment).getTime())
    if (alguno) {
      return Promise.reject(new Error('Solo una actuacion por dia'))
    } else {
      return Promise.resolve()
    }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}
const create = [
  check('group').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('appointment').exists().toDate(),
  check('restaurantId').custom(checkPerfo),
  check('restaurantId').exists().isInt({ min: 1 }).toInt(),
  check('restaurantId').custom(checkRestaurantExists)
]

export { create }
