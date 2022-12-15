const { getDatabase } = require("./mongo");
const { ObjectId } = require("mongodb");

const collectionName = "records";

async function insertRecord(record) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(record);
  return insertedId;
}

async function getRecords() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteRecord(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  });
}

async function updateRecord(id, record) {
  const database = await getDatabase();
  delete record._id;
  await database.collection(collectionName).update(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...record,
      },
    }
  );
}

module.exports = {
  insertRecord,
  getRecords,
  deleteRecord,
  updateRecord,
};
