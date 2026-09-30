/**
 * Contact form -> Google Sheets (Google Apps Script Web App)
 * =========================================================
 *
 * This script receives POST requests from the portfolio contact form and
 * appends each submission as a new row in a Google Sheet.
 *
 * SETUP (one time, ~5 minutes):
 * -----------------------------
 * 1. Create a new Google Sheet (sheets.new). Name the first tab "Submissions".
 *    Optionally add a header row: Timestamp | Name | Email | Subject | Message
 *
 * 2. In the Sheet: Extensions > Apps Script. Delete any boilerplate and paste
 *    THIS ENTIRE FILE.
 *
 * 3. Click Deploy > New deployment > select type "Web app".
 *      - Description:        contact-form
 *      - Execute as:         Me
 *      - Who has access:     Anyone
 *    Click Deploy, authorize the permissions when prompted.
 *
 * 4. Copy the "Web app URL" it gives you. It looks like:
 *      https://script.google.com/macros/s/XXXXXXXX/exec
 *
 * 5. Set the URL as CONTACT_ENDPOINT in Cloudflare Pages environment variables
 *    (or .dev.vars for local Pages Functions testing).
 *
 * 6. Re-deploy the site. Submit the form to test, then check the Sheet.
 *
 * Whenever you change this script, create a NEW deployment version (or "Manage
 * deployments" > edit > new version) so the changes go live.
 */

// If you renamed the tab, change this to match.
var SHEET_NAME = 'Submissions';

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOutput({ result: 'error' });
    }
    var data = JSON.parse(e.postData.contents);
    if (data.company) return jsonOutput({ result: 'success' });
    if (!validText(data.name, 2, 100) ||
        !validText(data.email, 3, 254) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
        !validText(data.subject, 3, 200) ||
        !validText(data.message, 10, 5000)) {
      return jsonOutput({ result: 'error' });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
      || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    sheet.appendRow([
      new Date(),
      safeCell(data.name),
      safeCell(data.email),
      safeCell(data.subject),
      safeCell(data.message),
    ]);

    return jsonOutput({ result: 'success' });
  } catch (err) {
    return jsonOutput({ result: 'error', message: String(err) });
  }
}

function validText(value, min, max) {
  return typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;
}

function safeCell(value) {
  var text = value.trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

// Simple GET handler so you can open the URL in a browser to confirm it's live.
function doGet() {
  return jsonOutput({ result: 'ok', message: 'Contact endpoint is live.' });
}

function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
