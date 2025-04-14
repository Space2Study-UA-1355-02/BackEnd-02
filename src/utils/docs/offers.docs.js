/**
 * @swagger
 * tags:
 *   name: Offers
 *   description: Endpoints for managing offers
 */

/**
 * @swagger
 * /offers:
 *   get:
 *     summary: Get a list of offers with filters and aggregation
 *     tags: [Offers]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject ID
 *       - in: query
 *         name: priceFrom
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: priceTo
 *         schema:
 *           type: number
 *         description: Maximum price
 *       - in: query
 *         name: languages
 *         schema:
 *           type: string
 *         description: Filter by language
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Full-text search
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sorting field and direction (e.g., "price:asc")
 *     responses:
 *       200:
 *         description: List of offers with filters applied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Offer'
 *                 count:
 *                   type: integer
 */

/**
 * @swagger
 * /offers/{id}:
 *   get:
 *     summary: Get offer details by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Offer ID
 *     responses:
 *       200:
 *         description: Offer found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 */

/**
 * @swagger
 * /offers:
 *   post:
 *     summary: Create a new offer
 *     tags: [Offers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OfferInput'
 *     responses:
 *       201:
 *         description: Offer created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 */

/**
 * @swagger
 * /offers/{id}:
 *   put:
 *     summary: Update an existing offer
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Offer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OfferInput'
 *     responses:
 *       204:
 *         description: Offer updated
 */

/**
 * @swagger
 * /offers/{id}:
 *   delete:
 *     summary: Delete an offer
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Offer ID
 *     responses:
 *       204:
 *         description: Offer deleted
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Offer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         author:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             photo:
 *               type: string
 *             totalReviews:
 *               type: number
 *             averageRating:
 *               type: number
 *             professionalSummary:
 *               type: string
 *             FAQ:
 *               type: array
 *               items:
 *                 type: object
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         proficiencyLevel:
 *           type: string
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *         subject:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *         category:
 *           type: object
 *           properties:
 *             appearance:
 *               type: string
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     OfferInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - proficiencyLevel
 *         - languages
 *         - subject
 *         - category
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         proficiencyLevel:
 *           type: string
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *         subject:
 *           type: string
 *         category:
 *           type: string
 *         status:
 *           type: string
 *         FAQ:
 *           type: array
 *           items:
 *             type: object
 */
