exports.validateReqData = function (req, type, dataKeys, callback) {
    var notValidProps = []
    var dataTypeObj = req[type]
    for (var i = 0; i < dataKeys.length; i++) {
        // console.log(dataTypeObj[dataKeys[i]])
        if (typeof dataTypeObj[dataKeys[i]] === 'undefined' ||
            dataTypeObj[dataKeys[i]] === null) {
            notValidProps.push(dataKeys[i])
        }
    }
    if (notValidProps.length) {
        callback(true, notValidProps)
    } else {
        callback(false, null)
    }
}