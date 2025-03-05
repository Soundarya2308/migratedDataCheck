const oracledb = require('oracledb');

async function connectToOracle() {
  try {
    const connection = await oracledb.getConnection({
      user: 'cisadm',
      password: 'CISADM',
      connectString: 'ugbu-phx-1113.snphxprshared1.gbucdsint02phx.oraclevcn.com:1521/C2M290DM'  
    });

    console.log('Connected to Oracle database');
    const accountId = 8458959945;
    const result = await connection.execute( 'SELECT sa_id FROM ci_sa WHERE acct_id = :accountId', [accountId]);
    console.log(result.rows);
    await connection.close();
  } catch (error) {
    console.error('Error connecting to Oracle database:', error);
  }
}

connectToOracle();

