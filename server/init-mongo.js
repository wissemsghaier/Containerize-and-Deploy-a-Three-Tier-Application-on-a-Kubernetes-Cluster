// Utiliser les variables d'environnement passées au conteneur
const user = process.env.MONGO_USER || 'myUser';
const password = process.env.MONGO_PASSWORD || 'myPassword';
const dbName = process.env.MONGO_DB || 'e-com';

db.createUser({
  user: user,
  pwd: password,
  roles: [
    { role: "readWrite", db: dbName }
  ]
});



