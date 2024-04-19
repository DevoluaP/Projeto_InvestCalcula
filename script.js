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
            // Arrumar formula de juros compostos
            compInt = (invest * (intRate/12)) / 100;
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
            // Arrumar formula de juros compostos
            compInt = (invest * (intRate/12)) / 100;
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
            // Arrumar formula de juros compostos
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

    // Gráfico de setores (redondo)
    const pieChart = document.getElementById('pieChart');
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
                    '#76ABAE',
                    '#31363F',
                    '#EEE'
                ],
            }]
        },
    });
}
document.getElementById('compute').addEventListener('click', calculateCompoundInterest);


// Exibir seção dos resultados
document.getElementById('compute').addEventListener('click', function () {
    document.getElementById('result').style.display = 'flex';
    document.getElementById('resultContainer').style.display = 'flex';
    document.body.style.overflow = 'hidden';
});
function closeResult () {
    document.getElementById('result').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'none';
    window.location.reload();
}
document.querySelector('.newCalc').addEventListener('click', closeResult);
document.querySelector('.newCalc').addEventListener('keydown', function (event) {if(event.key === 'Escape'){closeResult()}});

// Gráficos de colunas (barra vertical)
// if (yldTimeValue == years) {} else if (yldTimeValue == months) {}
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart () {
        let data = google.visualization.arrayToDataTable([
            ['Ano', 'Valor Inicial', 'Valor Investido', 'Juros Compostos'],
            // Valor Inicial = Valor Inicial || Valor Investido = Aporte Mensal*12 || Juros Compostos = Taxa de Juros (Anual) ou Taxa de Juros*12 (Mensal)
            // Criar um loop de repetição utilizando o resultado do tempo de rendimento
            ['2024', 1000, 400, 200], 
        ]);
        let options = {
            bars: 'vertical',
            vAxis: {format: 'short'},
            width: 325,
            height: 230,
            colors: ['#76ABAE', '#31363E', '#EEE']
        };
        let chart = new google.charts.Bar(document.getElementById('columnChart'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }


    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart () {
        let data = google.visualization.arrayToDataTable([
          ['Mês', 'Valor Inicial', 'Valor Investido', 'Juros Compostos'],
          // Valor Inicial = Valor Inicial || Valor Investido = Aporte Mensal || Juros Compostos = Taxa de Juros/12 (Anual) ou Taxa de Juros (Mensal)
          // Criar um loop de repetição utilizando o resultado do tempo de rendimento
          ['Janeiro', 1000, 400, 300],   
          ['Fevereiro', 1170, 460, 300],
          ['Março', 660, 1120, 300],
          ['Abril', 660, 1120, 300],
          ['Maio', 660, 1120, 300],
          ['Junho', 660, 1120, 300],
          ['Julho', 660, 1120, 300],
          ['Agosto', 660, 1120, 300],
          ['Setembro', 660, 1120, 300],
          ['Outubro', 660, 1120, 300],
          ['Novembro', 660, 1120, 300],
          ['Dezembro', 1030, 540, 300]
        ]);
        let options = {
          bars: 'vertical',
          vAxis: {format: 'short'},
          width: 325,
          height: 230,
          colors: ['#76ABAE', '#31363E', '#EEE']
        };
        let chart = new google.charts.Bar(document.getElementById('columnChart'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }