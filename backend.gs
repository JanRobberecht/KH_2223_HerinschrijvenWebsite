const ss = SpreadsheetApp.openById("1r_FiM9wBb1EQvpfEe-CqwRghabN4QxoDhoQA63LBTSw")
const ws = ss.getSheetByName("dBase");


function doGet() {

  return HtmlService.createTemplateFromFile("main").evaluate().addMetaTag('viewport', 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no1');
}

function include(filename){
 
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
 
}


function writeToDatabase(e) {
  

  

  var ln = e.lastName;
  var fn = e.firstName;
  var tmpName = ln+fn;
  
  var name = tmpName
    .toLowerCase()
    .replace(/[\s+0-9`~!@#$£%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");



  const lock = LockService.getScriptLock();
  
  lock.waitLock(30000);

  if (lock.hasLock()) {

    Logger.log(typeof lock.hasLock());

    Utilities.sleep(2000);

    ws.appendRow([
      new Date(),
      name, 
      e.lastName, 
      e.firstName,
      e.classNowName,
      e.nextYear,
      e.classNextA,
      e.classInfoA,
      e.classNextB,
      e.classInfoB,
      e.classNextC,
      e.classInfoC,
      e.image,
      e.language,
      e.submitter,
      e.lastNameSubmitter,
      e.firstNameSubmitter,
      e.typeSubmitter,
      e.emailSubmitter
    ]);

   

    lock.releaseLock();
    return true;

  } else {

      lock.releaseLock();
      return false;
  }


}