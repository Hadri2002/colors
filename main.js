document.addEventListener('DOMContentLoaded', function() {
    let application;
            const appName = document.title;
            if(appName){
                const appPath = `./app/${appName}/${appName}.js`;
                //import returns a promise => building block of async programming
                const app = import(appPath).then(function(appModule){
                    //Success branch
                    const target = document.querySelector("#app");
                    console.log(appModule);
                    const appObject = appModule.default;
                    application = new appObject({
                        target: target
                    });
                }, function(err){
                    //Error branch
                    throw err;
                });
            }
            else{
                throw new Error(`No application was linked to button ${btn.textContent}`);
            }

        } 
)