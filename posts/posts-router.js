const express = require('express');
const Posts = require('../data/db.js');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    }catch(error){
        console.log(error);
        res.status(500).json({
            messsage: 'Error retrieving posts'
        })
    }
})



router.post('/', async (req, res) => {
    const info = req.body;
    // if(!info.title || !info.contents){
    //     res.status(400).json({
    //         errorMessage: "Please provide title and contents for the post."
    //     })
    //     res.end();
    // }
    try{
        const post = await Posts.insert(info);
        res.status(201).json(post);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'There was an error while saving the post to the database'
        })
    }
})
 
//FIX
router.post('/:id/comments', async (req, res) => {
    const info = req.body;
    
    try{
        const comment = await Posts.insertComment(info);
        res.status(201).json(comment);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'There was an error while saving the comment to the database'
        })
    }
})
//Get by ID
router.get('/:id', async (req, res) => {
    try{
        const post = await Posts.findById(req.params.id);
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
    } catch(error){
        res.status(500).json({
            error: "The post information could be not retrieved"
        })
    }
})
//
router.get('/:id/comments', async (req, res) => {
    try{
        const comments = await Posts.findCommentsById(req.params.id);
        if(comments){
            res.status(200).json(comments);
        } else{
            res.status(404).json({
                message: "The post with the specified ID doesnt exist"
            })
        } 
    }catch(error){
        res.status(500).json({
            error: "The post information could not be retrieved"
        })
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const count = await Posts.remove(req.params.id);
        if(count > 0){
            res.status(200).json({ message: "Success!"});
        } else{
            res.status(404).json({ message: "The post with the specified ID doesn't exist"})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: "The post could not be removed"
        })
    }
})

router.put('/:id', async (req, res) => {

    try{
        const post = await Posts.update(req.params.id, req.body);
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({ message: "The post with the specified ID doesnt exist"})
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: "The post information could not be modified"
        })
    }
})
module.exports = router;