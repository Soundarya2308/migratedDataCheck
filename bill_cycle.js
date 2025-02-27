function bill_cycle_validation(acct_id, sp_id) {
    const cycles = {
        '01': 'M01',
        '02': 'M02',
        'AO 37': 'ALOP',
        'CYCLE01': 'M01',
        'CYCLE02': 'M02',
        'CYCLE03': 'M03',
        'CYCLE04': 'M04',
        'CYCLE05': 'M05',
        'CYCLE06': 'M06',
        'CYCLE07': 'M07',
        'CYCLE08': 'M08',
        'CYCLE09': 'M09',
        'CYCLE10': 'M10',
        'CYCLE11': 'M11',
        'CYCLE12': 'M12',
        'CYCLE13': 'M13',
        'CYCLE14': 'M14',
        'CYCLE15': 'M15',
        'CYCLE16': 'M16',
        'CYCLE17': 'M17',
        'CYCLE18': 'M18',
        'DMOGL': 'M01',
        'JPS_CYCLE02': 'M02',
        'Q-CYCLE01': ''
    };

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let accounturl = `https://ugbu-phx-1113.snphxprshared1.gbucdsint02phx.oraclevcn.com:6201/ouaf/rest/apis/customer/v-model/accounts/${acct_id}`;
    let username = 'SYSUSER';
    let password = 'sysuser00';
    let headers = new Headers();
    let mc_extracted = '';
    let bc_extracted = '';
    headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));

    // First API call to get billCycle
    fetch(accounturl, { method: 'GET', headers: headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch account: ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {
            bc_extracted = json.billCycle?.billCycle; // Optional chaining for safety
            console.log(`Bill Cycle: ${bc_extracted}`);

            const servicePointUrl = `https://ugbu-phx-1113.snphxprshared1.gbucdsint02phx.oraclevcn.com:6201/ouaf/rest/apis/meter/v-model/servicePoints/${sp_id}`;
            return fetch(servicePointUrl, { method: 'GET', headers: headers });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch service point: ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {
            mc_extracted = json.measurementCycle?.measurementCycle; // Optional chaining
            console.log(`Measurement Cycle: ${mc_extracted}`);

            // Validation checks
            if (!mc_extracted) {
                console.log('Measurement cycle is missing');
            } 

            if (!bc_extracted) {
                    console.log('Bill Cycle is missing');
                } 
            if(mc_extracted && bc_extracted){
                    if (cycles.hasOwnProperty(mc_extracted)) {
                        console.log('Measurement cycle exists');
                        if (cycles[mc_extracted] === bc_extracted) {
                            console.log(`Bill Cycle and the Measurement Cycle are Matching!`);
                        } else {
                            console.log('Bill Cycle and the Measurement Cycle are not matching');
                        }
                    } else {
                        console.log('Measurement Cycle does not exist');
                    }
                }
            }
        )
        .catch(error => console.error('There was an error:', error));
}

module.exports = bill_cycle_validation;
