// Dates in month of year

const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//Check if a date is palidrome
export const checkIfDateIsPallindrom = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return checkAllCombi(year.toString(), month.toString(), day.toString());
};

function checkAllCombi(yyyy: string, mm: string, dd: string) {
  const dateFormat1 = yyyy + mm + dd;
  const dateFormat2 = dd + mm + yyyy;
  const dateFormat3 = mm + dd + yyyy.substring(2);
  const dateFormat4 = Number(mm) + dd + yyyy;

  if (isPalindrome(dateFormat1)) {
    return `${yyyy}-${mm}-${dd}`;
  } else if (isPalindrome(dateFormat2)) {
    return `${dd}-${mm}-${yyyy}`;
  } else if (isPalindrome(dateFormat3)) {
    return `${mm}-${dd}-${yyyy.substring(2)}`;
  } else if (isPalindrome(dateFormat4)) {
    return `${Number(mm)}-${dd}-${yyyy}`;
  } else {
    return null;
  }
}

function isPalindrome(stringCheck) {
  const max = Math.floor(stringCheck.length / 2);
  for (let i = 0; i < max; i++) {
    if (stringCheck[i] != stringCheck[stringCheck.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

export function findNextDate(dateInput: Date) {
  const year = dateInput.getFullYear();
  const month = dateInput.getMonth() + 1;
  const date = dateInput.getDate();

  let ddNo1 = Number(date);
  let mmNo1 = Number(month);
  let yyNo1 = Number(year);
  let ddNo2 = Number(date);
  let mmNo2 = Number(month);
  let yyNo2 = Number(year);

  for (let i = 1; i > 0; i++) {
    //forward check
    ddNo1 = ddNo1 + 1;
    if (ddNo1 > Number(datesInMonth[mmNo1 - 1])) {
      ddNo1 = 1;
      mmNo1 = mmNo1 + 1;
      if (mmNo1 > 12) {
        mmNo1 = 1;
        yyNo1 = yyNo1 + 1;
      }
    }
    let yyString = yyNo1.toString();
    let mmString = mmNo1.toString();
    let ddString = ddNo1.toString();
    if (mmString.length == 1) {
      mmString = "0" + mmString;
    }
    if (ddString.length == 1) {
      ddString = "0" + ddString;
    }
    let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
    if (setFlagNextDate) {
      return [`${setFlagNextDate}`, i];
    }

    //backward check
    if (yyNo2 > 1) {
      ddNo2 = ddNo2 - 1;
      if (ddNo2 < 1) {
        mmNo2 = mmNo2 - 1;
        if (mmNo2 < 1) {
          mmNo2 = 12;
          yyNo2 = yyNo2 - 1;
          if (yyNo2 < 1) {
            break;
          }
          ddNo2 = datesInMonth[mmNo2 - 1];
        }
      }
      let yyString = yyNo2.toString();
      let mmString = mmNo2.toString();
      let ddString = ddNo2.toString();
      if (mmString.length == 1) {
        mmString = "0" + mmString;
      }
      if (ddString.length == 1) {
        ddString = "0" + ddString;
      }
      let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
      if (setFlagNextDate) {
        return [`${setFlagNextDate}`, i];
      }
    }
  }
}
