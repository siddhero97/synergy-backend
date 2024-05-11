const userService = require('./user.service');

async function get(req, res, next) {
    try {
        res.json(await userService.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting users`, err.message);
        next(err);
    }
}

async function create(req, res, next) {
    try {
        res.json(await userService.createUser(req.body));
    } catch (err) {
        console.error(`Error while creating users`, err.message);
        next(err);
    }
}

async function update(req, res, next) {
    try {
        res.json(await userService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating users`, err.message);
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        res.json(await userService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting users`, err.message);
        next(err);
    }
}

module.exports = {
    get,
    create,
    update,
    remove
};