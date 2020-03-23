/* eslint-disable indent */
const textService = {

    getTitles(knex) {
        return knex
            .select('title', 'id')
            .from('alltext')
    },

    getText(knex, title) {
        return knex
            .from('alltext')
            .select('content')
            .where('title', title)
            .first()
    },

    postText(knex, newText) {
        return knex
            .insert(newText)
            .into('alltext')
            .returning('*')
            .then(rows => rows[0])
    },

    deleteText(knex, id) {
        return knex('alltext')
            .where('id', id)
            .delete()

    }
}

module.exports = textService