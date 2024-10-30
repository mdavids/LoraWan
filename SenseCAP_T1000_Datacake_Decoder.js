// Version 20241030-05
// Adapted from Datacake default, with some inspiration from SenseCAP_T1000_Helium_Decoder.js
// By M. Davids
function Decoder(bytes, port) {
    // Output normalized Payload
    // console.log(JSON.stringify(normalizedPayload,0,4));

    // Output raw payload coming from webhook of your LNS
    // console.log(JSON.stringify(rawPayload));

    var sosEvent = false

    var bytesString = bytes2HexString(bytes).toLocaleUpperCase()
    var datacakeFields = []
    var measurement = messageAnalyzed(bytesString)
    datacakeFields = measurement

    // Get TDOA GeoLocation from Metadata - probable very KPN Things specific
    // Tailored for KPN Decoder: Raw LoRa payload Extended (v2)
    var lon = null
    var lat = null
    var loctime = null

    if (Array.isArray(rawPayload)) {
        rawPayload.forEach(function(item) {
            switch (item.n) {
                case 'latitude':
                    lat = item.v
                    break
                case 'longitude':
                    lon = item.v
                    break
                case 'locTime':
                    loctime = item.v
                    break
            }
        })
        if (lat !== null && lon !== null) {
            var location = '(' + lat + ',' + lon + ')'
            datacakeFields.push({
                field: 'GATEWAY_LOCATION',
                value: location,
                timestamp: loctime
            })
        } else {
            console.log('lon and/or lat was empty.')
        }
    } else {
        console.log('rawPayload not available.')
    }

    // TODO fport check(s)? See SenseCAP_T1000_Helium_Decoder.js

    measurement.forEach(function(item) {
        if (item.field === 'EVENT_STATUS') {
            item.value.forEach(function(event) {
                if (event.id === 7) {
                    sosEvent = true
                }
            })
        }
    })

    if (sosEvent) {
        datacakeFields.push({
            field: 'SOS_EVENT',
            value: sosEvent
        })
    } // TODO: timestamp, somehow?

    return datacakeFields
}

function messageAnalyzed(messageValue) {
    try {
        var frames = unpack(messageValue)
        var measurementResultArray = []
        for (var i = 0; i < frames.length; i++) {
            var item = frames[i]
            var dataId = item.dataId
            var dataValue = item.dataValue
            var measurementArray = deserialize(dataId, dataValue)
            measurementResultArray = measurementResultArray.concat(measurementArray)
        }
        return measurementResultArray
    } catch (e) {
        return e.toString()
    }
}

function unpack(messageValue) {
    var frameArray = []

    for (var i = 0; i < messageValue.length; i++) {
        var remainMessage = messageValue
        var dataId = remainMessage.substring(0, 2)
        var dataValue
        var dataObj = {}
        var packageLen
        switch (dataId) {
            case '01':
                dataValue = remainMessage.substring(2, 94)
                messageValue = remainMessage.substring(94)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '02':
                dataValue = remainMessage.substring(2, 32)
                messageValue = remainMessage.substring(32)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '03':
                dataValue = remainMessage.substring(2, 64)
                messageValue = remainMessage.substring(64)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '04':
                dataValue = remainMessage.substring(2, 20)
                messageValue = remainMessage.substring(20)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '05':
                dataValue = remainMessage.substring(2, 10)
                messageValue = remainMessage.substring(10)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '06':
                dataValue = remainMessage.substring(2, 44)
                messageValue = remainMessage.substring(44)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '07':
                dataValue = remainMessage.substring(2, 84)
                messageValue = remainMessage.substring(84)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '08':
                dataValue = remainMessage.substring(2, 70)
                messageValue = remainMessage.substring(70)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '09':
                dataValue = remainMessage.substring(2, 36)
                messageValue = remainMessage.substring(36)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '0A':
                dataValue = remainMessage.substring(2, 76)
                messageValue = remainMessage.substring(76)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '0B':
                dataValue = remainMessage.substring(2, 62)
                messageValue = remainMessage.substring(62)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '0C':
                break
            case '0D':
                dataValue = remainMessage.substring(2, 10)
                messageValue = remainMessage.substring(10)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '0E':
                packageLen = getInt(remainMessage.substring(8, 10)) * 2 + 10
                dataValue = remainMessage.substring(2, 8) + remainMessage.substring(10, packageLen)
                messageValue = remainMessage.substring(packageLen)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '0F':
                dataValue = remainMessage.substring(2, 34)
                messageValue = remainMessage.substring(34)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '10':
                dataValue = remainMessage.substring(2, 26)
                messageValue = remainMessage.substring(26)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '11':
                dataValue = remainMessage.substring(2, 28)
                messageValue = remainMessage.substring(28)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '1A':
                dataValue = remainMessage.substring(2, 56)
                messageValue = remainMessage.substring(56)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '1B':
                dataValue = remainMessage.substring(2, 96)
                messageValue = remainMessage.substring(96)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '1C':
                dataValue = remainMessage.substring(2, 82)
                messageValue = remainMessage.substring(82)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            case '1D':
                dataValue = remainMessage.substring(2, 40)
                messageValue = remainMessage.substring(40)
                dataObj = {
                    dataId: dataId,
                    dataValue: dataValue
                }
                break
            default:
                dataValue = ''
                break
        }
        if (dataValue.length < 2) {
            break
        }
        frameArray.push(dataObj)
    }
    return frameArray
}

function deserialize(dataId, dataValue) {
    var measurementArray = []
    var collectTime = 0
    // TODO SenseCAP_T1000_Helium_Decoder.js has some more variables, do we want them?
    switch (dataId) {
        case '01':
            measurementArray = getUpShortInfo(dataValue)
            measurementArray.push.apply(measurementArray, getMotionSetting(dataValue.substring(30, 40)))
            measurementArray.push.apply(measurementArray, getStaticSetting(dataValue.substring(40, 46)))
            measurementArray.push.apply(measurementArray, getShockSetting(dataValue.substring(46, 52)))
            measurementArray.push.apply(measurementArray, getTempSetting(dataValue.substring(52, 72)))
            measurementArray.push.apply(measurementArray, getLightSetting(dataValue.substring(72, 92)))
            break
        case '02':
            measurementArray = getUpShortInfo(dataValue)
            break
        case '03':
            measurementArray.push.apply(measurementArray, getMotionSetting(dataValue.substring(0, 10)))
            measurementArray.push.apply(measurementArray, getStaticSetting(dataValue.substring(10, 16)))
            measurementArray.push.apply(measurementArray, getShockSetting(dataValue.substring(16, 22)))
            measurementArray.push.apply(measurementArray, getTempSetting(dataValue.substring(22, 42)))
            measurementArray.push.apply(measurementArray, getLightSetting(dataValue.substring(42, 62)))
            break
        case '04':
            var interval = 0
            var workMode = getInt(dataValue.substring(0, 2))
            var heartbeatInterval = getMinsByMin(dataValue.substring(4, 8))
            var periodicInterval = getMinsByMin(dataValue.substring(8, 12))
            var eventInterval = getMinsByMin(dataValue.substring(12, 16))
            switch (workMode) {
                case 0:
                    interval = heartbeatInterval
                    break
                case 1:
                    interval = periodicInterval
                    break
                case 2:
                    interval = eventInterval
                    break
            }
            measurementArray = [{
                    field: 'WORK_MODE',
                    value: workMode
                },
                {
                    field: 'HEARTBEAT_INTERVAL',
                    value: heartbeatInterval
                },
                {
                    field: 'PERIODIC_INTERVAL',
                    value: periodicInterval
                },
                {
                    field: 'EVENT_INTERVAL',
                    value: eventInterval
                },
                {
                    field: 'SOS_MODE',
                    value: getSOSMode(dataValue.substring(16, 18))
                },
                {
                    field: 'UPLINK_INTERVAL',
                    value: interval
                }
            ]
            break
        case '05':
            measurementArray = [{
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(0, 2))
                },
                {
                    field: 'WORK_MODE',
                    value: getWorkingMode(dataValue.substring(2, 4))
                },
                {
                    field: 'POSITION_STRATEGY',
                    value: getPositioningStrategy(dataValue.substring(4, 6))
                },
                {
                    field: 'SOS_MODE',
                    value: getSOSMode(dataValue.substring(6, 8))
                }
            ]
            break
        case '06':
            // TODO SenseCAP_T1000_Helium_Decoder.js has parseFloat - do we want that here too?
            // TODO What about adding MotionID, yes or no ? Also applies to 07 .. 0B
            collectTime = getUTCTimestamp(dataValue.substring(8, 16))
            measurementArray = [{
                    field: 'EVENT_STATUS',
                    value: getEventStatus(dataValue.substring(0, 6)),
                    timestamp: collectTime
                },
                {
                    field: 'DEVICE_LOCATION',
                    value: '(' + getSensorValue(dataValue.substring(24, 32), 1000000) + ',' + getSensorValue(dataValue.substring(16, 24), 1000000) + ')',
                    timestamp: collectTime
                },
                {
                    field: 'AIR_TEMPERATURE',
                    value: getSensorValue(dataValue.substring(32, 36), 10),
                    timestamp: collectTime
                },
                {
                    field: 'LIGHT',
                    value: getSensorValue(dataValue.substring(36, 40)),
                    timestamp: collectTime
                },
                {
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(40, 42)),
                    timestamp: collectTime
                }
            ]
            break
        case '07':
            collectTime = getUTCTimestamp(dataValue.substring(8, 16))
            measurementArray = [{
                    field: 'EVENT_STATUS',
                    value: getEventStatus(dataValue.substring(0, 6)),
                    timestamp: collectTime
                },
                {
                    field: 'WIFI_SCAN',
                    value: getMacAndRssiObj(dataValue.substring(16, 72)),
                    timestamp: collectTime
                },
                {
                    field: 'AIR_TEMPERATURE',
                    value: getSensorValue(dataValue.substring(72, 76), 10),
                    timestamp: collectTime
                },
                {
                    field: 'LIGHT',
                    value: getSensorValue(dataValue.substring(76, 80)),
                    timestamp: collectTime
                },
                {
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(80, 82)),
                    timestamp: collectTime
                }
            ]
            break
        case '08':
            collectTime = getUTCTimestamp(dataValue.substring(8, 16))
            measurementArray = [{
                    field: 'EVENT_STATUS',
                    value: getEventStatus(dataValue.substring(0, 6)),
                    timestamp: collectTime
                },
                {
                    field: 'BLE_SCAN',
                    value: getMacAndRssiObj(dataValue.substring(16, 58)),
                    timestamp: collectTime
                },
                {
                    field: 'AIR_TEMPERATURE',
                    value: getSensorValue(dataValue.substring(58, 62), 10),
                    timestamp: collectTime
                },
                {
                    field: 'LIGHT',
                    value: getSensorValue(dataValue.substring(62, 66)),
                    timestamp: collectTime
                },
                {
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(66, 68)),
                    timestamp: collectTime
                }
            ]
            break
        case '09':
            // TODO Recorded measurements lijken de timestamp nog niet te snappen: "timestamp":string"invalid -> auto"
            collectTime = getUTCTimestamp(dataValue.substring(8, 16))
            measurementArray = [{
                    field: 'EVENT_STATUS',
                    value: getEventStatus(dataValue.substring(0, 6)),
                    timestamp: collectTime
                },
                {
                    field: 'DEVICE_LOCATION',
                    value: '(' + getSensorValue(dataValue.substring(24, 32), 1000000) + ',' + getSensorValue(dataValue.substring(16, 24), 1000000) + ')',
                    timestamp: collectTime
                },
                {
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(32, 34)),
                    timestamp: collectTime
                }
            ]
            break
        case '0A':
            collectTime = getUTCTimestamp(dataValue.substring(8, 16))
            measurementArray = [{
                    field: 'EVENT_STATUS',
                    value: getEventStatus(dataValue.substring(0, 6)),
                    timestamp: collectTime
                },
                {
                    field: 'WIFI_SCAN',
                    value: getMacAndRssiObj(dataValue.substring(16, 72)),
                    timestamp: collectTime
                },
                {
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(72, 74)),
                    timestamp: collectTime
                }
            ]
            break
        case '0B':
            collectTime = getUTCTimestamp(dataValue.substring(8, 16))
            measurementArray = [{
                    field: 'EVENT_STATUS',
                    value: getEventStatus(dataValue.substring(0, 6)),
                    timestamp: collectTime
                },
                {
                    field: 'BLE_SCAN',
                    value: getMacAndRssiObj(dataValue.substring(16, 58)),
                    timestamp: collectTime
                },
                {
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(58, 60)),
                    timestamp: collectTime
                }
            ]
            break
        case '0C':
            // WONTDO Also not present in SenseCAP_T1000_Helium_Decoder.js
            break
        case '0D':
            // TODO What to do with this?
            var errorCode = getInt(dataValue)
            var error = ''
            switch (errorCode) {
                case 1:
                    error = 'FAILED TO OBTAIN THE UTC TIMESTAMP'
                    break
                case 2:
                    error = 'ALMANAC TOO OLD'
                    break
                case 3:
                    error = 'DOPPLER ERROR'
                    break
            }
            measurementArray.push({
                errorCode: errorCode,
                error: error
            })
            break
        case '0E':
            // TODO ?
            break
        case '0F':
            // TODO ?
            break
        case '10':
            // TODO ?
            break
        case '11':
            collectTime = getUTCTimestamp(dataValue.substring(8, 16))
            measurementArray = [{
                    field: 'POSITIONING_STATUS',
                    value: getPositioningStatus(dataValue.substring(0, 2)),
                    timestamp: collectTime
                },
                {
                    field: 'EVENT_STATUS',
                    value: getEventStatus(dataValue.substring(2, 8)),
                    timestamp: collectTime
                },
                {
                    field: 'AIR_TEMPERATURE',
                    value: getSensorValue(dataValue.substring(16, 20), 10)
                },
                {
                    field: 'LIGHT',
                    value: getSensorValue(dataValue.substring(20, 24))
                },
                {
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(24, 26))
                }
            ]
            break
        case '1A':
            // TODO untested
            collectTime = getUTCTimestamp(dataValue.substring(8, 16))
            measurementArray = [{
                    field: 'EVENT_STATUS',
                    value: getEventStatus(dataValue.substring(0, 6)),
                    timestamp: collectTime
                },
                {
                    field: 'DEVICE_LOCATION',
                    value: '(' + getSensorValue(dataValue.substring(24, 32), 1000000) + ',' + getSensorValue(dataValue.substring(16, 24), 1000000) + ')',
                    timestamp: collectTime
                },
                {
                    field: 'AIR_TEMPERATURE',
                    value: getSensorValue(dataValue.substring(32, 36), 10)
                },
                {
                    field: 'LIGHT',
                    value: getSensorValue(dataValue.substring(36, 40))
                },
                {
                    field: 'ACCELEROMETER_X',
                    value: getSensorValue(dataValue.substring(40, 44))
                },
                {
                    field: 'ACCELEROMETER_Y',
                    value: getSensorValue(dataValue.substring(44, 48))
                },
                {
                    field: 'ACCELEROMETER_Z',
                    value: getSensorValue(dataValue.substring(48, 52))
                },
                {
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(52, 54))
                }
            ]
            break
        case '1B':
            // TODO untested
            collectTime = getUTCTimestamp(dataValue.substring(8, 16))
            measurementArray = [{
                    field: 'EVENT_STATUS',
                    value: getEventStatus(dataValue.substring(0, 6)),
                    timestamp: collectTime
                },
                {
                    field: 'WIFI_SCAN',
                    value: getMacAndRssiObj(dataValue.substring(16, 72)),
                    timestamp: collectTime
                },
                {
                    field: 'AIR_TEMPERATURE',
                    value: getSensorValue(dataValue.substring(72, 76), 10)
                },
                {
                    field: 'LIGHT',
                    value: getSensorValue(dataValue.substring(76, 80))
                },
                {
                    field: 'ACCELEROMETER_X',
                    value: getSensorValue(dataValue.substring(80, 44))
                },
                {
                    field: 'ACCELEROMETER_Y',
                    value: getSensorValue(dataValue.substring(84, 88))
                },
                {
                    field: 'ACCELEROMETER_Z',
                    value: getSensorValue(dataValue.substring(88, 92))
                },
                {
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(92, 94))
                }
            ]
            break
        case '1C':
            // TODO untested
            collectTime = getUTCTimestamp(dataValue.substring(8, 16))
            measurementArray = [{
                    field: 'EVENT_STATUS',
                    value: getEventStatus(dataValue.substring(0, 6)),
                    timestamp: collectTime
                },
                {
                    field: 'BLE_SCAN',
                    value: getMacAndRssiObj(dataValue.substring(16, 58)),
                    timestamp: collectTime
                },
                {
                    field: 'AIR_TEMPERATURE',
                    value: getSensorValue(dataValue.substring(58, 62), 10)
                },
                {
                    field: 'LIGHT',
                    value: getSensorValue(dataValue.substring(62, 66))
                },
                {
                    field: 'ACCELEROMETER_X',
                    value: getSensorValue(dataValue.substring(66, 70))
                },
                {
                    field: 'ACCELEROMETER_Y',
                    value: getSensorValue(dataValue.substring(70, 74))
                },
                {
                    field: 'ACCELEROMETER_Z',
                    value: getSensorValue(dataValue.substring(74, 78))
                },
                {
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(78, 80))
                }
            ]
            break
        case '1D':
            // TODO untested
            // TODO SenseCAP_T1000_Helium_Decoder.js has some additional tests - are they needed?
            collectTime = getUTCTimestamp(dataValue.substring(8, 16))
            measurementArray = [{
                    field: 'POSITIONING_STATUS',
                    value: getPositioningStatus(dataValue.substring(0, 2)),
                    timestamp: collectTime
                },
                {
                    field: 'EVENT_STATUS',
                    value: getEventStatus(dataValue.substring(2, 8)),
                    timestamp: collectTime
                },
                {
                    field: 'AIR_TEMPERATURE',
                    value: getSensorValue(dataValue.substring(16, 20), 10)
                },
                {
                    field: 'LIGHT',
                    value: getSensorValue(dataValue.substring(20, 24))
                },
                {
                    field: 'ACCELEROMETER_X',
                    value: getSensorValue(dataValue.substring(24, 28))
                },
                {
                    field: 'ACCELEROMETER_Y',
                    value: getSensorValue(dataValue.substring(28, 32))
                },
                {
                    field: 'ACCELEROMETER_Z',
                    value: getSensorValue(dataValue.substring(32, 36))
                },
                {
                    field: 'BATTERY',
                    value: getBattery(dataValue.substring(36, 38))
                }
            ]
            break
    }
    return measurementArray
}

function getPositioningStatus(str) {
    var status = getInt(str)
    switch (status) {
        case 0:
            return {
                id: status, statusName: 'Positioning successful.'
            }
        case 1:
            return {
                id: status, statusName: 'The GNSS scan timed out and failed to obtain the location.'
            }
        case 2:
            return {
                id: status, statusName: 'The Wi-Fi scan timed out and failed to obtain the location.'
            }
        case 3:
            return {
                id: status, statusName: 'The Wi-Fi + GNSS scan timed out and failed to obtain the location.'
            }
        case 4:
            return {
                id: status, statusName: 'The GNSS + Wi-Fi scan timed out and failed to obtain the location.'
            }
        case 5:
            return {
                id: status, statusName: 'The Bluetooth scan timed out and failed to obtain the location.'
            }
        case 6:
            return {
                id: status, statusName: 'The Bluetooth + Wi-Fi scan timed out and failed to obtain the location.'
            }
        case 7:
            return {
                id: status, statusName: 'The Bluetooth + GNSS scan timed out and failed to obtain the location.'
            }
        case 8:
            return {
                id: status, statusName: 'The Bluetooth + Wi-Fi + GNSS scan timed out and failed to obtain the location.'
            }
        case 9:
            return {
                id: status, statusName: 'Location Server failed to parse the GNSS location.'
            }
        case 10:
            return {
                id: status, statusName: 'Location Server failed to parse the Wi-Fi location.'
            }
        case 11:
            return {
                id: status, statusName: 'Location Server failed to parse the Bluetooth location.'
            }
        case 12:
            return {
                id: status, statusName: 'Failed to parse the GNSS location due to the poor accuracy.'
            }
        case 13:
            return {
                id: status, statusName: 'Time synchronization failed.'
            }
        case 14:
            return {
                id: status, statusName: 'Failed to obtain location due to the old Almanac.'
            }
    }
    return getInt(str)
}

function getUpShortInfo(messageValue) {
    return [{
        field: 'BATTERY',
        value: getBattery(messageValue.substring(0, 2))
    }, {
        field: 'FIRMWARE_VERSION',
        value: getSoftVersion(messageValue.substring(2, 6))
    }, {
        field: 'HARDWARE_VERSION',
        value: getHardVersion(messageValue.substring(6, 10))
    }, {
        field: 'WORK_MODE',
        value: getWorkingMode(messageValue.substring(10, 12))
    }, {
        field: 'POSITION_STRATEGY',
        value: getPositioningStrategy(messageValue.substring(12, 14))
    }, {
        field: 'HEARTBEAT_INTERVAL',
        value: getMinsByMin(messageValue.substring(14, 18))
    }, {
        field: 'PERIODIC_INTERVAL',
        value: getMinsByMin(messageValue.substring(18, 22))
    }, {
        field: 'EVENT_INTERVAL',
        value: getMinsByMin(messageValue.substring(22, 26))
    }, {
        field: 'SENSOR_ENABLE',
        value: getInt(messageValue.substring(26, 28))
    }, {
        field: 'SOS_MODE',
        value: getSOSMode(messageValue.substring(28, 30))
    }]
}

function getMotionSetting(messageValue) {
    return [{
        field: 'MOTION_ENABLE',
        value: getInt(messageValue.substring(0, 2))
    }, {
        field: 'ANY_MOTION_THRESHOLD',
        value: getSensorValue(messageValue.substring(2, 6), 1)
    }, {
        field: 'MOTION_START_INTERVAL',
        value: getMinsByMin(messageValue.substring(6, 10))
    }]
}

function getStaticSetting(messageValue) {
    return [{
        field: 'STATIC_ENABLE',
        value: getInt(messageValue.substring(0, 2))
    }, {
        field: 'DEVICE_STATIC_TIMEOUT',
        value: getMinsByMin(messageValue.substring(2, 6))
    }]
}

function getShockSetting(messageValue) {
    return [{
        field: 'SHOCK_ENABLE',
        value: getInt(messageValue.substring(0, 2))
    }, {
        field: 'SHOCK_THRESHOLD',
        value: getInt(messageValue.substring(2, 6))
    }]
}

function getTempSetting(messageValue) {
    return [{
        field: 'TEMP_ENABLE',
        value: getInt(messageValue.substring(0, 2))
    }, {
        field: 'EVENT_TEMP_INTERVAL',
        value: getMinsByMin(messageValue.substring(2, 6))
    }, {
        field: 'EVENT_TEMP_SAMPLE_INTERVAL',
        value: getSecondsByInt(messageValue.substring(6, 10))
    }, {
        field: 'TEMP_THMAX',
        value: getSensorValue(messageValue.substring(10, 14), 10)
    }, {
        field: 'TEMP_THMIN',
        value: getSensorValue(messageValue.substring(14, 18), 10)
    }, {
        field: 'TEMP_WARNING_TYPE',
        value: getInt(messageValue.substring(18, 29))
    }]
}

function getLightSetting(messageValue) {
    return [{
        field: 'LIGHT_ENABLE',
        value: getInt(messageValue.substring(0, 2))
    }, {
        field: 'EVENT_LIGHT_INTERVAL',
        value: getMinsByMin(messageValue.substring(2, 6))
    }, {
        field: 'EVENT_LIGHT_SAMPLE_INTERVAL',
        value: getSecondsByInt(messageValue.substring(6, 10))
    }, {
        field: 'LIGHT_THMAX',
        value: getSensorValue(messageValue.substring(10, 14), 10)
    }, {
        field: 'LIGHT_THMIN',
        value: getSensorValue(messageValue.substring(14, 18), 10)
    }, {
        field: 'LIGHT_WARNING_TYPE',
        value: getInt(messageValue.substring(18, 29))
    }]
}

function getBattery(batteryStr) {
    return loraWANV2DataFormat(batteryStr)
}

function getSoftVersion(softVersion) {
    return loraWANV2DataFormat(softVersion.substring(0, 2)) + '.' + loraWANV2DataFormat(softVersion.substring(2, 4))
}

function getHardVersion(hardVersion) {
    return loraWANV2DataFormat(hardVersion.substring(0, 2)) + '.' + loraWANV2DataFormat(hardVersion.substring(2, 4))
}

function getPositioningStrategy(strategy) {
    return getInt(strategy)
}

function getUTCTimestamp(str) {
    // return parseInt(loraWANV2PositiveDataFormat(str)) * 1000
    return parseInt(loraWANV2PositiveDataFormat(str))
    // return parseFloat(loraWANV2PositiveDataFormat(str).toFixed(3));
}

function loraWANV2PositiveDataFormat(str, divisor) {
    divisor = (typeof divisor !== 'undefined') ? divisor : 1
    var strReverse = bigEndianTransform(str)
    var str2 = toBinary(strReverse)
    return parseInt(str2, 2) / divisor
}

function getWorkingMode(workingMode) {
    return getInt(workingMode)
}

function getSOSMode(str) {
    return loraWANV2DataFormat(str)
}

function getMacAndRssiObj(pair) {
    var pairs = []
    if (pair.length % 14 === 0) {
        for (var i = 0; i < pair.length; i += 14) {
            var mac = getMacAddress(pair.substring(i, i + 12))
            if (mac) {
                var rssi = getInt8RSSI(pair.substring(i + 12, i + 14))
                pairs.push({
                    mac: mac,
                    rssi: rssi
                })
            } else {
                continue
            }
        }
    }
    return pairs
}

function getMacAddress(str) {
    if (str.toLowerCase() === 'ffffffffffff') {
        return null
    }
    var macArr = []
    for (var i = 1; i < str.length; i++) {
        if (i % 2 === 1) {
            macArr.push(str.substring(i - 1, i + 1))
        }
    }
    var mac = ''
    for (var i = 0; i < macArr.length; i++) {
        mac = mac + macArr[i]
        if (i < macArr.length - 1) {
            mac = mac + ':'
        }
    }
    return mac
}

function getSecondsByInt(str) {
    return getInt(str)
}

function getMinsByMin(str) {
    return getInt(str)
}

function getSensorValue(str, dig) {
    if (str === '8000') {
        return null
    } else {
        return loraWANV2DataFormat(str, dig)
    }
}

function getInt8RSSI(str) {
    return loraWANV2DataFormat(str)
}

function getInt(str) {
    return parseInt(str, 16)
}

function getByteArray(str) {
    var bytes = []
    for (var i = 0; i < str.length; i += 2) {
        bytes.push(str.substring(i, i + 2))
    }
    return toBinary(bytes)
}

function getEventStatus(str) {
    // return getInt(str)
    var bitStr = getByteArray(str)
    var bitArr = []
    for (var i = 0; i < bitStr.length; i++) {
        bitArr[i] = bitStr.substring(i, i + 1)
    }
    bitArr = bitArr.reverse()
    var event = []
    for (var i = 0; i < bitArr.length; i++) {
        if (bitArr[i] !== '1') {
            continue
        }
        switch (i) {
            case 0:
                event.push({
                    id: 1,
                    eventName: 'Start moving event.'
                })
                break
            case 1:
                event.push({
                    id: 2,
                    eventName: 'End movement event.'
                })
                break
            case 2:
                event.push({
                    id: 3,
                    eventName: 'Motionless event.'
                })
                break
            case 3:
                event.push({
                    id: 4,
                    eventName: 'Shock event.'
                })
                break
            case 4:
                event.push({
                    id: 5,
                    eventName: 'Temperature event.'
                })
                break
            case 5:
                event.push({
                    id: 6,
                    eventName: 'Light event.'
                })
                break
            case 6:
                event.push({
                    id: 7,
                    eventName: 'SOS event.'
                })
                break
            case 7:
                event.push({
                    id: 8,
                    eventName: 'Press once event.'
                })
                break
        }
    }
    return event
}

function bytes2HexString(arrBytes) {
    var str = ''
    for (var i = 0; i < arrBytes.length; i++) {
        var tmp
        var num = arrBytes[i]
        if (num < 0) {
            tmp = (255 + num + 1).toString(16)
        } else {
            tmp = num.toString(16)
        }
        if (tmp.length === 1) {
            tmp = '0' + tmp
        }
        str += tmp
    }
    return str
}

function loraWANV2DataFormat(str) {
    var divisor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1

    var strReverse = bigEndianTransform(str)
    var str2 = toBinary(strReverse)
    if (str2.substring(0, 1) === '1') {
        var arr = str2.split('')
        var reverseArr = arr.map(function(item) {
            if (parseInt(item) === 1) {
                return 0
            } else {
                return 1
            }
        })
        str2 = parseInt(reverseArr.join(''), 2) + 1
        return '-' + str2 / divisor
    }
    return parseInt(str2, 2) / divisor
}

function bigEndianTransform(data) {
    var dataArray = []
    for (var i = 0; i < data.length; i += 2) {
        dataArray.push(data.substring(i, i + 2))
    }
    return dataArray
}

function toBinary(arr) {
    var binaryData = arr.map(function(item) {
        var data = parseInt(item, 16).toString(2)
        var dataLength = data.length
        if (data.length !== 8) {
            for (var i = 0; i < 8 - dataLength; i++) {
                data = '0' + data
            }
        }
        return data
    })
    var ret = binaryData.toString().replace(/,/g, '')
    return ret
}
