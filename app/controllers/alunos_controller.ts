import { HttpContext } from '@adonisjs/core/http'
import Aluno from '#models/aluno'

export default class AlunosController {
  async index({ response }: HttpContext) {
    const alunos = await Aluno.all()
    return response.status(200).json(alunos)
  }

  async register({ request, response }: HttpContext) {
    const body = request.only(['nome', 'email', 'matricula', 'data_de_nascimento', 'password'])
    const aluno = await Aluno.create(body)
    return response.status(201).json(aluno)
  }

  async get({ params, response }: HttpContext) {
    const alunoId = params.id
    try {
      const aluno = await Aluno.findOrFail(alunoId)
      const nome = aluno.nome

      const getSalas = await aluno.related('salas').query().preload('user')

      const salas = getSalas.map(sala => ({
        professor: sala.user.nome,
        numero: sala.numero_da_sala

      }))
      return response.status(200).json({ nome, salas })
    } catch (error) {
      return response.status(404).json({ message: 'Aluno não encontrado.' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const alunoId = params.id
    try {
      const aluno = await Aluno.findOrFail(alunoId)
      const body = request.only(['nome', 'email', 'matricula', 'data_de_nascimento', 'password'])
      aluno.merge(body)
      await aluno.save()
      return response.status(200).json(aluno)
    } catch (error) {
      return response.status(404).json({ message: 'Aluno não encontrado.' })
    }
  }

  async delete({ params, response }: HttpContext) {
    const alunoId = params.id
    const aluno = await Aluno.findOrFail(alunoId)
    await aluno.delete()
    return response.status(204).send('')
  }
}