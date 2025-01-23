const bcrypt = require('bcryptjs');

async function testHash() {
    try {
        const plainPassword = 'Shadow007!';
        const newHash = await bcrypt.hash(plainPassword, 8);
        console.log('New Hash:', newHash);

        // Compare with the stored hash
        const storedHash = '$2a$08$472.u15ydcP8VvrPpP9iweNlpJV1.JgEOG5XoMk364Rf8u97gghk.';
        const match = await bcrypt.compare(plainPassword, storedHash);
        console.log('Stored Hash Match:', match);

        // Compare new hash with stored hash
        const newMatch = await bcrypt.compare(plainPassword, newHash);
        console.log('New Hash Match:', newMatch);
    } catch (error) {
        console.error('Error:', error);
    }
}

testHash();