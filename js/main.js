const n16 = "255.255.0.0";
const n17 = "255.255.128.0";
const n18 = "255.255.192.0";
const n19 = "255.255.224.0";
const n20 = "255.255.240.0";
const n21 = "255.255.248.0";
const n22 = "255.255.252.0";
const n23 = "255.255.254.0";
const n24 = "255.255.255.0";
const n25 = "255.255.255.128";
const n26 = "255.255.255.192";
const n27 = "255.255.255.224";
const n28 = "255.255.255.240";
const n29 = "255.255.255.248";
const n30 = "255.255.255.252";

const arraySubnetMask = [n16, n17, n18, n19, n20, n21, n22, n23, n24, n25, n26, n27, n28, n29, n30];


document.getElementById("submit").addEventListener("click", chiaIP);
document.getElementById("delete").addEventListener("click", xoaTatCa);


function chiaIP() {
    var inputIP = document.getElementById("id-ip").value;
    var inputSubnet = document.getElementById("subnet").value;
    var inputHost = document.getElementById("id-host").value;
    if (inputIP == "") {
        alert("Mời nhập ip");
    } else {

        var arrayIP = inputIP.split(".");
        var arraySub = getSubnetMask(inputSubnet).split(".");
        var m = getM(inputHost);
        var sumHost = getSumHost(inputHost);
        var allHost = getAllHost(inputSubnet);
        var newSub = calNewSubnet(getAllHost(inputSubnet), getSumHost(inputHost), inputSubnet);
        var buocNhay = calBuocNhay(calNewSubnet(getAllHost(inputSubnet), getSumHost(inputHost), inputSubnet));
        var newSubnetMaskAll = newSubnetMask(newSub, arraySub, inputSubnet);
        var numberSub = convertSubnetMaskToNumber(newSubnetMaskAll);
        var subIP = getSubIP(arrayIP);
        var hostDau = getHostDau(arrayIP);
        var hostCuoi = getHostCuoi(arrayIP, inputSubnet, sumHost);
        var numInpHost = parseInt(inputHost);
        var numAllHost = parseInt(allHost);
        console.log(numInpHost + numAllHost);
        var check = numInpHost < numAllHost - 1;



        if (validateIP(arrayIP)) {

            if (check) {
                document.getElementById("id-sub-ip").value = subIP + '/' + numberSub;
                document.getElementById("id-bitN").value = 32 - parseInt(m) - parseInt(inputSubnet);
                document.getElementById("id-buocnhay").value = buocNhay;
                document.getElementById("id-subMoi").value = newSubnetMaskAll + " --> " + numberSub; //
                document.getElementById("id-hostdau").value = hostDau + "/" + numberSub; //
                document.getElementById("id-hostcuoi").value = hostCuoi + "/" + numberSub; //
                document.getElementById("id-ip").value = subIP;
            } else {
                alert("Số host vượt quá giới hạn!");
            }

        } else {
            alert("IP không hợp lệ!");
        }
    }

}

function getSubIP(arrayIP) {
    var arrayTmp = arrayIP;
    var sum = parseInt(arrayTmp[arrayTmp.length - 1]);

    while (sum >= 255) {
        arrayTmp[arrayTmp.length - 2] = parseInt(arrayTmp[arrayTmp.length - 2]) + 1;
        sum = sum - 255;
    }

    arrayTmp[arrayTmp.length - 1] = sum;

    return arrayToStringIP(arrayTmp);
}

function getHostDau(arrayIP) {
    var arrayTmp = arrayIP;
    var sum = parseInt(arrayTmp[arrayTmp.length - 1]) + 1;

    while (sum >= 255) {
        arrayTmp[arrayTmp.length - 2] = parseInt(arrayTmp[arrayTmp.length - 2]) + 1;
        sum = sum - 255;
    }

    arrayTmp[arrayTmp.length - 1] = sum;

    return arrayToStringIP(arrayTmp);
}


function getHostCuoi(arrayIP, inputSubnet, sumHost) {

    var arrayTmp = arrayIP;
    var c = parseInt(arrayTmp[arrayTmp.length - 2]);
    var d = parseInt(arrayTmp[arrayTmp.length - 1]);

    // if (numbSub >= 16 && numbSub < 24) {
    //     c = c + buocNhay - 1;
    //     d = d + 256 - 3;
    //     arrayTmp[arrayTmp.length - 2] = c;
    // } else if (numbSub >= 24) {
    //     d = d + buocNhay - 3;
    // }

    d = d + sumHost - 3;

    while (d >= 256) {
        arrayTmp[arrayTmp.length - 2] = parseInt(arrayTmp[arrayTmp.length - 2]) + 1
        d = d - 256;
    }

    arrayTmp[arrayTmp.length - 1] = d;

    return arrayToStringIP(arrayTmp);
}


function validateIP(arrayIP) {
    var check = true;
    if (arrayIP.length != 4) {
        check = false;
    }
    return check;
}

function validateHost(inputHost, allHost) {
    var check = true;
    var numbHost = parseInt(inputHost);
    console.log(allHost)
    console.log(inputHost)
    if (numbHost >= allHost) {
        check = false;
    }
    return check;
}

// Lấy subnet mask input
function getSubnetMask(inputSubnet) {
    var detailSub;
    for (let i = 0; i < arraySubnetMask.length; i++) {
        let tmp = 16 + i;
        if (inputSubnet == tmp) {
            detailSub = arraySubnetMask[i];
        }
    }
    return detailSub;
}

function convertSubnetMaskToNumber(newSubnetMask) {
    var numb = 0;
    for (var i = 0; i < arraySubnetMask.length; i++) {
        if (newSubnetMask == arraySubnetMask[i]) {
            numb = i + 16;
        }
    }
    return numb;
}

// Lấy M
function getM(inputHost) {
    var count = 1;
    var tmp = 2;
    while (tmp < parseInt(inputHost) + 2) {
        count++;
        tmp *= 2;
    }
    return count;
}

// Tổng tất cả số host có thể mượn
function getSumHost(inputHost) {
    var tmp = 2;
    while (tmp < parseInt(inputHost) + 2) {
        tmp *= 2;
    }
    return tmp;
}


// Tổng tất cả số host trên subnet
function getAllHost(inputSubnet) {

    var s = 0;

    if (parseInt(inputSubnet) < 24 && parseInt(inputSubnet) >= 16) {
        s = 256 * 256;
    } else if (parseInt(inputSubnet) >= 24) {
        s = 256;
    }

    return s;
}


// Subnet mask mới
function calNewSubnet(allHost, sumHost, inputSubnet) {

    var newSub = 0;

    if (parseInt(inputSubnet) < 24 && parseInt(inputSubnet) >= 16) {
        newSub = (parseInt(allHost) - parseInt(sumHost)) / 256;
    } else if (parseInt(inputSubnet) >= 24) {
        newSub = parseInt(allHost) - parseInt(sumHost);
    }

    return Math.floor(newSub);
}

// tinh buoc nhay
function calBuocNhay(newSubnet) {
    return 256 - parseInt(newSubnet);
}

function newSubnetMask(newSub, arraySub, inputSubnet) {

    var numSub = parseInt(inputSubnet);

    if (numSub < 24 && numSub >= 16) {
        arraySub[arraySub.length - 2] = newSub;
    } else if (numSub >= 24) {
        arraySub[arraySub.length - 1] = newSub;
    }

    return arrayToStringIP(arraySub);
}

function arrayToStringIP(array) {

    var string = "";

    for (let i = 0; i < array.length; i++) {
        if (i != array.length - 1) {
            string += array[i] + ".";
        } else {
            string += array[i];
        }
    }

    return string;
}


function xoaTatCa() {
    document.getElementById("id-sub-ip").value = "";
    document.getElementById("id-bitN").value = "";
    document.getElementById("id-buocnhay").value = "";
    document.getElementById("id-subMoi").value = "";
    document.getElementById("id-hostdau").value = "";
    document.getElementById("id-hostcuoi").value = "";
    document.getElementById("id-ip").value = "";
    document.getElementById("id-host").value = "";
}