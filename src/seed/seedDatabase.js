import models from '../models/index.js'

export default async function seedDatabase(){
    let category1 = await models.Category.create({name:'tutorial', description: 'conteúdos explicativos sobre assuntos isolados'})
    let category2 = await models.Category.create({name:'relato', description: 'textos relacionados a experiências individuais'})
    let category3 = await models.Category.create({name:'indicação', description: 'indicação de livros, artigos, vídeos, etc'})
    
    let user1 = await models.User.create({
        name: "Deivyson José da silva",
        email: "dev.deivyson@gmail.com",
        password: "senha123",
        website: "https://deivyson-silva.vercel.app",
        github: "https://github.com/deivysonjds",
        linkedin: "https://www.linkedin.com/in/deivyson-silva-218b84297/"
    })

    let post1 = await models.Post.create({
        title: 'Como se proteger de phishing',
        content: 'Para se proteger de phishing, desconfie de mensagens que pedem dados pessoais ou criam senso de urgência. Verifique sempre o remetente, o endereço do site e nunca clique em links suspeitos — prefira digitar o site manualmente. Ative autenticação em duas etapas, use senhas fortes e mantenha seus dispositivos atualizados. Se tiver dúvida, não responda: confirme a informação diretamente com a empresa pelos canais oficiais.',
        userId: user1.id,
        categoryId: category1.id
    })

    let post2 = await models.Post.create({
        title: 'Indicação de curso',
        content: 'Para quem queira se iniciar em cybersegurança, recomendo se inscrever no curso do governo HACKERS DO BEM. Conteúdo extremanente didático',
        userId: user1.id,
        categoryId: category3.id
    })

    let user2 = await models.User.create({
        name: "Ewayrton",
        email: "user2@gmail.com",
        password: "senha123"
    })

    await models.Follower.create({
        followerId: user2.id,
        followingId: user1.id
    })

    let user3 = await models.User.create({
        name: "Matheus",
        email: "user3@gmail.com",
        password: "senha123"
    })

    await models.Follower.create({
        followerId: user3.id,
        followingId: user1.id
    })


}