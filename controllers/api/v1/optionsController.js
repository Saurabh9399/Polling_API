const mongoose = require('mongoose');

//importing models
const Question=require('../../../model/question');
const Option=require('../../../model/option');

//add option to question controller
module.exports.addOption = async function(req,res){
    try {
        //finding question in db
        let question =await Question.findById(req.params.id);
        //if question is present then creating options possible
        if(question){
            let option = await Option.create({
                text:req.body.text,
                votes:req.body.votes,
                question:req.params.id
            });
            option.link_to_vote="http://localhost:8000/options/"+option.id+"/add_vote";
            option.save();
            question.options.push(option);
            question.save();
            return res.json({option, data:{"message": "Option Created Sucessfully!"}});
        }
        return res.json({question});

    } catch (error) {
        console.log(error);
        return;
    }
};

//delete option controller
module.exports.deleteOption = async function(req, res){
    try{
      let id = req.params.id;
      let option = await Option.findById(id);
      
      if(option.votes > 0){
        return res.status(404).json({
            data:{
                message: "DELETE ERROR!! Option has votes to it"
            }
        });
      }
      
      //option deleted
      await Option.findByIdAndDelete(id);

      await Question.findByIdAndUpdate(option.question, {$pull: {options: id}});

      return res.status(200).json({
          data:{
        message: "Option deleted successfully"
        }
      });
    }catch(err){
      return res.status(500).json({
          data:{
            message: "Internal Server Error"
        }
    });
    }  
  };

//add vote controller
module.exports.addVote=function(req, res){
    Option.findByIdAndUpdate(req.params.id, {$inc:{votes:1}},{new:true}, function(err, option){
        if(err){
            console.error("Error in adding vote controller->",err);
            return res.redirect("/");
        }
        //if option present then vote is possible
        if(option){
            return res.json({data:{
                option: option,
                message: "vote successfully added"
            }});
        }
        else{
            return res.json({data:{
                message: "option not found"
            }});
        }
    });
}