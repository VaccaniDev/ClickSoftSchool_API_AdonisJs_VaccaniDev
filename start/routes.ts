import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import UsersController from '#controllers/users_controller'
import AlunosController from '#controllers/alunos_controller'
import SalasController from '#controllers/salas_controller'


router.post('/aluno', [AlunosController, 'register'])
router.get('/aluno/:id', [AlunosController, 'get'])
router.patch('/aluno/:id', [AlunosController, 'update'])
router.delete('/aluno/:id', [AlunosController, 'delete'])

router.post('/professor/register', [UsersController, 'register']).as('auth.register')
router.post('/professor/login', [UsersController, 'login']).as('auth.login')
router.delete('/professor/logout', [UsersController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/professor', [UsersController, 'get']).as('auth.get').use(middleware.auth())
router.patch('/professor/:id', [UsersController, 'update']).as('auth.update').use(middleware.auth())
router.delete('/professor/:id', [UsersController, 'delete']).as('auth.delete').use(middleware.auth())

router.post('/professor/sala', [SalasController, 'create']).use(middleware.auth())
router.get('/professor/sala/:salaId', [SalasController, 'get']).use(middleware.auth())
router.patch('/professor/sala/:salaId', [SalasController, 'update']).use(middleware.auth())
router.delete('/professor/sala/:salaId', [SalasController, 'delete']).use(middleware.auth())

router.post('/professor/sala/aluno', [SalasController, 'alocarAluno']).use(middleware.auth())
router.delete('/professor/sala/:salaId/aluno/:alunoId', [SalasController, 'desalocarAluno']).use(middleware.auth())
router.get('/professor/sala/:salaId/aluno', [SalasController, 'mostrarAlunos'])