const TEXTS = {
  SERVER_TRACKING: "Le serveur est en cours d'ajout au suivi.",
  SERVER_TRACKED:
    "Serveur ajouté avec succès. Le bot va désormais suivre l'état du serveur. Assurez-vous de conserver les autorisations actuelles lors de l'organisation des canaux vocaux. Les statistiques seront mises à jour toutes les 5 minutes. Vous pouvez utiliser `/remove` pour supprimer les canaux.",
  ERROR_ADDING_SERVER: "Une erreur s'est produite lors de l'ajout du serveur.",
  SERVER_REMOVING: "Le serveur est en cours de suppression du suivi.",
  SERVER_REMOVED: "Serveur supprimé avec succès.",
  ERROR_REMOVING_SERVER:
    "Une erreur s'est produite lors de la suppression du serveur.",
  NO_SERVER_TRACKED: "Veuillez configurer un serveur avant de pinguer.",
  NOT_AN_ADMIN: "Vous devez être administrateur pour exécuter cette commande.",
  NO_PERMISSION:
    "Le bot n'a pas la permission de gérer les canaux. Veuillez lui accorder cette permission.",
  SOMETHING_WENT_WRONG:
    "Quelque chose s'est mal passé. Veuillez réessayer plus tard.",
  SERVER_OFFLINE: "Le serveur est hors ligne.",
  SERVER_ONLINE: "Le serveur est en ligne.",
};

module.exports = TEXTS;
