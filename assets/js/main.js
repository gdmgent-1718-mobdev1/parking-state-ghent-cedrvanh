(function App() {
    this.init = function() {
        console.log('1. Initializing application');
        const url = 'https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime'
        
        function parkingApp() {
            getJsonByPromise(url).then(
                function(data) {
                    console.log(data);

                    var parkingEl = document.querySelector('.parking');
                    var tempStr = "";

                    data.forEach(function(e) {
                        
                        var parkingGarage = new Parking(
                            e.id,
                            e.name,
                            e.description,
                            e.address,

                            e.parkingStatus.totalCapacity,
                            e.parkingStatus.availableCapacity,
                            e.parkingStatus.open
                        );

                        console.log(parkingGarage.availableCapacity);

                        let color;
                        let icon;
                        let percentage = Math.round(parseInt(parkingGarage.availableCapacity) / parseInt(parkingGarage.totalCapacity)*100);
                        
                        if(percentage > 50) {
                            color = 'green';
                            icon = 'fa fa-arrow-up';
                        } 
                        else if(percentage >= 0.20 && percentage <= 50) {
                            color = 'orange';
                            icon = 'fa fa fa-arrows-h';
                        } 
                        else {
                            color = 'red';
                            icon = 'fa fa-arrow-down';
                        }

                        tempStr += 
                        `
                        <div class="parkingGarage">
                            <div class="circle left ${color}"></div>
                            <div class="left">
                                <h3>${parkingGarage.name}</h3>
                                <p>${parkingGarage.address}</p>
                            </div>
                            <div class="right">
                                <span>${parkingGarage.availableCapacity} / ${parkingGarage.totalCapacity}</span>
                                <i class="${icon}" aria-hidden="true"></i>                                
                            </div>
                        </div>
                        `

                    }, this);
                    
                    parkingEl.innerHTML = tempStr;

                },
                function(error){
                    console.log(error);
                }
            );
        };

        parkingApp();
        setInterval(parkingApp, 5000);
    };
    this.init();
})();
