const bill_cycle_validation = require('./bill_cycle'); 
const rate_deviceconfig = require('./rate_devconfig');
let account_id = '8458959945'; // Example account ID 8458959945
let servicepoint_id = '263200155513'; // Example service point ID 263200155513
let sa_id = '2185749678'; // Example sa_id
let dev_conf_id = '359132337254'; //Example device configuration id

async function runValidations() {
    try {
        await bill_cycle_validation(account_id, servicepoint_id);
        
        await rate_deviceconfig(dev_conf_id, sa_id);
    } catch (error) {
        console.error('Error occurred during validations:', error);
    }
}

runValidations()