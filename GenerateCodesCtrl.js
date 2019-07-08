
export function generateCodes(fourDigitCode, requestedAmount){
    var codeArray = [];

    for(var i = 0; i < requestedAmount; i++){
        codeArray[i] = fourDigitCode + i.toString();
    }

    return codeArray;
}