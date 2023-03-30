const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc auth with google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

// google auth callback
// @route GET /dashboard
router.get(
    '/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }), // redirect to login page if auth fails
    (req,res)=>{
        res.redirect('/dashboard')
    })

// Logout user
// @route /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {return next(error)}
        res.redirect('/')
    })
  })

module.exports = router