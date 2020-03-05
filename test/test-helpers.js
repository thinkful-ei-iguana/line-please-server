function testData () {
  return {
    section1: [
      'Select which text you want to practice!'],
    title: 'Title'
  }
}

async function seedText(db, text) {
  await db.transaction(async trx => {
    await trx.into("alltext").insert(text);
  });
}


module.exports = {
  testData,
  seedText
};