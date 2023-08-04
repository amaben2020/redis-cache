/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /users:
 *   get:
 *     summary: Lists all the Users including the cache
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the Users in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './../docs/schemas/Users.yaml'
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './../docs/schemas/Users.yaml'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './../docs/schemas/Users.yaml'
 *       500:
 *         description: Some server error
 * /Users/{id}:
 *   get:
 *     summary: Get the User by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The User response by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: './../docs/schemas/Users.yaml'
 *       404:
 *         description: The User was not found
 *   put:
 *    summary: Update the User by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: './../docs/schemas/Users.yaml'
 *    responses:
 *      200:
 *        description: The User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: './../docs/schemas/Users.yaml'
 *      404:
 *        description: The User was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the User by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The User id
 *
 *     responses:
 *       200:
 *         description: The User was deleted
 *       404:
 *         description: The User was not found
 */
const express = require("express");
const { getData } = require("../controller/getData");
const { cacheData } = require("../middleware/cachedData");

const route = express.Router();

const usersRoute = route.get("/users", cacheData, getData);

module.exports = { usersRoute };
