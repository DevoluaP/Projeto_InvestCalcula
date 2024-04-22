// Menu 
document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            document.querySelector('.menu').style.display = 'flex';
            document.querySelector('.btnMenu').style.display = 'none';
            document.querySelector('.btnClose').style.display = 'none';
        } else {
            document.querySelector('.menu').style.display = 'none';
            document.querySelector('.btnMenu').style.display = 'inline';
            document.querySelector('.btnClose').style.display = 'none';
        }
    });
});
document.querySelector('.btnMenu').addEventListener('click', function () {
    document.querySelector('.btnMenu').style.display = 'none';
    document.querySelector('.btnClose').style.display = 'inline';
    document.querySelector('.menu').style.display = 'flex';
});
document.querySelector('.btnClose').addEventListener('click', function () {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.btnClose').style.display = 'none';
    document.querySelector('.btnMenu').style.display = 'inline';
});


// Calculadora
function calculateCompoundInterest () {
    let compInt, totalCompInt, invest, totalInvest, valTotal, calendar, per;
    let yldTimeValue = document.getElementById('yldTimeValue').value;
    let intRateValue = document.getElementById('intRateValue').value;
    let years = 'years';
    let months = 'months';
    let monthly = 'monthly';
    let yearly = 'yearly';
    let initCon = parseFloat(document.getElementById('initCon').value);
    let montCon = parseFloat(document.getElementById('montCon').value);
    let yldTime = parseInt(document.getElementById('yldTime').value);
    let intRate = parseFloat(document.getElementById('intRate').value);
    let pieChart = document.getElementById('pieChart');
    if (isNaN(initCon) || initCon < 0) {initCon = 0}
    if (isNaN(montCon) || montCon < 0) {montCon = 0}
    if (isNaN(yldTime) || yldTime < 0) {yldTime = 0}
    if (isNaN(intRate)) {intRate = 0}

    if (yldTimeValue == months && intRateValue == monthly) {
        compInt = 0;
        totalCompInt = 0;
        invest = initCon + montCon;
        totalInvest = initCon + (montCon*yldTime);
        for (let i = 0; i < yldTime-1; i++) {
            compInt = (invest * intRate) / 100;
            totalCompInt += compInt;
            invest += compInt + montCon;
        }
        valTotal = totalInvest + totalCompInt;
        per = "a.m";
        calendar = "Meses";
        updateResultValues(initCon, montCon, yldTime, intRate, totalInvest, totalCompInt, valTotal, calendar, per);
    } else if (yldTimeValue == years && intRateValue == yearly) {
        compInt = 0;
        totalCompInt = 0;
        invest = initCon + montCon;
        totalInvest = initCon + (montCon*(yldTime*12));
        for (let i = 0; i < (yldTime*12)-1; i++) {
            compInt = (invest * ((((1 + (intRate/100))**(1/12)-1)*100)) / 100);
            totalCompInt += compInt;
            invest += compInt + montCon;
        }
        valTotal = totalInvest + totalCompInt;
        per = "a.a";
        calendar = "Anos";
        updateResultValues(initCon, montCon, yldTime, intRate, totalInvest, totalCompInt, valTotal, calendar, per);
    } else if (yldTimeValue == months && intRateValue == yearly) {
        compInt = 0;
        totalCompInt = 0;
        invest = initCon + montCon;
        totalInvest = initCon + (montCon*yldTime);
        for (let i = 0; i < yldTime-1; i++) {
            compInt = (invest * ((((1 + (intRate/100))**(1/12)-1)*100)) / 100);
            totalCompInt += compInt;
            invest += compInt + montCon;
        }
        valTotal = totalInvest + totalCompInt;
        per = "a.a";
        calendar = "Meses";
        updateResultValues(initCon, montCon, yldTime, intRate, totalInvest, totalCompInt, valTotal, calendar, per);
    } else if (yldTimeValue == years && intRateValue == monthly) {
        compInt = 0;
        totalCompInt = 0;
        invest = initCon + montCon;
        totalInvest = initCon + (montCon*(yldTime*12));
        for (let i = 0; i < (yldTime*12)-1; i++) {
            compInt = (invest * intRate) / 100;
            totalCompInt += compInt;
            invest += compInt + montCon;
        }
        valTotal = totalInvest + totalCompInt;
        per = "a.m";
        calendar = "Anos";
        updateResultValues(initCon, montCon, yldTime, intRate, totalInvest, totalCompInt, valTotal, calendar, per);
    }
    function updateResultValues(initCon, montCon, yldTime, intRate, totalInvest, totalCompInt, valTotal, calendar, per) {
        document.querySelector('.resultValInit').innerHTML = initCon.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        document.querySelector('.resultValMont').innerHTML = montCon.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        document.querySelector('.resultValYldTime').innerHTML = yldTime + " " + calendar;
        document.querySelector('.resultValIntRate').innerHTML = intRate.toFixed(2) + "% " + per;
        document.querySelector('.resultValTotalInvest').innerHTML = Number(totalInvest).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        document.querySelector('.resultValRate').innerHTML = Number(totalCompInt).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        document.querySelector('.resultValTotal').innerHTML = Number(valTotal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }

    let loopYear = 1;
    for (let i = 0; i < yldTime-1; i++){loopYear += i}

    let loopMonth;
    for (let i = 0; i < yldTime-1; i++) {
        loopMonth = "Janeiro";
        loopMonth = "Fevereiro";
        loopMonth = "Março";
        loopMonth = "Abril";
        loopMonth = "Maio";
        loopMonth = "Junho";
        loopMonth = "Julho";
        loopMonth = "Agosto";
        loopMonth = "Setembro";
        loopMonth = "Outubro";
        loopMonth = "Novembro";
        loopMonth = "Dezembro";
    }

    // Gráficos de colunas (barra vertical)
    if (yldTimeValue == years) {
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart () {
            let data = google.visualization.arrayToDataTable([
                ['Ano', 'Valor Inicial', 'Valor Investido', 'Valor em Juros'],
                [loopYear, initCon, montCon*12, totalCompInt]
            ]);
            let options = {
                bars: 'vertical',
                vAxis: {format: 'short'},
                width: 325,
                height: 230,
                colors: ['#B3A978', '#76ABAE', '#222831']
            };
            let chart = new google.charts.Bar(document.getElementById('columnChart'));
            chart.draw(data, google.charts.Bar.convertOptions(options));
        }
    } else if (yldTimeValue == months) {
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart () {
            let data = google.visualization.arrayToDataTable([
                ['Mês', 'Valor Inicial', 'Valor Investido', 'Juros Compostos'],
                // Criar um loop de repetição utilizando o resultado do tempo de rendimento
                ['Janeiro', initCon, montCon, compInt],   
                ['Fevereiro', initCon, montCon, compInt],
                ['Março', initCon, montCon, compInt],
                ['Abril', initCon, montCon, compInt],
                ['Maio', initCon, montCon, compInt],
                ['Junho', initCon, montCon, compInt],
                ['Julho', initCon, montCon, compInt],
                ['Agosto', initCon, montCon, compInt],
                ['Setembro', initCon, montCon, compInt],
                ['Outubro', initCon, montCon, compInt],
                ['Novembro', initCon, montCon, compInt],
                ['Dezembro', initCon, montCon, compInt]
            ]);
            let options = {
                bars: 'vertical',
                vAxis: {format: 'short'},
                width: 325,
                height: 230,
                colors: ['#B3A978', '#76ABAE', '#222831']
            };
            let chart = new google.charts.Bar(document.getElementById('columnChart'));
            chart.draw(data, google.charts.Bar.convertOptions(options));
        }
    }

    // Gráfico de setores (redondo)
    new Chart (pieChart, {
        type: 'pie',
        data: {
            labels: [
                'Valor Inicial',
                'Valor em Juros',
                'Valor Investido'
            ],
            datasets: [{
                data: [initCon, totalCompInt.toFixed(2), totalInvest.toFixed(2)-initCon],
                backgroundColor: [
                    '#B3A978',
                    '#76ABAE',
                    '#222831'
                ],
            }]
        },
    });
}

// Resultado
function openResult () {
    document.getElementById('result').style.display = 'flex';
    document.getElementById('resultContainer').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    calculateCompoundInterest();
}
document.getElementById('compute').addEventListener('click', openResult);
document.addEventListener('keydown', function (event) {if (event.key === 'Enter') {openResult()}});
function closeResult () {
    document.getElementById('result').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'none';
    document.body.style.overflow = 'visible';
    document.body.style.overflowX = 'hidden';
    window.location.reload();
}
document.querySelector('.newCalc').addEventListener('click', closeResult);
document.addEventListener('keydown', function (event) { if (event.key === 'Escape') {closeResult()}});