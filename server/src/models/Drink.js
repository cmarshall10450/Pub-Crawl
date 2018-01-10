import mongoose, { Schema } from 'mongoose'
import Ingredient from './Ingredient'

const Drink = new Schema({
    name: {
        type: String,
        required: true,
    },
    abv: Number,
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    ingredients: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'ingredient',
    }, ],
    instructions: {
        type: [String],
        default: [],
    },
    soldIn: [{
        type: Schema.Types.ObjectId,
        ref: 'bar',
        default: [],
    }, ],
})

Drink.statics.addIngredient = async function(id, ingredientId) {
    const ingredient = await Ingredient.findById(ingredientId)

    return this.findById(id)
        .then(async drink => {
            drink.ingredients.push(ingredient)
            return await drink.save()
        })
}

Drink.statics.getIngredients = function(id) {
    return this.findById(id)
        .populate('ingredients')
        .then(drink => {
            console.log(drink)
            return drink.ingredients
        })
}

Drink.statics.addInstruction = function(id, instruction) {
    return this.findById(id)
        .then(async drink => {
            drink.instructions.push(instruction)
            return await drink.save()
        })
}

Drink.statics.getInstructions = function(id) {
    return this.findById(id)
        .then(drink => drink.instructions, )
}

export default mongoose.model('drink', Drink)