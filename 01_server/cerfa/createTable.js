const fs = require('fs');
// JSON data
const data = require('./data.json');
// Build paths
const buildPaths = require('./buildPaths');


const createHeader = (id) => `
    <header id="container" style="white-space:nowrap">
        <div id="outer-cerfa" style="display:inline;">
            <img width="50", height="50" src="https://upload.wikimedia.org/wikipedia/fr/thumb/0/08/Logo_Cerfa.svg/2560px-Logo_Cerfa.svg.png"/>
            <p class="ft1"> N° 11580*03 <br>DGFIP</p>
        </div>
        <div id="texts" style="display:inline; white-space:nowrap; position: relative;top: -0.5em;"> 
            <p class="ft0">Reçu au titre des dons à certains <br> organismes d’intérêt général <br> <span class="ft1">Article 200, 238 bis et 978 du code général des impôts (CGI)</span></p>
        </div>
        <div id="image" style="display:inline; float:right">
            <img width="50", height="50" src="https://tsedacall.com/profile/${id}" alt="logo_association"/>
        </div>
    </header>
`;


const createFirstTitle = () => `
  <div class="flex-container">

    <div class="flex-child">
      BENEFICIAIRE DU DON
    </div>

    <div class="flex-child">
      N° d'ordre du reçus : A2021/126961
    </div>

  </div>
`;

const createAssociationTable = (name, address, object) => `
  <table style="width:100%">
    <tr>
      <th>NOM OU DENOMINATION :</th>
      <th>Association ${name}</th>
    </tr>
    <tr>
      <th>ADRESSE ASSOCIATION :</th>
      <th>${address}</th>
    </tr>
    <tr>
      <th>OBJET :</th>
      <th>${object}</th>
    </tr>
    <tr>
      <th>QUALITE DE L’ORGANISME :</th>
      <th>Œuvre ou organisme d’intérêt général</th>
    </tr>
  </table>
`;

const createSecondTitle = () => `
  <div class="flex-container">

    <div class="flex-child">
      DONATEUR
    </div>

    <div class="flex-child" style="border: none;"></div>

  </div>
`;

const createDonatorTable = (name, address) => `
  <table style="width:100%">
    <tr>
      <th>NOM OU DENOMINATION :</th>
      <th>M. ou Mme ${name}</th>
    </tr>
    <tr>
      <th>ADRESSE DONATEUR :</th>
      <th>${address}</th>
    </tr>
  </table>
`;

const createDisplayAmount = (sum, sumWords) => `
  <h3>Le bénéficiaire reconnait avoir reçu au titre des dons et versements ouvrant droit à </h3>
  <div class="flex-container">
    <h3 style="margin-right: 5%;"> réduction d’impôts, la somme de :</h3>
    <div class="flex-child" style="padding-right: 0;">***${sum} euros*** ${sumWords}</div>
  </div>
`;

const createTableLaw = () => `
  <table>
    <tr>
      <td></td>
      <td style="width:1%""></td>
      <td class="center">Le bénéficiaire certifie sur l'honneur que les dons et versements qu’il reçoit ouvrent droit à la réduction d'impôt prévue à l’article</td>
      <td></td>
    </tr>
    <tr>
      <td>&#9745 200 du CGI</td>
      <td></td>
      <td class="center">&#10066 238 bis du CGI</td>
      <td>&#10066 978 bis du CGI</td>
      
    </tr>
    <tr>
      <td>Forme du don</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>&#10066 Acte authentique</td>
      <td>&#10066 Acte sous seing privé</td>
      <td class="center">&#9745 Declaration de don manuel </td>
      <td>&#10066 Autres</td>
    </tr>
    <tr>
      <td>Nature du don</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>&#9745 Numéraire</td>
      <td></td>
      <td class="center">&#10066 Titres de sociétés cotées</td>
      <td>&#10066 Autres</td>
    </tr>
  </table>
`;

const createSignatureRow = (date) => `
  <div class="flex-container">

    <div class="flex-child" style="border: none;">
      Date de paiement : ${date}
    </div>

    <div class="flex-child" style="border: none;">
      Signature :
    </div>

  </div>
`;

const createPayementTypeRow = () => `
  <div class="flex-container">

  <div class="flex-child" style="border: none;">
    Mode de versement : Paiement en ligne
  </div>

  <div class="flex-child" style="border: none;">
  </div>

  </div>
`;

const createTsedacallRow = () => `
  <div class="flex-container" style="margin: auto; text-align:center">

    <div class="flex-child" style="border: none;">
      Reçu cerfa généré par Tsedacall.com
    </div>

  </div>
`;

const createCommentaireRow = () => `
  <table >
    <th>Commentaire:</th>
  </table>
`;

const createHtml = (header, fTitle, assocTable, sTitle, donatorTable, displayAmount, tableLaws, commentaireRow, signatureRow, payementTypeRow, tsedacallRow) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        .no-content {
          background-color: red;
        }
        
        .ft0{font: bold 15px 'Arial';line-height: 21px;}
        .ft1{font: 11px 'Arial';line-height: 10px;}
        header * {
            display: inline-block;
        }
  
        header img
        {
            width: 75px;
            height: 75px;
        }

        #outer-cerfa img{
            position: relative;
            top: 50%;
            transform: translateY(0%);
        }

        #outer-cerfa p{
            position: absolute;
            top: 6.5%;
            left: 3%;
            transform: translateY(0%);
        }



        .flex-container {
          display: flex;
      }
      
      .flex-child {
          flex: 1;
          padding: 1%;
          font-weight: bold;
          border: 2px solid black;
      }  
      
      .flex-child:first-child {
          margin-right: 20px;
      } 

      table {
        border: 2px solid black;
        border-collapse: collapse;
      }
        th, td {
        padding: 5px;
        text-align: left;
      }

      .center {
        width:50%;
        text-align: center;
        vertical-align: middle;
      }


      </style>
    </head>
    <body>
        ${header}
        <br>
        ${fTitle}
        <br>
        ${assocTable}
        <br>
        ${sTitle}
        <br>
        ${donatorTable}
        ${displayAmount}
        <br>
        ${tableLaws}
        ${commentaireRow}
        ${signatureRow}
        ${payementTypeRow}
        ${tsedacallRow}
    </body>
  </html>
`;


const doesFileExist = (filePath) => {
	try {
		fs.statSync(filePath); // get information of the specified file path.
		return true;
	} catch (error) {
		return false;
	}
};


const createHtmlCerfa = (data) =>{
    try {
        /* Check if the file for `html` build exists in system or not */
        if (doesFileExist(buildPaths.folderStringCreation(data.donator.don_id))) {
            console.log('Deleting old build file');
            /* If the file exists delete the file from system */
            fs.unlinkSync(buildPaths.folderStringCreation(data.donator.don_id));
        }
        /* generate header */
        const header = createHeader(data.association.id);
        /* generate first title */
        const fTitle = createFirstTitle();
        /* generate association table */
        const assocTable = createAssociationTable(data.association.name, data.association.address, data.association.object);
        /* generate second title */
        const sTitle = createSecondTitle()
        /* generate donator table */
        const donatorTable = createDonatorTable(data.donator.fname + ' ' + data.donator.lname, data.donator.address)
        /* generate display amount */
        const displayAmount =  createDisplayAmount(data.donator.sum, data.donator.sumWords)
        /* generate table Law */
        const tableLaws =  createTableLaw()
        /* generate commantaire Row */
        const commentaireRow = createCommentaireRow()
        /* generate signature Row */
        const signatureRow = createSignatureRow(data.date)
        /* generate Payement type Row */
        const payementTypeRow = createPayementTypeRow()
        /* generate  Tsedacall Row */
        const tsedacallRow = createTsedacallRow()
        /* generate html */
        const html = createHtml(header, fTitle, assocTable, sTitle, donatorTable, displayAmount, tableLaws, commentaireRow, signatureRow, payementTypeRow, tsedacallRow);
        /* write the generated html to file */
        if (!fs.existsSync(buildPaths.buildPathDir(data.donator.don_id))){
          fs.mkdirSync(buildPaths.buildPathDir(data.donator.don_id),{recursive: true});
        }
        fs.writeFileSync(buildPaths.buildPathHtml(buildPaths.folderStringCreation(data.donator.don_id)), html);
        console.log('Succesfully created an HTML table');
    } catch (error) {
        console.log('Error generating table', error);
    }
}

module.exports = createHtmlCerfa;