const rel = require('drizzle-orm/relations');
console.log('Is valid relations exported?', typeof rel.relations);
console.log('Is defineRelations exported?', typeof rel.defineRelations);
if (rel.relations) {
    console.log('relations === defineRelations?', rel.relations === rel.defineRelations);
}
const root = require('drizzle-orm');
console.log('Root relations?', typeof root.relations);
console.log('Root defineRelations?', typeof root.defineRelations);
