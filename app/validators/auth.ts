import vine from '@vinejs/vine'

const password = vine.string().minLength(6)

export const registerValidator = vine.compile(
    vine.object({
        nome: vine.string().maxLength(90),
        email: vine.string().email().normalizeEmail().unique(async (db, value) => {
            const match = await db.from('users').select('id').where('email', value).first()

            return !match
        }),
        matricula: vine.string().maxLength(60).unique(async (db, value) => {
            const match = await db.from('users').select('id').where('matricula', value).first()

            return !match
        }),
        data_de_nascimento: vine.string().maxLength(10),
        password,
    })
)

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().email().normalizeEmail().unique(async (db, value) => {
            const match = await db.from('users').select('id').where('email', value).first()

            return match
        }),
        password,
    })
)