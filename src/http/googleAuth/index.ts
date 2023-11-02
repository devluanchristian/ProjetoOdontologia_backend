import fastifyPassport from '@fastify/passport'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import fastifySession from '@fastify/session'
import fastifyCookie from '@fastify/cookie'

export async function authenticateGoogle(app: FastifyInstance) {
  // Registra o plugin fastify-cookie para gerenciar cookies.
  app.register(fastifyCookie)

  // Registra o plugin fastify-session para gerenciar sessões.
  app.register(fastifySession, {
    secret: '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', // Chave secreta para sessões
    cookie: {
      secure: false, // Configure como true se estiver usando HTTPS
      path: '/',
    },
  })

  // Inicializa o Passport para autenticação de usuário.
  app.register(fastifyPassport.initialize())

  // Configuração do OAuth2 com o Gmail usando a estratégia do Google.
  fastifyPassport.use(
    new GoogleStrategy(
      {
        clientID:
          '433451088805-8m21pjhfts60vqcsc3ee9nm7moqgaal5.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3333/auth/google/callback', // URL de retorno após autenticação
      },
      (accessToken, refreshToken, profile, done) => {
        // Aqui você pode processar o perfil do usuário após a autenticação.
        console.log(profile)
        return done(null, profile)
      },
    ),
  )

  // Configura o processo de serialização e desserialização do usuário.
  fastifyPassport.registerUserSerializer(async (user, done) => {
    return user
  })
  fastifyPassport.registerUserDeserializer(async (user, req) => {
    return user
  })

  // Rota de callback do Google após autenticação bem-sucedida.
  app.get(
    '/auth/google/callback',
    {
      preValidation: fastifyPassport.authenticate('google', {
        scope: ['profile'], // Escopo da autenticação do Google
      }),
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const user = req.user?.displayName
      reply.status(200).send(`Usuario ${user} foi autenticado`)
    },
  )

  // Rota de autenticação do Google que inicia o processo de autenticação.
  app.get(
    '/auth/google',
    fastifyPassport.authenticate('google', { scope: ['profile'] }),
  )

  // Rota para efetuar logout do usuário.
  app.get('/logout', async (req: FastifyRequest, res: FastifyReply) => {
    req.logout() // Realiza o logout do usuário.
    return { success: true } // Retorna um objeto JSON indicando sucesso.
  })
}
