$(() => {
	let seconds = 5;
	setUpDefaults();

	new Chart($("#myChart0"), getBarChart('total_hours'));
	new Chart($("#myChart1"), getBarChart('internal_hours'));
	new Chart($("#myChart2"), getBarChart('client_hours'));
	new Chart($("#myChart3"), getBarChart('client_percentage'));
	new Chart($("#myChart4"), getDoughnutChart('total_hours'));
	new Chart($("#myChart5"), getBarChart('internal_hours'));//getBarsChart());
	new Chart($("#myChart6"), getBarChart('client_hours'));

	let cardsContainer = $('.cards-container');

	setInterval(() => {
		cardsContainer.find('.card').eq(0).detach().appendTo(cardsContainer);
	}, seconds * 1000);
});

function setUpDefaults() {
	Chart.defaults.global.hover.mode = 'nearest';
}

function getBarChart(propName = 'total_hours') {
	var dataArr = getDataAsArray(propName);
	var bars = [{
			label: 'Red',
			bgColor: 'rgba(255, 99, 132, 0.2)',
			borderColor: 'rgba(255,99,132,1)'
		}, {
			label: 'Blue',
			bgColor: 'rgba(54, 162, 235, 0.2)',
			borderColor: 'rgba(54, 162, 235, 1)'
		}, {
			label: 'Yellow',
			bgColor: 'rgba(255, 206, 86, 0.2)',
			borderColor: 'rgba(255, 206, 86, 1)'
		}, {
			label: 'Green',
			bgColor: 'rgba(75, 192, 192, 0.2)',
			borderColor: 'rgba(75, 192, 192, 1)'
		}, {
			label: 'Purple',
			bgColor: 'rgba(153, 102, 255, 0.2)',
			borderColor: 'rgba(153, 102, 255, 1)'
		}, {
			label: 'Orange',
			bgColor: 'rgba(255, 159, 64, 0.2)',
			borderColor: 'rgba(255, 159, 64, 1)'
		}
	]
	.slice(0, dataArr.length);

	//Rename bars.labels to jsonData properties
	let jsonDataKeys = Object.keys(jsonData);
	bars.forEach((v, i) => {
		bars[i].label = jsonDataKeys[i];
	});

	return {
		type: 'bar',
		data: {
			labels: bars.map(v => v.label),
			datasets: [{
				label: 'Cool title',
				data: dataArr,
				backgroundColor: bars.map(v => v.bgColor),
				borderColor: bars.map(v => v.borderColor),
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	};
}

function getBarsChart() {
	let labels = ['Total'];

	for (let name in jsonData) {
		labels.push(name);
	}

	let clientData = getDataAsArray('client_hours');
	let internalData = getDataAsArray('internal_hours');

	return {
		type: 'bar',
		labels: labels,
		datasets: [
			{
				label: "Client",
				backgroundColor: "rgba(179,181,198,0.2)",
				borderColor: "rgba(179,181,198,1)",
				pointBackgroundColor: "rgba(179,181,198,1)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgba(179,181,198,1)",
				data: clientData
			},
			{
				label: "Internal",
				backgroundColor: "rgba(255,99,132,0.2)",
				borderColor: "rgba(255,99,132,1)",
				pointBackgroundColor: "rgba(255,99,132,1)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgba(255,99,132,1)",
				data: internalData
			}
		],
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	}
}

function getDoughnutChart(propName = 'total_hours') {
	return {
		type: 'doughnut',
		data: {
			labels: [
				'Client',
				'Internal'
			],
			datasets: [
				{
					data: [
						calculateTotal('client_hours'),
						calculateTotal('internal_hours')
					],
					backgroundColor: [
						'rgba(75, 192, 192, 1)',
						'rgba(255,99,132,1)'
					],
					hoverBackgroundColor: [
						'rgba(75, 192, 192, 0.8)',
						'rgba(255,99,132,0.8)'
					]
				}
			]
		}
	};
}

let jsonData = {
	"Designer": {
		total_hours: 55.55,
		internal_hours: 6.99,
		client_hours: 48.56,
		client_percentage: 87
	},
	"Project Manager": {
		total_hours: 121.85,
		internal_hours: 49.33,
		client_hours: 72.52,
		client_percentage: 60
	},
	"Developer": {
		total_hours: 210.58,
		internal_hours: 35.06,
		client_hours: 175.52,
		client_percentage: 83
	},
	"Consultant": {
		total_hours: 40,
		internal_hours: 0,
		client_hours: 40,
		client_percentage: 100
	},
	"Sales": {
		total_hours: 21.69,
		internal_hours: 10.32,
		client_hours: 11.37,
		client_percentage: 52
	}
};

function getDataAsArray(prop) {
	let result = [];
	for(var role in jsonData) {
		result.push(jsonData[role][prop]);
	}
	return result;
}

function calculateTotal(prop) {
	let result = getDataAsArray(prop).reduce((prev, curr) => prev + curr, 0);
	return Math.round(result);
}
