const db = require('../configs/mysql.js');
var nodemailer = require('nodemailer');
const xl = require('excel4node');

exports.Excel = async (body, user_id, vinha_id, module_name, tipo) => {
    let email = await this.getUserEmail(user_id);
    let vinhaNome = await this.getVinhaName(vinha_id);
    return new Promise((resolve,reject)=>{
        vinhaNome = vinhaNome[0].Nome;
        email = email[0].email;
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet('Informacao');

        for(let i = 0; i < body.length; i++){
            body[i].vinha = vinhaNome;
            body[i].modulo = module_name;
            body[i].tipo = tipo;
        }
        let keys = Object.keys(body[0]);
        let values = Object.values(body[0]);

        let headingColumnNames = [];

        for(var i = 0; i< keys.length ; i++){
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
        body.forEach( record => {
            let columnIndex = 1;
            Object.keys(record ).forEach(columnName =>{
                ws.cell(rowIndex,columnIndex++)
                    .string(record [columnName]+"")
            });
            rowIndex++;
        });

        wb.write('Informacao.xlsx');
        this.sendMail(email);
        resolve(body);
    });
}

exports.sendMail = async(mail) => {
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

    transporter.sendMail(mailOptions, function(error, info){
    });
}

exports.getUserEmail = async (id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select email from user
                where user_id = ?`, [id],
                (err,row)=>{
            if(err)
                reject (err)
            resolve(row);
        });
    });
}

exports.getVinhaName = async (id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select nome from vinha
                where vinha_id = ?`, [id],
                (err,row)=>{
            if(err)
                reject (err)
            resolve(row);
        });
    });
}