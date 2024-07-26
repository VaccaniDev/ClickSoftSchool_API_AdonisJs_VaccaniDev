import Aluno from '#models/aluno'
import Sala from '#models/sala'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalasController {
  async create({ request, auth, response }: HttpContext) {
    await auth.check()
    const user = auth.user!
    const data = request.only(["numero_da_sala", "capacidade", "disponibilidade"])

    try {
      const sala = await Sala.create({ ...data, userId: user.id })
      return response.status(201).json(sala)
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao criar sala', error: error.message })
    }
  }

  async update({ request, auth, response, params }: HttpContext) {
    await auth.check()
    const user = auth.user!
    const salaId = params.salaId
    const data = request.only(["numero_da_sala", "capacidade", "disponibilidade"])

    try {
      const sala = await Sala.findOrFail(salaId)

      if (sala.userId !== user.id) {
        return response.forbidden('Você não é o professor desta sala.')
      }

      const salaExistente = await Sala.query().where('numero_da_sala', data.numero_da_sala).andWhere('id', '!=', salaId).first()
      if (salaExistente) {
        return response.status(400).json({ message: "Já existe uma sala com este número." })
      }

      sala.merge(data)
      await sala.save()
      return response.status(200).json(sala)
    } catch (error) {
      return response.status(404).json({ message: 'Sala não encontrada.' })
    }
  }

  async delete({ auth, response, params }: HttpContext) {
    const user = auth.user!
    const salaId = params.salaId
    const sala = await Sala.findOrFail(salaId)

    if (sala.userId !== user.id) {
      return response.forbidden('Você não é o professor desta sala.')
    }

    await sala.delete()
    return response.status(200).json({ message: 'Sala excluída com sucesso!' })
  }

  async get({ auth, response, params }: HttpContext) {
    auth.check!
    const user = auth.user!
    const salaId = params.salaId
    const sala = await Sala.findOrFail(salaId)

    if (sala.userId !== user.id) {
      return response.forbidden('Você não é o professor desta sala.')
    }
    return response.status(201).json(sala)
  }

  async alocarAluno({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const { salaId, alunoId } = request.only(['salaId', 'alunoId'])
    const sala = await Sala.findOrFail(salaId)

    try {

      if (sala.userId !== user.id) {
        return response.badRequest('Você não é o professor desta sala.')
      }
      await Aluno.findOrFail(alunoId)

      const alunoExistenteNaSala = await sala.related('alunos').query().wherePivot('aluno_id', alunoId).first()
      if (alunoExistenteNaSala) {
        return response.badRequest('O aluno já está nesta sala.')
      }

      if (sala.disponibilidade == false) {
        return response.status(503).json({ message: 'A sala está indisponível para alocação de alunos no momento.' })
      }

      const alunosNaSala = await sala.related('alunos').query().count('* as total')
      const capacidadeAtual = alunosNaSala[0].$extras.total
      if (capacidadeAtual >= sala.capacidade) {
        return response.status(400).json('Está alocação vai excerder a capacidade da sala.')
      }

      await sala.related('alunos').attach([alunoId])
      return response.status(200).json({ message: 'Aluno alocado para a sala!' })

    } catch (error) {
      return response.status(404).json({ message: 'Sala ou aluno não encontrado.' })
    }
  }

  async desalocarAluno({ params, response, auth }: HttpContext) {
    const user = auth.user!
    const salaId = params.salaId
    const alunoId = params.alunoId
    const sala = await Sala.findOrFail(salaId)

    if (sala.userId !== user.id) {
      return response.status(401).json({ message: "Você não é o professor desta sala." })
    }

    const alunoExistenteNaSala = await sala.related('alunos').query().wherePivot('aluno_id', alunoId).first()
    if (!alunoExistenteNaSala) {
      return response.notFound('O aluno não está nesta sala.')
    }

    await sala.related('alunos').detach([alunoId])
    return response.status(200).json({ message: 'Aluno removido da sala!' })
  }

  async mostrarAlunos({ params, response }: HttpContext) {
    const salaId = params.salaId

    try {
      const sala = await Sala.findOrFail(salaId)
      const alunos = await sala.related('alunos').query()
      return response.status(200).json({
        sala: sala.numero_da_sala,
        alunos: alunos.map(aluno => ({
          id: aluno.id,
          nome: aluno.nome,
          email: aluno.email,
          matricula: aluno.matricula,
          data_de_nascimento: aluno.data_de_nascimento
        }))
      })
    } catch (error) {
      return response.status(404).json({ message: "Sala não encontrada" })
    }
  }
}