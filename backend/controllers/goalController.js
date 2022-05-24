const {errorHandler} = require('../middleware/errorMiddleware')
const Goal = require('../models/goalModel')
const asyncHandler = require('express-async-handler')

//@desc Get Goals
//@route GET/api/goals
//@access Private

const getGoals = asyncHandler( async(req,res) =>{
   const goals = await Goal.find()
   res.status(200).json(goals)
    res.status(200).json({message: 'get Goals'});
})

//@desc Post Goal
//@route Post/api/goals
//@access Private

const setGoal = asyncHandler( async(req,res) =>{
    if (!req.body.text) {
    res.status(400, "")
    //errorHandler()
    throw new Error('Please add a text field')  
    }
    const goal = await Goal.create({text:req.body.text})

    res.status(200).json(goal)
}
)

//@desc update Goals
//@route PUT/api/goals
//@access Private

const updateGoal = asyncHandler( async (req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
    res.status(400)
    throw new Error('Goal not Found')        
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new:true
    }) 
    res.status(200).json({updatedGoal})
}
)

//@desc Delete Goals
//@route Delete/api/goals
//@access Private

const deleteGoal = asyncHandler( async (req,res) =>{
   const goal = await Goal.findById(req.params.id)
   if (!goal) {
   res.status(400)
   throw new Error('Goal not Found')       
   }   
     await goal.remove()
         res.status(200).json({id: req.params.id})  
}
)

module.exports ={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}