const express = require("express");
const pacienteController = require('../controllers/pacienteController.js');
const router = express.Router();
const multer = require('multer');


const { checkToken } = require('../../utils/middlewares.js');
const userEsp = require("../models/userEsp.js");
const userReg = require("../models/userRegular.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.use('/usersReg', require('./usersReg.js'));

router.use('/usersEsp', require('./userEsp.js'));

router.post('/restablecer', pacienteController.EnviarToken);

router.get('/restablecer-password/:Token', pacienteController.ValidarToken);

router.put('/actualizar-password/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const newPassword = req.body.password;

        // Buscar al usuario por el token
        const user = await userReg.findOne({ resetToken: token });

        // Verificar si el usuario existe y el token no ha expirado
        if (!user || user.resetTokenExpiry < Date.now()) {
            return res.status(400).json({ error: 'Token no válido o expirado' });
        }

        // Actualizar la contraseña del usuario y eliminar el token
        user.password = newPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;

        // Guardar los cambios en la base de datos
        await user.save();

        console.log("Nuevo registro:", user);

        // Enviar una respuesta exitosa
        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al actualizar la contraseña' });
    }
});

router.post('/pac', upload.fields([{ name: 'foto' }, { name: 'cert' }]), pacienteController.guardarPaciente);

router.get('/pac',pacienteController.obtenerPacientes);

router.get('/pac/ciu',checkToken,pacienteController.obtenerCiudades);

router.get('/pac/:id',checkToken,pacienteController.obtenerPaciente);

router.delete('/pac/:id', pacienteController.eliminarPaciente);


module.exports = router;