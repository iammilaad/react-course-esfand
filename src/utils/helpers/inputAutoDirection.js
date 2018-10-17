function isUnicode(str) {
    var letters = [];
    for (var i = 0; i <= str.length; i++) {
        letters[i] = str.substring((i - 1), i);
        if (letters[i].charCodeAt() > 255) { return true; }
    }
    return false;
}
export function autoDirection(event, ref) {
    if (isUnicode(event.target.value)) {
        document.getElementById(ref).style.direction="rtl";
    }
    else {
        document.getElementById(ref).style.direction="ltr";
    }
}