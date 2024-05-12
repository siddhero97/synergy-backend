const userService = require('./user.service');

async function get(req, res, next) {
    try {
        res.json(await userService.getMultiple(req.userId));
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
        res.json(await userService.update(req.userId, req.body));
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

async function login(req, res, next) {
    try {
        const token = await userService.login(req.body.email, req.body.password);
        return res.status(200).json({
            token: token,
            success: true
        });

    } catch (err) {
        console.error(`Error while login users`, err.message);
        return res.status(401).json({
            message: err.message,
            success: false
        });
    }
}



module.exports = {
    get,
    create,
    update,
    remove,
    login
};