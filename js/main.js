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


function getHostCuoi(arrayIP, sumHost) {

    var arrayTmp = arrayIP;
    var c = parseInt(arrayTmp[arrayTmp.length - 2]);
    var d = parseInt(arrayTmp[arrayTmp.length - 1]);

    d = d + sumHost - 3;

    while (d >= 256) {
        arrayTmp[arrayTmp.length - 2] = parseInt(arrayTmp[arrayTmp.length - 2]) + 1
        d = d - 256;
    }

    arrayTmp[arrayTmp.length - 1] = d;

    return arrayToStringIP(arrayTmp);
}

function getNextIP(arrayIP, sumHost) {
    var arrayTmp = arrayIP;
    var d = parseInt(arrayTmp[arrayTmp.length - 1]);

    d = d + 2;

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

// tính subnet mask mới
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



// Chia IP theo nhiều host

// xử lý sự kiện click
document.getElementsByClassName("btn-add")[0].addEventListener("click", addFunction);
document.getElementsByClassName("btn-delete-one-host")[0].addEventListener("click", deleteFunction);
document.getElementsByClassName("btn-delete-all-hosts")[0].addEventListener("click", resetFunction);
document.getElementsByClassName("btn-chia-2")[0].addEventListener("click", chiaFunction);

// lấy cây dom
var containerHosts = document.getElementsByClassName("hosts")[0];
var inputFormHosts = document.getElementsByClassName("add-input-break");
var currentHost = document.getElementsByClassName("host-value");
var currentIP = document.getElementsByClassName("ip-value");
var table = document.getElementsByTagName("table")[0];

function addFunction() {
    var newHost = document.createElement("input");
    newHost.classList.add("add-input-break");
    newHost.classList.add("host-value");
    containerHosts.appendChild(newHost);
}

function deleteFunction() {

    if (inputFormHosts.length > 0) {
        var lastHost = inputFormHosts[inputFormHosts.length - 1];
        containerHosts.removeChild(lastHost);
    }

}

function resetFunction() {
    currentHost[0].value = "";
    currentIP[0].value = "";
    for (let i = inputFormHosts.length - 1; i >= 0; i--) {
        containerHosts.removeChild(inputFormHosts[i]);
    }
    while (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
    }
}

function chiaFunction() {
    let inputIP = document.getElementsByName("ip")[0].value;
    let inputSubnet = document.getElementById("subnet-2").value;
    let arrayHosts = document.getElementsByClassName("host-value");
    let checkInputHost = checkInputHosts(arrayHosts);

    if (inputIP == "") {

        alert("Mời nhập ip");
        return;

    } else if (!checkInputHost) {

        alert("Mời nhập đầy đủ host");
        return;

    }

    let tmpArrayIP = inputIP.split(".");

    if (!validateIP(tmpArrayIP)) {
        alert("IP không hợp lệ!");
        return;
    }

    interchageSorts(arrayHosts);


    let arrayObjectIP = [];
    let tongHost = getAllHost(inputSubnet);

    let nhan = 1;
    let tong = 0;
    for (let i = 0; i < arrayHosts.length; i++) {
        let arrayIP = inputIP.split(".");
        let arraySub = getSubnetMask(inputSubnet).split(".");
        let allHost = getAllHost(inputSubnet);
        let m = getM(arrayHosts[i].value);
        for (let j = 0; j < m; j++) {
            nhan *= 2;
            if (tong >= tongHost) {
                alert("Số host vượt quá giới hạn!");
                return;
            }
        }


        tong += nhan;

        console.log(tong);
        nhan = 1;

        let sumHost = getSumHost(arrayHosts[i].value);
        let newSub = calNewSubnet(allHost, getSumHost(arrayHosts[i].value), inputSubnet);
        let buocNhay = calBuocNhay(calNewSubnet(allHost, getSumHost(arrayHosts[i].value), inputSubnet));
        let newSubnetMaskAll = newSubnetMask(newSub, arraySub, inputSubnet);
        let numberSub = convertSubnetMaskToNumber(newSubnetMaskAll);
        let subIP = getSubIP(arrayIP);
        let n = 32 - parseInt(m) - parseInt(inputSubnet);
        let hostDau = getHostDau(arrayIP);
        let hostCuoi = getHostCuoi(arrayIP, sumHost);

        let IPObject = {
            ipCon: subIP,
            soBitMuon: n,
            bn: buocNhay,
            subnetMaskMoi: newSubnetMaskAll,
            soSubnetMaskMoi: numberSub,
            hostDauTien: hostDau,
            hostCuoiCung: hostCuoi
        };

        arrayObjectIP[i] = IPObject;
        inputIP = getNextIP(arrayIP, sumHost);
        inputSubnet = arrayObjectIP[i].soSubnetMaskMoi;
    }


    // Xóa dữ liệu
    while (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
    }


    // thêm dữ liệu vào bảng
    for (let i = 0; i < arrayObjectIP.length; i++) {
        var newRow = table.insertRow(i + 1);

        var net = newRow.insertCell(0);
        var subId = newRow.insertCell(1);
        var soBitMuon = newRow.insertCell(2);
        var bn = newRow.insertCell(3);
        var subnet = newRow.insertCell(4);
        var fhost = newRow.insertCell(5);
        var lhost = newRow.insertCell(6);

        net.innerHTML = parseInt(i + 1);
        subId.innerHTML = arrayObjectIP[i].ipCon + "/" + arrayObjectIP[i].soSubnetMaskMoi;
        soBitMuon.innerHTML = arrayObjectIP[i].soBitMuon;
        bn.innerHTML = arrayObjectIP[i].bn;
        subnet.innerHTML = arrayObjectIP[i].subnetMaskMoi;
        fhost.innerHTML = arrayObjectIP[i].hostDauTien + "/" + arrayObjectIP[i].soSubnetMaskMoi;
        lhost.innerHTML = arrayObjectIP[i].hostCuoiCung + "/" + arrayObjectIP[i].soSubnetMaskMoi;
    }




}

function interchageSorts(arrayHosts) {
    for (let i = 0; i < arrayHosts.length - 1; i++) {
        for (let j = i + 1; j < arrayHosts.length; j++) {
            if (parseInt(arrayHosts[i].value) < parseInt(arrayHosts[j].value)) {
                let tmp = arrayHosts[i].value;
                arrayHosts[i].value = arrayHosts[j].value;
                arrayHosts[j].value = tmp;
            }
        }
    }
}

function checkInputHosts(arrayHosts) {
    var check = true;
    for (let i = 0; i < arrayHosts.length; i++) {
        if (arrayHosts[i].value == 0) {
            check = false;
        }
    }
    return check;
}

function sumHosts(arrayHosts) {
    var sum = 0;
    for (let i = 0; i < arrayHosts.length; i++) {
        sum += parseInt(arrayHosts[i].value);
    }
    console.log(sum);
    return sum;
}