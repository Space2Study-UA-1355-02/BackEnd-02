/**
 * @swagger
 * tags:
 *   name: Admin Invitations
 *   description: Endpoints for sending and retrieving admin invitations
 */

/**
 * @swagger
 * /admin-invitations:
 *   post:
 *     summary: Send admin invitation emails
 *     tags: [Admin Invitations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emails
 *             properties:
 *               emails:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["admin1@example.com", "admin2@example.com"]
 *     responses:
 *       201:
 *         description: Invitations created and emails sent
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminInvitation'
 */

/**
 * @swagger
 * /admin-invitations:
 *   get:
 *     summary: Get list of all admin invitations
 *     tags: [Admin Invitations]
 *     responses:
 *       200:
 *         description: List of admin invitations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminInvitation'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminInvitation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
