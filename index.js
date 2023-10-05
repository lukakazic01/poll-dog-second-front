const loader = document.querySelector(".loader-container");
const errorContainer = document.querySelector(".error-container");
const barChart = document.getElementById("chart");
    (async () => {
        try {
        loader.style.display = 'flex';
        const data = await fetch("https://localhost:7070/PollDogAPI")
        const formatedData = await data.json()
        const allProducts = formatedData.map((item) => item.product)
        const brandsRating = formatedData.map((item) => item.average_rating)
        const barColors= formatedData.map((item) => `rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`)
        new Chart("chart", {
            type: "bar",
            data: {
                labels: allProducts,
                datasets: [{
                    label: 'PollDog Insights',
                    backgroundColor: barColors,
                    data: brandsRating
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        } catch (err) {
            barChart.style.display = 'none';
            errorContainer.style.display = 'flex';
            console.log(err)
        } finally {
            loader.style.display = 'none';
        }
    })()