/**
 * @swagger
 * tags:
 *   name: ResourcesCategories
 *   description: Endpoints for managing resource categories
 */

/**
 * @swagger
 * /resources-categories:
 *   post:
 *     summary: Create a new resource category
 *     tags: [ResourcesCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourcesCategoryInput'
 *     responses:
 *       201:
 *         description: Resource category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResourcesCategory'
 */

/**
 * @swagger
 * /resources-categories:
 *   get:
 *     summary: Get a list of resource categories created by the current user
 *     tags: [ResourcesCategories]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by category name
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sorting field and order (e.g., "createdAt:desc")
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of items to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items to return
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ResourcesCategory'
 *                 count:
 *                   type: integer
 */

/**
 * @swagger
 * /resources-categories/names:
 *   get:
 *     summary: Get names of all resource categories created by the current user
 *     tags: [ResourcesCategories]
 *     responses:
 *       200:
 *         description: List of category names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 */

/**
 * @swagger
 * /resources-categories/{id}:
 *   put:
 *     summary: Update a resource category
 *     tags: [ResourcesCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resource category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourcesCategoryInput'
 *     responses:
 *       204:
 *         description: Resource category updated successfully
 */

/**
 * @swagger
 * /resources-categories/{id}:
 *   delete:
 *     summary: Delete a resource category
 *     tags: [ResourcesCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resource category ID
 *     responses:
 *       204:
 *         description: Resource category deleted successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ResourcesCategory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         author:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ResourcesCategoryInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 */
