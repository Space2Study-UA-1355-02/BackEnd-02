const tokenService = require('~/services/token')
const emailService = require('~/services/email')
const bcrypt = require('bcrypt')
const { getUserByEmail, createUser, privateUpdateUser, getUserById } = require('~/services/user')
const { createError } = require('~/utils/errorsHelper')
const {
  EMAIL_NOT_CONFIRMED,
  INCORRECT_CREDENTIALS,
  BAD_RESET_TOKEN,
  BAD_REFRESH_TOKEN,
  USER_NOT_FOUND,
  BAD_CONFIRM_TOKEN,
  EMAIL_ALREADY_CONFIRMED
} = require('~/consts/errors')
const emailSubject = require('~/consts/emailSubject')
const {
  tokenNames: { REFRESH_TOKEN, RESET_TOKEN, CONFIRM_TOKEN }
} = require('~/consts/auth')

const authService = {
  signup: async (role, firstName, lastName, email, password, language) => {
    const hashedPassword = await authService.hashPassword(password)
    const user = await createUser(role, firstName, lastName, email, hashedPassword, language)

    const confirmToken = tokenService.generateConfirmToken({ id: user._id, role })
    await tokenService.saveToken(user._id, confirmToken, CONFIRM_TOKEN)
    await emailService.sendEmail(email, emailSubject.EMAIL_CONFIRMATION, language, { confirmToken, email, firstName })
    return {
      userId: user._id,
      userEmail: user.email
    }
  },

  login: async (email, password, isFromGoogle) => {
    const user = await getUserByEmail(email)

    if (!user) {
      throw createError(401, USER_NOT_FOUND)
    }

    let checkedPassword = false

    if (isFromGoogle) {
      checkedPassword = true
    } else {
      checkedPassword = await authService.checkHashedPassword(password, user.password)
    }

    if (!checkedPassword) {
      throw createError(401, INCORRECT_CREDENTIALS)
    }

    const { _id, lastLoginAs, isFirstLogin, isEmailConfirmed } = user

    if (!isEmailConfirmed) {
      throw createError(401, EMAIL_NOT_CONFIRMED)
    }

    const tokens = tokenService.generateTokens({ id: _id, role: lastLoginAs, isFirstLogin })
    await tokenService.saveToken(_id, tokens.refreshToken, REFRESH_TOKEN)

    if (isFirstLogin) {
      await privateUpdateUser(_id, { isFirstLogin: false })
    }

    await privateUpdateUser(_id, { lastLogin: new Date() })

    return tokens
  },

  logout: async (refreshToken) => {
    await tokenService.removeRefreshToken(refreshToken)
  },

  refreshAccessToken: async (refreshToken) => {
    const tokenData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken, REFRESH_TOKEN)

    if (!tokenData || !tokenFromDB) {
      throw createError(400, BAD_REFRESH_TOKEN)
    }

    const { _id, lastLoginAs, isFirstLogin } = await getUserById(tokenData.id)

    const tokens = tokenService.generateTokens({ id: _id, role: lastLoginAs, isFirstLogin })
    await tokenService.saveToken(_id, tokens.refreshToken, REFRESH_TOKEN)

    return tokens
  },

  sendResetPasswordEmail: async (email, language) => {
    const user = await getUserByEmail(email)

    if (!user) {
      throw createError(404, USER_NOT_FOUND)
    }

    const { _id, firstName } = user

    const resetToken = tokenService.generateResetToken({ id: _id, firstName, email })
    await tokenService.saveToken(_id, resetToken, RESET_TOKEN)

    await emailService.sendEmail(email, emailSubject.RESET_PASSWORD, language, { resetToken, email, firstName })
  },

  updatePassword: async (resetToken, password, language) => {
    const tokenData = tokenService.validateResetToken(resetToken)
    const tokenFromDB = await tokenService.findToken(resetToken, RESET_TOKEN)

    if (!tokenData || !tokenFromDB) {
      throw createError(400, BAD_RESET_TOKEN)
    }

    const { id: userId, firstName, email } = tokenData
    await privateUpdateUser(userId, { password })

    await tokenService.removeResetToken(userId)

    await emailService.sendEmail(email, emailSubject.SUCCESSFUL_PASSWORD_RESET, language, {
      firstName
    })
  },

  confirmEmail: async (confirmToken) => {
    const tokenData = tokenService.validateConfirmToken(confirmToken)

    if (!tokenData) {
      throw createError(400, BAD_CONFIRM_TOKEN)
    }

    const { id: userId, role } = tokenData

    const user = await getUserById(userId, role)

    if (user && user.isEmailConfirmed) {
      throw createError(409, EMAIL_ALREADY_CONFIRMED)
    }

    const tokenFromDB = await tokenService.findToken(confirmToken, CONFIRM_TOKEN)

    if (!tokenFromDB) {
      throw createError(404, BAD_CONFIRM_TOKEN)
    }

    await privateUpdateUser(userId, { isEmailConfirmed: true })

    await tokenService.removeConfirmToken(confirmToken)
  },

  hashPassword: async (password) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  },

  checkHashedPassword: async (passwordToCheck, userPassword) => {
    return await bcrypt.compare(passwordToCheck, userPassword)
  }
}

module.exports = authService
