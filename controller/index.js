const fs = require("fs");
const csv = require("csv-parser");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const path = require("path");
const csvFilePath = path.resolve(__dirname, "../db.csv");

const statement = async (req, res) => {
  const { startDate, endDate, email } = req.body;
  let transactions = [];
  const doc = new PDFDocument();
  let pdfStream = fs.createWriteStream("transaction.pdf");
  doc.pipe(pdfStream);
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      const dateParts = row.date_of_transaction.split("-");
      const startParts = startDate.split("-");
      const endParts = endDate.split("-");

      if (
        row.user_email === email &&
        dateParts[0] >= startParts[0] &&
        dateParts[0] <= endParts[0] &&
        dateParts[1] >= startParts[1] &&
        dateParts[1] <= endParts[1] &&
        dateParts[2] >= startParts[2] &&
        dateParts[2] <= endParts[2]
      ) {
        transactions.push(row);
      }
    })
    .on("end", () => {
      doc.text("Transactions", { align: "center" });
      doc.text("------------------------------------------------------------");

      transactions.forEach((transaction) => {
        doc.text(`Date of Transaction: ${transaction.date_of_transaction}`);
        doc.text(`Amount: ${transaction.amount}`);
        doc.text(
          "------------------------------------------------------------"
        );
      });

      doc.end();
      pdfStream.on("finish", function () {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "email@gmail.com",
            pass: "password",
          },
        });
        let mailOptions = {
          from: "email@gmail.com",
          to: email,
          subject: "Transaction Statement",
          text: "Please find the attached transaction statement.",
          attachments: [
            {
              filename: "transaction.pdf",
              path: __dirname + "/transaction.pdf",
              contentType: "application/pdf",
            },
          ],
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      });
    });
};

module.exports = statement;
