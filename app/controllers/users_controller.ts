import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)
    const token = await User.accessTokens.create(user)

    return response.status(200).json({ user, token })
  }

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user)
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return { message: "Você foi deslogado." }
  }

  async get({ auth }: HttpContext) {
    await auth.check()

    return {
      user: auth.user,
    }
  }

  async update({ params, request, response, auth }: HttpContext) {
    await auth.check()
    const authenticatedUser = auth.user!

    try {
      const body = request.only(['nome', 'email', 'matricula', 'data_de_nascimento', 'password'])
      const user = await User.findOrFail(params.id)

      if (user.id !== authenticatedUser.id) {
        return response.status(403).json({ message: 'Acesso negado.' })
      }
      user.merge(body)
      await user.save()

      return response.status(200).json(user)
    } catch (error) {
      return response.status(404).json({ message: 'Professor não encontrado.' })
    }
  }

  async delete({ params, response, auth }: HttpContext) {
    const authenticatedUser = auth.user!
    const userId = params.id
    const user = await User.findOrFail(userId)

    if (user.id !== authenticatedUser.id) {
      return response.status(403).json({ message: 'Acesso negado.' })
    }
    await user.delete()
    await User.accessTokens.delete(user, authenticatedUser.currentAccessToken.identifier)

    return response.status(204)
  }
}