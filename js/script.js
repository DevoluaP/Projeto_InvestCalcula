// Menu 
document.querySelector('.btnMenu').addEventListener('click', function () {
    document.querySelector('.btnMenu').style.display = 'none';
    document.querySelector('.btnClose').style.display = 'inline';
    document.querySelector('.menu').style.display = 'flex';
});
function closeMenu () {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.btnClose').style.display = 'none';
    document.querySelector('.btnMenu').style.display = 'inline';
};
document.querySelector('.btnClose').addEventListener('click', closeMenu);
document.querySelector('.navMenuAbout').addEventListener('click', closeMenu);
document.querySelector('.navMenuCalc').addEventListener('click', closeMenu);


// Exibir seção dos resultados
document.getElementById('compute').addEventListener('click', function () {
    document.getElementById('result').style.display = 'flex';
    document.getElementById('resultConteiner').style.display = 'flex';
});
document.querySelector('.newCalc').addEventListener('click', function () {
    document.getElementById('result').style.display = 'none';
    document.getElementById('resultConteiner').style.display = 'none';
});


// Gráficos de colunas (barra vertical)
let yldTimeValue = document.getElementById('yldTimeValue');
let years = "Anos";
let months = "Meses";
// if (yldTimeValue == years) {} else if (yldTimeValue == months) {}
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart () {
        let data = google.visualization.arrayToDataTable([
            ['Ano', 'Valor Investido', 'Juros Compostos'],
            // Valor Investido = Aporte Mensal*12 || Juros Compostos = Taxa de Juros (Anual) ou Taxa de Juros*12 (Mensal)
            // Criar um loop de repetição utilizando o resultado do tempo de rendimento
            ['2024', 1000, 400], 
        ]);
        let options = {
            bars: 'vertical',
            vAxis: {format: 'short'},
            width: 325,
            height: 230,
            colors: ['#76ABAE', '#31363E']
        };
        let chart = new google.charts.Bar(document.getElementById('columnChart'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }

    /*
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart () {
        let data = google.visualization.arrayToDataTable([
          ['Mês', 'Valor Investido', 'Juros Compostos'],
          // Valor Investido = Aporte Mensal || Juros Compostos = Taxa de Juros/12 (Anual) ou Taxa de Juros (Mensal)
          // Criar um loop de repetição utilizando o resultado do tempo de rendimento
          ['Janeiro', 1000, 400],   
          ['Fevereiro', 1170, 460],
          ['Março', 660, 1120],
          ['Abril', 660, 1120],
          ['Maio', 660, 1120],
          ['Junho', 660, 1120],
          ['Julho', 660, 1120],
          ['Agosto', 660, 1120],
          ['Setembro', 660, 1120],
          ['Outubro', 660, 1120],
          ['Novembro', 660, 1120],
          ['Dezembro', 1030, 540]
        ]);
        let options = {
          bars: 'vertical',
          vAxis: {format: 'short'},
          width: 325,
          height: 230,
          colors: ['#76ABAE', '#31363E']
        };
        let chart = new google.charts.Bar(document.getElementById('columnChart'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
    */


// Gráfico de setores (redondo)
const pieChart = document.getElementById('pieChart');
new Chart (pieChart, {
    type: 'pie',
    data: {
        labels: [
            'Valor em Juros',
            'Valor total Investido'
        ],
        datasets: [{
            data: [300, 50], // Esses valores vao ser as variaveis do resultado "Valor em Juros" e "Valor total Investido"
            backgroundColor: [
                '#76ABAE',
                '#31363F'
            ],
        }]
    },
});