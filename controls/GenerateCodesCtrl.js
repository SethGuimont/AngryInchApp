// GenerateCodesCtrl.js
// Authored by Nathan Bishop
// Not in use for iteration 2 7/11/2019
export function generateCodes(fourDigitCode, requestedAmount){
    var codeArray = [];

    for(var i = 0; i < requestedAmount; i++){
        codeArray[i] = fourDigitCode + i.toString();
    }

    return codeArray;
}