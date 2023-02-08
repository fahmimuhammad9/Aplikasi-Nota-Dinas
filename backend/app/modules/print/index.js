const PDFDocument = require('pdfkit');
const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');
const pdf = require('html-pdf');

const puppeteer = require('puppeteer');

const PRINT = {
    created: async(req, res)=>{
        try{
            const doc = new PDFDocument({size:'A4', margin:'30'});
            doc.pipe(fs.createWriteStream('uploads/output.pdf'));
            generate_header(doc);
            generate_information(doc);
            doc.moveTo(50,200).lineTo(550, 200).stroke();

            let text = "<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            wkhtmltopdf(text);
            doc.font('Times-Roman').fontSize(11).text(text, 50,224,{align:'justify', width:500, private: true});

            doc.end()
            return res.json({status:'OK', success:true, errors:false, message:'Berhasil'})
        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message})
        }
    },
    test: async(req, res)=>{
        res.sendFile(__dirname+'/nota_dinas.html');
    },
    testcreate: async(req, res)=>{
        try{

        }catch(err){
            return res.json({status:'OK', success:false, errors:true, message: err.message});
        }
    },

    createdPup: async(req, res)=>{
        try{
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto('https://www.africau.edu/images/default/sample.pdf');
            const pdf = await page.pdf({format:'A4'});

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="file.pdf"');
            res.send(pdf);

            await browser.close();
        }catch(err){
            return res.json({status:'OK', success:false, errors:true,message: err.message});
        }
    }
}

function generate_header(doc){
    doc
        .font('Times-Bold')
        .fontSize(11)
        .text('Nota Dinas',{
            underline: true,
            align: 'center'
        });
    doc.font('Times-Bold').fontSize(11).text('092/SDM/II/XX/2022',{align:'center'});
}

function generate_information(doc){
    doc.font('Times-Roman').fontSize(11).text('Kepada',50,100,{align:'left'})
    doc.font('Times-Roman').fontSize(11).text(':',100,100,{align:'left'})
    doc.font('Times-Roman').fontSize(11).text('Saya Sendiri',110,100,{align: 'left'})

    doc.font('Times-Roman').fontSize(11).text('Dari',50, 112, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text(':',100, 112, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text('Kamu Iya Kamu',110, 112, {align:'left'});

    doc.font('Times-Roman').fontSize(11).text('Tanggal',50, 124, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text(':',100, 124, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text('09 Desember 2022',110, 124, {align:'left'});

    doc.font('Times-Roman').fontSize(11).text('Lampiran',50, 136, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text(':',100, 136, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text('1 File',110, 136, {align:'left'});

    doc.font('Times-Roman').fontSize(11).text('Sifat',50, 148, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text(':',100, 148, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text('SS',110, 148, {align:'left'});

    doc.font('Times-Roman').fontSize(11).text('Urgensi',50, 160, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text(':',100, 160, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text('SS',110, 160, {align:'left'});

    doc.font('Times-Roman').fontSize(11).text('Perihal',50, 172, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text(':',100, 172, {align:'left'});
    doc.font('Times-Roman').fontSize(11).text('Penyerangan Desa Konoha',110, 172, {align:'left'});
}

module.exports = PRINT