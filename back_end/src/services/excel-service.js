
var nodemailer = require('nodemailer');
const xl = require('excel4node');
const vinhaService = require("../services/vinha-service");
const vinhaUserService = require("../services/vinhaUser-service");

const db = require('../configs/teste.js');

//Cria o ficheiro excel e envia o mail
exports.excel = async (body, user_id, vinha_id, module_name, tipo) => {
    let email = await this.getUserEmail(user_id);
    let vinhaNome = await vinhaService.getVinhaName(vinha_id);
    
    return new Promise((resolve, reject) => {
        vinhaNome = vinhaNome[0].Nome;
        email = email[0].email;
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet('Informacao');

        

        for (let i = 0; i < body.length; i++) {
            body[i].vinha = vinhaNome;
            body[i].modulo = module_name;
            body[i].tipo = tipo;
        }
        let keys = Object.keys(body[0]);

        let headingColumnNames = [];

        for (var i = 0; i < keys.length; i++) {
            headingColumnNames[i] = keys[i];
        }

        //Write Column Title in Excel file
        let headingColumnIndex = 1;
        headingColumnNames.forEach(heading => {
            ws.cell(1, headingColumnIndex++)
                .string(heading)
        });

        //Write Data in Excel file
        let rowIndex = 2;
        body.forEach(record => {
            let columnIndex = 1;
            Object.keys(record).forEach(columnName => {
                ws.cell(rowIndex, columnIndex++)
                    .string(record[columnName] + "")
            });
            rowIndex++;
        });

        wb.write('Informacao.xlsx');
        this.sendMail(email);
        resolve(body);
    });
}

//Enviar um email
exports.sendMail = async (mail) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'khemipt@gmail.com',
            pass: 'khemkhemipt'
        }
    });

    var mailOptions = {
        from: 'khemipt@gmail.com',
        to: mail,
        subject: 'Informacao solicitada',
        text: "Informacao solicitada sobre as suas vinhas",
        attachments: [
            {
                path: "Informacao.xlsx"
            }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
    });
}


//Retorna o email de um user atraves do seu user id
exports.getUserEmail = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`select email from user
                where user_id = ?`, [id],
            (err, row) => {
                if (err)
                    reject(err)
                resolve(row);
            });
    });
}

//Retorna o email de todos os users de um determinado modulo atraves do module id
exports.getUsersEmailsFromModule = async (module_id) => {
    let vinha = await vinhaService.getVinhaFromModule(module_id);
    let users = await vinhaUserService.getUserFromConnection(vinha[0].vinha_id);

    let emails = [];
    for (let i = 0; i < users.length; i++) {
        emails.push(await this.getUserEmail(users[i].user_id))
    }

    return emails;
}