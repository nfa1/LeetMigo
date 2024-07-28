// Import the Web5 module from the '@web5/api' package
import { Web5 } from '@web5/api';

// Asynchronous function to handle Web5 operations
async function web5Operations() {
  // Connect to Web5 and retrieve the DID (Decentralized Identifier) for Alice
  const { web5, did: aliceDid } = await Web5.connect();

  try {
    // Create a new record with the specified data and message format
    const { record } = await web5.dwn.records.create({
      data: 'Hello Web5',
      message: {
        dataFormat: 'text/plain',
      },
    });

    // Read the data from the created record
    const readResult = await record.data.text();

    // Log the read result to the console
    console.log('Read Result:', readResult);
  } catch (error) {
    // Handle any errors that occur during record creation or reading
    console.error('Error:', error);
  }
}

// Execute the web5Operations function
web5Operations();
