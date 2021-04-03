class APICaller {

    _simulationController;

    constructor(simulationController) {
        this._simulationController = simulationController;
    }

    async fetchRandomUser(group, index) {
        fetch('https://randomuser.me/api/?nat=nl')
            .then((response) => {
                return response.json();
            })
            .then((data)=>{
                this._simulationController.setUser(data, group, index);
            })
            .catch(()=>{
                let VisitorObject = new Visitor("API error",404);
                this._simulationController.setUser(VisitorObject, group, index);
            });
    }

    async fetchWeather(cityName) {
        fetch('https://api.openweathermap.org/data/2.5/weather?id='+cityName+'&appid=41c01a322b746bc2a2f64b04573cfa9b')
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                this._simulationController.setWeather(data.weather[0]);
            }).catch(()=>{
            this._simulationController.weatherError("Weather API error");
        });
    }
}