import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedin.js';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../controllers/post.controller.js';

const router = express.Router();
router.route('/all-posts').get(isLoggedIn, getAllPosts);
router.route('/create-post').post(isLoggedIn, createPost);
router.route('/update-post/:id').post(isLoggedIn, updatePost);
router.route('/delete-post/:id').delete(isLoggedIn, deletePost);
router.route('/:id').get(isLoggedIn, getPost);


export {router}