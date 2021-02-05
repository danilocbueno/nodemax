module.exports = (schema) =>
    async (req, res, next) => {
        const payload = req.body
        try {
            const validated = await schema.validateAsync(payload, {
                allowUnknown:true //por causa do _csrf!
            });
            req.body = validated
            next()
        }
        catch (err) {
            console.log(err);
            let errorMessages = err.details.map(el => el.message)
            console.error(errorMessages)
            req.flash('validationFailure', errorMessages)
            res.redirect(303, 'back')
        }
    }