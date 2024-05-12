const userService = require('./user.service');

async function getUserById(req, res, next) {
    try {
        res.json(await userService.getUserById(req.params.userId));
    } catch (err) {
        console.error(`Error while getting user by id`, err.message);
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
        res.json(await userService.updateUser(req.userId, req.body));
    } catch (err) {
        console.error(`Error while updating users`, err.message);
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        res.json(await userService.deleteUser(req.userId));
    } catch (err) {
        console.error(`Error while deleting users`, err.message);
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const result = await userService.login(req.body.email, req.body.password);
        return res.status(200).json({
            token: result.token,
            userId: result.userId,
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
    getUserById,
    create,
    update,
    remove,
    login
};