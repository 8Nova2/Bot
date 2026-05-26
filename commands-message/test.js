module.exports = {
  name: 'test',
  description: 'Donne un rôle défini à l’utilisateur',
  async execute(message, args) {
    // ID du rôle à donner
    const roleId = '1377285490591404182'; // Remplace par l’ID réel

    //indique qui a envoyer le message
    const member = message.member;
    // verifie si le mec a le role
    if (member.roles.cache.has(roleId)) {
      return message.reply('Tu as déjà ce rôle !');
    }

    try {
      await member.roles.add(roleId);
      message.reply('Rôle ajouté avec succès !');
    } catch (error) {
      console.error(error);
      message.reply('Impossible d\'ajouter le rôle. Vérifie mes permissions.');
    }
  },
};
